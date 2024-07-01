"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const faqs = [
	{
		title: "What is The Liaison Gifting's Concierge Service?",
		content:
			"Our Concierge Service is designed to simplify the gifting process. It allows you to send gifts to recipients without knowing their mailing address. We discreetly contact the recipient to collect the necessary information, ensuring a seamless and respectful gifting experience.",
	},
	{
		title: "How does the concierge service work?",
		content:
			"It's easy! After selecting a gift from our shop or providing a link to an item you love, we discreetly reach out to the recipient for their address and handle all the details, making sure your gift arrives confidentially.",
	},
	{
		title: "Is my recipients information kept confidential?",
		content:
			"We prioritize privacy and confidentiality. Your recipient's information is kept strictly confidential.",
	},
	{
		title: "Can I personalize my gift?",
		content:
			"Yes, we offer customization options, including adding a personalized message to your gift.",
	},
	{
		title: "How can I contact customer support?",
		content: (
			<p>
				You can reach out to us via our chat or at{" "}
				<a
					href="mailto:support@theliaison.com"
					className="text-primary underline hover:no-underline"
				>
					support@theliaison.com
				</a>
				. Our customer support team is available 24/7 to assist you with any
				questions or concerns.
			</p>
		),
	},
	{
		title: "What happens if there are issues with the delivery or my order?",
		content:
			"While we make every effort to ensure smooth deliveries, unforeseen issues can sometimes occur. In such cases, please contact our customer support team, and we'll work to resolve any problems and ensure your satisfaction.",
	},
	{
		title: "How can I trust the liaison gifting's concierge service?",
		content:
			"Yes, there is a service fee associated with using our Concierge Service, in addition to the cost of the selected gift. This fee covers the extra care and attention we provide to ensure a successful gifting experience.",
	},
	{
		title: "Can I review The Liaison Gifting's Terms of Service?",
		content: (
			<p>
				Absolutely. You can review our Terms of Service{" "}
				<Link
					href="/terms-of-service"
					className="text-primary underline hover:no-underline"
				>
					here
				</Link>
				. Familiarizing yourself with these terms will ensure we're all on the
				same page and help you make informed decisions
			</p>
		),
	},
];

export function FAQs() {
	return (
		<section className="mx-auto w-full max-w-6xl py-20 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
			<div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12">
				<h2 className="px-2 text-3xl leading-7">
					{/* <span className="font-semibold inline-block lg:hidden">FAQs</span> */}
					<p className="bg-gradient-to-br from-black from-40% to-primary/60 bg-clip-text pt-4 text-5xl font-semibold tracking-tight text-transparent lg:inline-block text-center lg:text-left">
						Frequently <br className="hidden lg:block" />
						asked <br className="hidden lg:block" />
						questions
					</p>
				</h2>
				<Accordion
					fullWidth
					keepContentMounted
					className="gap-3"
					itemClasses={{
						base: "px-0 sm:px-6",
						title: "font-medium",
						trigger: "py-6 flex-row-reverse",
						content: "pt-0 pb-6 text-base text-default-500 ml-5",
					}}
					items={faqs}
					selectionMode="multiple"
				>
					{faqs.map((item) => (
						<AccordionItem
							key={item.title}
							indicator={
								<PlusIcon width={24} className="text-[var(--color-one)]" />
							}
							title={item.title}
						>
							{item.content}
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
