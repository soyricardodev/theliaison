/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "vercel.com",
			},
		],
		loader: "custom",
		loaderFile: "./src/utils/supabase/image-loader.js",
	},
};

export default process.env.ANALYZE === "true"
	? withBundleAnalyzer()(nextConfig)
	: nextConfig;
