"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Logo } from "./logo";

export function MainNav() {
	const pathname = usePathname();

	return (
		<div className="mr-4 hidden md:flex">
			<Link href="/" className="mr-6 flex items-center space-x-2">
				<Logo className="size-8" />
				<span className="hidden font-bold sm:inline-block">The Liaison</span>
			</Link>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Social Polling</NavigationMenuTrigger>
						<NavigationMenuContent className="bg-content1">
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] space-x-0.5">
								<li className="row-span-3 hover:bg-content3 transition-colors bg-transparent">
									<NavigationMenuLink className="bg-transparent" asChild>
										<a
											className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-content2/50 to-content2 p-6 no-underline outline-none focus:shadow-md"
											href="/explore"
										>
											<Logo />
											<div className="mb-2 mt-4 text-lg font-medium">
												Explore Polls
											</div>
											<p className="text-sm leading-tight text-muted-foreground">
												Beautifully designed components that you can copy and
												paste into your apps. Accessible. Customizable. Open
												Source.
											</p>
										</a>
									</NavigationMenuLink>
								</li>
								<ListItem href="/create" title="Create your poll">
									Re-usable components built using Radix UI and Tailwind CSS.
								</ListItem>
								<ListItem href="/explore" title="Be part">
									How to install dependencies and structure your app.
								</ListItem>
								<ListItem href="/pricing" title="Pricing">
									Styles for headings, paragraphs, lists...etc
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							href="/gift"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname === "/gift" ? "text-foreground" : "text-foreground/70",
							)}
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Gifting Concierge
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							href="/services"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname === "/services"
									? "text-foreground"
									: "text-foreground/70",
							)}
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Services
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							href="/shop"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname === "/shop" ? "text-foreground" : "text-foreground/70",
							)}
							legacyBehavior
							passHref
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Shop
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}

const ListItem = ({
	ref,
	className,
	title,
	children,
	...props
}: React.ComponentPropsWithoutRef<"a"> & {
	ref?: React.RefObject<React.ElementRef<"a">>;
}) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-content3 hover:text-foreground focus:bg-content3 focus:text-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
};
ListItem.displayName = "ListItem";
