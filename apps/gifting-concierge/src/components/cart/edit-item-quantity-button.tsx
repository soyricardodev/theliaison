"use client";

import { cn } from "@theliaison/ui";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { CartItem } from "~/store/cart";
import { useCartStore } from "~/store/cart";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
	return (
		<button
			type="submit"
			aria-label={
				type === "plus" ? "Increase item quantity" : "Reduce item quantity"
			}
			className={cn(
				"ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
				{
					"ml-auto": type === "minus",
				},
			)}
		>
			{type === "plus" ? (
				<PlusIcon className="size-4" />
			) : (
				<MinusIcon className="size-4" />
			)}
		</button>
	);
}

export function EditItemQuantityButton({
	item,
	type,
}: {
	item: CartItem;
	type: "plus" | "minus";
}) {
	const { addToCart, decrementItemQuantity } = useCartStore();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("click", type);
		if (type === "plus") {
			addToCart(item);
		} else {
			decrementItemQuantity(item);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<SubmitButton type={type} />
			<p aria-live="polite" className="sr-only" role="status">
				{/* {message} */}
			</p>
		</form>
	);
}
