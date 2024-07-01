import Link from "next/link";
import Image from "next/image";
import { HeaderNavigation } from "~/components/header/navigation";

export function Header() {
	return (
		<header className="w-full mx-auto mt-4 flex items-center justify-between">
			<Link href="/" className="flex items-center justify-center gap-2">
				<Image
					src="/logo-white.webp"
					alt="The Liaison Logo"
					width={35}
					height={35}
				/>
				<p className="text-white hidden sm:inline-flex text-sm gap-1">
					TL <strong>Gifting Concierge</strong>
				</p>
			</Link>

			<HeaderNavigation isLoggedIn={false} isDarkMode={true} />
		</header>
	);
}
