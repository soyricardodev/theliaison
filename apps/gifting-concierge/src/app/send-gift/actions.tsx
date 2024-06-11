/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import { createClient } from "~/supabase/server";

interface InsertGift {
	total_price: number;
	sender_name?: string;
	recipient_name: string;
	recipient_social: string;
	recipient_email?: string;
	recipient_phone?: string;
	gifts: {
		id: string;
		quantity: number;
	}[];
}

export async function createGift({
	total_price,
	sender_name,
	recipient_name,
	recipient_social,
	recipient_email,
	gifts,
}: InsertGift) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("gifts")
		.insert({
			total_price,
			sender_name,
			recipient_name,
			recipient_social,
			recipient_email,
		})
		.select("id")
		.single();

	if (error) {
		return console.log(error);
	}

	for await (const gift of gifts) {
		await supabase.from("gifts_products").insert({
			gift_id: data.id,
			product_id: gift.id,
			quantity: gift.quantity,
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return data.id;
}
