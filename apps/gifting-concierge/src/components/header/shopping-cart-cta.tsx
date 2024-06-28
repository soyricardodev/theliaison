"use client";

import { Badge, Button } from "@nextui-org/react";
import { ShoppingCartIcon } from "lucide-react";
import { useCartStore } from "~/store/cart";

export function ShoppingCartCta() {
	const { shoppingCart, setIsOpen, isOpen } = useCartStore();

	const handleToggleCart = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Button
			isIconOnly
			radius="full"
			variant="light"
			className="overflow-visible"
			onClick={handleToggleCart}
		>
			{shoppingCart.length > 0 ? (
				<Badge
					color="success"
					content={shoppingCart.length}
					showOutline={false}
					size="md"
				>
					<ShoppingCartIcon className="text-default-500 size-5" />
				</Badge>
			) : (
				<ShoppingCartIcon className="text-default-500 size-5" />
			)}
		</Button>
	);
}
