"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";

import { Resend } from "resend";
import { z } from "zod";
import { createServerAction } from "zsa";
import SupaAuthVerifyEmail from "~/emails";
import { env } from "~/env";
import supabaseAdmin from "~/supabase/admin";
import { simpleSignUpSchema, verifyOtpSchema } from "~/lib/validators/auth";

export const verifyOtp = createServerAction()
	.input(verifyOtpSchema)
	.handler(async ({ input }) => {
		const supabase = createClient();
		console.log("here is verifyotp");

		const { data, error } = await supabase.auth.verifyOtp({
			email: input.email,
			token: input.otp,
			type: "email",
		});

		return {
			data,
			error,
		};
	});

export const signInWithEmail = createServerAction()
	.input(
		z.object({
			email: z.string().email({ message: "Invalid email address" }),
			password: z.string().min(6, { message: "Invalid password" }),
			redirectTo: z.string().optional(),
		}),
	)
	.onSuccess(({ args }) => {
		revalidatePath("/", "layout");
		redirect(args.redirectTo ?? "/");
	})
	.onError((error) => {
		return error as string;
	})
	.handler(async ({ input }) => {
		const supabase = createClient();

		const { error } = await supabase.auth.signInWithPassword({
			email: input.email,
			password: input.password,
		});

		console.log(error);
		if (error) throw new Error(error.message);
	});

export const signUpAction = createServerAction()
	.input(simpleSignUpSchema)
	.handler(async ({ input }) => {
		const supabase = supabaseAdmin();
		// const resend = new Resend(env.RESEND_API_KEY);

		const res = await supabase.auth.signInWithOtp({
			email: input.email,
		});

		console.log({ res });

		// if (res.data.properties?.email_otp) {
		// 	await resend.emails.send({
		// 		from: `The Liaison <noreply@${env.RESEND_DOMAIN}>`,
		// 		to: [input.email],
		// 		subject: "Verify Email Address for The Liaison",
		// 		react: SupaAuthVerifyEmail({
		// 			verificationCode: res.data.properties?.email_otp,
		// 		}),
		// 	});
		// }

		if (res.error) throw new Error(res.error.message);

		redirect(`/register/confirm/${input.email}`);
	});
