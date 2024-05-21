import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FAQ } from "./_components/faq";

export default function PricingLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<main className="flex-1 overflow-auto">
			<div
				aria-hidden="true"
				className="px:5 absolute inset-x-0 top-3 z-0 h-full w-full transform-gpu overflow-hidden blur-3xl md:right-20 md:h-auto md:w-auto md:px-36"
			>
				<div
					className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#FF71D7] to-[#C9A9E9] opacity-30"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
			<div className="w-full">
				<div className="mx-auto flex max-w-[1160px] flex-col gap-8 px-5 pt-10 md:gap-12 md:pt-16">
					<div className="grid justify-items-center gap-2 md:gap-4">
						<h1 className="text-center text-2xl font-semibold tracking-tighter md:text-5xl">
							Simple pricing for everyone.
						</h1>
						<p className="max-w-md text-center text-sm text-[#666666] md:max-w-xl md:text-base text-pretty">
							We want to empower builders of all sizes to create beautiful
							interfaces; from individuals to big enterprises, we have a plan
							that fits just what you need.
						</p>
					</div>

					<div className="w-full">{children}</div>
				</div>

				{/* FAQ */}
				<div className="flex flex-col p-5 md:gap-4 md:px-6 md:py-[60px] my-16">
					<h2 className="hidden text-center text-2xl font-semibold tracking-tighter md:block md:text-[40px]">
						Frequently Asked Questions
					</h2>
					<h2 className="text-center text-2xl font-semibold md:hidden">FAQs</h2>

					<div className="mx-auto w-full max-w-[448px] md:max-w-[920px] mt-20">
						<FAQ />
					</div>
				</div>

				{/* Banner */}
				<div className="bg-black px-5 pb-14 pt-8 text-white md:px-6 md:py-[60px]">
					<div className="mx-auto flex max-w-[448px] flex-col gap-8 md:max-w-[920px] md:flex-row md:px-6">
						<div className="grid flex-1 gap-1.5 md:gap-1">
							<h2 className="text-2xl font-semibold leading-none tracking-tighter md:text-[40px]">
								Still not sure?
							</h2>
							<p className="text-sm">
								We can help creating a tailored plan for your needs.
							</p>
						</div>
						<div className="flex flex-col gap-2 md:w-[234px]">
							<Link
								href="/explore"
								className="inline-flex shrink-0 items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 w-full gap-x-2 whitespace-nowrap rounded-full border border-white bg-transparent md:max-w-[234px]"
							>
								Check Polls
							</Link>
							<Link
								href="/contact"
								className="inline-flex shrink-0 items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 px-8 w-full gap-x-2 whitespace-nowrap rounded-full md:max-w-[234px]"
							>
								Contact Us
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
