import { createClient } from "~/utils/supabase/server";
import Pricing from "./_components/pricing";

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

	if (error) {
		console.log(error);
	}

	const { data: products } = await supabase
		.from("products")
		.select("*, prices(*)")
		.eq("active", true)
		.eq("prices.active", true)
		.order("metadata->index")
		.order("unit_amount", { referencedTable: "prices" });

	// <Pricing
	// 	user={user}
	// 	products={products ?? []}
	// 	subscription={subscription}
	// />
	return (
		<main className="flex-1 overflow-auto">
			<div className="w-full">
				<div className="mx-auto flex max-w-[1160px] flex-col gap-8 px-5 pt-10 md:gap-12 md:pt-16">
					<div className="grid justify-items-center gap-2 md:gap-4">
						<h1 className="text-center text-2xl font-semibold tracking-tighter md:text-5xl">
							Simple pricing for everyone.
						</h1>
						<p className="max-w-md text-center text-sm text-[#666666] md:max-w-xl md:text-base text-pretty">
							We want to empower builders of all sizes to create beautiful
							interfaces; from individuals to big enterprises, we have a plan
							that fits just what you need.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
