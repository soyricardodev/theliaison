/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import { env } from "./src/env.js";

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
				source: "/:path*",
				destination: "/:path*",
			},
			{
				source: "/gift",
				destination: env.GIFTING_CONCIERGE_URL,
			},
			{
				source: "/gift/:path*",
				destination: `${env.GIFTING_CONCIERGE_URL}/:path*`,
			},
			{
				source: "/giftshop",
				destination: `${env.GIFTING_CONCIERGE_URL}/giftshop`,
			},
			{
				source: "/giftshop/:path*",
				destination: `${env.GIFTING_CONCIERGE_URL}/giftshop/:path*`,
			},
		]
	}
};

export default nextConfig;
