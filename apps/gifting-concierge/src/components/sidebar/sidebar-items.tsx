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
			{
				key: "team",
				href: "/dashboard/team",
				icon: "solar:users-group-two-rounded-outline",
				title: "Team",
			},
			{
				key: "tracker",
				href: "/dashboard/tracker",
				icon: "solar:sort-by-time-linear",
				title: "Tracker",
			},
		],
	},
	{
		key: "organization",
		title: "Organization",
		items: [
			{
				key: "cap_table",
				href: "/dashboard/cap-table",
				title: "Cap Table",
				icon: "solar:pie-chart-2-outline",
			},
			{
				key: "analytics",
				href: "/dashboard/analytics",
				icon: "solar:chart-outline",
				title: "Analytics",
			},

			{
				key: "settings",
				href: "/dashboard/settings",
				icon: "solar:settings-outline",
				title: "Settings",
			},
		],
	},
];

export const sectionItemsWithTeams: SidebarItem[] = [...sectionItems];
