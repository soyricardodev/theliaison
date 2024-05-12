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
import {
	signInWithEmailSchema,
	type SignInWithEmail,
} from "~/utils/validators/auth";
import { login } from "../../actions";

export function LoginForm() {
	const router = useRouter();

	const form = useForm<SignInWithEmail>({
		resolver: zodResolver(signInWithEmailSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const { pending } = useFormStatus();

	async function onSubmit(data: SignInWithEmail) {
		await login({ ...data });
	}

	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-3"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="text-white">Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="johndoe@example.com"
									className="text-white border-white/40"
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
							<FormLabel className="text-white">Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="********"
									className="text-white border-white/40"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full bg-white text-black"
					disabled={pending}
				>
					Log in
				</Button>
			</form>
		</Form>
	);
}
