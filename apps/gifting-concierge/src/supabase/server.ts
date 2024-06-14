import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@theliaison/supabase/database-types";

import { env } from "~/env";

export function createClient() {
	const cookieStore = cookies();

	return createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
			},
		},
	);
}
