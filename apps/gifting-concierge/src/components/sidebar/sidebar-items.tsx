import type { SidebarItem } from "./sidebar";

export const sectionItems: SidebarItem[] = [
	{
		key: "overview",
		title: "Overview",
		items: [
			{
				key: "home",
				href: "/dashboard",
				icon: "solar:home-2-linear",
				title: "Home",
			},
			{
				key: "gifts",
				href: "/dashboard/gifts",
				icon: "solar:widget-2-outline",
				title: "Gifts List",
			},
			{
				key: "gifting-concierge",
				href: "/dashboard/gifting-concierge",
				icon: "solar:checklist-minimalistic-outline",
				title: "Gifting Concierge",
			},
		],
	},
];

export const sectionItemsWithTeams: SidebarItem[] = [...sectionItems];
