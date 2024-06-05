import { Header } from "~/components/header";
import { Footer } from "./_components/footer";
// import { Navigation } from "./_components/navigation";

export default function GiftingConciergeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* <Navigation /> */}
			<Header />
			{children}
			{/* <Footer /> */}
		</>
	);
}
