import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://giftingconcierge.theliaison.vercel.app",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://giftingconcierge.theliaison.vercel.app/giftshop",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];
}
