import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";

const faqs = [
	{
		section: "General",
		qa: [
			{
				question: "How do I get started?",
				answer: (
					<span>
						Select and purchase a package. You will emailed relevant details and
						an intake form. I will personally reach out shortly after :{")"}.
					</span>
				),
			},
			{
				question: "What's this service all about?",
				answer: (
					<span>
						Whether it's for romance, networking or professional reasons, I
						provide personal and detailed feedback/ suggestions on your dating
						profile, Instagram, and LinkedIn profile to attractively position
						yourself so that you naturally align with your ideal partner and
						business opportunities.
					</span>
				),
			},
			{
				question: "Why should I give it a try?",
				answer: (
					<span>
						Investing in your personal brand isn't vanity; it's about taking
						control of your narrative and positioning yourself for success.
						Whether you're aiming for career growth or hoping to find that
						special someone, a strong personal brand/ dating profile can make or
						break these opportunities in life and love.
					</span>
				),
			},
			{
				question: "How long does the review take?",
				answer: (
					<span>
						It depends on which package you choose, the profile review(s) take
						3-4 days.
					</span>
				),
			},
			{
				question: "How does the dating profile review work?",
				answer: (
					<div>
						<p>
							We will have <strong className="font-semibold">two</strong>{" "}
							30-minute phone consultations. The first 30-minute phone
							consultation is for me to get to know you, your personality and
							your dating goals. Based on this information, I will review your
							current dating profile and deliver a completely custom profile
							that includes:
						</p>
						<ul className="list-disc my-2">
							<li>
								- Selecting and strategically placing the most attractive
								pictures of you
							</li>
							<li>
								- Writing a witty bio that will attract in your ideal match
							</li>
							<li>
								- Choose written prompts that will have women messaging you
								first
							</li>
						</ul>

						<p>
							The second 30-minute phone consult is a 1-month follow up to
							discuss the results your new profile edits. We can also tweak a
							few things if needed. Ultimately, this is YOUR time and you'll be
							able to ask and discuss relevant topics.
						</p>
					</div>
				),
			},
			{
				question: "Are messaging tips part of the deal?",
				answer: (
					<span>
						Yes! I will send you a message with a few tips and tricks to help
						you get started. I'll also send you a follow up message after the
						review to let you know if I've made any changes to your profile.
					</span>
				),
			},
		],
	},
	{
		section: "Support",
		qa: [
			{
				question: "What if I'm not thrilled with the results?",
				answer: (
					<span>
						If you're not satisfied, we'll dig into the results and see what
						other tweaks we can make. I will also add on another 1 month follow
						up if you've purchased The Algorithm Hacker or the Ménage à trois.
					</span>
				),
			},
		],
	},
	{
		section: "Security",
		qa: [
			{
				question: "Is my information safe with you?",
				answer: (
					<span>
						Yes. EVERYTHING you share with me is kept confidential and will
						never be shared or used for marketing purposes. If you're extremely
						happy with your results, I may ask for a testimonial at some point!
						😉
					</span>
				),
			},
		],
	},
];

export default function PricingLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<main className="flex-1 overflow-auto">
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

					{/* Pricing Mobile */}
					<div className="w-full">{children}</div>
				</div>

				{/* FAQ */}
				<div className="flex flex-col bg-[#FAFAFA] p-5 md:gap-4 md:px-6 md:py-[60px] my-16">
					<h2 className="hidden text-center text-2xl font-semibold tracking-tighter md:block md:text-[40px]">
						Frequently Asked Questions
					</h2>
					<h2 className="text-center text-2xl font-semibold md:hidden">FAQs</h2>

					<div className="mx-auto w-full max-w-[448px] md:max-w-[920px]">
						{faqs.map((faq, idx) => (
							<Accordion
								key={idx}
								type="single"
								collapsible
								className="flex w-full flex-col items-center justify-center my-4"
							>
								{faq.qa.map((faq, idx) => (
									<AccordionItem
										key={idx}
										value={faq.question}
										className="w-full max-w-[600px]"
									>
										<AccordionTrigger>{faq.question}</AccordionTrigger>
										<AccordionContent>{faq.answer}</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						))}
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
