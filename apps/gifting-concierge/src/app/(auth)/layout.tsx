import { Toaster } from "@theliaison/ui/sonner";
import { Gradient } from "~/components/gradient";
import { Header } from "~/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="min-h-dvh antialiased overflow-x-hidden absolute top-0 left-0 w-full h-full z-30">
				<Header />
				{children}
			</div>

			<Gradient color1="#809bd6" color2="#910aff" color3="#af38ff" />

			<Toaster />
		</>
	);
}
