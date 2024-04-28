import "~/styles/globals.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "~/lib/utils";

const minervaRegular = localFont({
	src: "../assets/fonts/MINERVAMODERNRegular.otf",
	variable: "--font-heading",
	display: "swap",
});

const minervaBold = localFont({
	src: "../assets/fonts/MINERVAMODERNBold.otf",
	variable: "--font-heading",
	display: "swap",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

export const metadata = {
	title: "Polling WebApp",
	description: "Nextjs WebApp Liaison Polling Web",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"font-sans antialiased min-h-dvh scroll-smooth",
					minervaRegular.variable,
					minervaBold.variable,
					inter.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
