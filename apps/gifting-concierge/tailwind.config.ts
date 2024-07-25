import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@theliaison/tailwind-config/web";

const config = {
	presets: [baseConfig],
	content: [
		...baseConfig.content,
		"../../packages/ui/**/*.{ts,tsx}",
		"../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)", ...fontFamily.sans],
				heading: ["var(--font-heading)", ...fontFamily.serif],
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		nextui({
			defaultTheme: "light",
			themes: {
				light: {
					colors: {
						background: "#FBFBFE",
						foreground: "#050315",
						primary: {
							DEFAULT: "#473F36",
							foreground: "#FFF8F5",
						},
						secondary: {
							DEFAULT: "#DBD0C5",
							foreground: "#282626",
						},
					},
				},
				dark: {
					colors: {
						background: "black",
						foreground: "#FBFBFE",
						primary: {
							DEFAULT: "#473F36",
							foreground: "#FFF8F5",
						},
						secondary: {
							DEFAULT: "#DBD0C5",
							foreground: "#282626",
						},
					},
				},
			},
		}),
	],
	darkMode: 'media',
} satisfies Config;

export default config;
