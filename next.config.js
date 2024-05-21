/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import million from "million/compiler";
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

const millionConfig = {
	auto: {
		rsc: true,
	},
	rsc: true,
};

const millionNextConfig = million.next(nextConfig, millionConfig);

export default process.env.ANALYZE === "true"
	? withBundleAnalyzer()(nextConfig)
	: process.env.MILLION_BUILD === "true"
		? millionNextConfig
		: nextConfig;
