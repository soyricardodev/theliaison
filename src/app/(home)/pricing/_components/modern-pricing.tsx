"use client";

import { Icon } from "@iconify/react";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Divider,
	Link,
	Spacer,
	Tab,
	Tabs,
} from "@nextui-org/react";
import React from "react";
import { cn } from "~/lib/utils";
import type { Tables } from "~/types/database-types";

type Prices = Tables<"prices">;

interface Product {
	active: boolean | null;
	description: string | null;
	id: string;
	image: string | null;
	metadata: Record<string, string>;
	name: string | null;
	prices: Prices[];
}

export function ModernPricing({ products }: { products: Product[] }) {
	return products.map((product) => (
		<Card
			key={product.id}
			isBlurred
			className={cn("p-3 bg-default-100/50", {
				"!border-small border-secondary/50": product.id === "1",
			})}
			shadow="md"
		>
			<CardHeader className="flex flex-col items-start gap-2 pb-6">
				<h2 className="text-large font-medium">{product.name}</h2>
				<p className="text-medium text-default-500">{product.description}</p>
			</CardHeader>
			<Divider />
			<CardBody className="gap-8">
				<p className="flex items-baseline gap-1 pt-2">
					<span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-4xl font-semibold leading-7 tracking-tight text-transparent">
						{/* {typeof tier.price === "string" ? tier.price : tier.price[selectedFrequency.key]} */}
						{Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "usd",
							minimumFractionDigits: 0,
						}).format((product.prices[0]?.unit_amount || 0) / 100)}
					</span>
					{/* {typeof tier.price !== "string" ? (
                  <span className="text-small font-medium text-default-400">
                    {tier.priceSuffix
                      ? `/${tier.priceSuffix}/${selectedFrequency.priceSuffix}`
                      : `/${selectedFrequency.priceSuffix}`}
                  </span>
                ) : null} */}
					<span className="text-small font-medium text-default-400">
						/per month
					</span>
				</p>
				<ul className="flex flex-col gap-2">
					{(Object.keys(product.metadata) as string[]).map(
						(key) =>
							key.startsWith("feature_") && (
								<li key={key} className="flex items-center gap-2">
									<Icon className="text-secondary" icon="ci:check" width={24} />
									<p className="text-default-500">{product.metadata[key]}</p>
								</li>
							),
					)}
				</ul>
			</CardBody>
			<CardFooter>
				<Button fullWidth as={Link} color="secondary" href="/" variant={"flat"}>
					Get Started
				</Button>
			</CardFooter>
		</Card>
	));
}
