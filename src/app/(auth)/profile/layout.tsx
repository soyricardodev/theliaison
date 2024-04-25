"use client";

import { profileConfig } from "~/config/profile";
import { MainNav } from "~/components/main-nav";
import { SiteFooter } from "~/components/site-footer";
import { DashboardNav } from "~/components/dashboard-nav";

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<header className="sticky top-0 z-40 border-b bg-background">
				<div className="container flex h-16 items-center justify-between py-4">
					<MainNav items={profileConfig.mainNav} />
				</div>
			</header>
			<div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
				<aside className="hidden w-[200px] flex-col md:flex">
					<DashboardNav items={profileConfig.sidebarNav} />
				</aside>
				<main className="flex w-full flex-1 flex-col overflow-hidden">
					{children}
				</main>
			</div>
			<SiteFooter className="border-t" />
		</div>
	);
}
