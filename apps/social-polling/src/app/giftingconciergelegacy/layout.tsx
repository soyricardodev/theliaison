import { Header } from "~/components/header";
import { Footer } from "./_components/footer";

export default function GiftingConciergeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
