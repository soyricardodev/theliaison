import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "~/supabase/server";
import { toast } from "sonner";
import { Input, Button } from "@nextui-org/react";

export default async function LoginForm() {
	const signInWithGoogleAction = async () => {
		"use server";

		const supabase = createClient();
		const origin = headers().get("origin");
		const { error, data } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			console.log(error);
		} else {
			return redirect(data.url);
		}
		// 3. Redirect to landing page
	};

	const signInWithEmailAction = async (formData: FormData) => {
		"use server";
		const email = formData.get("email") as string;
		const supabase = createClient();

		const { error } = await supabase.auth.signInWithOtp({
			email,
		});

		if (error) {
			toast.error(error.message);
			return console.log(error);
		}

		redirect(`/login/verify?email=${email}`);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-[calc(100vh-100px)] mx-auto">
			<div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white/30 backdrop-blur-3xl px-8 pb-10 pt-6 shadow-sm">
				<p className="pb-2 text xl font-medium">Log In</p>

				<form action={signInWithEmailAction} className="flex flex-col gap-3">
					<Input
						type="email"
						name="email"
						label="Email"
						variant="bordered"
						placeholder="Enter your email"
					/>
					<Button type="submit" color="primary" startContent={<MailIcon />}>
						Continue with Email
					</Button>
				</form>

				<div className="flex items-center gap-4 py-2">
					<hr className="bg-divider border-none w-full h-divider flex-1" />

					<p className="shrink-0 text-tiny text-black">OR</p>

					<hr className="bg-divider border-none w-full h-divider flex-1" />
				</div>

				<div className="flex flex-col gap-2">
					<form action={signInWithGoogleAction} className="w-full">
						<input type="hidden" />
						<Button
							type="submit"
							className="w-full"
							variant="bordered"
							startContent={<GoogleIcon />}
						>
							Sign in with Google
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

function GoogleIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			focusable="false"
			width="24"
			height="24"
			viewBox="0 0 48 48"
		>
			<path
				fill="#FFC107"
				d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
			/>
			<path
				fill="#FF3D00"
				d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
			/>
			<path
				fill="#4CAF50"
				d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
			/>
			<path
				fill="#1976D2"
				d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
			/>
		</svg>
	);
}

function MailIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			className="pointer-events-none text-2xl "
			focusable="false"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
		>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M3.172 5.172C2 6.343 2 8.229 2 12c0 3.771 0 5.657 1.172 6.828C4.343 20 6.229 20 10 20h4c3.771 0 5.657 0 6.828-1.172C22 17.657 22 15.771 22 12c0-3.771 0-5.657-1.172-6.828C19.657 4 17.771 4 14 4h-4C6.229 4 4.343 4 3.172 5.172M18.576 7.52a.75.75 0 0 1-.096 1.056l-2.196 1.83c-.887.74-1.605 1.338-2.24 1.746c-.66.425-1.303.693-2.044.693c-.741 0-1.384-.269-2.045-.693c-.634-.408-1.352-1.007-2.239-1.745L5.52 8.577a.75.75 0 0 1 .96-1.153l2.16 1.799c.933.777 1.58 1.315 2.128 1.667c.529.34.888.455 1.233.455c.345 0 .704-.114 1.233-.455c.547-.352 1.195-.89 2.128-1.667l2.159-1.8a.75.75 0 0 1 1.056.097"
				clip-rule="evenodd"
			/>
		</svg>
	);
}
