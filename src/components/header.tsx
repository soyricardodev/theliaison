import {
	BreadcrumbItem,
	Breadcrumbs,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import React from "react";

import { Logo } from "./logo";

import { HeaderCTA } from "./header-cta";
import { HeaderUser } from "./header-user";

interface HeaderProps {
	breadcrumbs?: Array<{
		name: string;
		href: string;
	}>;
}

export function Header({ breadcrumbs }: HeaderProps) {
	return (
		<div className="w-full sticky top-0 z-50">
			<Navbar
				position="sticky"
				classNames={{
					item: "data-[active=true]:text-primary",
					wrapper: "px-4 sm:px-6",
				}}
				height="64px"
			>
				<NavbarBrand>
					<Link href="/">
						<Logo className="size-10" />
					</Link>
				</NavbarBrand>
				{/* Breadcrumbs */}
				{breadcrumbs != null && (
					<Breadcrumbs className="hidden sm:flex" radius="full">
						{breadcrumbs.map((breadcrumb) => (
							<BreadcrumbItem key={breadcrumb.name} href={breadcrumb.href}>
								{breadcrumb.name}
							</BreadcrumbItem>
						))}
					</Breadcrumbs>
				)}

				{/* Right Menu */}
				<NavbarContent
					className="ml-auto h-12 max-w-fit items-center gap-0"
					justify="end"
				>
					<HeaderCTA />
					{/* User Menu */}
					<NavbarItem className="px-2">
						<HeaderUser />
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			<hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-400/40 to-neutral-200/0" />
		</div>
	);
}
