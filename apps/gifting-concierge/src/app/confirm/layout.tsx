import { WordRotate } from "@theliaison/ui/magicui/word-rotate";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "./[giftId]/header";

const navLinks = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "How it works",
		href: "/how-it-works",
	},
	{
		name: "Social Polling",
		href: "https://theliaison.vercel.app/",
	},
	{
		name: "Gift Shop",
		href: "/giftshop",
	},
];

export const metadata: Metadata = {
	title: "Someone special wants to send you a gift! - The Liaison",
	description:
		"Enter your address securely to receive your gift! The Liaison will handle the rest.",
	openGraph: {
		title: "Someone special wants to send you a gift!",
		description:
			"Enter your address securely to receive your gift! The Liaison will handle the rest.!",
		url: "https://giftingconcierge.theliaison.vercel.app/",
		siteName: "Gifting Concierge - The Liaison",
		images: [
			{
				url: "https://giftingconcierge.theliaison.vercel.app/api/og",
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex min-h-dvh flex-col dark bg-black">
			<div className="relative z-20 mx-auto min-h-screen h-full w-full max-w-7xl px-6 md:px-8 lg:px-12 bg-black">
				<Header />
				{children}
				<footer className="mt-24 mb-8 max-w-screen-xl mx-auto px-6 lg:px-8 text-white">
					<div className="flex items-center justify-center">
						<span className="text-medium font-medium">
							TL <strong>Gifting Concierge</strong>
						</span>
					</div>
					<div className="flex items-center justify-center mx-auto w-full">
						<WordRotate
							words={[
								'"A gift consist not in what is done or given, but in the intention of the giver or doer." - Seneca',
								'"The manner of giving is worth more than the gift." - Pierre Corneille',
								'"Every gift which is given, even though it be small, is in reality great, if it is given with affection." - Pindar',
								'"We make a living by what we get, but we make a life by what we give." - Winston Churchill',
								'"No one has ever overcome poor by giving." - Anne Frank',
								'"It is not how much we give, but how much love we put into giving." - Mother Teresa',
								'"For it is in giving that we receive." - Francis of Assisi',
								'"Gratitude is not only the greatest of virtues, but the parent of all others." - Cicero',
								'"When we give cheerfully and accept gratefully, everyone is blessed." - Maya Angelou',
								'"The meaning of life is to find your gift. The purpose of life is to give it away." - Pablo Picasso',
							]}
							duration={5000}
						/>
					</div>

					<div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
						{navLinks.map((item) => (
							<Link
								key={item.name}
								className="text-default-500"
								href={item.href}
							>
								{item.name}
							</Link>
						))}
					</div>

					<p className="mt-1 text-center text-small text-default-400">
						&copy; {new Date().getFullYear()} The Liaison. All rights reserved.
					</p>
				</footer>
			</div>
		</main>
	);
}
