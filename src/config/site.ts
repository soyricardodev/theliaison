export interface SiteConfig {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	links: {
		twitter: string;
		github: string;
	};
}

export const siteConfig: SiteConfig = {
	name: "The Liaison",
	description:
		"Liaison is a web application that allows users to create polls and vote on them.",
	url: "https://theliaison.vercel.app",
	ogImage: "https://theliaison.vercel.app/og.png",
	links: {
		twitter: "https://x.com/theliaison",
		github: "https://github.com/soyricardodev/polling-liaison",
	},
};
