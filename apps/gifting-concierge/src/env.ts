import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		STRIPE_SECRET_KEY: z.string(),
		STRIPE_WEBHOOK_SECRET: z.string(),
		SUPABASE_SERVICE_ROLE_KEY: z.string(),
		OPENAI_API_KEY: z.string(),
		FEDEX_TEST_API_KEY: z.string(),
		FEDEX_TEST_SECRET_KEY: z.string(),
		FEDEX_ACCOUNT_NUMBER: z.string(),
		FEDEX_ACCESS_TOKEN: z.string(),
		FEDEX_TEST_TRACKING_API_KEY: z.string(),
		FEDEX_TEST_TRACKING_SECRET_KEY: z.string(),
		RESEND_DOMAIN: z.string(),
		RESEND_API_KEY: z.string(),
		NODE_ENV: z.enum(["development", "test", "production"]),
		STRIPE_GIFTING_CONCIERGE_PRODUCT_ID: z.string(),
	},
	client: {
		NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
		NEXT_PUBLIC_PROJECT_ID: z.string(),
		NEXT_PUBLIC_GOOGLE_API_KEY: z.string(),
		NEXT_PUBLIC_COUNTRY_TOKEN: z.string(),
		NEXT_PUBLIC_COUNTRY_EMAIL: z.string(),
	},
	skipValidation: true,

	emptyStringAsUndefined: true,

	experimental__runtimeEnv: {
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
		NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
		NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
		NEXT_PUBLIC_COUNTRY_TOKEN: process.env.NEXT_PUBLIC_COUNTRY_TOKEN,
		NEXT_PUBLIC_COUNTRY_EMAIL: process.env.NEXT_PUBLIC_COUNTRY_EMAIL,
	},
});
