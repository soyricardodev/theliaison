import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@theliaison/tailwind-config/web";

const config = {
  presets: [baseConfig],
  content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
