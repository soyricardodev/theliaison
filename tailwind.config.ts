import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

const config = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{ts,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)", ...fontFamily.sans],
			},
			animation: {
				gradient: "gradient 8s linear infinite",
				"scrolling-banner": "scrolling-banner var(--duration) linear infinite",
				"scrolling-banner-vertical":
					"scrolling-banner-vertical var(--duration) linear infinite",
			},
			keyframes: {
				gradient: {
					to: {
						backgroundPosition: "var(--bg-size) 0",
					},
				},
				"scrolling-banner": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-50% - var(--gap)/2))" },
				},
				"scrolling-banner-vertical": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(calc(-50% - var(--gap)/2))" },
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-animate"),
		nextui(),
	],
} satisfies Config;

export default config;
