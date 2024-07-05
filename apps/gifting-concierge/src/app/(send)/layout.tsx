import { Header } from "~/components/header";
import { QuotesRotate } from "~/components/quotes-rotate";
import { Footer } from "../components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex min-h-dvh flex-col">
			<Header />

			<main className="mx-auto flex max-w-7xl w-full flex-col gap-4 px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-40">
				{children}
			</main>

			<QuotesRotate />
			<Footer />
		</div>
	);
}
