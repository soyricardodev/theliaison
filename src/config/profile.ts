import type { MainNavItem, SidebarNavItem } from "~/components/nav-types";

type ProfileConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};

export const profileConfig: ProfileConfig = {
	mainNav: [
		{
			title: "Link",
			href: "/#",
			disabled: true,
		},
		{
			title: "Support",
			href: "/#",
			disabled: true,
		},
	],
	sidebarNav: [
		{
			title: "Profile",
			href: "/profile",
			icon: "post",
		},
		{
			title: "Account",
			href: "/profile/account",
			icon: "billing",
		},
		{
			title: "Notifications",
			href: "/profile/notifications",
			icon: "check",
		},
	],
};
