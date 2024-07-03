import { Header } from "~/components/header";
import { FAQs } from "../components/faq";
import { Footer } from "../components/footer";
import { SimpleSendGift } from "../components/gift/simple-send-gift";
import { BeamGiftingConcierge } from "../components/beam-giftingconcierge";
import { cn } from "@theliaison/ui";
import { buttonVariants } from "@theliaison/ui/button";
import { ChevronRight } from "lucide-react";

export default function HowItWorks() {
	return (
		<>
			<Header />
			<main className="antialiased overflow-x-hidden">
				<div className="max-w-7xl mx-auto px-4 flex min-h-screen flex-col items-center justify-between">
					<div className="relative z-20 py-10">
						<div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 md:px-8">
							<div className="mx-auto max-w-5xl text-center">
								<h2 className="text-5xl font-bold tracking-tight text-balance text-black sm:text-6xl">
									Send gifts discreetly and easily
								</h2>
								<p className="mt-6 text-xl leading-8 text-black/80 text-pretty">
									Have you ever wanted to send a gift, but you didn’t know the
									person’s address and you didn’t want to ask for it so you
									didn’t come across as creepy? We get it. Sometimes it’s
									awkward asking for someone’s home address to send a gift.
								</p>
							</div>
						</div>

						<div className="my-10">
							<SimpleSendGift />
						</div>
					</div>
					<FAQs />

					<div className="w-full mx-auto flex flex-col items-center justify-center gap-8 my-20">
						<BeamGiftingConcierge />
						<a
							href="/"
							className={cn(
								buttonVariants({
									size: "lg",
									variant: "outline",
								}),
								"group rounded-[2rem] px-6",
							)}
						>
							Get Started
							<ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1 " />
						</a>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
