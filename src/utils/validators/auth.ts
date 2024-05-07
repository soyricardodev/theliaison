import { count } from "console";
import { z } from "zod";

export const signInWithEmailSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type SignInWithEmail = z.infer<typeof signInWithEmailSchema>;

export const signUpSchema = z.object({
	email: z
		.string({ required_error: "Please enter your email" })
		.email({ message: "Email is invalid." }),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
	name: z.string({ required_error: "Please enter your full name" }),
	username: z
		.string()
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: "Username must only contain letters, numbers, and underscores.",
		})
		.min(3, {
			message: "Username must be at least 3 characters.",
		}),
	gender: z.enum(["male", "female", "other"]),
	dob: z.date({
		required_error: "A date of birth is required.",
	}),
	maritalStatus: z.enum([
		"single",
		"married",
		"divorced",
		"widowed",
		"separated",
		"in relationship",
	]),
	country: z.string().regex(/^[a-zA-Z]{2}$/, {
		message: "Country must be a valid ISO 3166-1 alpha-2 code.",
	}),
	city: z.string(),
});

export type SignUp = z.infer<typeof signUpSchema>;
