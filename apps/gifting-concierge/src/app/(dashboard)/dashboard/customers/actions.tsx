"use server";

import { stripe } from "~/utils/stripe/config";

export async function getCustomers() {
	const customers = await stripe.customers.list();

	return {
		customers: customers.data,
		hasMore: customers.has_more,
	};
}
