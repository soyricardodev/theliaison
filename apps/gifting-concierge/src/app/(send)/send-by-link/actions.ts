"use server";

import { ZSAError, createServerAction } from "zsa";
import { z } from "zod";
import { createClient } from "~/supabase/server";
import { client as fedexClientLocations } from "@theliaison/fedex/fetch/locations";
import { getAccessToken } from "@theliaison/fedex/fetch/authorization";
import { env } from "~/env";
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

		// const accessToken = await getAccessToken(
		// 	env.FEDEX_TEST_API_KEY,
		// 	env.FEDEX_TEST_SECRET_KEY,
		// );

		// if (!accessToken) {
		// 	return new ZSAError("INTERNAL_SERVER_ERROR", {
		// 		status: 500,
		// 	});
		// }

		const {
			giftLink,
			giftSpecifications,
			recipientName,
			recipientEmail,
			recipientSocial,
			recipientSocialHandle,
			recipientPhone,
		} = input;

		console.log({
			giftLink,
			giftSpecifications,
			recipientName,
			recipientEmail,
			recipientSocial,
			recipientSocialHandle,
			recipientPhone,
		});

		return {
			giftLink,
			giftSpecifications,
			recipientName,
			recipientEmail,
			recipientSocial,
			recipientSocialHandle,
			recipientPhone,
		};
	});
