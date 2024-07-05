"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";
import { ZSAError, createServerAction } from "zsa";
import { z } from "zod";

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

const insertGiftSchema = z.object({
	recipient_name: z.string(),
	recipient_social: z.string().optional(),
	recipient_social_handle: z.string().optional(),
	recipient_email: z.string().optional(),
	recipient_phone: z.string().optional(),
	gifts: z.array(
		z.object({
			id: z.string(),
			quantity: z.number(),
		}),
	),
	knows_address: z.boolean(),
});

// in progress
export const createGiftAction = createServerAction()
	.input(insertGiftSchema)
	.handler(async ({ input }) => {
		const supabase = createClient();

		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error || !user) {
			return new ZSAError("NOT_AUTHORIZED", {
				status: 401,
			});
		}

		const { data: recipientId, error: createRecipientError } = await supabase
			.from("gift_recipients")
			.insert({
				name: input.recipient_name,
				knows_address: input.knows_address,
				provided_contact: true,
			})
			.select("id")
			.single();

		if (createRecipientError || !recipientId) {
			return new ZSAError("INTERNAL_SERVER_ERROR", {
				status: 500,
			});
		}

		await supabase.from("gift_recipient_contacts").insert({
			recipient_id: recipientId.id,
			email: input.recipient_email,
			phone_number: input.recipient_phone,
			social_media_handle: input.recipient_social,
			social_media_platform: input.recipient_social_handle,
		});

		const { data: giftId, error: saveGiftLinkError } = await supabase
			.from("gifts")
			.insert({
				recipient_id: recipientId.id,
				sender_id: user.id,
				status: "awaiting_invoice_payment",
			})
			.select("id")
			.single();

		if (saveGiftLinkError || !giftId) {
			console.log(saveGiftLinkError);
			return new ZSAError("INTERNAL_SERVER_ERROR", {
				status: 500,
			});
		}

		redirect(`/status/${giftId.id}`);
	});

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

	return redirect(`/status/${createGiftOrderQuery.id}`);
}
