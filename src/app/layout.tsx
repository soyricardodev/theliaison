import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";

import { NextUIProvider } from "@nextui-org/react";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { minervaBoldFont, minervaRegularFont } from "~/lib/fonts";
import { cn } from "~/lib/utils";

export const metadata = {
	title: "Ask The Liaison - Social Polling",
	description:
		"Social Polling is a web application that allows users to create polls and vote on them.",
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
					"font-sans antialiased",
					GeistSans.variable,
					minervaRegularFont.variable,
					minervaBoldFont.variable,
				)}
			>
				<NextUIProvider>{children}</NextUIProvider>
				<TailwindIndicator />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
