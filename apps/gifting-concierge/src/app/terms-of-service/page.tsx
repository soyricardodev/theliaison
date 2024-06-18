import Link from "next/link";
import React from "react";

const terms = [
	{
		id: "1-concierge-service-description",
		title: "1. Concierge Service Description",
		content: (
			<p>
				The Liaison Gifting's Concierge Service allows customers to send gifts
				to recipients without needing their mailing address. Our team will
				discreetly contact the recipient to collect the necessary information
				for delivery.
			</p>
		),
	},
	{
		id: "2-privacy-and-confidentiality",
		title: "2. Privacy and Confidentiality",
		content: (
			<p>
				We prioritize the privacy and confidentiality of both customers and
				recipients. All personal information provided will be kept strictly
				confidential.
			</p>
		),
	},
	{
		id: "3-gift-selection-and-customization",
		title: "3. Gift Selection and Customization",
		content: (
			<p>
				Customers may choose gifts from our shop or provide links to items from
				other sources. Customization options, including personalized messages,
				are available for a more personal touch.
			</p>
		),
	},
	{
		id: "4-ordering-and-payment",
		title: "4. Ordering and Payment",
		content: (
			<p>
				Orders placed through our concierge service are subject to our standard
				payment and refund policies.
			</p>
		),
	},
	{
		id: "5-recipients-consent",
		title: "5. Recipient's Consent",
		content: (
			<p>
				By using our concierge service, you confirm that you have the
				recipient's consent to provide their contact information for the purpose
				of gift delivery.
			</p>
		),
	},
	{
		id: "5-recipients-consent",
		title: "5. Recipient's Consent",
		content: (
			<p>
				By using our concierge service, you confirm that you have the
				recipient's consent to provide their contact information for the purpose
				of gift delivery.
			</p>
		),
	},
	/**




 */
	{
		id: "6-delivery",
		title: "6. Delivery",
		content: (
			<p>
				The Liaison Gifting will make every effort to ensure the successful and
				timely delivery of gifts. However, we are not responsible for delays or
				issues beyond our control.
			</p>
		),
	},
	{
		id: "7-refunds-and-returns",
		title: "7. Refunds and Returns",
		content: (
			<p>
				Refunds and returns are subject to our standard refund policy and the
				policies of the product providers.
			</p>
		),
	},
	{
		id: "8-customer-support",
		title: "8. Customer Support",
		content: (
			<p>
				For any questions, concerns, or issues, please contact our customer
				support team at support@theliaison.com.
			</p>
		),
	},
	{
		id: "9-changes-to-terms-of-service",
		title: "9. Changes to Terms of Service",
		content: (
			<p>
				The Liaison Gifting reserves the right to update or modify these terms
				at any time. Please check this page regularly for updates.
			</p>
		),
	},
	{
		id: "10-termination",
		title: "10. Termination",
		content: (
			<p>
				The Liaison Gifting may terminate or suspend the concierge service at
				its discretion, with or without notice.
			</p>
		),
	},
	{
		id: "11-governing-law",
		title: "11. Governing Law",
		content: (
			<p>
				These Terms of Service are governed by the laws of the state of
				California without regard to its conflict of law principles. By using
				The Liaison Gifting's Concierge Service, you agree to abide by these
				Terms of Service.
			</p>
		),
	},
];

export default function TermsOfServicePage() {
	return (
		<main className="flex-1">
			<div className="bg-zinc-50">
				<div className="bg-white py-16 ">
					<div className="mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
						<h1 className="font-display text-center text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15]">
							Terms of Service
						</h1>
						<p className="mt-5 text-center text-lg text-zinc-600">
							Terms of Service for The Liaison Gifting (Concierge Service)
						</p>
					</div>
				</div>
			</div>

			<div className="mx-auto flex max-w-screen-md flex-col items-center px-4 py-10 sm:px-6 sm:pt-20 lg:px-8">
				<article className="prose-headings:font-display prose prose-gray max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-semibold">
					<p className="uppercase">
						<strong>
							Welcome to The Liaison Gifting's Concierge Service. Before you
							proceed, please carefully read and agree to the following Terms of
							Service (TOS). By using our concierge service, you acknowledge and
							accept the terms outlined below:
						</strong>
					</p>

					{terms.map((term) => (
						<React.Fragment key={term.id}>
							<Link
								href={`#${term.id}`}
								className="no-underline hover:underline"
							>
								<h2 id={term.id} className="text-default-900">
									{term.title}
								</h2>
							</Link>
							{term.content}
						</React.Fragment>
					))}

					<p>
						If you do not agree with any part of these terms, please refrain
						from using our service. Thank you for choosing The Liaison Gifting
						for your gifting needs. For any inquiries or clarification regarding
						our Terms of Service, please contact us at support@theliaison.com.
					</p>
				</article>
				<div className="mt-10 w-full border-t border-zinc-400 pt-10 text-center">
					<p className="text-zinc-400">Effective Date: Jan 4, 2024</p>
				</div>
			</div>
		</main>
	);
}
