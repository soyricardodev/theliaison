import { cn } from "@theliaison/ui";
import Marquee from "@theliaison/ui/magicui/marquee";
import Image from "next/image";
import { createClient } from "~/supabase/server";

export async function GiftsMarquee() {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("products")
		.select(`
      id,
      name,
      image  
    `)
		.eq("active", true);

	return (
		<Marquee
			pauseOnHover
			className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
		>
			{data?.map((product, idx) => (
				<figure
					key={`${idx}-${product.name}-${product.id}`}
					className={cn(
						"relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
						"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
						"transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
					)}
				>
					<div className="flex flex-row items-center gap-2">
						<div className="flex flex-col">
							<Image
								src={product.image ?? ""}
								alt={product.name ?? ""}
								width={80}
								height={80}
								className="h-auto w-32"
							/>
							<figcaption className="text-sm font-medium">
								{product.name}
							</figcaption>
						</div>
					</div>
				</figure>
			))}
		</Marquee>
	);
}
