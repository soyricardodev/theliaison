import { Cart } from "~/components/cart/cart";
import { Header } from "./_components/header";
import { Footer } from "../components/footer";
import { QuotesRotate } from "~/components/quotes-rotate";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-dvh flex-col">
			<Header />
			<Cart />
			{children}

			<QuotesRotate />
			<Footer />
		</div>
	);
}
