"use client";

import Link from "next/link";

import { Button } from "@theliaison/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import { Input } from "@theliaison/ui/input";
import { Label } from "@theliaison/ui/label";
export function LoginForm() {
	return (
		<Card className="mx-auto max-w-sm backdrop-blur-2xl bg-white/20 border-transparent shadow-sm">
			<CardHeader>
				<CardTitle className="text-2xl text-black">Login</CardTitle>
				<CardDescription className="text-black">
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							className="border-black text-black placeholder:text-black/90"
							required
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link href="#" className="ml-auto inline-block text-sm underline">
								Forgot your password?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							required
							className="border-black text-black"
						/>
					</div>
					<Button type="submit" className="w-full bg-black">
						Login
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="underline">
						Register
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
