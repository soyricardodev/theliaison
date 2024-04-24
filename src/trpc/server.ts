import "server-only";

import { headers, cookies } from "next/headers";
import { cache } from "react";
import { createServerClient } from "@supabase/ssr";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { env } from "~/env";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
	const heads = new Headers(headers());
	heads.set("x-trpc-source", "rsc");

	const cookieStore = cookies();

	const supabase = createServerClient(
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

	return createTRPCContext({
		supabase,
		headers: heads,
	});
});

export const api = createCaller(createContext);
