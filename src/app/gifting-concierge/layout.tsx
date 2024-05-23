import { Navigation } from "./_components/navigation";
import { Footer } from "./_components/footer";

export default function GiftingConciergeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
}
