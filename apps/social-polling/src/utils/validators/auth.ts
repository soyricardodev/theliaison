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
	name: z
		.string({ required_error: "Please enter your full name" })
		.min(2, { message: "Your name should be at least 2 characters" }),
	username: z
		.string()
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: "Username must only contain letters, numbers, and underscores.",
		})
		.min(3, {
			message: "Username must be at least 3 characters.",
		}),
	gender: z.enum(["female", "male", "other"]),
	dob: z.date({
		required_error: "A date of birth is required.",
	}),
	maritalStatus: z.enum([
		"single",
		"married",
		"divorced",
		"widowed",
		"separated",
		"loving relationship",
	]),
	country: z.string().regex(/^[a-zA-Z]{2}$/, {
		message: "Country must be a valid ISO 3166-1 alpha-2 code.",
	}),
	city: z.string(),
});

export type SignUp = z.infer<typeof signUpSchema>;

export const simpleSignUpSchema = z.object({
	email: z
		.string({ required_error: "Please enter your email" })
		.email({ message: "Email is invalid." }),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
	name: z
		.string({ required_error: "Please enter your full name" })
		.min(2, { message: "Your name should be at least 2 characters" }),
	username: z
		.string()
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: "Username must only contain letters, numbers, and underscores.",
		})
		.min(3, {
			message: "Username must be at least 3 characters.",
		}),
});

export type SimpleSignUp = z.infer<typeof simpleSignUpSchema>;
