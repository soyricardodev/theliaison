"use client";

import React from "react";

import { cn } from "@theliaison/ui";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@theliaison/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyOtp } from "~/components/auth/actions";

export function VerifyOtp({ email }: { email: string }) {
	const [verifyStatus, setVerifyStatus] = React.useState<
		"success" | "failed"
	>();
	const router = useRouter();

	const inputOptClass = cn({
		"border-green-500": verifyStatus === "success",
		"border-red-500": verifyStatus === "failed",
	});
	return (
		<div
			className={
				"w-full inline-block h-80 text-wrap align-top  transform transition-all space-y-3"
			}
		>
			<div className="flex h-full items-center justify-center flex-col space-y-5 text-white">
				<SendIcon className="size-8" />

				<p className="text-2xl font-semibold text-center">Verify email</p>
				<p className="text-center text-sm">
					{" A verification code has been sent to "}
					<span className="font-bold">{email}</span>
				</p>

				<InputOTP
					pattern={REGEXP_ONLY_DIGITS}
					id="input-otp"
					maxLength={6}
					onChange={async (value) => {
						if (value.length === 6) {
							document.getElementById("input-otp")?.blur();
							const [data] = await verifyOtp({
								email,
								otp: value,
							});
							if (data == null) return;
							const { error } = data;
							if (error) {
								setVerifyStatus("failed");
								toast.error("Invalid OTP");
							} else {
								setVerifyStatus("success");
								router.push("/");
							}
						}
					}}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} className={inputOptClass} />
						<InputOTPSlot index={1} className={inputOptClass} />
						<InputOTPSlot index={2} className={inputOptClass} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} className={inputOptClass} />
						<InputOTPSlot index={4} className={inputOptClass} />
						<InputOTPSlot index={5} className={inputOptClass} />
					</InputOTPGroup>
				</InputOTP>
			</div>
			{verifyStatus}
		</div>
	);
}
