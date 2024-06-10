"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { ShoppingCartIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@theliaison/ui/sheet";

import { useCartStore } from "~/store/cart";
import { ProductCart } from "./product-cart";

export function Cart() {
  const { isOpen, setIsOpen, shoppingCart } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        {shoppingCart.length > 0 ? (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            {/* list items */}
            <ul className="flex-grow overflow-auto py-4">
              {shoppingCart.map((gift, i) => (
                <ProductCart
                  key={i}
                  productId={gift.id}
                  quantity={gift.quantity}
                />
              ))}
            </ul>
            {/* / list items */}
            {/* totals */}
            <CartTotals />
            {/* / totals */}

            <Button
              color="primary"
              radius="full"
              fullWidth
              className="mb-4"
              as={Link}
              href="/send-gift"
            >
              Continue to gifting
            </Button>
          </div>
        ) : (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <ShoppingCartIcon className="size-16" height={64} width={64} />
            <p className="mt-6 text-center text-2xl font-bold">
              Your cart is empty.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartTotals() {
  const { shoppingCart } = useCartStore();

  const totalPrice = shoppingCart.reduce(
    (acc, gift) => acc + (gift.unitPrice / 100) * gift.quantity,
    0,
  );
  const total = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalPrice);

  return (
    <div className="py-4 text-sm text-neutral-500">
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
        <p>Taxes</p>
        <p className="text-right text-base text-black">
          $0.00
          <span className="ml-1 inline">USD</span>
        </p>
      </div>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
        <p className="text-right">Calculated at checkout</p>
      </div>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
        <p>Total</p>
        <p className="text-right text-base text-black">
          {total}
          <span className="ml-1 inline">USD</span>
        </p>
      </div>
    </div>
  );
}
