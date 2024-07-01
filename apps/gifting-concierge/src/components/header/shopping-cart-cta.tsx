"use client";

import { Badge } from "@nextui-org/react";
import { Button } from "@theliaison/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useCartStore } from "~/store/cart";

export function ShoppingCartCta() {
	const { shoppingCart, setIsOpen, isOpen } = useCartStore();

	const handleToggleCart = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Button variant="ghost" className="rounded-full" onClick={handleToggleCart}>
			{shoppingCart.length > 0 ? (
				<Badge
					color="success"
					content={shoppingCart.length}
					showOutline={false}
					size="sm"
				>
					<ShoppingCartIcon className="text-default-500 size-5" />
				</Badge>
			) : (
				<ShoppingCartIcon className="text-default-500 size-5" />
			)}
		</Button>
	);
}
