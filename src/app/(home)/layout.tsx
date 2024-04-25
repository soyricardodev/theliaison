import Link from "next/link";

import { marketingConfig } from "~/config/marketing";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { MainNav } from "./_components/main-nav";
import { SiteFooter } from "./_components/site-footer";

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default async function MarketingLayout({ children }: HomeLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="container z-40 bg-background">
				<div className="flex h-20 items-center justify-between py-6">
					<MainNav items={marketingConfig.mainNav} />
					<nav>
						<Link
							href="/login"
							className={cn(
								buttonVariants({ variant: "secondary", size: "sm" }),
								"px-4",
							)}
						>
							Login
						</Link>
					</nav>
				</div>
			</header>
			<main className="flex-1">{children}</main>
			<SiteFooter />
		</div>
	);
}