"use client";

import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { Tables } from "~/types/database-types";
import { getErrorRedirect } from "~/utils/helpers";
import { getStripe } from "~/utils/stripe/client";
import { checkoutWithStripe } from "~/utils/stripe/server";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;
interface ProductWithPrices extends Product {
	prices: Price[];
}
interface PriceWithProduct extends Price {
	products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
	prices: PriceWithProduct | null;
}

interface Props {
	user: User | null | undefined;
	products: ProductWithPrices[];
	subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month";

export default function Pricing({ user, products, subscription }: Props) {
	const router = useRouter();
	useState<BillingInterval>("month");
	const [priceIdLoading, setPriceIdLoading] = useState<string>();
	const currentPath = usePathname();

	const handleStripeCheckout = async (price: Price) => {
		setPriceIdLoading(price.id);

		if (!user) {
			setPriceIdLoading(undefined);
			return router.push("/auth/signup");
		}

		const { errorRedirect, sessionId } = await checkoutWithStripe(
			price,
			currentPath,
		);

		if (errorRedirect) {
			setPriceIdLoading(undefined);
			return router.push(errorRedirect);
		}

		if (!sessionId) {
			setPriceIdLoading(undefined);
			return router.push(
				getErrorRedirect(
					currentPath,
					"An unknown error occurred.",
					"Please try again later or contact a system administrator.",
				),
			);
		}

		const stripe = await getStripe();
		stripe?.redirectToCheckout({ sessionId });

		setPriceIdLoading(undefined);
	};

	const features = [
		"Bespoke AI development",
		"White-glove support",
		"Unlimited projects",
		"Priority access to new AI tools",
		"Custom integrations",
		"Highest data security and compliance",
	];

	if (!products.length) {
		return (
			<section className="bg-black">
				<div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
					<div className="sm:flex sm:flex-col sm:align-center"></div>
					<p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
						No subscription pricing plans found. Create them in your{" "}
						<a
							className="text-pink-500 underline"
							href="https://dashboard.stripe.com/products"
							rel="noopener noreferrer"
							target="_blank"
						>
							Stripe Dashboard
						</a>
						.
					</p>
				</div>
			</section>
		);
	} else {
		return (
			<section id="pricing">
				<div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-14 md:px-8 my-14">
					<div className="mx-auto max-w-5xl text-center">
						<h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
							Pricing
						</h4>

						<h2 className="text-5xl font-heading font-black tracking-tight text-black dark:text-white sm:text-6xl">
							Simple pricing for everyone.
						</h2>

						<p className="mt-6 max-w-[600px] mx-auto text-xl leading-8 text-black/80 dark:text-white text-pretty">
							Choose an <strong>affordable plan</strong> that&apos;s packed with
							the best features for engaging your audience, creating customer
							loyalty, and driving sales.
						</p>
					</div>

					<div className="mx-auto flex justify-center flex-col items-center lg:flex-row w-full gap-8 mt-16">
						{products.map((product, idx) => {
							const price = product.prices[0]!;

							const priceString = new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: price.currency!,
								minimumFractionDigits: 0,
							}).format((price?.unit_amount || 0) / 100);
							return (
								<div
									key={product.id}
									className={cn(
										"relative flex w-full max-w-[400px] flex-col gap-4 overflow-hidden rounded-2xl border p-4 text-black",
										idx === 1 &&
											"border-2 border-neutral-700 shadow-lg shadow-neutral-500 [transform:scale(1.1)]",
									)}
								>
									<div className="flex items-center">
										<div className="ml-4">
											<h2 className="text-base font-semibold leading-7">
												{product.name}
											</h2>
											<p className="h-16 text-sm leading-5 text-black/70 dark:text-white">
												{product.description ??
													"lorem ipsum sit amet consectetur adipisicing elit. Quis minima quas quibusdam natus at enim eum, illo libero porro ullam?. L"}
											</p>
										</div>
									</div>

									<motion.div
										key={`${product.id}-${product.name}`}
										initial="initial"
										animate="animate"
										variants={{
											initial: {
												opacity: 0,
												y: 12,
											},
											animate: {
												opacity: 1,
												y: 0,
											},
										}}
										transition={{
											duration: 0.4,
											delay: 0.1 + idx * 0.05,
											ease: [0.21, 0.47, 0.32, 0.98],
										}}
										className="flex flex-row gap-1"
									>
										<span className="text-4xl font-bold text-black dark:text-white">
											{priceString}
											<span className="text-xs">
												{" "}
												/ {price.interval ?? "One-time"}
											</span>
										</span>
									</motion.div>

									<Button
										className={cn(
											"group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
											"transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
										)}
										onClick={() => handleStripeCheckout(price)}
									>
										<span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
										<p>{subscription ? "Manage" : "Subscribe"}</p>
									</Button>

									<hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0" />
									<ul className="flex flex-col gap-2 font-normal">
										{features.map((feature: string, idx: number) => (
											<li
												key={idx}
												className="flex items-center gap-3 text-xs font-medium text-black dark:text-white"
											>
												<CheckIcon className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white" />
												<span className="flex">{feature}</span>
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		);
	}
}
