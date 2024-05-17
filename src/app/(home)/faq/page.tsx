import Link from "next/link";
import React from "react";

export default function FAQPage() {
	const faqs = [
		{
			id: "how-do-i-get-started",
			question: "How do I get started?",
			answer: (
				<p>
					Select and purchase a package. You will emailed relevant details and
					an intake form. I will personally reach out shortly after :{")"}.
				</p>
			),
		},
		{
			id: "whats-this-service-all-about",
			question: "What's this service all about?",
			answer: (
				<p>
					Whether it's for romance, networking or professional reasons, I
					provide personal and detailed feedback/ suggestions on your dating
					profile, Instagram, and LinkedIn profile to attractively position
					yourself so that you naturally align with your ideal partner and
					business opportunities.
				</p>
			),
		},
		{
			id: "why-should-i-give-it-a-try",
			question: "Why should I give it a try?",
			answer: (
				<p>
					Investing in your personal brand isn't vanity; it's about taking
					control of your narrative and positioning yourself for success.
					Whether you're aiming for career growth or hoping to find that special
					someone, a strong personal brand/ dating profile can make or break
					these opportunities in life and love.
				</p>
			),
		},
		{
			id: "how-long-does-the-review-take",
			question: "How long does the review take?",
			answer: (
				<p>
					It depends on which package you choose, the profile review(s) take 3-4
					days.
				</p>
			),
		},
		{
			id: "how-does-the-dating-profile-review-work",
			question: "How does the dating profile review work?",
			answer: (
				<div>
					<p>
						We will have <strong className="font-semibold text-gray-50">two</strong>{" "}
						30-minute phone consultations. The first 30-minute phone
						consultation is for me to get to know you, your personality and your
						dating goals. Based on this information, I will review your current
						dating profile and deliver a completely custom profile that
						includes:
					</p>
					<ul className="list-disc my-2">
						<li>
							Selecting and strategically placing the most attractive pictures
							of you
						</li>
						<li>Writing a witty bio that will attract in your ideal match</li>
						<li>
							Choose written prompts that will have women messaging you first
						</li>
					</ul>

					<p>
						The second 30-minute phone consult is a 1-month follow up to discuss
						the results your new profile edits. We can also tweak a few things
						if needed. Ultimately, this is YOUR time and you'll be able to ask
						and discuss relevant topics.
					</p>
				</div>
			),
		},
		{
			id: "are-messaging-tips-part-of-the-deal",
			question: "Are messaging tips part of the deal?",
			answer: (
				<p>
					Yes! I will send you a message with a few tips and tricks to help you
					get started. I'll also send you a follow up message after the review
					to let you know if I've made any changes to your profile.
				</p>
			),
		},
		{
			id: "what-if-i-m-not-thrilled-with-the-results",
			question: "What if I'm not thrilled with the results?",
			answer: (
				<p>
					If you're not satisfied, we'll dig into the results and see what other
					tweaks we can make. I will also add on another 1 month follow up if
					you've purchased The Algorithm Hacker or the Ménage à trois.
				</p>
			),
		},
		{
			id: "is-my-information-safe-with-you",
			question: "Is my information safe with you?",
			answer: (
				<p>
					Yes. EVERYTHING you share with me is kept confidential and will never
					be shared or used for marketing purposes. If you're extremely happy
					with your results, I may ask for a testimonial at some point! 😉
				</p>
			),
		},
	];

	return (
		<main className="flex-1">
			<div>
				<div className="py-16">
					<div className="mx-auto max-w-screen-md px-4 sm:px-6">
						<h1 className="font-heading text-center text-3xl font-extrabold leading-[1.15] sm:text-5xl sm:leading-[1.15]">
							Frequently Asked Questions
						</h1>
						<p className="mt-5 text-center text-lg text-default-800 text-pretty">
							Get answers to common questions about The Liaison Web Platform
						</p>
					</div>
				</div>

				<div className="mx-auto flex max-w-screen-md flex-col items-center px-4 py-10 sm:px-6 sm:pt-20 lg:px-8">
					<article className="prose-headings:font-heading prose max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-semibold text-default-900">
						{faqs.map((faq) => (
							<React.Fragment key={faq.question}>
								<Link
									href={`#${faq.id}`}
									className="no-underline hover:underline"
								>
									<h2 id={faq.id} className="text-default-700">{faq.question}</h2>
								</Link>
								{faq.answer}
							</React.Fragment>
						))}
					</article>
					<div className="mt-10 w-full border-t border-zinc-400 pt-10 text-center">
						<p className="text-zinc-400">Last updated: May 3, 2024</p>
					</div>
				</div>
			</div>
		</main>
	);
}
