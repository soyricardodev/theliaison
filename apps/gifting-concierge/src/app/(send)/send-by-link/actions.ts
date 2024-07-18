"use server";
import { redirect } from "next/navigation";
import { ZSAError, createServerAction } from "zsa";
import { createClient } from "~/supabase/server";
import { sendByLinkSchema } from "../validators";

export const sendGiftFromLinkAction = createServerAction()
	.input(sendByLinkSchema)
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

		const {
			giftLink,
			giftSpecifications,
			recipientName,
			recipientEmail,
			recipientSocial,
			recipientSocialHandle,
			recipientPhone,
		} = input;

		const { data: recipientId, error: createRecipientError } = await supabase
			.from("gift_recipients")
			.insert({
				knows_address: false,
				provided_contact: true,
				name: recipientName,
			})
			.select("id")
			.single();

		if (createRecipientError || !recipientId) {
			return new ZSAError("INTERNAL_SERVER_ERROR", {
				status: 500,
			});
		}

		const { error: recipientContactDataError } = await supabase
			.from("gift_recipient_contacts")
			.insert({
				recipient_id: recipientId.id,
				email: recipientEmail,
				phone_number: recipientPhone,
				social_media_handle: recipientSocialHandle,
				social_media_platform: recipientSocial,
			});

		if (recipientContactDataError) {
			console.log({ recipientContactDataError });
			return new ZSAError("INTERNAL_SERVER_ERROR", {
				status: 500,
			});
		}

		const { data: giftId, error: saveGiftLinkError } = await supabase
			.from("gifts")
			.insert({
				recipient_id: recipientId.id,
				sender_id: user.id,
				status: "awaiting_recipient_confirmation",
				gift_link: giftLink,
				gift_link_specifications: giftSpecifications,
			})
			.select("id")
			.single();

		if (saveGiftLinkError || !giftId) {
			console.log({ saveGiftLinkError });
			return new ZSAError("INTERNAL_SERVER_ERROR", {
				status: 500,
			});
		}

		redirect(`/sebd-by-link/${giftId.id}`);
	});
