import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "~/supabase/server";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@theliaison/ui/dialog";
import ShippingForm from "./details/shipping-form";
import giftboxGIF from "~/assets/giftbox2.gif";

export default async function Confirm({
	params: { giftId },
}: {
	params: { giftId: string };
}) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("gifts")
		.select(
			"id, recipient_id, sender_id, gifts_products(product_id, quantity, products(name, image))",
		)
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
		<div className="flex flex-col relative z-20">
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="relative mx-auto flex max-w-2xl flex-col items-center">
					<h1 className="text-center text-gray-50 text-balance font-medium tracking-tighter text-3xl sm:text-6xl/none">
						Hey, someone special
						<span className="animate-text-gradient inline-flex bg-gradient-to-r bg-[200%_auto] bg-clip-text leading-tight text-transparent from-neutral-100 via-slate-400 to-neutral-400">
							wants to send you a gift.
						</span>
					</h1>
					<p className="mt-6 text-center text-lg leading-6 text-gray-200">
						The Liaison Gifting concierge manages the gift sending.
					</p>
				</div>
				<Image
					src={giftboxGIF}
					alt="Giftbox"
					className="mx-auto sm:w-full lg:order-last hover:scale-105 transition-all hover:[filter:drop-shadow(0_0_8px_#f0f0f0)]"
				/>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="grid gap-8">
						<div>
							<h3>Gift Details</h3>

							<ul className="mt-4 space-y-4">
								{data.gifts_products.map((item) => (
									<li
										className="flex items-center gap-x-4 border-b-small border-divider py-4"
										key={item.product_id}
									>
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
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6 flex justify-center">
					<div className="flex gap-2 items-center justify-center">
						<Dialog>
							<DialogTrigger asChild>
								<Button className="mb-4">Confirm Gift</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[600px]">
								<DialogHeader>
									<DialogTitle>Get Shipping Details</DialogTitle>
									<DialogDescription>
										Please provide your shipping details. Click confirm when
										you're done.
									</DialogDescription>
								</DialogHeader>
								<ShippingForm
									hideTitle
									giftId={data.id}
									recipientId={data.recipient_id}
									senderId={data.sender_id}
								/>
							</DialogContent>
						</Dialog>
						<Button variant="light" color="danger" className="mb-4">
							Cancel Gift
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
