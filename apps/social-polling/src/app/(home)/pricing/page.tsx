import { createClient } from "~/utils/supabase/server";
import { ModernPricing } from "./_components/modern-pricing";

export default async function PricingPage() {
	const supabase = createClient();

	const { data: subscription } = await supabase
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

	console.log(products);

	const _userSubscriptionId =
		subscription != null ? subscription.prices?.id : null;

	if (!products) return;

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<ModernPricing products={[products[1], products[2], products[0]]} />
		</div>
	);
}
