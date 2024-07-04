/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";

interface InsertGift {
	recipient_name: string;
	recipient_social?: string;
	recipient_social_handle?: string;
	recipient_email?: string;
	recipient_phone?: string;
	gifts: {
		id: string;
		quantity: number;
	}[];
	knows_address: boolean;
}

export async function createGift({
	recipient_name,
	recipient_social,
	recipient_social_handle,
	recipient_email,
	recipient_phone,
	gifts,
	knows_address,
}: InsertGift) {
	const supabase = createClient();

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		redirect("/login");
	}

	const { data: createGiftRecipientQuery, error: recipientError } =
		await supabase
			.from("gift_recipients")
			.insert({
				name: recipient_name,
				knows_address,
				provided_contact: true,
			})
			.select("id")
			.single();

	if (recipientError || !createGiftRecipientQuery) {
		console.log({ recipientError });
		return recipientError;
	}

	await supabase.from("gift_recipient_contacts").insert({
		recipient_id: createGiftRecipientQuery.id,
		email: recipient_email,
		phone_number: recipient_phone,
		social_media_handle: recipient_social,
		social_media_platform: recipient_social_handle,
	});

	const { data: createGiftOrderQuery, error } = await supabase
		.from("gifts")
		.insert({
			sender_id: user.id,
			recipient_id: createGiftRecipientQuery.id,
			status: "awaiting_recipient_confirmation",
		})
		.select("id")
		.single();

	if (error) {
		return console.log(error);
	}

	for await (const gift of gifts) {
		await supabase.from("gifts_products").insert({
			gift_id: createGiftOrderQuery.id,
			product_id: gift.id,
			quantity: gift.quantity,
		});
	}

	return createGiftOrderQuery.id;
}
