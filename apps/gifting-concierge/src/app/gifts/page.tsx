import { Button, Image } from "@nextui-org/react";

import { createClient } from "~/supabase/server";

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
        {data?.map((product) => (
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
                <p className="text-medium text-default-500 font-medium">$80</p>
              </div>
              <div className="flex gap-2">
                <Button fullWidth radius="lg">
                  Add to cart
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
