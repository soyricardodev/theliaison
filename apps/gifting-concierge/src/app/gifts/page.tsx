import type { SVGProps } from "react";
import React from "react";
import { Image } from "@nextui-org/react";

import { createClient } from "~/supabase/server";
import { ProductButton } from "../components/product-button";

export default async function GiftsPage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, image, prices(*)")
    .eq("active", true)
    .eq("type", "gift");

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Gifts</h1>
      <div className="grid w-full grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((product) => {
          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "usd",
            minimumFractionDigits: 0,
          }).format((product.prices[0]?.unit_amount ?? 0) / 100);
          const unitPrice = product.prices[0]?.unit_amount ?? 0;

          return (
            <article
              key={product.id}
              className="relative flex w-64 max-w-full flex-none snap-start scroll-ml-6 flex-col gap-3 rounded-none bg-transparent p-4 shadow-none"
            >
              <div className="rounded-medium bg-content2 relative flex h-52 max-h-full w-full flex-col items-center justify-center overflow-visible">
                <Image
                  removeWrapper
                  src={product.image ?? ""}
                  className="transition-transform-opacity rounded-large relative z-0 h-full max-h-full w-full max-w-[80%] overflow-visible object-contain object-center opacity-0 shadow-none shadow-black/5 !duration-300 hover:scale-110 data-[loaded=true]:opacity-100 motion-reduce:transition-none"
                  alt={product.name ?? ""}
                />
              </div>
              <div className="flex flex-col gap-3 px-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-medium text-default-700 font-medium">
                    {product.name}
                  </h3>
                  <p className="text-medium text-default-500 font-medium">
                    {price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <ProductButton
                    productId={product.id}
                    productUnitPrice={unitPrice}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function BagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.035 11.573c.462-2.309.693-3.463 1.522-4.143c.83-.68 2.007-.68 4.362-.68h4.162c2.355 0 3.532 0 4.361.68c.83.68 1.06 1.834 1.523 4.143l.6 3c.664 3.32.996 4.98.096 6.079c-.9 1.098-2.594 1.098-5.98 1.098H9.32c-3.386 0-5.08 0-5.98-1.098c-.9-1.098-.568-2.758.096-6.079z"
        opacity={0.5}
      ></path>
      <circle cx={15} cy={9.75} r={1} fill="currentColor"></circle>
      <circle cx={9} cy={9.75} r={1} fill="currentColor"></circle>
      <path
        fill="currentColor"
        d="M9.75 5.75a2.25 2.25 0 0 1 4.5 0v1h.431c.377 0 .733 0 1.069.002V5.75a3.75 3.75 0 1 0-7.5 0v1.002c.336-.002.692-.002 1.069-.002h.431z"
      ></path>
    </svg>
  );
}
