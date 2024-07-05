import type React from "react";

import { SidebarWrapper } from "./sidebar-wrapper";

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-dvh w-full">
			<SidebarWrapper />
			<div className="w-full flex-1 flex-col p-4">
				<header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
					<h2 className="text-medium font-medium text-default-700">Overview</h2>
				</header>
				<main className="mt-4 h-full w-full overflow-visible">
					<div className="flex min-h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider p-4">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
