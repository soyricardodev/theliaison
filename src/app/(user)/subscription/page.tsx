import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getSubscriptionProgress } from "~/lib/utils";
import { createClient } from "~/utils/supabase/server";
import { StripePortal } from "./stripe-portal";

export default async function SubscriptionPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/");
	}

	const { data: subscription } = await supabase
		.from("subscriptions")
		.select("*, prices(*, products(*))")
		.in("status", ["active"])
		.maybeSingle();

	const { percentage, remainingDays } = getSubscriptionProgress(
		String(subscription?.current_period_end),
	);

	const periodEnd = new Date(
		String(subscription?.current_period_end),
	).getTime();
	const today = new Date().getTime();
	const diffInMilliseconds = Math.abs(periodEnd - today);
	const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

	const suscriptionPrice = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: subscription?.prices?.currency! || "usd",
		minimumFractionDigits: 0,
	}).format((subscription?.prices?.unit_amount || 0) / 100);

	const renewalDate = new Date(
		String(subscription?.current_period_end),
	).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	const renewalDateToDisplay =
		renewalDate === "Invalid Date" ? "" : renewalDate;

	return (
		<main className="flex-1 overflow-auto">
			<div className="w-full px-6">
				<div className="mx-auto max-w-[1132px]">
					<h1 className="py-4 text-[32px] font-semibold leading-none tracking-tight md:pt-11">
						Subscription & Billing
					</h1>
				</div>

				<Tabs defaultValue="plan">
					<TabsList className="rounded-none bg-transparent">
						<TabsTrigger
							value="plan"
							className="py-4 text-sm rounded-none bg-transparent"
						>
							Plan Summary
						</TabsTrigger>
					</TabsList>
					<div className="border-t-1 mx-auto max-w-[1132px] border-zinc-200 py-10">
						<TabsContent
							value="plan"
							className="flex flex-col gap-4 lg:flex-row"
						>
							<div className="flex basis-2/3 flex-col gap-4">
								<div className="flex flex-col justify-between rounded-lg border border-border">
									<div className="px-5 py-4">
										<h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
											<span>Plan Summary</span>
											<div className="w-fit rounded-full px-2 py-0.5 text-xs bg-zinc-200 text-black">
												{subscription?.prices?.products?.name || "No"} Plan
											</div>
										</h3>
										<div className="grid grid-cols-3 gap-4 md:grid-cols-6">
											<div className="col-span-3 flex flex-col pr-12">
												<div className="-mt-0.5 flex-1 pb-2  text-xs font-normal text-geist-gray-900 md:pb-0">
													<span>
														{Number.isNaN(diffInDays)
															? 0
															: Math.round(diffInDays)}
													</span>{" "}
													days left
												</div>
												<div className="mb-1 flex items-end">
													<Progress value={percentage} className="h-[10px]" />
												</div>
											</div>
											<div className="col-span-1 flex flex-col">
												<div className="flex-1 text-xs font-normal text-[#666]">
													Price/Month
												</div>
												<div className="flex-1 pt-1 text-sm font-medium text-[#171717]">
													{suscriptionPrice}
												</div>
											</div>
											<div className="col-span-1 flex flex-col">
												<div className="flex-1 text-xs font-normal text-[#666]">
													Status
												</div>
												<div className="flex-1 pt-1 text-sm font-medium text-[#171717] capitalize">
													{subscription?.status || "Active"}
												</div>
											</div>
											<div className="col-span-1 flex flex-col">
												<div className="flex-1 text-xs font-normal  text-[#666]">
													Renewal Date
												</div>
												<div className="flex-1 pt-1 text-sm font-medium text-[#171717]">
													{renewalDateToDisplay}
												</div>
											</div>
										</div>
									</div>
									<footer className="rounded-b-lg border-t border-border px-4 flex flex-col justify-between gap-4 bg-[#fafafa] py-3 sm:flex-row sm:items-center">
										<div className="flex flex-col gap-2 sm:ml-auto sm:flex-row">
											<Button
												variant="outline"
												className="w-full rounded-md"
												asChild
											>
												<Link href="/pricing">Upgrade</Link>
											</Button>
										</div>
									</footer>
								</div>

								<div className="hidden lg:block">
									<div className="flex flex-col justify-between rounded-lg border border-border">
										<div className="px-5 py-4">
											<h3 className="text-base font-semibold pb-2">
												Customer Portal
											</h3>
											<p className="text-sm text-gray-500">
												You can manage your subscription in the Stripe
												Dashboard.
												<br />
												<StripePortal />
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="flex w-full basis-1/3 flex-col gap-4">
								<div className="lg:hidden">
									<div className="flex flex-col justify-between rounded-lg border border-border">
										<div className="px-5 py-4">
											<h3 className="text-base font-semibold pb-2">
												Customer Portal
											</h3>
											<p className="text-sm text-gray-500">
												You can manage your subscription in the Stripe
												Dashboard.
												<br />
												<StripePortal />
											</p>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</main>
	);
}
