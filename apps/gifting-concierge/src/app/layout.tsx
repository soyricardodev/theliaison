import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { cn } from "@theliaison/ui";
import { TailwindIndicator } from "@theliaison/ui/tailwind-indicator";
import { Providers } from "~/components/providers";

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
				className={cn(
					"min-h-dvh font-sans antialiased bg-white",
					GeistSans.variable,
				)}
			>
				<Providers>{children}</Providers>
				<TailwindIndicator />
			</body>
		</html>
	);
}
