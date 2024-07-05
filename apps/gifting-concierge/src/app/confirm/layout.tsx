import type { Metadata } from "next";
import { QuotesRotate } from "~/components/quotes-rotate";
import { Footer } from "../components/footer";
import { Header } from "./[giftId]/header";

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
			<div className="relative z-20 mx-auto min-h-screen h-full w-full max-w-7xl px-6 md:px-8 lg:px-12 bg-gradient-to-r from-black via-[#222] to-black">
				<Header />
				{children}

				<QuotesRotate isDark />
				<Footer isDark />
			</div>
		</main>
	);
}
