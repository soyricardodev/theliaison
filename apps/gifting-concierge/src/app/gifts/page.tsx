import { createClient } from "~/supabase/server";
import { Product } from "../components/product";

export default async function GiftsPage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("type", "gift");

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Gifts</h1>1
      <div className="grid w-full grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((product) => (
          <Product
            href=""
            id={product.id}
            name={product.name ?? ""}
            description={product.description ?? ""}
            imageSrc={product.image ?? ""}
            price={80}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}
