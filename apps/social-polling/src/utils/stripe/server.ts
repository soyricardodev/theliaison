"use server";

import type Stripe from "stripe";
import type { Tables } from "~/types/database-types";
import {
	calculateTrialEndUnixTimestamp,
	getErrorRedirect,
	getURL,
} from "~/utils/helpers";
import { stripe } from "~/utils/stripe/config";
import { createOrRetrieveCustomer } from "~/utils/supabase/admin";
import { createClient } from "~/utils/supabase/server";

type Price = Tables<"prices">;

type CheckoutResponse = {
	errorRedirect?: string;
	sessionId?: string;
};

export async function checkoutWithStripe(
	price: Price,
	redirectPath = "/profile",
): Promise<CheckoutResponse> {
	try {
		// Get the user from Supabase auth
		const supabase = createClient();
		const {
			error,
			data: { user },
		} = await supabase.auth.getUser();

		if (error || !user || !user.email) {
			console.error(error);
			throw new Error("Could not get user session.");
		}

		// Retrieve or create the customer in Stripe
		let customer: string;
		try {
			customer = await createOrRetrieveCustomer({
				uuid: user.id,
				email: user.email,
			});
		} catch (err) {
			console.error(err);
			throw new Error("Unable to access customer record.");
		}

		let params: Stripe.Checkout.SessionCreateParams = {
			allow_promotion_codes: true,
			billing_address_collection: "required",
			customer,
			customer_update: {
				address: "auto",
			},
			line_items: [
				{
					price: price.id,
					quantity: 1,
				},
			],
			cancel_url: getURL(),
			success_url: getURL(redirectPath),
			payment_method_collection: "if_required",
		};

		console.log(
			"Trial end:",
			calculateTrialEndUnixTimestamp(price.trial_period_days),
		);
		if (price.type === "recurring") {
			params = {
				...params,
				mode: "subscription",
				subscription_data: {
					trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days),
				},
			};
		} else if (price.type === "one_time") {
			params = {
				...params,
				mode: "payment",
			};
		}

		// Create a checkout session in Stripe
		let session: Stripe.Checkout.Session;
		try {
			session = await stripe.checkout.sessions.create(params);
		} catch (err) {
			console.error(err);
			throw new Error("Unable to create checkout session.");
		}

		// Instead of returning a Response, just return the data or error.
		if (session) {
			return { sessionId: session.id };
		}
		throw new Error("Unable to create checkout session.");
	} catch (error) {
		if (error instanceof Error) {
			return {
				errorRedirect: getErrorRedirect(
					redirectPath,
					error.message,
					"Please try again later or contact a system administrator.",
				),
			};
		}
		return {
			errorRedirect: getErrorRedirect(
				redirectPath,
				"An unknown error occurred.",
				"Please try again later or contact a system administrator.",
			),
		};
	}
}

export async function createStripePortal(currentPath: string) {
	try {
		const supabase = createClient();
		const {
			error,
			data: { user },
		} = await supabase.auth.getUser();

		if (!user || !user.email) {
			if (error) {
				console.error(error);
			}
			throw new Error("Could not get user session.");
		}

		const { data: profile } = await supabase
			.from("users")
			.select("*")
			.eq("id", user.id)
			.single();

		if (!profile) {
			throw new Error("Could not get user profile.");
		}

		let customer: string | undefined;
		try {
			customer = await createOrRetrieveCustomer({
				uuid: user.id,
				email: user.email,
			});
		} catch (err) {
			console.error(err);
			throw new Error("Unable to access customer record.");
		}

		if (!customer) {
			throw new Error("Could not get customer.");
		}

		try {
			const { url } = await stripe.billingPortal.sessions.create({
				customer,
				return_url: getURL(`/${profile.username}`),
			});
			if (!url) {
				throw new Error("Could not create billing portal");
			}
			return url;
		} catch (err) {
			console.error(err);
			throw new Error("Could not create billing portal");
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			return getErrorRedirect(
				currentPath,
				error.message,
				"Please try again later or contact a system administrator.",
			);
		}
		return getErrorRedirect(
			currentPath,
			"An unknown error occurred.",
			"Please try again later or contact a system administrator.",
		);
	}
}
