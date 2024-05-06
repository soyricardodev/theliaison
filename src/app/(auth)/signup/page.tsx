import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { logoBlack } from "~/assets/images";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
	title: "Create an account",
	description: "Create an account to get started.",
};

export default function RegisterPage() {
	return (
		<div className="container grid h-[calc(100vh-8px)] w-screen flex-col items-center justify-center lg:max-w-none mx-auto lg:px-0">
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col gap-1.5 text-center">
						<Image
							src={logoBlack}
							className="mx-auto"
							height={40}
							width={40}
							alt="logo"
						/>
						<h1 className="text-2xl font-semibold tracking-tight">
							Create an account
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your data below to create your account
						</p>
					</div>
					<SignupForm />
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking signup, you agree to our{" "}
						<Link
							href="/agreement"
							className="hover:text-brand underline underline-offset-4"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy-policy"
							className="hover:text-brand underline underline-offset-4"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
