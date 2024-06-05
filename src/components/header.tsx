import React from "react";

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
		<header className="w-full sticky top-0 z-50 mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<MainNav />
				<MobileNav />

				<div className="ml-auto max-w-fit flex">
					{showCta && <HeaderCTA />}
					<div className="px-2 flex items-center justify-center">
						<HeaderUser />
					</div>
				</div>
			</div>
			<hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-400/40 to-neutral-200/0" />
		</header>
	);
}
