import Stripe from "stripe";

import { env } from "~/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: "2024-04-10",
	appInfo: {
		name: "The Liaison",
		version: "0.0.0",
		url: "https://github.com/soyricardodev/theliaison",
	},
});
