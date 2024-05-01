import { Suspense } from "react";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Toaster } from "~/components/ui/sonner";
import Footer from "../(home)/_components/footer";
import { HeaderWrapper } from "../(home)/_components/header-wrapper";

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function SocialPollingLayout({ children }: HomeLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col scroll-smooth">
			<HeaderWrapper>
				{children}
				<Footer />
			</HeaderWrapper>
			<TailwindIndicator />
			<Suspense>
				<Toaster />
			</Suspense>
		</div>
	);
}
