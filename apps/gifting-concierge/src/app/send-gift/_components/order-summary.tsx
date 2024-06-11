"use client";

import React from "react";
import { Divider } from "@nextui-org/react";

import OrderSummaryItem from "./order-summary-item";
import { useCartStore } from "~/store/cart";

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
};

export const OrderSummary = ({ hideTitle }: OrderSummaryProps) => {
  const { shoppingCart } = useCartStore();

  const totalPrice = shoppingCart.reduce(
    (acc, item) => acc + (item.unitPrice / 100) * item.quantity,
    0,
  );
  const price = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  return (
    <div className="overflow-hidden">
      {!hideTitle && (
        <>
          <h2 className="font-medium text-default-500">Your Order</h2>
          <Divider className="mt-4" />
        </>
      )}
      <h3 className="sr-only">Items in your cart</h3>
      <div className="h-auto overflow-hidden">
        <ul className="overflow-auto max-h-[450px]">
          {shoppingCart.map((item) => (
            <OrderSummaryItem key={item.id} {...item} />
          ))}
        </ul>
      </div>
      <div>
        <dl className="flex flex-col gap-4 py-4">
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Subtotal</dt>
            <dd className="text-small font-semibold text-default-700">
              {price}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Delivery</dt>
            <dd className="text-small font-semibold text-default-700">$0.00</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Tax</dt>
            <dd className="text-small font-semibold text-default-700">$0.00</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Discount</dt>
            <dd className="text-small font-semibold text-success"> - $0.00</dd>
          </div>
          <Divider />
          <div className="flex justify-between">
            <dt className="text-small font-semibold text-default-500">Total</dt>
            <dd className="text-small font-semibold text-default-700">
              {price}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

OrderSummary.displayName = "OrderSummary";
