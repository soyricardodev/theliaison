"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";
import { PlusIcon } from "lucide-react";

const faqs = [
	{
		title: "What is The Liaison Gifting's Concierge Service?",
		content:
			"Our Concierge Service is designed to simplify the gifting process. It allows you to send gifts to recipients without knowing their mailing address. Our dedicated team discreetly contacts the recipient to collect the necessary information, ensuring a seamless and surprise-filled gifting experience.",
	},
	{
		title: "How does the concierge service work?",
		content:
			"Our Concierge Service is designed to simplify the gifting process. It allows you to send gifts to recipients without knowing their mailing address. Our dedicated team discreetly contacts the recipient to collect the necessary information, ensuring a seamless and surprise-filled gifting experience.",
	},
	{
		title: "Is my recipients information kept confidential?",
		content:
			"Our Concierge Service is designed to simplify the gifting process. It allows you to send gifts to recipients without knowing their mailing address. Our dedicated team discreetly contacts the recipient to collect the necessary information, ensuring a seamless and surprise-filled gifting experience.",
	},
	{
		title: "Can I personalize my gift?",
		content:
			"Our Concierge Service is designed to simplify the gifting process. It allows you to send gifts to recipients without knowing their mailing address. Our dedicated team discreetly contacts the recipient to collect the necessary information, ensuring a seamless and surprise-filled gifting experience.",
	},
	{
		title: "How can I contact customer support?",
		content:
			"Our Concierge Service is designed to simplify the gifting process. It allows you to send gifts to recipients without knowing their mailing address. Our dedicated team discreetly contacts the recipient to collect the necessary information, ensuring a seamless and surprise-filled gifting experience.",
	},
	{
		title: "What happens if there are issues with the delivery or my order?",
		content:
			"Our Concierge Service is designed to simplify the gifting process. It allows you to send gifts to recipients without knowing their mailing address. Our dedicated team discreetly contacts the recipient to collect the necessary information, ensuring a seamless and surprise-filled gifting experience.",
	},
	{
		title: "How can I trust the liaison gifting's concierge service?",
		content:
			"Our Concierge Service is designed to simplify the gifting process. It allows you to send gifts to recipients without knowing their mailing address. Our dedicated team discreetly contacts the recipient to collect the necessary information, ensuring a seamless and surprise-filled gifting experience.",
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
