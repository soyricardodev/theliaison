import { Header } from "~/components/header";
import { Hero } from "./_components/hero";
import { MainExplore } from "./_components/main-explore";
import { Footer } from "~/components/footer";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="flex-1 overflow-auto">
				<Hero />

				<MainExplore />
			</main>
			<Footer />
			<div className="pointer-events-none absolute inset-0 h-screen bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.5),rgba(255,255,255,0))]" />
		</>
	);
}
