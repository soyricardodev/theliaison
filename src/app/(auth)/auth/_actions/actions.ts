"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "~/utils/supabase/server";

export async function login(formData: FormData) {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return redirect("/signup");
	}

	revalidatePath("/", "layout");
	redirect("/explore");
}

export async function signOauth(formData: FormData) {
	const supabase = createClient();

	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: "/explore",
		},
	});

	if (error) {
		return redirect("/auth/error");
	}

	revalidatePath("/", "layout");
	redirect("/explore");
}

export async function signup(formData: FormData) {
	const supabase = createClient();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const data = {
		email,
		password,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		return redirect("/auth/error");
	}

	revalidatePath("/", "layout");
	redirect(`/signup/confirm/${email}`);
}
