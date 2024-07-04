"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~/supabase/server";

import { createServerAction } from "zsa";
import { z } from "zod";
import supabaseAdmin from "~/supabase/admin";
import { Resend } from "resend";
import { env } from "~/env";
import SupaAuthVerifyEmail from "~/emails";

export const verifyOtp = createServerAction()
	.input(
		z.object({
			email: z.string().email({ message: "Invalid email address" }),
			otp: z.string().min(6, { message: "Invalid OTP" }),
		}),
	)
	.output(z.string())
	.handler(async ({ input }) => {
		const supabase = createClient();

		const res = await supabase.auth.verifyOtp({
			email: input.email,
			token: input.otp,
			type: "email",
		});

		return JSON.stringify(res);
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
	.input(
		z.object({
			email: z.string().email({ message: "Invalid email address" }),
			password: z.string().min(6, { message: "Invalid password" }),
		})
	)
	.handler(async ({ input }) => {
		const supabase = supabaseAdmin();
		const resend = new Resend(env.RESEND_API_KEY);

		const res = await supabase.auth.admin.generateLink({
			type: "signup",
			email: input.email,
			password: input.password,
		});

		if (res.data.properties?.email_otp) {
			await resend.emails.send({
				from: `The Liaison <support@${env.RESEND_DOMAIN}>`,
				to: [input.email],
				subject: "Verify Email",
				react: SupaAuthVerifyEmail({
					verificationCode: res.data.properties?.email_otp,
				}),
			});
		}

		if (res.error) throw new Error(res.error.message);
	});
