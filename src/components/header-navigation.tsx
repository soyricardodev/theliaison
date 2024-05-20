"use client";

import { Icon } from "@iconify/react";
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

const menuItemsLoggedOut = [
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

type HeaderNavigationProps =
	| {
			isLoggedIn: true;
			username: string;
			avatar_url: string | null;
			full_name: string;
	  }
	| {
			isLoggedIn: false;

			username?: never;
			avatar_url?: never;
			full_name?: never;
	  };

export function HeaderNavigation(props: HeaderNavigationProps) {
	const { isLoggedIn } = props;

	if (!isLoggedIn) return <HeaderNavigationLoggedOut />;

	const { username, avatar_url, full_name } = props;

	const menuLinks = menuItemsLoggedIn(username);

	return (
		<Dropdown placement="bottom-end" className="dark text-default-900">
			<DropdownTrigger>
				<button className="mt-1 h-8 w-8 transition-transform" type="button">
					<Avatar
						size="sm"
						src={avatar_url ?? ""}
						name={full_name}
						showFallback
					/>
				</button>
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
	);
}

function HeaderNavigationLoggedOut() {
	return (
		<Dropdown placement="bottom-end" className="dark text-default-900">
			<DropdownTrigger>
				<Button isIconOnly variant="flat">
					<Icon
						icon="solar:hamburger-menu-linear"
						width={22}
						className="text-default-900"
					/>
				</Button>
			</DropdownTrigger>
			<DropdownMenu variant="flat" className="dark" items={menuItemsLoggedOut}>
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
	);
}
