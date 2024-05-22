"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import {
	type SignInWithEmail,
	type SignUp,
	type SimpleSignUp,
	signInWithEmailSchema,
	signUpSchema,
	simpleSignUpSchema,
} from "~/utils/validators/auth";

export type FormState = {
	message: string;
	fields?: Record<string, string>;
	issues?: string[];
};

export async function login(data: SignInWithEmail) {
	const supabase = createClient();

	try {
		const {
			data: { user },
			error,
		} = await supabase.auth.signInWithPassword(data);

		if (error || !user) {
			throw new Error("Failed to login. Check your credentials.");
		}

		revalidatePath("/", "layout");
		redirect("/explore");
	} catch (error) {
		throw new Error("Failed to login. Check your credentials.");
	}
}

export async function signInWithOAuth() {
	const supabase = createClient();

	const { error, data } = await supabase.auth.signInWithOAuth({
		provider: "google",
	});

	console.log(error, data);

	if (error) {
		return { message: "Failed t" };
	}

	revalidatePath("/", "layout");
	redirect(data.url);

	//redirect("/explore");
}

export async function signup(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const formDataEntries = Object.fromEntries(formData);
	const parsed = signUpSchema.safeParse(formDataEntries);

	console.log({ parsed });
	if (!parsed.success) {
		const fields: Record<string, string> = {};
		for (const key of Object.keys(formDataEntries)) {
			const value = formDataEntries[key];
			if (value != null) {
				fields[key] = value.toString();
			}
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

export async function signupLean({
	name,
	email,
	username,
	password,
	country,
	city,
	gender,
	maritalStatus,
	dob,
}: SignUp) {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.signUp({
		email,
		password,
	});

	if (error || !user) {
		throw new Error("Failed to sign up");
	}

	const userYear = dob.getFullYear();
	const userMonth = dob.getMonth() + 1;
	const userDay = dob.getDate();

	const dateToInsert = `${userYear}-${userMonth
		.toString()
		.padStart(2, "0")}-${userDay.toString().padStart(2, "0")}`;

	const { data: profileUpdated, error: profileError } = await supabase
		.from("users")
		.insert({
			id: user.id,
			full_name: name,
			username,
			country,
			city,
			gender,
			marital_status: maritalStatus,
			birthday_date: String(dateToInsert),
		})
		.select();

	if (!profileUpdated || profileError) {
		throw new Error("Cannot create profile");
	}

	revalidatePath("/", "layout");
	return profileUpdated;
}

export async function simpleSignupAction({
	name,
	email,
	username,
	password,
}: SimpleSignUp) {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.signUp({
		email,
		password,
	});

	if (error || !user) {
		throw new Error("Failed to sign up");
	}

	const { data: profileUpdated, error: profileError } = await supabase
		.from("users")
		.insert({
			id: user.id,
			full_name: name,
			username,
		})
		.select();

	if (!profileUpdated || profileError) {
		throw new Error("Cannot create profile");
	}

	revalidatePath("/", "layout");
	return profileUpdated;
}
