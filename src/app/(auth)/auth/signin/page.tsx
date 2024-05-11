import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { logoBlack } from "~/assets/images";
import { Icons } from "~/components/icons";
import { login, signOauth } from "../_actions/actions";

import type { Provider } from "@supabase/supabase-js";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

interface OAuthProviders {
	name: Provider;
	displayName: string;
	icon: JSX.Element;
}

export default function Signin() {
	const oAuthProviders: OAuthProviders[] = [
		{
			name: "github",
			displayName: "GitHub",
			icon: <Github className="h-5 w-5" />,
		},
		/* Add desired OAuth providers here */
	];

	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute left-4 top-4 md:left-8 md:top-8",
				)}
			>
				<>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					Back
				</>
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
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
						Enter your email to sign in to your account
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
					<Button formAction={login} type="submit" className="w-full">
						Signin
					</Button>
				</form>
				{/* {oAuthProviders.map((provider) => (
					<form key={provider.name} className="pb-2">
						<input type="hidden" name="provider" value={provider.name} />
						<Button type="submit" className="w-full" formAction={signOauth}>
							<span className="mr-2">{provider.icon}</span>
							<span>{provider.displayName}</span>
						</Button>
					</form>
				))} */}
				<p className="px-8 text-center text-sm text-muted-foreground">
					<Link
						href="/auth/signup"
						className="hover:text-brand underline underline-offset-4"
					>
						Don&apos;t have an account? Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
