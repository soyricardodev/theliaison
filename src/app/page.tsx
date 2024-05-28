import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Hero } from "./_components/hero";
import { MainExplore } from "./_components/main-explore";
import TopBanner from "./_components/top-banner";

export const experimental_ppr = true;

export default function HomePage() {
	return (
		<>
			<TopBanner
				text="Lost in love? The Liaison AI guides you. Beta dating advice."
				href="/ai/chat"
				linkText="Try it."
				hideCloseButton
			/>
			<Header />
			<main className="flex-1 overflow-auto">
				<Hero />

				<MainExplore />
			</main>
			<Footer />
		</>
	);
}
