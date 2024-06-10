"use client";

import { Button } from "@nextui-org/react";
import { useCartStore } from "~/store/cart";

interface ProductButtonProps {
  productId: string;
}

export const ProductButton = ({ productId }: ProductButtonProps) => {
  const { addToCart, setIsOpen } = useCartStore();

  function handleToggleCartOpen() {
    setIsOpen(true);
  }

  return (
    <Button
      fullWidth
      color="primary"
      radius="lg"
      className="font-medium"
      onClick={() => {
        addToCart({
          id: productId,
          quantity: 1,
        });
        handleToggleCartOpen();
      }}
    >
      Add to cart
    </Button>
  );
};
