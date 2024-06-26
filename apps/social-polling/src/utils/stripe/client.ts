import type { Stripe as StripeType } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

import { env } from "~/env";

let stripePromise: Promise<StripeType | null>;

export const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
	}

	return stripePromise;
};

export const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
