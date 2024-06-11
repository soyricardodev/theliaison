"use client";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { XIcon } from "lucide-react";
// add env
import type React from "react";

import { useQuery } from "@tanstack/react-query";
import { cn } from "@theliaison/ui";
import { getProduct } from "~/components/cart/actions";

export interface OrderSummaryItemType {
	id: string;
	quantity: number;
	hideX?: boolean;
	hidePrice?: boolean;
}

export type OrderSummaryItemProps = React.HTMLAttributes<HTMLLIElement> &
	OrderSummaryItemType;

const OrderSummaryItem = ({
	id,
	children,
	quantity,
	hideX = false,
	hidePrice = false,
	className,
}: OrderSummaryItemProps) => {
	const { data: product } = useQuery({
		queryKey: ["product", id],
		queryFn: () => getProduct(id),
	});

	const unitPrice = product?.prices[0]?.unit_amount ?? 0;
	const totalPrice = (unitPrice / 100) * quantity;
	const price = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(totalPrice);

	return (
		<li
			className={cn(
				"flex items-center gap-x-4 border-b-small border-divider py-4",
				className,
			)}
		>
			<div className="flex size-20 flex-shrink-0 items-center justify-center">
				<Image
					alt={product?.name ?? ""}
					src={product?.image ?? ""}
					width={80}
					height={80}
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<h4 className="text-small">
					<p className="font-medium text-foreground">
						{product?.name ?? children}
					</p>
				</h4>
				{!hidePrice && (
					<div className="mt-2 flex items-center gap-2">
						<span className="text-small font-semibold text-default-700">
							{price}
						</span>
						<span className="text-small text-default-500">x {quantity}</span>
					</div>
				)}
			</div>
			{!hideX && (
				<Tooltip content="Remove" placement="top">
					<Button
						isIconOnly
						className="h-7 w-7 min-w-[1.5rem]"
						radius="full"
						variant="flat"
					>
						<XIcon width={14} />
					</Button>
				</Tooltip>
			)}
		</li>
	);
};

OrderSummaryItem.displayName = "OrderSummaryItem";

export default OrderSummaryItem;
