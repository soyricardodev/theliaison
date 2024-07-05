"use client";
import React, { useState } from "react";
import { SocialAuth } from "./social-auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@theliaison/ui";
import { Button } from "@theliaison/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@theliaison/ui/form";
import { Input } from "@theliaison/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { signInWithEmail } from "./actions";

const FormSchema = z.object({
	email: z.string().email({ message: "Invalid Email Address" }),
	password: z.string().min(6, { message: "Password is too short" }),
});

export default function SignIn() {
	const queryString =
		typeof window !== "undefined" ? window?.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	// Get the value of the 'next' parameter
	const next = urlParams.get("next");

	return (
		<div className="w-full sm:w-[26rem] shadow sm:p-5  border dark:border-zinc-800 rounded-md">
			<div className="p-5 space-y-5">
				<div className="text-center space-y-3">
					<h1 className="font-bold">Sign in to The Liaison</h1>
					<p className="text-sm">Welcome back! Please sign in to continue</p>
				</div>
				<SocialAuth redirectTo={next || "/"} />
				<div className="flex items-center gap-5">
					<div className="flex-1 h-[0.5px] w-full bg-zinc-400 dark:bg-zinc-800" />
					<div className="text-sm">or</div>
					<div className="flex-1 h-[0.5px] w-full bg-zinc-400 dark:bg-zinc-800" />
				</div>
				<SignInForm redirectTo={next || "/"} />
			</div>
		</div>
	);
}

export function SignInForm({ redirectTo }: { redirectTo: string }) {
	const { isPending, execute } = useServerAction(signInWithEmail);
	const [passwordReveal, setPasswordReveal] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof FormSchema>) {
		if (!isPending) {
			const [_data, error] = await execute({
				email: values.email,
				password: values.password,
				redirectTo,
			});

			if (error != null) {
				toast.error(error.message);
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className=" font-semibold test-sm">
								Email Address
							</FormLabel>
							<FormControl>
								<Input
									className="h-8"
									placeholder="example@gmail.com"
									type="email"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-semibold">Password</FormLabel>
							<div className="relative">
								<FormControl>
									<Input
										className="h-8"
										type={passwordReveal ? "text" : "password"}
										{...field}
									/>
								</FormControl>
								<button
									className="absolute right-2 top-[30%] cursor-pointer group"
									onClick={() => setPasswordReveal(!passwordReveal)}
									type="button"
								>
									{passwordReveal ? (
										<EyeIcon className=" group-hover:scale-105 transition-all" />
									) : (
										<EyeOffIcon className=" group-hover:scale-105 transition-all" />
									)}
								</button>
							</div>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full h-8 flex items-center gap-2">
					<LoaderCircleIcon
						className={cn(!isPending ? "hidden" : "block animate-spin")}
					/>
					Continue
				</Button>
			</form>
			<div className="text-center text-sm">
				<p>
					Doest not have account yet?{" "}
					<Link
						href={redirectTo ? `/register?next=${redirectTo}` : "/register"}
						className="text-blue-400"
					>
						Register
					</Link>
				</p>
			</div>
		</Form>
	);
}
