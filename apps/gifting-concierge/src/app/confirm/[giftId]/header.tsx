import Link from "next/link";
import Image from "next/image";
import { InstagramIcon } from "lucide-react";

export function Header() {
	return (
		<header className="w-full mx-auto mt-4 flex items-center justify-between">
			<Link href="/" className="flex items-center justify-center gap-2">
				<Image
					src="/logo-white.webp"
					alt="The Liaison Logo"
					width={45}
					height={45}
				/>
				<p className="text-white hidden sm:inline-flex">
					TL <strong>Gifting Concierge</strong>
				</p>
			</Link>

			<ul className="flex items-center justify-center gap-2">
				<li className="mr-4 hidden sm:inline-flex">
					<a
						href="https://instagram.com"
						target="_blank"
						className="flex items-center justify-center"
						rel="noreferrer"
					>
						<InstagramIcon className="size-6 text-white hover:text-white/90 transition-colors" />
					</a>
				</li>
				<li>
					<Link
						href="/register"
						className="text-sm text-black rounded-md hover:bg-white/80 transition-colors py-2 px-3 bg-white"
					>
						Get Started
					</Link>
				</li>
			</ul>
		</header>
	);
}
