"use server";

import { client as trackClient } from "@theliaison/fedex/fetch/track";
import { client as shipClient } from "@theliaison/fedex/fetch/ship";
import { client as rateClient } from "@theliaison/fedex/fetch/rate";
import { getAccessToken } from "@theliaison/fedex/fetch/authorization";
import { env } from "~/env";
import { nanoid } from "nanoid";

interface GetShipmentRateProps {
	recipientPostalCode: string;
	packageWeight: number;
}

export async function getShipmentRate({
	recipientPostalCode,
	packageWeight,
}: GetShipmentRateProps) {
	const authTokenRequest = await getAccessToken(
		env.FEDEX_TEST_API_KEY,
		env.FEDEX_TEST_SECRET_KEY,
	);

	if (authTokenRequest == null) {
		console.log("authTokenRequest is null", { authTokenRequest });
		return undefined;
	}

	const rateRequestId = nanoid();
	const rateRequest = await rateClient.POST("/rate/v1/rates/quotes", {
		params: {
			header: {
				"content-type": "application/json",
				authorization: authTokenRequest,
				"x-locale": "en_US",
				"x-customer-transaction-id": rateRequestId,
			},
		},
		body: {
			accountNumber: {
				value: env.FEDEX_ACCOUNT_NUMBER,
			},
			requestedShipment: {
				shipper: {
					address: {
						postalCode: 91945,
						countryCode: "US",
					},
				},
				recipient: {
					address: {
						postalCode: Number(recipientPostalCode),
						countryCode: "US",
					},
				},
				pickupType: "USE_SCHEDULED_PICKUP",
				rateRequestType: ["ACCOUNT", "LIST"],
				requestedPackageLineItems: [
					{
						weight: {
							units: "KG",
							value: packageWeight,
						},
					},
				],
			},
		},
	});

	const { data, error } = rateRequest;

	if (error || data == null || data.output == null) {
		const errorData = error?.errors?.[0];
		console.log({
			rateRequestError: errorData,
			code: errorData?.code,
			message: errorData?.message,
			params: errorData?.parameterList?.[0],
			paramsMap: errorData?.parameterList?.map((param) => param),
		});
		return undefined;
	}

	const price =
		data.output.rateReplyDetails?.[0]?.ratedShipmentDetails?.[0]
			?.totalNetCharge;

	if (price == null) {
		return undefined;
	}

	return price;
}

interface CreateShipmentProps {
	recipientName: string;
	phoneNumber: string;
	email?: string;
	streetLines: string[];
	city: string;
	stateOrProvinceCode: string;
	postalCode: string;
	countryCode: string;
	residential?: boolean;

	packageWeight: number;
}

export async function createShipment({
	recipientName,
	phoneNumber,
	email,
	streetLines,
	city,
	stateOrProvinceCode,
	postalCode,
	countryCode,
	residential,
	packageWeight,
}: CreateShipmentProps) {
	const authTokenRequest = await getAccessToken(
		env.FEDEX_TEST_API_KEY,
		env.FEDEX_TEST_SECRET_KEY,
	);

	if (authTokenRequest == null) {
		return {
			error: "Unable to get access token",
		};
	}

	const shipmentRequestId = nanoid();
	const shipmentRequest = await shipClient.POST("/ship/v1/shipments", {
		params: {
			header: {
				"content-type": "application/json",
				authorization: authTokenRequest,
				"x-locale": "en_US",
				"x-customer-transaction-id": shipmentRequestId,
			},
		},
		body: {
			accountNumber: {
				value: env.FEDEX_ACCOUNT_NUMBER,
			},
			labelResponseOptions: "URL_ONLY",
			requestedShipment: {
				shipper: {
					contact: {
						personName: "The Liaison Gifting Concierge",
						phoneNumber: "+1 (555) 555-5555",
					},
					address: {
						streetLines: ["SHIPPER STREET LINE 1"],
						city: "SAN DIEGO",
						stateOrProvinceCode: "CA",
						postalCode: "95131",
						countryCode: "US",
					},
				},
				recipients: [
					{
						contact: {
							personName: recipientName,
							phoneNumber: phoneNumber,
							emailAddress: email,
						},
						address: {
							streetLines,
							city,
							countryCode,
							stateOrProvinceCode,
							postalCode,
							residential,
						},
					},
				],
				requestedPackageLineItems: [
					{
						weight: {
							units: "KG",
							value: packageWeight,
						},
					},
				],
				pickupType: "USE_SCHEDULED_PICKUP",
				serviceType: "FEDEX_GROUND",
				packagingType: "YOUR_PACKAGING",
				shippingChargesPayment: {
					paymentType: "SENDER",
					payor: {
						responsibleParty: {
							accountNumber: {
								value: env.FEDEX_ACCOUNT_NUMBER,
							},
							address: {
								streetLines: ["SHIPPER STREET LINE 1"],
								city: "SAN DIEGO",
								stateOrProvinceCode: "CA",
								postalCode: "95131",
								countryCode: "US",
							},
						},
					},
				},
				labelSpecification: {
					imageType: "PDF",
					labelStockType: "PAPER_LETTER",
				},
			},
		},
	});
}

export async function getTrackingStatus(trackingNumber: string) {
	const trackerAuthorization = (await getAccessToken(
		env.FEDEX_TEST_TRACKING_API_KEY,
		env.FEDEX_TEST_TRACKING_SECRET_KEY,
	)) as string;

	const trackerRequest = await trackClient.POST("/track/v1/trackingnumbers", {
		params: {
			header: {
				"content-type": "application/json",
				authorization: trackerAuthorization,
				"x-locale": "en_US",
				"x-customer-transaction-id": nanoid(),
			},
		},
		body: {
			includeDetailedScans: true,
			trackingInfo: [
				{
					trackingNumberInfo: {
						trackingNumber: trackingNumber,
					},
				},
			],
		},
	});

	// important data about the delivery status
	const track = trackerRequest.data?.output?.completeTrackResults;
	const deliveryStatus =
		track?.[0]?.trackResults?.[0]?.latestStatusDetail?.statusByLocale;
	const shipmentDeliveryType =
		track?.[0]?.trackResults?.[0]?.estimatedDeliveryTimeWindow?.type;
	const shipmentDeliveryDescription =
		track?.[0]?.trackResults?.[0]?.estimatedDeliveryTimeWindow?.description;

	return {};
}
