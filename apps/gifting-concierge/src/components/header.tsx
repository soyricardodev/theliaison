import Image from "next/image";
import Link from "next/link";
import { createClient } from "~/supabase/server";
import { HeaderNavigation } from "./header/navigation";
import { UserRoundIcon } from "lucide-react";

export function Header() {
	return (
		<div className="sticky top-0 z-20">
			<header className="flex w-full flex-col gap-3 p-3 md:h-16 md:flex-row md:items-center lg:px-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
				<div className="flex w-full items-center gap-8">
					<div className="flex items-center gap-2">
						<Link
							href="/"
							className="flex items-center justify-center gap-2 rounded focus:outline-0 focus:ring-0 focus-visible:bg-zinc-200"
						>
							<span className="sr-only">Home</span>
							<Image
								src="/logo-white.webp"
								alt="The Liaison Logo"
								width={45}
								height={45}
							/>
							<p className="inline-flex gap-0.5">
								TL <strong>Gifting Concierge</strong>
							</p>
						</Link>
					</div>

					<div className="ml-auto flex items-center gap-2 sm:gap-4">
						<Link href="/login" className="">
							<UserRoundIcon className="size-5 text-gray-500 dark:text-gray-400" />
						</Link>
						<HeaderUser />
					</div>
				</div>
			</header>
		</div>
	);
}

async function HeaderUser() {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (!user || error) return <HeaderNavigation isLoggedIn={false} />;

	return <HeaderNavigation isLoggedIn={true} />;
}
