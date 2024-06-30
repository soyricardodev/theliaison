import Image from "next/image";
import Link from "next/link";
import { createClient } from "~/supabase/server";
import { ConfirmGift } from "./confirm-gift";
import { ChevronRightIcon } from "lucide-react";
import ShippingForm from "./details/shipping-form";
import giftboxGIF from "~/assets/giftbox2.gif";
import { cn } from "@theliaison/ui";
import { buttonVariants } from "@theliaison/ui/button";

export default async function Confirm({
	params: { giftId },
}: {
	params: { giftId: string };
}) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("gifts")
		.select("id, recipient_id, sender_id")
		.eq("id", giftId)
		.single();

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center">
				<h1>This gift does not exist anymore.</h1>
				<Link
					href="/gifts"
					className={cn(
						buttonVariants(),
						"bg-white text-black hover:text-black hover:bg-white/90",
					)}
				>
					Go back to the list of gifts
				</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-col relative z-20">
			<section className="w-full py-12 md:py-24 lg:py-32">
				<Image
					src={giftboxGIF}
					alt="Giftbox"
					className="mx-auto w-full max-w-xl hover:scale-105 transition-all hover:[filter:drop-shadow(0_0_8px_#f0f0f0)]"
				/>
				<div className="relative mx-auto flex max-w-2xl flex-col items-center">
					<h1 className="text-center text-gray-50 font-medium tracking-tighter text-4xl/none sm:text-6xl/none">
						Someone Special
						<span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#DBD0C5,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent leading-tight">
							Wants to Send You a Gift!
						</span>
					</h1>
					<p className="mt-6 text-center text-lg leading-6 text-gray-200">
						Enter Your Address Securely to Receive Your Gift! The Liaison will
						handle the rest.
					</p>
					<div className="w-full mx-auto flex items-center justify-center gap-6 mt-12">
						<ConfirmGift>
							<ShippingForm
								hideTitle
								giftId={data.id}
								recipientId={data.recipient_id}
								senderId={data.sender_id}
							/>
						</ConfirmGift>
						<Link
							href="/faq"
							className="text-white hover:text-[#DBD0C5] transition-colors text-sm flex gap-0.5 group"
						>
							What is The Liaison
							<ChevronRightIcon className="size-5 text-[#DBD0C5] opacity-0 group-hover:opacity-100 transition-opacity" />
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

/**
 * Intructions:
 * 1. Rest assured, your address will only be used to deliver your gift and will remain private. The sender will not know your address.
 * 2. The gift sender wanted to keep this gift a surprise, so enjoy the anticipation.
 * 3. Fast and Secure Delivery. Once you provide your address, we'll take care of the rest and deliver your gift promptly.
 * CTA Button: Submit Address Securely
 */
