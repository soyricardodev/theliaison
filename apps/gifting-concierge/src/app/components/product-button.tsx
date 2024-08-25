"use client";

import { Button } from "@nextui-org/react";
import { useCartStore } from "~/store/cart";

interface ProductButtonProps {
	productId: string;
	productUnitPrice: number;
}

export const ProductButton = ({
	productId,
	productUnitPrice,
}: ProductButtonProps) => {
	const { addToCart, setIsOpen } = useCartStore();

	function handleToggleCartOpen() {
		setIsOpen(true);
	}

	return (
		<Button
			fullWidth
			radius="lg"
			className="font-medium bg-foreground text-background"
			onClick={() => {
				addToCart({
					id: productId,
					quantity: 1,
					unitPrice: productUnitPrice,
				});
				handleToggleCartOpen();
			}}
		>
			Add to cart
		</Button>
	);
};
