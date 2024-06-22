/* eslint-disable no-restricted-properties */
"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";

const url =
	process.env.NODE_ENV !== "production"
		? "http://localhost:3000/api/invoice"
		: "https://gifting-concierge.vercel.app/api/invoice";

export async function confirmGiftFromRecipient(formData: FormData) {
	const supabase = createClient();

	const giftId = formData.get("gift_id") as string;
	const recipientEmail = formData.get("recipient_email") as string;
	const recipientFirstName = formData.get("recipient_first_name") as string;
	const recipientLastName = formData.get("recipient_last_name") as string;
	const recipientPhone = formData.get("recipient_phone") as string;
	const recipientCountry = formData.get("recipient_country") as string;
	const recipientAddress = formData.get("recipient_address") as string;
	const recipientApartment = formData.get("recipient_apartment") as string;
	const recipientCity = formData.get("recipient_city") as string;
	const recipientPostalCode = formData.get("recipient_pc") as string;

	const { data, error } = await supabase
		.from("gift_recipient_addresses")
		.insert({
			recipient_id: "55f3d06b-d45b-4f48-8909-54ebf0317005",
			address: recipientAddress,
			city: recipientCity,
			country: recipientCountry,
			is_private: true,
			postal_code: recipientPostalCode,
			state: "CA",
			updated_at: String(Date.now()),
		});

	console.log(error);

	await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			giftId,
		}),
	});

	redirect("/details/thanks");
}
