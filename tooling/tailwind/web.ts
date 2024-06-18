import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

import base from "./base";

export default {
	content: base.content,
	presets: [base],
	theme: {
		transparent: "transparent",
		current: "currentColor",
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
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
				grid: {
					"0%": { transform: "translateY(-50%)" },
					"100%": { transform: "translateY(0)" },
				},
				"border-beam": {
					"100%": {
						"offset-distance": "100%",
					},
				},
				"image-glow": {
					"0%": {
						content: "var(--tw-content)",
						opacity: "0",
						"animation-timing-function": "cubic-bezier(.74,.25,.76,1)",
					},
					"10%": {
						content: "var(--tw-content)",
						opacity: ".7",
						"animation-timing-function": "cubic-bezier(.12,.01,.08,.99)",
					},
					"100%": {
						content: "var(--tw-content)",
						opacity: ".4",
					},
				},
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - var(--gap)))" },
				},
				"marquee-vertical": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(calc(-100% - var(--gap)))" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				gradient: "gradient 8s linear infinite",
				"scrolling-banner": "scrolling-banner var(--duration) linear infinite",
				"scrolling-banner-vertical":
					"scrolling-banner-vertical var(--duration) linear infinite",
				grid: "grid 15s linear infinite",
				"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
				"image-glow": "image-glow 4.1s ease-out .6s forwards;",
				marquee: "marquee var(--duration) linear infinite",
				"marquee-vertical": "marquee-vertical var(--duration) linear infinite",
			},
		},
	},
	plugins: [animate],
} satisfies Config;
