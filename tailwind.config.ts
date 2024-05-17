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
			},
			keyframes: {
				gradient: {
					to: {
						backgroundPosition: "var(--bg-size) 0",
					},
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
