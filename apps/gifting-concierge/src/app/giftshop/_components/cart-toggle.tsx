"use client";

import { ShoppingCartIcon } from "lucide-react";
import { useCartStore } from "~/store/cart";

export function CartToggle() {
	const { isOpen, setIsOpen } = useCartStore();

	return (
		<button type="button" className="" onClick={() => setIsOpen(!isOpen)}>
			<ShoppingCartIcon className="size-6 text-black" />
		</button>
	);
}
