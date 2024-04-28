import { TailwindIndicator } from "~/components/tailwind-indicator";
import Footer from "./_components/footer";
import { HeaderWrapper } from "./_components/header-wrapper";

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default async function MarketingLayout({ children }: HomeLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col scroll-smooth">
			<HeaderWrapper>
				{children}
				<Footer />
			</HeaderWrapper>
			<TailwindIndicator />
		</div>
	);
}
