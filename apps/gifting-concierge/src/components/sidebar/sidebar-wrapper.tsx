"use client";

import { ScrollShadow, Spacer } from "@nextui-org/react";
import { useMediaQuery } from "@theliaison/hooks";

import { cn } from "@theliaison/ui";
import { usePathname } from "next/navigation";
import { sectionItemsWithTeams } from "./sidebar-items";

import Sidebar from "./sidebar";

export function SidebarWrapper() {
	const pathname = usePathname();
	const currentPath = pathname.split("/")?.[1];
	const isCompact = useMediaQuery("(max-width: 768px)");

	return (
		<div
			className={cn(
				"relative flex h-full w-72 flex-col !border-r-small border-divider p-6 transition-width",
				{
					"w-16 items-center px-2 py-6": isCompact,
				},
			)}
		>
			<div
				className={cn(
					"flex items-center gap-3 px-3",

					{
						"justify-center gap-0": isCompact,
					},
				)}
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-primary-foreground">
					TL
				</div>
				<span
					className={cn("text-small font-bold uppercase opacity-100", {
						"w-0 opacity-0": isCompact,
					})}
				>
					GIFTING CONCIERGE
				</span>
			</div>
			<Spacer y={8} />
			<ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
				<Sidebar
					defaultSelectedKey={currentPath || "home"}
					isCompact={isCompact}
					items={sectionItemsWithTeams}
				/>
			</ScrollShadow>
		</div>
	);
}
