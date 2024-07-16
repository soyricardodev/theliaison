import { createClient } from "~/supabase/server";
import { redirect } from "next/navigation";
import { Input, Button } from "@nextui-org/react";

export default function Verify({
	searchParams,
}: { searchParams: { email: string } }) {
	const email = searchParams.email
		.replace(/%40/g, "@")
		.replace(/%2D/g, "-")
		.replace(/%5F/g, "_")
		.replace(/%2E/g, ".");

	const verifyOTPAction = async (formData: FormData) => {
		"use server";
		const otp = formData.get("otp") as string;
		const supabase = createClient();

		const { error, data } = await supabase.auth.verifyOtp({
			email,
			token: otp,
			type: "email",
		});

		console.log({ error, data });
		if (!error) redirect("/profile");
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-[calc(100vh-100px)] mx-auto">
			<div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white/30 backdrop-blur-3xl px-8 pb-10 pt-6 shadow-sm">
				<p className="pb-2 text-xl font-medium">Verify Email</p>
				<form action={verifyOTPAction} className="flex flex-col gap-3">
					<p>
						Please enter the OTP sent to your email address:{" "}
						<strong>{email}</strong>
					</p>
					<Input
						type="text"
						name="otp"
						variant="bordered"
						label="OTP"
						placeholder="Enter your OTP"
					/>
					<Button type="submit" color="primary" startContent={<MailIcon />}>
						Verify
					</Button>
				</form>
			</div>
		</div>
	);
}

function MailIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			aria-hidden="true"
			className="text-2xl"
		>
			<path
				fill="currentColor"
				d="M2 11.25C2 8.35 4.015 6 6.5 6S11 8.35 11 11.25V20H4.233C3 20 2 18.834 2 17.395z"
				opacity={0.5}
			/>
			<path
				fill="currentColor"
				d="M11 11.25V20h8.793C21.012 20 22 18.847 22 17.425V11.25C22 8.35 19.985 6 17.5 6h-11C8.985 6 11 8.35 11 11.25"
				opacity={0.8}
			/>
			<path
				fill="currentColor"
				d="M9.5 20v2a.75.75 0 0 0 1.5 0v-2zm5.5 0h-1.5v2a.75.75 0 0 0 1.5 0z"
			/>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M4.25 16a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75m13.135-9.415l.256-.052a2.181 2.181 0 0 1 1.24.115c.69.277 1.446.328 2.165.148l.061-.015c.524-.131.893-.618.893-1.178v-2.13c0-.738-.664-1.282-1.355-1.109c-.396.1-.812.071-1.193-.081l-.073-.03a3.517 3.517 0 0 0-2-.185l-.449.09c-.54.108-.93.6-.93 1.17v6.953c0 .397.31.719.692.719a.706.706 0 0 0 .693-.72z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
