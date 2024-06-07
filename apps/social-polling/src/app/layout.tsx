import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";

import { cn } from "@theliaison/ui";

import { MinervaBoldFont } from "~/assets/fonts";
import { Providers } from "~/components/providers";
import { TailwindIndicator } from "~/components/tailwind-indicator";

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
          MinervaBoldFont.variable,
        )}
      >
        <Providers>
          <div className="bg-background text-foreground">{children}</div>
        </Providers>
        <TailwindIndicator />
        {process.env.NODE_ENV === "production" ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
