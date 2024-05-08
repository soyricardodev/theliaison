"use client";

import { useState } from "react"
import Image from "next/image";
import Link from "next/link";
import { logoBlack } from "~/assets/images";
import { login } from "../actions"
import { signInWithOAuth } from "~/utils/auth-helpers/client"

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Signin() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitOauth = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await signInWithOAuth(e);
    setIsSubmitting(false);
  }

	return (
		<div className="container flex flex-col items-center justify-center h-[calc(100vh-120px)]">
			<div className="mx-auto flex w-full flex-col justify-center sm:w-[350px] gap-6">
				<div className="flex flex-col text-center gap-1.5">
					<Image
						alt="logo"
						src={logoBlack}
						height={40}
						width={40}
						className="mx-auto"
					/>
					<h1 className="text-2xl font-semibold tracking-tight">
						Welcome back
					</h1>
					<p className="text-sm text-muted-foreground">
						Enter your email to log in to your account
					</p>
				</div>
				<form className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link
								href="/forgot-password"
								className="ml-auto inline-block text-sm underline"
							>
								Forgot your password?
							</Link>
						</div>
						<Input id="password" name="password" type="password" required />
					</div>
					<Button type="submit" className="w-full h-10">
						Log in
					</Button>
				</form>
				<form className="pb-2" onSubmit={e => handleSubmitOauth(e)}>
					<input type="hidden" name="provider" value="google" />
					<Button disabled={isSubmitting} type="submit" className="w-full h-10" variant="outline">
						<span className="mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="#000000"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z"
									strokeWidth="0"
									fill="currentColor"
								/>
							</svg>
						</span>
						<span>Sign in with Google</span>
					</Button>
				</form>
				<p className="text-center text-sm text-muted-foreground">
					<Link
						href="/signup"
						className="hover:text-brand underline underline-offset-4"
					>
						Don&apos;t have an account? Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
