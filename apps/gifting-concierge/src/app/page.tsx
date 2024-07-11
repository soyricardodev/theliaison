import { Header } from "~/components/header";
import { QuotesRotate } from "~/components/quotes-rotate";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Gradient } from "~/components/gradient";

export default function Home() {
	return (
		<>
			<Header />
			<main className="antialiased overflow-x-hidden absolute top-0 left-0 w-full h-full z-30">
				<div className="max-w-7xl mx-auto px-4 flex min-h-screen flex-col items-center justify-between">
					<Hero />
				</div>
				<QuotesRotate />
				<Footer />
			</main>
			<Gradient />
		</>
	);
}
