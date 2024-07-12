"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { useServerAction } from "zsa-react";
import {
	ChevronRightIcon,
	EyeIcon,
	EyeOffIcon,
	LoaderCircleIcon,
} from "lucide-react";
import { signUpAction } from "~/components/auth/actions";
import { signUpSchema } from "~/lib/validators/auth";

export function RegisterForm({ redirectTo }: { redirectTo: string }) {
	const { isPending, execute } = useServerAction(signUpAction);

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
	});

	const [passwordReveal, setPasswordReveal] = React.useState(false);

	async function onSubmit(values: z.infer<typeof signUpSchema>) {
		console.log("here");
		if (!isPending) {
			const [_data, err] = await execute({
				email: values.email,
				password: values.password,
			});

			if (err) {
				toast.error(err.message);
				return;
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("space-y-3 inline-block w-full")}
			>
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold test-sm">Full Name</FormLabel>
							<FormControl>
								<Input
									className="h-8 border-black placeholder:text-black/80"
									placeholder="John Doe"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold test-sm">Username</FormLabel>
							<FormControl>
								<Input
									className="h-8 border-black placeholder:text-black/80"
									placeholder="josnghdoe"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold test-sm">
								Email Address
							</FormLabel>
							<FormControl>
								<Input
									className="h-8 border-black placeholder:text-black/80"
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
								<FormControl className="">
									<Input
										className="h-8 border-black placeholder:text-black/80"
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
										<EyeIcon className="group-hover:scale-105 transition-all size-4" />
									) : (
										<EyeOffIcon className="group-hover:scale-105 transition-all size-4" />
									)}
								</button>
							</div>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirm-pass"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-semibold">
								Confirm Password
							</FormLabel>
							<div className="relative">
								<FormControl>
									<Input
										className="h-8 border-black placeholder:text-black/80"
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
										<EyeIcon className="group-hover:scale-105 transition-all size-4" />
									) : (
										<EyeOffIcon className="group-hover:scale-105 transition-all size-4" />
									)}
								</button>
							</div>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full h-8 bg-black hover:bg-primary/90 transition-all text-white flex items-center gap-2"
				>
					<LoaderCircleIcon
						className={cn(!isPending ? "hidden" : "block animate-spin")}
					/>
					Continue
					<ChevronRightIcon className="size-4" />
				</Button>
				<div className="text-center text-sm">
					<h1>
						Already have account?{" "}
						<Link
							href={redirectTo ? `/login?next=${redirectTo}` : "/login"}
							className="text-blue-500"
						>
							Login
						</Link>
					</h1>
				</div>
			</form>
		</Form>
	);
}
