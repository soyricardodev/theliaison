import { Logo } from "./logo";

export function Footer() {
	return (
		<footer className="fixed bottom-0 right-0 z-50 hidden items-center justify-between px-4 pt-1 text-white mix-blend-difference lg:inline-flex pb-2">
			<nav className="flex items-center gap-2.5 rounded-full text-xs font-medium">
				<a className="hover:text-gray-700" href="/cookies">
					Cookies
				</a>
				<a
					className="text-white mix-blend-difference hover:text-gray-700"
					href="/faq"
				>
					FAQ
				</a>
				<a className="hover:text-gray-700" href="/agreement">
					Terms
				</a>
				<a className="hover:text-gray-700" href="/policy">
					<span className="sm:hidden">Policy</span>
					<span className="hidden sm:inline">AI Policy</span>
				</a>
				<a
					className="hover:text-gray-700"
					href="/privacy-policy"
					target="_blank"
					rel="noreferrer"
				>
					Privacy
				</a>
				<a
					className="flex h-6 w-6 items-center justify-center mix-blend-normal"
					href="/"
					target="_blank"
					rel="noreferrer"
				>
					<span className="sr-only">The Liaison</span>
					<Logo className="mix-blend-darken" />
				</a>
			</nav>
		</footer>
	);
}
