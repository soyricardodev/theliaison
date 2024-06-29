import SupaAuthVerifyEmail from "~/emails";
import supabaseAdmin from "~/supabase/admin";

import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
	// * TODO: rate limit

	const data = await request.json();
	const supabase = supabaseAdmin();

	const res = await supabase.auth.admin.generateLink({
		type: "signup",
		email: data.email,
		password: data.password,
	});

	if (res.data.properties?.email_otp) {
		// resend email
		const resendRes = await resend.emails.send({
			from: `The Liaison <support@${env.RESEND_DOMAIN}>`,
			to: [data.email],
			subject: "Verify Email",
			react: SupaAuthVerifyEmail({
				verificationCode: res.data.properties?.email_otp,
			}),
		});
		return Response.json(resendRes);
	}
	return Response.json({ data: null, error: res.error });
}
