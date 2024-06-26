import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createClient } from "~/utils/supabase/server";

export async function POST(req: NextRequest) {
	const supabase = createClient();

	// Check if a user's logged in
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		await supabase.auth.signOut();
	}

	revalidatePath("/", "layout");
	return NextResponse.redirect(new URL("/auth/signin", req.url), {
		status: 302,
	});
}
