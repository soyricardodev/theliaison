"use server";

import { createClient } from "~/supabase/server";

export async function createGiftOrder(
	giftLink: string,
	giftSpecifications: string,
	giftType: "link" | "custom" | "store",
	recipientName: string,
	stripeSessionId: string,
	recipientPhoneNumber?: string,
	recipientEmail?: string,
	recipientSocialPlatform?: string,
	recipientSocialHandle?: string,
) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return { error: "Unauthorized", data: null };
	}

	const { data: giftOrder, error: findGiftOrderError } = await supabase
		.from("gifts")
		.select("id")
		.eq("stripe_session_id", stripeSessionId)
		.single();

	if (findGiftOrderError == null && giftOrder != null) {
		return { error: null, data: { id: giftOrder.id } };
	}

	const { data: recipient, error } = await supabase
		.from("gift_recipients")
		.insert({
			name: recipientName,
			provided_contact: true,
			knows_address: false,
		})
		.select("id")
		.single();

	if (error) {
		return { error, data: null };
	}

	await supabase.from("gift_recipient_contacts").insert({
		recipient_id: recipient.id,
		email: recipientEmail,
		phone_number: recipientPhoneNumber,
		social_media_platform: recipientSocialPlatform,
		social_media_handle: recipientSocialHandle,
	});

	if (giftType === "link") {
		const { data: giftOrder, error } = await supabase
			.from("gifts")
			.insert({
				recipient_id: recipient.id,
				sender_id: user.id,
				status: "awaiting_recipient_confirmation",
				type: "link",
				stripe_session_id: stripeSessionId,
			})
			.select("id")
			.single();

		if (error) {
			console.log({ error });
			return { error, data: null };
		}

		const { error: giftOrderLinkError } = await supabase
			.from("gifts_orders_links")
			.insert({
				gift_order_id: giftOrder.id,
				link: giftLink,
				specs: giftSpecifications,
			});

		console.log({ giftOrderLinkError });

		return { error: null, data: { id: giftOrder.id } };
	}

	if (giftType === "custom") {
		const { data: giftOrder, error } = await supabase
			.from("gifts")
			.insert({
				recipient_id: recipient.id,
				sender_id: user.id,
				status: "awaiting_recipient_confirmation",
				type: "custom",
				stripe_session_id: stripeSessionId,
			})
			.select("id")
			.single();

		if (error) {
			return { error, data: null };
		}

		await supabase.from("gifts_orders_custom").insert({
			gift_id: giftOrder.id,
		});

		return { error: null, data: { id: giftOrder.id } };
	}
}
