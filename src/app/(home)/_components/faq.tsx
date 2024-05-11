"use client";

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

export default function FAQ() {
	return (
		<section id="faq">
			<div className="py-14">
				<div className="container mx-auto px-4 md:px-8">
					<div className="mx-auto max-w-5xl text-center">
						<h4 className="text-xl font-bold tracking-tight text-black">
							FAQs
						</h4>
						<h2 className="text-4xl font-heading font-bold tracking-tight text-black sm:text-6xl">
							Frequently Asked Questions
						</h2>
						<p className="mt-6 text-xl leading-8 text-black/80">
							Need help with something? Here are some of the most common
							questions we get.
						</p>
					</div>
					<div className="container mx-auto my-12 max-w-[600px] space-y-12">
						{faqs.map((faq, idx) => (
							<section key={idx} id={`faq-${faq.section}`}>
								<h2 className="mb-4 text-left text-base font-semibold tracking-tight text-foreground/60">
									{faq.section}
								</h2>
								<Accordion
									type="single"
									collapsible
									className="flex w-full flex-col items-center justify-center"
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
							</section>
						))}
					</div>
					<h4 className="mb-12 text-center text-sm font-medium tracking-tight text-foreground/80">
						Still have questions? Email us at{" "}
						<a href="mailto:support@example.com" className="underline">
							support@theliaison.com
						</a>
					</h4>
				</div>
			</div>
		</section>
	);
}
