/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const giftingConciergeURL = "https://giftingconcierge.theliaison.vercel.app";

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@theliaison/ui", "@theliaison/supabase"],
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		loader: "custom",
		loaderFile: "./src/utils/supabase/image-loader.js",
	},
	async rewrites() {
		return [
			{
				source: "/gift",
				destination: giftingConciergeURL,
			},
			{
				source: "/gift/:path*",
				destination: `${giftingConciergeURL}/:path*`,
			},
			{
				source: "/giftshop",
				destination: `${giftingConciergeURL}/giftshop`,
			},
			{
				source: "/giftshop/:path*",
				destination: `${giftingConciergeURL}/giftshop/:path*`,
			},
			{
				source: "/:path*",
				destination: "/:path*",
			},
		]
	}
};

export default nextConfig;
