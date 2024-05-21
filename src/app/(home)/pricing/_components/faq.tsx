"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";

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

export function FAQ() {
	return faqs.map((faq, i) => (
		<Accordion
			key={`${faq.section}-${i}`}
			fullWidth
			keepContentMounted
			itemClasses={{
				base: "px-0 md:px-2 md:px-6",
				title: "font-medium",
				trigger: "py-6 flex-row-reverse",
				content: "pt-0 pb-6 text-base text-default-500",
				indicator: "rotate-0 data-[open=true]:-rotate-45",
			}}
			selectionMode="multiple"
		>
			{faq.qa.map((item, i) => (
				<AccordionItem
					key={`${item.answer}-${i}`}
					indicator={<PlusIcon className="text-secondary" width={24} />}
					title={item.question}
				>
					{item.answer}
				</AccordionItem>
			))}
		</Accordion>
	));
}
