"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import type { Tables } from "~/types/database-types";
import { createStripePortal } from "~/utils/stripe/server";

type Subscription = Tables<"subscriptions">;
type Price = Tables<"prices">;
type Product = Tables<"products">;

type SubscriptionWithPriceAndProduct = Subscription & {
	prices:
		| (Price & {
				products: Product | null;
		  })
		| null;
};

interface Props {
	subscription: SubscriptionWithPriceAndProduct | null;
}

export default function CustomerPortalForm({ subscription }: Props) {
	const router = useRouter();
	const currentPath = usePathname();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const subscriptionPrice =
		subscription &&
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: subscription?.prices?.currency!,
			minimumFractionDigits: 0,
		}).format((subscription?.prices?.unit_amount || 0) / 100);

	const handleStripePortalRequest = async () => {
		setIsSubmitting(true);
		const redirectUrl = await createStripePortal(currentPath);
		setIsSubmitting(false);
		return router.push(redirectUrl);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Plan</CardTitle>
			</CardHeader>
			<CardContent>
				{subscription ? (
					<p className="text-lg">
						You are currently on the{" "}
						<span className="font-semibold">
							{subscription?.prices?.products?.name}
						</span>{" "}
						plan.
					</p>
				) : (
					<p className="text-lg">
						You are not currently subscribed to any plan.
					</p>
				)}
			</CardContent>
			<CardFooter className="flex flex-col items-start justify-between border-t">
				{subscription ? (
					<p className="my-2 text-2xl ">
						<span className="text-3xl font-semibold">{subscriptionPrice}</span>/
						{subscription?.prices?.interval}
					</p>
				) : (
					<Link href="/pricing">Choose your plan</Link>
				)}
				<div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
					<Button onClick={handleStripePortalRequest} className="text-lg mt-2">
						Manage your subscription
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
