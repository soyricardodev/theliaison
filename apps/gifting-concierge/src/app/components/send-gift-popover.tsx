import { Button } from "@theliaison/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@theliaison/ui/dialog";
import {
	GiftIcon,
	LinkIcon,
	SendHorizontalIcon,
	StoreIcon,
} from "lucide-react";
import Link from "next/link";

export function SendGiftDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="relative group">
					<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
					<Button
						size="lg"
						className="relative flex gap-2 items-center h-14 text-base sm:text-lg bg-black hover:bg-black/90 transition-colors w-full mx-auto"
					>
						What would you like to send?
						<GiftIcon className="size-5 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent className="rounded-md supports-[backdrop-filter]:bg-white/10 border-transparent bg-black/95  backdrop-blur-xl">
				<div className="spacem-auto w-[calc(100vw - 48px)] pt-6">
					<div className="flex flex-col items-center justify-start flex-initial gap-6">
						<div className="flex justify-center items-center bg-slate-100 rounded-lg p-[14px] h-[60px] border border-black/10">
							<SendHorizontalIcon className="size-8 text-black/60" />
						</div>

						<div className="flex flex-col items-stretch justify-start flex-initial gap-2 text-white">
							<p className="max-w-[340px] my-0 mx-auto leading-6 font-medium">
								Send a gift
							</p>
							<p className="text-sm font-normal max-w-[340px] my-0 mx-auto text-center leading-5">
								<span className="inline-block text-balance max-w-[203px]">
									Send a gift to someone special without the address hassle.
								</span>
							</p>
						</div>

						<div className="flex flex-col items-stretch justify-start flex-initial border rounded-md w-full">
							<SendGiftCard
								icon={<LinkIcon />}
								title="Send a gift from a link"
								href="/send-by-link"
								linkText="Send"
							/>
							<SendGiftCard
								icon={<GiftIcon />}
								title="Send a custom gift"
								href="/send"
								linkText="Send"
							/>
							<SendGiftCard
								icon={<StoreIcon />}
								title="Visit our gift shop"
								href="/giftshop"
								linkText="Visit"
							/>
						</div>

						<div className="w-full max-w-[500px] border rounded-md flex gap-4 justify-between p-4">
							<div className="flex flex-col">
								<p className="font-semibold text-sm leading-5 text-white">
									Any questions?
								</p>
								<p className="text-white font-normal text-[0.8125rem]">
									Contact us for assistance
								</p>
							</div>
							<div className="flex items-center justify-center">
								<Button
									variant={"outline"}
									className="px-[15px] h-[40px] bg-white hover:bg-default-200 transition-all border rounded-[6px] font-medium flex items-center justify-center text-sm text-black"
								>
									Chat
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function SendGiftCard({
	icon,
	title,
	href,
	linkText,
}: {
	icon: JSX.Element;
	title: string;
	href: string;
	linkText: string;
}) {
	return (
		<div className="flex flex-row items-center justify-between gap-6 p-4 w-full border-b last:border-b-0 text-white">
			<div className="flex items-stretch justify-start flex-initial gap-3">
				<div className="flex items-center justify-center flex-initial p-0 gap-0 shrink-0">
					{icon}
				</div>

				<div className="flex flex-col items-stretch justify-center flex-initial p-0 gap-0">
					<p className="font-semibold text-base leading-5">{title}</p>
				</div>
			</div>

			<div className="flex flex-col items-stretch justify-start flex-initial gap-0">
				<Link
					href={href}
					className="px-[15px] h-[40px] bg-white hover:bg-default-200 transition-all border rounded-[6px] font-medium flex items-center justify-center text-sm text-black"
				>
					{linkText}
				</Link>
			</div>
		</div>
	);
}
