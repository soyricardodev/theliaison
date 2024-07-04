import { Header } from "~/components/header";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { QuotesRotate } from "~/components/quotes-rotate";

export default function Home() {
	return (
		<>
			<Header />
			<main className="antialiased overflow-x-hidden">
				<div className="max-w-7xl mx-auto px-4 flex min-h-screen flex-col items-center justify-between">
					<Hero />
				</div>
			</main>
			<QuotesRotate />
			<Footer />
		</>
	);
}
