"use client";

import { Icon } from "@iconify/react";
import {
	Avatar,
	Badge,
	BreadcrumbItem,
	Breadcrumbs,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import React from "react";

import { Logo } from "./logo";

import type { User } from "@supabase/supabase-js";

interface HeaderProps {
	breadcrumbs?: Array<{
		name: string;
		href: string;
	}>;
	user?: User | null;
}

const menuItemsLogout = [
	{
		key: "login",
		label: "Login",
		href: "/login",
		Icon: <Icon icon="solar:user-rounded-bold-duotone" width={24} />,
	},
	{
		key: "services",
		label: "Services",
		href: "/services",
		Icon: <Icon icon="solar:three-squares-bold-duotone" width={24} />,
	},
	{
		key: "faq",
		label: "FAQs",
		href: "/faq",
		Icon: <Icon icon="solar:question-circle-bold-duotone" width={24} />,
	},
	{
		key: "pricing",
		label: "Pricing",
		href: "/pricing",
		Icon: <Icon icon="solar:dollar-bold-duotone" width={24} />,
	},
];

const menuItemsLoggedIn = (username: string) => [
	{
		key: "explore",
		label: "Explore",
		href: "/explore",
		Icon: <Icon icon="solar:three-squares-bold-duotone" width={24} />,
	},
	{
		key: "profile",
		label: "Profile",
		href: `/${username}`,
		Icon: <Icon icon="solar:user-rounded-bold-duotone" width={24} />,
	},
	{
		key: "faq",
		label: "FAQs",
		href: "/faq",
		Icon: <Icon icon="solar:question-circle-bold-duotone" width={24} />,
	},
	{
		key: "subscription",
		label: "Subscription & Billing",
		href: "/subscription",
		Icon: <Icon icon="solar:card-bold-duotone" width={24} />,
	},
	{
		key: "pricing",
		label: "Pricing",
		href: "/pricing",
		Icon: <Icon icon="solar:dollar-bold-duotone" width={24} />,
	},
];

export function Header({ breadcrumbs, user }: HeaderProps) {
	const menuLinks = user ? menuItemsLoggedIn("Ricardo") : menuItemsLogout;
	return (
		<div className="w-full">
			<Navbar
				isBlurred
				classNames={{
					item: "data-[active=true]:text-primary",
					wrapper: "px-4 sm:px-6",
				}}
				height="64px"
			>
				<NavbarBrand>
					<Link href="/">
						<Logo />
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
					{/* User Menu */}
					<NavbarItem className="px-2">
						<Dropdown placement="bottom-end" className="dark text-default-900">
							<DropdownTrigger>
								{user != null ? (
									<button
										className="mt-1 h-8 w-8 transition-transform"
										type="button"
									>
										<Badge
											color="success"
											content=""
											placement="bottom-right"
											shape="circle"
										>
											<Avatar
												size="sm"
												src="https://i.pravatar.cc/150?u=a04258114e29526708c"
											/>
										</Badge>
									</button>
								) : (
									<Button isIconOnly variant="flat">
										<Icon
											icon="solar:hamburger-menu-linear"
											width={22}
											className="text-default-900"
										/>
									</Button>
								)}
							</DropdownTrigger>
							<DropdownMenu variant="flat" className="dark" items={menuLinks}>
								{(menuLinks) => (
									<DropdownItem
										key={menuLinks.key}
										startContent={menuLinks.Icon}
										href={menuLinks.href}
									>
										{menuLinks.label}
									</DropdownItem>
								)}
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			<hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
		</div>
	);
}
