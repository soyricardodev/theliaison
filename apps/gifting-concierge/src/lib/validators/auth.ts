import { z } from "zod";

export const signUpSchema = z.object({
	fullName: z
		.string()
		.min(2, { message: "Your name should be at least 2 characters" }),
	email: z.string().email({ message: "Invalid Email Address" }),
	password: z
		.string()
		.min(8, { message: "Password is too short (min 8 characters)" }),
});

export const simpleSignUpSchema = z.object({
	email: z.string().email({ message: "Invalid Email Address" }),
	password: z
		.string()
		.min(8, { message: "Password is too short (min 8 characters)" }),
});

export const verifyOtpSchema = z.object({
	email: z.string().email({ message: "Invalid Email Address" }),
	otp: z.string().min(6, { message: "Invalid OTP" }),
});

export const signInWithEmailSchema = z.object({
	email: z.string().email({ message: "Invalid Email Address" }),
	password: z
		.string()
		.min(8, { message: "Password is too short (min 8 characters)" }),
});
