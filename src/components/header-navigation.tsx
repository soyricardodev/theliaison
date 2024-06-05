"use client";

import { Avatar } from "@nextui-org/react";
import {
	CircleDollarSignIcon,
	CircleHelp,
	CircleUserRound,
	CreditCardIcon,
	LogOutIcon,
	MenuIcon,
	UserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const menuItemsLoggedOut = [
	{
		key: "login",
		label: "Login",
		href: "/login",
		Icon: <UserRoundIcon className="text-foreground size-4 mr-2" />,
	},
	{
		key: "signup",
		label: "Sign Up",
		href: "/signup",
		Icon: <CircleUserRound className="text-foreground size-4 mr-2" />,
	},
	{
		key: "faq",
		label: "FAQs",
		href: "/faq",
		Icon: <CircleHelp className="text-foreground size-4 mr-2" />,
	},
	{
		key: "pricing",
		label: "Pricing",
		href: "/pricing",
		Icon: <CircleDollarSignIcon className="text-foreground size-4 mr-2" />,
	},
];

const menuItemsLoggedIn = (username: string) => [
	{
		key: "profile",
		label: "Profile",
		href: `/${username}`,
		Icon: <UserRoundIcon className="text-foreground size-4 mr-2" />,
	},
	{
		key: "subscription",
		label: "Subscription & Billing",
		href: "/subscription",
		Icon: <CreditCardIcon className="text-foreground size-4 mr-2" />,
	},
	{
		key: "logout",
		label: "Logout",
		href: "/auth/logout",
		Icon: (
			<LogOutIcon
				className="text-foreground size-4 mr-2"
				onClick={() => fetch("/auth/signout", { method: "POST" })}
			/>
		),
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
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar
					size="sm"
					src={avatar_url ?? ""}
					name={full_name}
					color="primary"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-content1">
				{menuLinks.map((menuLink) => (
					<DropdownMenuItem asChild key={menuLink.key}>
						<Link
							href={menuLink.href}
							className="hover:cursor-pointer hover:bg-content2"
						>
							{menuLink.Icon}
							{menuLink.label}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function HeaderNavigationLoggedOut() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="rounded-full">
					<MenuIcon width={20} className="text-primary" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-content1">
				{menuItemsLoggedOut.map((menuLink) => (
					<DropdownMenuItem asChild key={menuLink.key}>
						<Link
							href={menuLink.href}
							className="hover:cursor-pointer hover:bg-content2"
						>
							{menuLink.Icon}
							{menuLink.label}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
