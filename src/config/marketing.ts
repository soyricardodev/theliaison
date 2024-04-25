import type { MainNavItem } from "~/components/nav-types";

type MarketingConfig = {
	mainNav: MainNavItem[];
};

export const marketingConfig: MarketingConfig = {
	mainNav: [
		{
			title: "Features",
			href: "/#features",
		},
		{
			title: "Pricing",
			href: "/pricing",
		},
		{
			title: "Blog",
			href: "/blog",
			disabled: true,
		},
	],
};
