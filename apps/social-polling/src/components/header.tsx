import { HeaderCTA } from "./header-cta";
import { HeaderUser } from "./header-user";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

interface HeaderProps {
	showCta?: boolean;
	ctaText?: string | JSX.Element;
	ctaHref?: string;
}

export function Header({ showCta = true }: HeaderProps) {
	return (
		<header className="sticky top-0 z-50 mx-auto w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<MainNav />
				<MobileNav />

				<div className="ml-auto flex max-w-fit">
					{showCta && <HeaderCTA />}
					<div className="flex items-center justify-center px-2">
						<HeaderUser />
					</div>
				</div>
			</div>
			<hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-400/40 to-neutral-200/0" />
		</header>
	);
}
