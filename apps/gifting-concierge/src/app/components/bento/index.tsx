import { AnimatedBeamMultipleOutputDemo } from "../beam-multiple";
import { SimpleSendGift } from "../gift/simple-send-gift";
import { GiftsMarquee } from "./gifts-marquee";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./globe-magicui").then((m) => m), {
	ssr: false,
});

export function Bento() {
	return (
		<div className="relative z-20 py-10 md:py-40">
			<div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
				<div className="mx-auto max-w-5xl text-center">
					<h4 className="text-xl font-bold tracking-tight text-black">
						How it works
					</h4>
					<h2 className="text-5xl font-bold tracking-tight text-black sm:text-6xl">
						Send gifts discreetly and easily
					</h2>
					<p className="mt-6 text-xl leading-8 text-black/80">
						Have you ever wanted to send a gift, but you didn’t know the
						person’s address and you didn’t want to ask for it so you didn’t
						come across as creepy? We get it. Sometimes it’s awkward asking for
						someone’s home address to send a gift.
					</p>
				</div>
			</div>

			<div>
				<SimpleSendGift />
			</div>

			<div className="relative">
				<div className="grid grid-cols-1 md:grid-cols-6 mt-12">
					<div className="p-4 sm:p-8 relative overflow-hidden col-span-1 md:col-span-4 border-b border-r">
						<h2 className="max-w-5xl mx-auto tracking-tight font-medium text-black text-xl md:text-2xl md:leading-snug text-left">
							Explore Our Top Picks
						</h2>
						<h3 className="text-sm text-[#525252] font-normal text-left max-w-sm mx-0 md:text-sm my-2">
							Discover a curated selection of our best-selling gifts, handpicked
							to delight every recipient.
						</h3>

						<div className="h-full w-full min-h-[350px]">
							<div className="relative flex flex-col p-8 gap-10 h-full">
								<div className="relative">
									<GiftsMarquee />
								</div>
								<div className="relative hidden md:block">
									<GiftsMarquee className="top-52" reverse />
								</div>
								<div className="relative hidden md:block top-80">
									<GiftsMarquee />
								</div>

								<div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none" />
								<div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white via-transparent to-transparent w-full pointer-events-none" />
							</div>
						</div>
					</div>

					<div className="p-4 sm:p-8 relative overflow-hidden border-b col-span-1 md:col-span-2">
						<h3 className="max-w-5xl mx-auto tracking-tight font-medium text-black text-xl md:text-2xl md:leading-snug text-left">
							Chat with Our Gifting Assistant
						</h3>
						<p className="text-sm text-[#525252] font-normal text-left max-w-sm mx-0 md:text-sm my-2">
							Need help finding the perfect gift? Start a conversation with our
							smart assistant for personalized recommendations.
						</p>

						<div className="h-full w-full">
							<div className="relative h-full w-full mt-4">
								<div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none" />

								<div className="p-4 border border-neutral-200 bg-neutral-100 rounded-[32px] h-full z-20">
									<div className="p-2 bg-white border border-neutral-200 rounded-[24px] h-full">
										<div className="w-20 rounded-full bg-neutral-200/80 mx-auto h-6" />

										<div className="content mt-4 w-[90%] mx-auto">
											<BotMessage content="Hello! I'm your gifting assistant. How can I help you today?" />
											<UserMessage content="Hi, I'm looking for a gift for my friend." />
											<BotMessage content="Great! Can you tell me your friend's name?" />
											<UserMessage content="His name is Alex." />
											<BotMessage content="Nice to meet you, Alex. Does Alex have any particular hobbies or interests?" />
											<UserMessage content="Yes, Alex loves playing video games." />
											<BotMessage content="That's awesome! Do you know which types of games Alex enjoys, or any specific games he's into?" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="p-4 sm:p-8 relative overflow-hidden col-span-1 md:col-span-3 border-r">
						<h3 className="max-w-5xl mx-auto tracking-tight font-medium text-black text-xl md:text-2xl md:leading-snug text-left">
							Seamless Gift Delivery
						</h3>
						<p className="text-sm text-[#525252] font-normal text-left max-w-sm mx-0 md:text-sm my-2">
							From your hands to theirs, we handle everything. Contact us and
							we'll take care of the rest.
						</p>

						<div className="h-full w-full">
							<div className="h-full w-full sm:w-[80%] mx-auto bg-white shadow-2xl mt-10 group rounded-md">
								<div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none z-[11]" />

								<div className="flex flex-1 w-full h-full flex-col space-y-2 ">
									<AnimatedBeamMultipleOutputDemo />
								</div>
							</div>
						</div>
					</div>

					<div className="p-4 sm:p-8 relative overflow-hidden col-span-1 md:col-span-3 min-h-[500px]">
						<h3 className="max-w-5xl mx-auto tracking-tight font-medium text-black text-xl md:text-2xl md:leading-snug text-left">
							Global Delivery
						</h3>
						<p className="text-sm text-[#525252] font-normal text-left max-w-sm mx-0 md:text-sm my-2">
							Sending love worldwide. We deliver your gifts to recipients no
							matter where they are.
						</p>

						<Globe className="top-10 md:top-28" />
					</div>
				</div>
			</div>
		</div>
	);
}

function UserMessage({ content }: { content: string }) {
	return (
		<div className="message bg-neutral-100 text-black p-2 sm:p-4 text-[10px] sm:text-xs my-4 rounded-md">
			{content}
		</div>
	);
}

function BotMessage({ content }: { content: string }) {
	return (
		<div className="message bg-black text-white p-2 sm:p-4 text-[10px] sm:text-xs my-4 rounded-md">
			{content}
		</div>
	);
}
