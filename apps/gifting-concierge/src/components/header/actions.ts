"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";

export async function signOut() {
	const supabase = createClient();

	const { error } = await supabase.auth.signOut();

	console.error(error);

	revalidatePath("/", "layout");
	redirect("/login");
}
