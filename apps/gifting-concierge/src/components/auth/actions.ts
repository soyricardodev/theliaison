"use server";

import type { AuthError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";

export const verifyOtp = async (data: {
	email: string;
	otp: string;
	type: string;
}) => {
	const supabase = createClient();

	const res = await supabase.auth.verifyOtp({
		email: data.email,
		token: data.otp,
		type: "email",
	});
	return JSON.stringify(res);
};

export async function signInWithEmail({
	email,
	password,
	redirectTo,
}: { email: string; password: string; redirectTo?: string }): Promise<
	string | undefined
> {
	const supabase = createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		console.log(error);
		return error.message;
	}

	revalidatePath("/", "layout");
	redirect(redirectTo ?? "/");
}
