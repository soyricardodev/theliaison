import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, MenuIcon } from "lucide-react";

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

			<button type="button">
				<MenuIcon className="text-white hover:text-white/90 transition-colors size-5" />
			</button>
		</header>
	);
}
