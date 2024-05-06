"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { signInWithEmailSchema, signUpSchema } from "~/utils/validators/auth";

export type FormState = {
	message: string;
	fields?: Record<string, string>;
	issues?: string[];
};

export async function login(formData: FormData) {
	const formDataEntries = Object.fromEntries(formData);
	const parsed = signInWithEmailSchema.safeParse(formDataEntries);

	if (!parsed.success) {
		return { message: "Invalid types" };
	}

	const supabase = createClient();

	const data = parsed.data;

	try {
		const {
			data: { user },
			error,
		} = await supabase.auth.signInWithPassword(data);

		if (error || !user) {
			return { message: "Failed to login" };
		}

		revalidatePath("/", "layout");
		redirect("/explore");
	} catch (error) {
		return { message: "Failed to login" };
	}
}

export async function signInWithOAuth() {
	const supabase = createClient();

	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: "/explore",
		},
	});

	if (error) {
		return { message: "Failed t" };
	}

	revalidatePath("/", "layout");
	redirect("/explore");
}

export async function signup(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const formDataEntries = Object.fromEntries(formData);
	const parsed = signUpSchema.safeParse(formDataEntries);

	if (!parsed.success) {
		const fields: Record<string, string> = {};
		for (const key of Object.keys(formDataEntries)) {
			fields[key] = formDataEntries[key]!.toString();
		}
		return {
			message: "Invalid form data",
			fields,
			issues: parsed.error.issues.map((issue) => issue.message),
		};
	}

	const supabase = createClient();

	const data = parsed.data;

	try {
		const {
			data: { user },
			error,
		} = await supabase.auth.signUp(data);

		if (error || !user) {
			return { message: "Failed to sign up" };
		}

		revalidatePath("/", "layout");
		redirect(`/signup/confirm/${user.email}`);
	} catch (error) {
		return { message: "Failed to sign up" };
	}
}
