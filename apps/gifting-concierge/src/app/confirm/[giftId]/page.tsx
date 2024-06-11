import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "~/supabase/server";

export default async function Confirm({
	params: { giftId },
}: {
	params: { giftId: string };
}) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("gifts")
		.select("*, gifts_products(product_id, quantity, products(name, image))")
		.eq("id", giftId)
		.single();

	if (error) {
		console.error(error);
		return (
			<div>
				<h1>This gift does not exist anymore.</h1>
				<Link href="/gifts">Go back to the list of gifts</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-[100dvh]">
			<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
				<div className="container px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									Hey, {} wants to send you a gift.
								</h1>
								<p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
									The Liaison Gifting concierge manages the gift sending.
								</p>
							</div>
						</div>
						<Image
							src="/placeholder.svg"
							width="550"
							height="310"
							alt="Gift"
							className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
						/>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="grid gap-8">
						<div>
							<h3>Gift Details</h3>

							<ul className="mt-4 space-y-4">
								{data.gifts_products.map((item) => (
									<li className="flex items-center gap-x-4 border-b-small border-divider py-4">
										<div className="flex size-20 flex-shrink-0 items-center justify-center">
											<Image
												alt={item.products?.name ?? ""}
												src={item.products?.image ?? ""}
												width={80}
												height={80}
											/>
										</div>
										<div className="flex flex-1 flex-col">
											<h4 className="text-small">
												<p className="font-medium text-foreground">
													{item.products?.name}
												</p>
											</h4>
											<div className="mt-2 flex items-center gap-2">
												<span className="text-small text-default-500">
													x {item.quantity}
												</span>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
				<div className="container px-4 md:px-6 flex justify-center">
					<div className="flex gap-2 items-center justify-center">
						<Button className="mb-4" color="success">
							Confirm Receiving Gift
						</Button>
						<Button variant="light" color="danger" className="mb-4">
							Cancel Gift
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
