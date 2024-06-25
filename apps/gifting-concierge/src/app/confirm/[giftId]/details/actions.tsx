"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";
import { stripe } from "~/utils/stripe/config";
import { client as addressValidationClient } from "@theliaison/fedex/fetch/address-validation";
import { getAccessToken } from "@theliaison/fedex/fetch/authorization";
import { env } from "~/env";
import { nanoid } from "~/utils";
import { getShipmentRate } from "~/app/dashboard/gifting-concierge/actions";
import supabaseAdmin, { createOrRetrieveCustomer } from "~/supabase/admin";

const url =
	process.env.NODE_ENV !== "production"
		? "http://localhost:3002/api/invoice"
		: "https://giftingconcierge.theliaison.vercel.app/api/invoice";

interface ConfirmGiftFromRecipientProps {
	name: string;
	email: string;
	phone: string;
	address_line_1: string;
	address_line_2?: string;
	city: string;
	apartment?: string;
	postal_code: string;
	country: string;
	recipient_id: string;
	gift_id: number;
	sender_id: string;
}
export async function confirmGiftFromRecipient({
	name,
	email,
	phone,
	address_line_1,
	address_line_2,
	city,
	apartment,
	postal_code,
	recipient_id,
	gift_id,
	sender_id,
}: ConfirmGiftFromRecipientProps) {
	const supabase = createClient();

	// * updating recipient address
	const { error: updateRecipientAddress } = await supabase
		.from("gift_recipient_addresses")
		.insert({
			recipient_id,
			address_line_1,
			address_line_2,
			city,
			postal_code,
			appartment: apartment,
			country: "US",
			is_private: true,
		});

	console.log({ updateRecipientAddress });

	const tempPackageWeight = 10;

	const shipmentRate = await getShipmentRate({
		recipientPostalCode: postal_code,
		packageWeight: tempPackageWeight,
	});

	console.log({ shipmentRate });

	if (shipmentRate == null) {
		return { error: "Unable to get shipment rate" };
	}

	console.log("lets create invoice");
	await createInvoice(sender_id, gift_id, email, shipmentRate);

	redirect("/details/thanks");
}

interface AddressValidationRequest {
	streetLines: string[];
	city: string;
	stateOrProvinceCode: string;
	postalCode: string;
}
export async function validateRecipientAddress({
	streetLines,
	city,
	stateOrProvinceCode,
	postalCode,
}: AddressValidationRequest) {
	const authToken = await getAccessToken(
		env.FEDEX_TEST_API_KEY,
		env.FEDEX_TEST_SECRET_KEY,
	);

	if (!authToken) {
		throw new Error("No auth token");
	}

	const transactionId = nanoid();
	const addressValidationRequest = await addressValidationClient.POST(
		"/address/v1/addresses/resolve",
		{
			params: {
				header: {
					"content-type": "application/json",
					authorization: authToken,
					"x-customer-transaction-id": transactionId,
					"x-locale": "en_US",
				},
			},
			body: {
				addressesToValidate: [
					{
						address: {
							streetLines,
							city,
							stateOrProvinceCode,
							postalCode,
							countryCode: "US",
						},
					},
				],
			},
		},
	);

	if (
		addressValidationRequest.error ||
		addressValidationRequest.data?.output == null
	) {
		return false;
	}

	const resolvedAddress =
		addressValidationRequest.data?.output.resolvedAddresses?.[0];

	if (resolvedAddress == null) {
		return false;
	}

	const matchedAddress = resolvedAddress.attributes?.Matched;

	if (matchedAddress == null) {
		return false;
	}

	return matchedAddress;
}

export async function createInvoice(
	userId: string,
	giftId: number,
	email: string,
	shipmentRate: number,
) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("gifts")
		.select("gifts_products(quantity, products(prices(id)))")
		.eq("id", giftId)
		.single();

	const products: {
		price_id: string;
		quantity: number;
	}[] = [];

	if (error) {
		console.log({ error });
		return error;
	}

	for (const giftItem of data.gifts_products) {
		if (giftItem.products == null) continue;

		const priceId = giftItem.products?.prices[0]?.id;

		if (priceId == null) continue;

		products.push({
			price_id: priceId,
			quantity: giftItem.quantity,
		});
	}

	const supabaseAdminClient = supabaseAdmin();

	const {
		data: { user },
		error: findCustomerError,
	} = await supabaseAdminClient.auth.admin.getUserById(userId);

	console.log({ user });

	if (findCustomerError || !user) {
		console.log({ findCustomerError });
		return error;
	}

	const senderId = await createOrRetrieveCustomer({
		uuid: userId,
		email: user.email ?? "",
	});

	const invoice = await stripe.invoices.create({
		customer: senderId,
		collection_method: "send_invoice",
		days_until_due: 14,
	});

	for await (const product of products) {
		await stripe.invoiceItems.create({
			customer: senderId,
			price: product.price_id,
			quantity: product.quantity,
			invoice: invoice.id,
		});
	}

	const shipmentItem = await stripe.invoiceItems.create({
		customer: senderId,
		description: "Shipment",
		unit_amount: Math.round(shipmentRate * 100),
		currency: "usd",
		invoice: invoice.id,
	});

	console.log({ shipmentItem });

	const theLiaisonFeeItem = await stripe.invoiceItems.create({
		customer: senderId,
		description: "The Liaison Gifting Concierge",
		unit_amount: Math.round(10 * 100),
		discountable: true,
		currency: "usd",
		invoice: invoice.id,
	});

	console.log({ theLiaisonFeeItem });

	const invoiceSend = await stripe.invoices.sendInvoice(invoice.id);

	const invoiceHostedLink = invoiceSend.hosted_invoice_url;

	console.log({ invoiceHostedLink, invoiceSend });

	const { error: updateGiftPaymentError } = await supabase
		.from("gift_payments")
		.upsert({
			gift_id: giftId,
			delivery_fee: Math.round(shipmentRate * 100),
			payment_status: "pending",
			invoice_link: invoiceHostedLink,
			service_fee: 10,
		})
		.eq("id", giftId);

	console.log({ updateGiftPaymentError });

	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: user.email ?? "",
			invoiceLink: invoiceHostedLink,
		}),
	});

	return {
		updateGiftPaymentError,
		invoiceHostedLink,
		invoiceSend,
	};
}
