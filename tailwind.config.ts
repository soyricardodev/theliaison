import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";
import colors from "tailwindcss/colors";

const config = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{ts,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				tremor: {
					brand: {
						faint: colors.blue[50],
						muted: colors.blue[200],
						subtle: colors.blue[400],
						DEFAULT: colors.blue[500],
						emphasis: colors.blue[700],
						inverted: colors.white,
					},
					background: {
						muted: colors.gray[50],
						subtle: colors.gray[100],
						DEFAULT: colors.white,
						emphasis: colors.gray[700],
					},
					border: { DEFAULT: colors.gray[200] },
					ring: { DEFAULT: colors.gray[200] },
					content: {
						subtle: colors.gray[400],
						DEFAULT: colors.gray[500],
						emphasis: colors.gray[700],
						strong: colors.gray[900],
						inverted: colors.white,
					},
				},
			},
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
