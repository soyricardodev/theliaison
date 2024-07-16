"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@theliaison/ui";
import { Button } from "@theliaison/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@theliaison/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { LoaderCircleIcon, MailIcon, SendIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { RegisterForm } from "~/app/(auth)/register/register-form";
import { signUpAction, verifyOtp } from "./actions";

const signUpSchema = z
	.object({
		email: z.string().email({ message: "Invalid Email Address" }),
		password: z
			.string()
			.min(8, { message: "Password is too short (min 8 characters)" }),
		"confirm-pass": z
			.string()
			.min(8, { message: "Password is too short (min 8 characters)" }),
	})
	.refine(
		(data) => {
			if (data["confirm-pass"] !== data.password) {
				return false;
			}
			return true;
		},
		{ message: "Password does't match", path: ["confirm-pass"] },
	);

export default function SignUp({ redirectTo }: { redirectTo: string }) {
	const { isPending, execute } = useServerAction(signUpAction);

	const queryString =
		typeof window !== "undefined" ? window.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	const verify = urlParams.get("verify");
	const existEmail = urlParams.get("email");

	const [isConfirmed, setIsConfirmed] = useState(verify === "true");
	const [verifyStatus, setVerifyStatus] = useState<string>("");
	const [isSendAgain, startSendAgain] = useTransition();
	const pathname = usePathname();
	const router = useRouter();
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			"confirm-pass": "",
		},
	});

	const inputOptClass = cn({
		"border-green-500": verifyStatus === "success",
		"border-red-500": verifyStatus === "failed",
	});

	async function onSubmit(values: z.infer<typeof signUpSchema>) {
		if (!isPending) {
			const [_data, err] = await execute({
				email: values.email,
				password: values.password,
			});

			if (err) {
				toast.error(err.message);
				return;
			}

			router.replace(`${pathname || "/"}?verify=true&email=${values.email}`);
			setIsConfirmed(true);
		}
	}

	return (
		<div className="whitespace-nowrap p-5 space-x-5 overflow-hidden items-center align-top">
			<RegisterForm redirectTo={redirectTo} />
			{/* verify email */}
			<div
				className={cn(
					"w-full inline-block h-80 text-wrap align-top  transform transition-all space-y-3",
					isConfirmed ? "-translate-x-[105%]" : "translate-x-0",
				)}
			>
				<div className="flex h-full items-center justify-center flex-col space-y-5">
					<SendIcon className="size-8" />

					<p className="text-2xl font-semibold text-center">Verify email</p>
					<p className="text-center text-sm">
						{" A verification code has been sent to "}
						<span className="font-bold">
							{verify === "true" ? existEmail : form.getValues("email")}
						</span>
					</p>

					<InputOTP
						pattern={REGEXP_ONLY_DIGITS}
						id="input-otp"
						maxLength={6}
						onChange={async (value) => {
							if (value.length === 6) {
								document.getElementById("input-otp")?.blur();
								const [data] = await verifyOtp({
									email: form.getValues("email"),
									otp: value,
								});
								if (data == null) return;
								const { error } = data;
								if (error) {
									setVerifyStatus("failed");
								} else {
									setVerifyStatus("success");
									router.push(redirectTo);
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
					<div className="text-sm flex gap-2">
						<p>Didn't work? </p>
						<button
							type="button"
							className="text-blue-400 cursor-pointer hover:underline transition-all flex items-center gap-2"
							onClick={async () => {
								if (!isSendAgain) {
									startSendAgain(async () => {
										if (!form.getValues("password")) {
											const [_data, err] = await execute({
												email: form.getValues("email"),
												password: form.getValues("password"),
											});

											if (err) {
												toast.error("Fail to resend email");
											} else {
												toast.success("Please check your email.");
											}
										} else {
											router.replace(pathname || "/register");
											form.setValue("email", existEmail || "");
											form.setValue("password", "");
											setIsConfirmed(false);
										}
									});
								}
							}}
						>
							<LoaderCircleIcon
								className={cn({
									hidden: !isSendAgain,
									"block animate-spin": isSendAgain,
								})}
							/>
							Send me another code.
						</button>
					</div>
					<Button
						type="submit"
						className="w-full h-8 flex items-center gap-2 -pl-4"
						onClick={async () => {
							setIsConfirmed(false);
						}}
					>
						<MailIcon className="size-5 -pl-2" />
						Change Email
					</Button>
				</div>
			</div>
		</div>
	);
}
