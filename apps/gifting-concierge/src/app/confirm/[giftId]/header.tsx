import Image from "next/image";
import Link from "next/link";
import { HeaderNavigation } from "~/components/header/navigation";
import { createClient } from "~/supabase/server";

export async function Header() {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

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

			<HeaderNavigation isLoggedIn={user != null} isDarkMode={true} />
		</header>
	);
}
