"use client";

import Link from "next/link";
import { getProduct } from "./actions";
import Image from "next/image";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@nextui-org/react";

export function ProductCart({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const unitAmount = product?.prices[0]?.unit_amount;
  const totalAmount = (unitAmount ?? 0) * quantity;

  const totalPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalAmount / 100);

  return (
    <div className="relative flex w-full flex-row justify-between px-1 py-4">
      <div className="absolute z-40 -mt-2 ml-[55px]">
        {/* form action delete <DeleteItemButton item={item} /> */}
      </div>

      <Link href="/" className="z-30 flex flex-row space-x-4">
        <Skeleton isLoaded={!isLoading}>
          <div className="relative size-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
            <Image
              className="h-full w-full object-cover"
              width={64}
              height={64}
              alt="alt"
              src={product?.image ?? ""}
            />
          </div>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} className="h-3 w-16 sm:w-24">
          <div className="flex flex-1 flex-col text-base">
            <span className="leading-tight">{product?.name}</span>
          </div>
        </Skeleton>
      </Link>
      <div className="flex h-16 flex-col justify-between">
        <Skeleton isLoaded={!isLoading} className="h-3">
          <p className="flex justify-end space-y-2 text-right text-sm">
            {totalPrice}
            <span className="ml-1 inline">USD</span>
          </p>
        </Skeleton>

        <Skeleton isLoaded={!isLoading} className="h-3 w-full sm:w-24">
          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
            <EditItemQuantityButton
              item={{
                id: productId,
                quantity: quantity,
              }}
              type="minus"
            />
            <p className="w-6 text-center">
              <span className="w-full text-sm">{quantity}</span>
            </p>
            <EditItemQuantityButton
              item={{
                id: productId,
                quantity: quantity,
              }}
              type="plus"
            />
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
