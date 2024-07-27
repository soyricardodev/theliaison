"use client";

import Link from "next/link";

//import { Button } from "@theliaison/ui/button";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import { Button, Input } from "@nextui-org/react";
import { Label } from "@theliaison/ui/label";
import { createClient } from "~/supabase/client";
import { redirect } from "next/navigation";

export function LoginForm() {

	const [login, setLogin ] = useState<boolean>(false)
	const [email, setEmail ] = useState<string>('')

	const signInWithEmailAction = async (formData: FormData) => {
		const email = formData.get("email") as string;
		const supabase = createClient();

		const { error } = await supabase.auth.signInWithOtp({
			email,
		});

		if (error) {
			console.log(error);
		}

		//redirect(`/login/verify?email=${email}`);
		setEmail(email)
		setLogin(true)
	};

	return (
		<>
		{
			login ? <VerifyOTP email={email}/> : 
			<Card className="mx-auto max-w-sm backdrop-blur-2xl bg-white/20 border-transparent shadow-sm">
				<CardHeader>
					<CardTitle className="text-2xl text-black">Login</CardTitle>
					<CardDescription className="text-black">
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={signInWithEmailAction}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label className="text-black" htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="m@example.com"
								className="border-black text-black placeholder:text-black/90"
								required
							/>
						</div>
						<Button type="submit" className="w-full bg-black">
							Login
						</Button>
					</div>
					</form>
				</CardContent>
			</Card>

		}
		</>
	);
}

function VerifyOTP({email}:{email: string}) {

	const [verify, setVerify ] = useState<boolean>(false)

	const verifyOTPAction = async (formData: FormData) => {
		
		const otp = formData.get("otp") as string;
		const supabase = createClient();

		const { error, data } = await supabase.auth.verifyOtp({
			email,
			token: otp,
			type: "email",
		});
		console.log('hola')

		console.log({ error, data });
		if (!error) setVerify(true)
	};
	return(
		<>
		{
			verify ? <h1>Verify Email</h1> :
		<Card className="mx-auto max-w-sm backdrop-blur-2xl bg-white/20 border-transparent shadow-sm">
			<CardHeader>
				<CardTitle className="text-2xl text-black">Verify Email</CardTitle>
				<CardDescription className="text-black">
				Please enter the OTP sent to your email address
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={verifyOTPAction}>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Input
							id="email"
							type="text"
							name="otp"
							placeholder="Enter your OTP"
							className="border-black text-black placeholder:text-black/90"
							required
						/>
					</div>
					{/* <div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link href="#" className="ml-auto inline-block text-sm text-black underline">
								Forgot your password?
							</Link>
						</div> */}
					<Button type="submit" className="w-full bg-black">
						Verify
					</Button>
				</div>
				</form>
			</CardContent>
		</Card>
		}
		</>
	)
}
