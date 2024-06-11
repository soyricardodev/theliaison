import { Toaster } from "@theliaison/ui/sonner";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-svh flex-col">
			<Header />
			{children}
			<Toaster />
			<Footer />
		</div>
	);
}
