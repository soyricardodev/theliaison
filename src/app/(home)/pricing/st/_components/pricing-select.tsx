"use client";

import * as React from "react";

import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Tables } from "~/types/database-types";
import { getErrorRedirect } from "~/utils/helpers";
import { getStripe } from "~/utils/stripe/client";
import { checkoutWithStripe } from "~/utils/stripe/server";

type Price = Tables<"prices">;

export function PricingSelect({
	products,
	userSubscriptionId,
	user,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: { products: any; userSubscriptionId?: string | null; user: User | null }) {
	const router = useRouter();
	const [priceIdLoading, setPriceIdLoading] = React.useState<string>();
	const currentPath = usePathname();

	const handleStripeCheckout = async (price: Price) => {
		setPriceIdLoading(price.id);

		if (!user) {
			setPriceIdLoading(undefined);
			return router.push("/login");
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

	const featuredProductId = "prod_Q2WdnU3LdaDjnn";

	const productsToRender = [products[2], products[1], products[0]];

	return (
		<>
			<div className="mx-auto w-full max-w-[450px] md:hidden flex flex-col gap-6 my-8">
				{productsToRender.map((product, idx) => {
					const features =
						idx === 0
							? featuresFree
							: idx === 1
								? featuresInsider
								: featuresCreator;

					const isDisabled = product.prices[0]?.id === userSubscriptionId;

					const price = Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "usd",
						minimumFractionDigits: 0,
					}).format((product.prices[0]?.unit_amount || 0) / 100);

					return (
						<ProductMobileCard
							key={`${product.id}-${product.name}-desktop`}
							isFeatured={product.id === featuredProductId}
							name={product.name}
							description={product.description}
							price={price}
							isDisabled={isDisabled}
							features={features}
							onClick={() => handleStripeCheckout(product.prices[0])}
						/>
					);
				})}
			</div>
			<div className="hidden md:block">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
					{productsToRender.map((product, idx) => {
						const features =
							idx === 0
								? featuresFree
								: idx === 1
									? featuresInsider
									: featuresCreator;

						const isDisabled = product.prices[0]?.id === userSubscriptionId;

						const price = Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "usd",
							minimumFractionDigits: 0,
						}).format((product.prices[0]?.unit_amount || 0) / 100);

						return (
							<ProductDesktopCard
								key={`${product.id}-${product.name}-desktop`}
								featured={product.id === featuredProductId}
								name={product.name}
								description={product.description}
								price={price}
								disabled={isDisabled}
								features={features}
								onClick={() => handleStripeCheckout(product.prices[0])}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

function ProductMobileCard({
	isFeatured = false,
	price,
	isDisabled = false,
	description,
	onClick,
	features,
	name,
}: {
	isFeatured: boolean;
	price: string;
	isDisabled: boolean;
	description: string;
	onClick: () => void;
	name: string;
	features: Array<string>;
}) {
	return (
		<div className="overflow-hidden rounded-xl border border-black border-opacity-[0.08]">
			<div
				className={cn("flex flex-col gap-2 p-4", isFeatured && "bg-[#5effe2]")}
			>
				<h3 className="w-fit text-left font-semibold leading-none tracking-tight text-[30px] mb-2">
					{name}
				</h3>
				<p className="mb-2 inline-block whitespace-nowrap leading-none">
					<span className="text-[32px] font-semibold tracking-tight">
						{price}
					</span>
					<span className="text-[14px] text-[#666666]">/month</span>
				</p>
				<p className="min-h-[40px] text-sm text-[#666666]">{description}</p>
				<Button
					onClick={onClick}
					disabled={isDisabled}
					className="h-10 disabled:bg-[#f2f2f2] disabled:text-[#8f8f8f] disabled:opacity-100"
				>
					{isDisabled ? "Current Plan" : "Upgrade"}
				</Button>
			</div>
			<Accordion type="single" collapsible className="w-full px-2">
				<AccordionItem value="features">
					<AccordionTrigger>See all the features</AccordionTrigger>
					<AccordionContent>
						<div className="grid gap-6 px-4 py-5 text-sm">
							{features.map((feature, idx) => (
								<Feature
									key={`${name}-${feature}-mobile-${idx}`}
									text={feature}
								/>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

function Feature({ text }: { text: string }) {
	return (
		<div className="flex items-center justify-start gap-3 tabular-nums">
			<span className="w-full max-w-[12px]">
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 rounded-full text-white bg-[#58F0D4]"
				>
					<path
						d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
						fill="currentColor"
						fillRule="evenodd"
						clipRule="evenodd"
					></path>
				</svg>
			</span>
			<span className="text-left underline decoration-dotted underline-offset-4 hover:decoration-solid">
				{text}
			</span>
		</div>
	);
}

const featuresFree = [
	"Become a premium member",
	"Unlimited projects",
	"Priority access to new AI tools",
];

const featuresInsider = [
	"Become a premium member",
	"Unlimited projects",
	"Priority access to new AI tools",
	"Custom integrations",
	"Highest data security and compliance",
	"Unlimited projects",
];

const featuresCreator = [
	"Become a premium member",
	"Unlimited projects",
	"Priority access to new AI tools",
	"Custom integrations",
	"Highest data security and compliance",
	"100% customizable",
	"Unlimited projects",
	"Priority access to new AI tools",
	"Custom integrations",
	"Highest data security and compliance",
	"50% customizable",
];

function ProductDesktopCard({
	featured,
	name,
	price,
	description,
	disabled,
	features,
	onClick,
}: {
	featured: boolean;
	name: string;
	description: string;
	price: string;
	disabled: boolean;
	features: string[];
	onClick: () => void;
}) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-xl border border-black border-opacity-[0.08] shadow-sm",
				featured &&
					"shadow-[0px_16px_24px_-8px_rgba(0,0,0,0.06),0px_4px_8px_-4px_rgba(0,0,0,0.04),0px_1px_1px_0px_rgba(0,0,0,0.02)]",
			)}
		>
			<div
				className={cn(
					"flex flex-col gap-3 px-4 py-3 lg:gap-5 lg:px-6 lg:py-5",
					featured && "bg-[#5effe2]",
				)}
			>
				<div className="w-fit text-left text-2xl font-semibold leading-none tracking-tight lg:text-[32px]">
					{name}
				</div>
				<p className="min-h-[40px] text-sm text-[#666666]">{description}</p>
				<p className="mb-2 inline-block whitespace-nowrap leading-none">
					<span className="text-[32px] font-semibold tracking-tight">
						{price}
					</span>
					<span className="text-[14px] text-[#666666]">/month</span>
				</p>
				<Button
					onClick={onClick}
					className={cn(
						"inline-flex shrink-0 items-center justify-center text-sm transition-colors focus-visible:outline-none text-black focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background font-medium shadow-sm hover:bg-accent hover:text-accent-foreground px-3 py-2 h-10 w-full whitespace-nowrap rounded-full",
						disabled &&
							"inline-flex shrink-0 items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none border border-input bg-background font-medium shadow-sm hover:bg-accent hover:text-accent-foreground px-3 py-2 h-10 whitespace-nowrap rounded-full disabled:cursor-not-allowed disabled:bg-[#F2F2F2] disabled:text-[#8F8F8F] disabled:opacity-100",
						featured &&
							"inline-flex shrink-0 items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-primary shadow hover:bg-primary/90 hover:text-[#5EFFE2] px-3 py-2 h-10 whitespace-nowrap rounded-full disabled:cursor-not-allowed disabled:bg-[#F2F2F2] disabled:text-[#8F8F8F] disabled:opacity-100 text-[#5EFFE2] border-none",
					)}
					disabled={disabled}
				>
					{disabled ? "Current Plan" : "Upgrade"}
				</Button>
			</div>
			<div className="shrink-0 bg-gray-200 h-[1px] w-full" />
			<div className="grid gap-6 px-4 py-3 lg:px-6 lg:py-5">
				{features.map((feature) => (
					<div key={feature} className="text-sm">
						<div className="flex items-center justify-start gap-3 tabular-nums">
							<div className="w-full max-w-[12px]">
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 rounded-full text-white bg-[#58F0D4]"
								>
									<path
										d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
										fill="currentColor"
										fillRule="evenodd"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
							<span className="underline decoration-dotted underline-offset-4 hover:decoration-solid">
								{feature}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
