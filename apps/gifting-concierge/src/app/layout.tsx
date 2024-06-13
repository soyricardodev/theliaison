import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { cn } from "@theliaison/ui";
import { TailwindIndicator } from "@theliaison/ui/tailwind-indicator";

import { FloatingAICta } from "~/components/ai/floating-ai-cta";
import { Header } from "~/components/header";
import { Providers } from "~/components/providers";
import { Cart } from "../components/cart/cart";

export const metadata: Metadata = {
	title: "The Liaison | Gifting Concierge",
	description:
		"The Liaison is a gifting concierge that helps you find the perfect gift for your loved one.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn("min-h-dvh font-sans antialiased", GeistSans.variable)}
			>
				<Providers>
					{/* <Header /> */}
					<Cart />
					{children}
				</Providers>
				<TailwindIndicator />
			</body>
		</html>
	);
}
