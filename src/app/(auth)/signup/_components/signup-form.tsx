"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type SimpleSignUp, simpleSignUpSchema } from "~/utils/validators/auth";
import { simpleSignupAction } from "../../actions";

export function SignupForm() {
	const router = useRouter();

	const form = useForm<SimpleSignUp>({
		resolver: zodResolver(simpleSignUpSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			username: "",
		},
		mode: "onChange",
	});

	const { pending } = useFormStatus();

	async function onSubmit(data: SimpleSignUp) {
		const profileData = await simpleSignupAction({ ...data });

		if (profileData) {
			router.push(`/${data.username}`);
		}
	}

	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-3"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormDescription>Your full name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="john2doe" {...field} />
							</FormControl>
							<FormDescription>
								Your username just can contain numbers and letters and
								underscores.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="johndoe@example.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="********" {...field} />
							</FormControl>
							<FormDescription>
								Set a password for your account.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={pending}>
					Signup
				</Button>
			</form>
		</Form>
	);
}
