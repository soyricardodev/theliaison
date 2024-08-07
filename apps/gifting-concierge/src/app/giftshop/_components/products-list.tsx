import Image from "next/image";
import { ProductButton } from "~/app/components/product-button";
import { createClient } from "~/supabase/server";

export async function ProductsList() {
	const supabase = createClient();

	const { data } = await supabase
		.from("products")
		.select("id, name, image, prices(unit_amount)")
		.eq("active", true)
		.eq("type", "gift");

	return (
		<div className="grid w-full mx-auto grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-12 items-center place-items-center">
			{data?.map((product, i) => {
				const price = Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "usd",
					minimumFractionDigits: 0,
				}).format((product.prices[0]?.unit_amount ?? 0) / 100);
				const unitPrice = product.prices[0]?.unit_amount ?? 0;

				return (
					<article
						key={`${product.id}-${i}`}
						className="relative flex w-64 max-w-full flex-none snap-start scroll-ml-6 flex-col gap-3 rounded-none bg-white/70 backdrop-blur-2xl p-4 shadow-none h-auto"
					>
						<div className="rounded-medium bg-content2 relative flex h-52 max-h-full w-full flex-col items-center justify-center overflow-visible">
							<Image
								className="w-[300px] h-full object-contain object-center"
								src={product.image ?? ""}
								width={300}
								height={300}
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
	);
}
