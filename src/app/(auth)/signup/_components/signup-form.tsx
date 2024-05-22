"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
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
			router.push("/select-plan");
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
							<FormControl>
								<Input
									isRequired
									variant="underlined"
									label="Name"
									placeholder="John Doe"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									isRequired
									variant="underlined"
									label="Username"
									placeholder="john2doe"
									{...field}
								/>
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
							<FormControl>
								<Input
									isRequired
									variant="underlined"
									label="Email"
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
							<FormControl>
								<Input
									isRequired
									variant="underlined"
									label="Password"
									type="password"
									placeholder="Enter your password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={pending} color="primary">
					Signup
				</Button>
			</form>
		</Form>
	);
}
