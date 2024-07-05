import Image from "next/image";
import Link from "next/link";
import { HeaderNavigation } from "~/components/header/navigation";
import { createClient } from "~/supabase/server";
import { CartToggle } from "./cart-toggle";

export async function Header() {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<header className="w-full mx-auto flex items-center justify-between px-4 py-2 bg-white border-b">
			<Link href="/" className="flex items-center gap-2">
				<Image
					src="/logo-white.webp"
					alt="The Liaison Logo"
					width={45}
					height={45}
				/>
				<p>
					TL <strong>Gifting Concierge</strong>
				</p>
			</Link>

			<ul className="flex gap-4">
				<li>
					<CartToggle />
				</li>
				<li>
					{user ? (
						<HeaderNavigation isLoggedIn={true} />
					) : (
						<HeaderNavigation isLoggedIn={false} />
					)}
				</li>
			</ul>
		</header>
	);
}
