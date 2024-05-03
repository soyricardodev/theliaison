import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
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
				<div className="flex flex-col min-h-svh">
					<Header />
					{children}
					<Footer />
				</div>
				<TailwindIndicator />
			</body>
		</html>
	);
}
