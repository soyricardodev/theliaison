import { createClient } from "~/utils/supabase/server";
import { PricingSelect } from "./_components/pricing-select";

export default async function PricingPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: subscription, error } = await supabase
		.from("subscriptions")
		.select("*, prices(*, products(*))")
		.in("status", ["trialing", "active"])
		.maybeSingle();

	const { data: products } = await supabase
		.from("products")
		.select("*, prices(*)")
		.eq("active", true)
		.eq("prices.active", true)
		.order("metadata->index")
		.order("unit_amount", { referencedTable: "prices" });

	const userSubscriptionId =
		subscription != null ? subscription.prices?.id : null;

	return (
		<PricingSelect
			user={user}
			products={products}
			userSubscriptionId={userSubscriptionId}
		/>
	);
}
