import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { ThemeProvider } from "~/components/providers";
import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
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
			<body className={cn("font-sans antialiased min-h-dvh", inter.variable)}>
				<TRPCReactProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
