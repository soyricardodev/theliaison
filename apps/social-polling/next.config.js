/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

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
};

export default nextConfig;
