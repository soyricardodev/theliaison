import Image from "next/image";
import Link from "next/link";
import { createClient } from "~/supabase/server";
import { ConfirmGift } from "./confirm-gift";
import {
	ChevronRightIcon,
	HeartHandshakeIcon,
	GiftIcon,
	ZapIcon,
} from "lucide-react";
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
					className="mx-auto w-full max-w-xl hover:scale-105 transition-all hover:[filter:drop-shadow(0_0_8px_#f0f0f0)] -mt-20"
				/>
				<div className="relative mx-auto flex max-w-2xl flex-col items-center">
					<h1 className="text-center text-gray-50 font-medium tracking-tighter text-4xl/none sm:text-6xl/none">
						Someone Special
						<span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#DBD0C5,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent leading-tight">
							Wants to Send You a Gift!
						</span>
					</h1>
					<p className="mt-6 text-center text-lg leading-6 text-gray-200 text-pretty">
						Enter Your Address <strong>Securely</strong> to Receive Your Gift!{" "}
						<br />
						<strong>The Liaison</strong> will handle the rest.
					</p>
					<div className="w-full mx-auto flex flex-col items-center justify-center gap-6 mt-12">
						<ConfirmGift>
							<ShippingForm
								hideTitle
								giftId={data.id}
								recipientId={data.recipient_id}
								senderId={data.sender_id}
							/>
						</ConfirmGift>
						<Link
							href="/how-it-works"
							className="text-white hover:text-secondary text-sm flex gap-0.5 group hover:underline"
						>
							How it works
						</Link>
					</div>
				</div>
				<div className="w-full mx-auto flex items-center justify-center gap-6 mt-20">
					<div className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
						<InstructionCard
							icon={<HeartHandshakeIcon className="text-secondary" />}
							title="Secure First"
							description={
								<p>
									<strong>1.</strong> Rest assured, your address will only be
									used to deliver your gift and{" "}
									<strong>will remain private</strong>. The sender will not know
									your address.
								</p>
							}
						/>
						<InstructionCard
							icon={<GiftIcon className="text-secondary" />}
							title="Wait for the surprise"
							description={
								<p>
									<strong>2.</strong> The gift sender wanted to keep this gift a
									surprise, so <strong>enjoy the anticipation</strong>.
								</p>
							}
						/>
						<InstructionCard
							icon={<ZapIcon className="text-secondary" />}
							title="Fast"
							description={
								<p>
									<strong>3.</strong> Fast and <strong>secure delivery</strong>.
									Once you provide your address, we'll take care of the rest and
									deliver your gift promptly.
								</p>
							}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}

function InstructionCard({
	description,
	icon,
	title,
}: { icon: JSX.Element; title: string; description: string | JSX.Element }) {
	return (
		<div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border-transparent bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]">
			<div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large gap-2 pb-0">
				<div className="flex justify-center p-2 rounded-full items-center bg-primary/80 text-secondary">
					{icon}
				</div>
				<div className="text-base font-semibold">{title}</div>
			</div>

			<div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased [&>p]:font-normal [&>p]:text-base [&>p]:text-default-600">
				{description}
			</div>
		</div>
	);
}
