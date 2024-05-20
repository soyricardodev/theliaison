import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Hero } from "./_components/hero";
import { MainExplore } from "./_components/main-explore";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="flex-1 overflow-auto">
				<Hero />

				<MainExplore />
			</main>
			<Footer />
		</>
	);
}
