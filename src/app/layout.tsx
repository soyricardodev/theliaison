import "~/styles/globals.css";

import localFont from "next/font/local";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";

const minervaRegular = localFont({
	src: "../assets/fonts/MINERVAMODERNRegular.otf",
	variable: "--font-sans",
	display: "swap",
});

const minervaBold = localFont({
	src: "../assets/fonts/MINERVAMODERNBold.otf",
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
					"font-sans antialiased min-h-dvh",
					minervaRegular.variable,
					minervaBold.variable,
				)}
			>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}
