import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Toaster } from "~/components/ui/sonner";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-svh">
			<Header />
			{children}
			<Toaster />
			<Footer />
		</div>
	);
}
