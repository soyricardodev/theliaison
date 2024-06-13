"use client";

import { Icon } from "@iconify/react";
import {
	Avatar,
	Button,
	ScrollShadow,
	Spacer,
	Tooltip,
} from "@nextui-org/react";
import { useMediaQuery } from "@theliaison/hooks";
import type React from "react";

import { cn } from "@theliaison/ui";
import { usePathname } from "next/navigation";
import { sectionItemsWithTeams } from "./sidebar-items";

import Sidebar from "./sidebar";

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const currentPath = pathname.split("/")?.[1];
	const isCompact = useMediaQuery("(max-width: 768px)");

	return (
		<div className="flex h-dvh w-full">
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
				<div className="flex items-center gap-3 px-3">
					<Avatar
						isBordered
						className="flex-none"
						size="sm"
						src="https://i.pravatar.cc/150?u=a04258114e29026708c"
					/>
					<div
						className={cn("flex max-w-full flex-col", { hidden: isCompact })}
					>
						<p className="truncate text-small font-medium text-default-600">
							Ray Daily
						</p>
						<p className="truncate text-tiny text-default-400">Owner</p>
					</div>
				</div>
				<ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
					<Sidebar
						defaultSelectedKey={currentPath || "home"}
						isCompact={isCompact}
						items={sectionItemsWithTeams}
					/>
				</ScrollShadow>
				<Spacer y={2} />
				<div
					className={cn("mt-auto flex flex-col", {
						"items-center": isCompact,
					})}
				>
					<Tooltip
						content="Help & Feedback"
						isDisabled={!isCompact}
						placement="right"
					>
						<Button
							fullWidth
							className={cn(
								"justify-start truncate text-default-500 data-[hover=true]:text-foreground",
								{
									"justify-center": isCompact,
								},
							)}
							isIconOnly={isCompact}
							startContent={
								isCompact ? null : (
									<Icon
										className="flex-none text-default-500"
										icon="solar:info-circle-line-duotone"
										width={24}
									/>
								)
							}
							variant="light"
						>
							{isCompact ? (
								<Icon
									className="text-default-500"
									icon="solar:info-circle-line-duotone"
									width={24}
								/>
							) : (
								"Help & Information"
							)}
						</Button>
					</Tooltip>
					<Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
						<Button
							className={cn(
								"justify-start text-default-500 data-[hover=true]:text-foreground",
								{
									"justify-center": isCompact,
								},
							)}
							isIconOnly={isCompact}
							startContent={
								isCompact ? null : (
									<Icon
										className="flex-none rotate-180 text-default-500"
										icon="solar:minus-circle-line-duotone"
										width={24}
									/>
								)
							}
							variant="light"
						>
							{isCompact ? (
								<Icon
									className="rotate-180 text-default-500"
									icon="solar:minus-circle-line-duotone"
									width={24}
								/>
							) : (
								"Log Out"
							)}
						</Button>
					</Tooltip>
				</div>
			</div>
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
