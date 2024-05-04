"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";

export function PricingSelect({ products }: { products: any }) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(products[2].name);

	const productData = products.find((product) => product.name === value);
	const productPrice = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "usd",
		minimumFractionDigits: 0,
	}).format((productData?.prices[0]?.unit_amount || 0) / 100);
	const productDescription = productData?.description;

	const featuredProductId = "prod_Q2WdnU3LdaDjnn";

	return (
		<>
			<div className="mx-auto w-full max-w-[450px] md:hidden">
				<div className="mb-4">
					<Select value={value} onValueChange={setValue}>
						<SelectTrigger className="">
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{products.map((product) => (
									<SelectItem key={product.id} value={product.name}>
										{product.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="overflow-hidden rounded-xl border border-black border-opacity-[0.08]">
					<div
						className={cn(
							"flex flex-col gap-2 p-4",
							productData?.id === featuredProductId ? "bg-[#5effe2]" : "",
						)}
					>
						<p className="mb-2 inline-block whitespace-nowrap leading-none">
							<span className="text-[32px] font-semibold tracking-tight">
								{productPrice}
							</span>
							<span className="text-[14px] text-[#666666]">/month</span>
						</p>
						<p className="min-h-[40px] text-sm text-[#666666]">
							{productDescription}
						</p>
						<Button
							disabled
							className="h-10 disabled:bg-[#f2f2f2] disabled:text-[#8f8f8f] disabled:opacity-100"
						>
							Current Plan
						</Button>
					</div>
					{/* Features */}
					<div className="grid gap-6 px-4 py-5 text-sm">
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
								200 Credits/month
							</span>
						</div>
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
								200 Credits/month
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
