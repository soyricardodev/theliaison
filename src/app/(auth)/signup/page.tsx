import Link from "next/link";
import { SignupForm } from "./_components/signup-form";

export default function SignupPage() {
	return (
		<div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
			<div className="w-full text-left">
				<p className="pb-2 text-xl font-medium">Create an account</p>
				<p className="text-sm text-gray-500">
					Sign up for a new account to get started.
				</p>
			</div>
			<SignupForm />
			<p className="text-center text-sm">
				Already have an account?{" "}
				<Link
					className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 underline  hover:opacity-80 active:opacity-disabled transition-opacity"
					href="/login"
				>
					Login
				</Link>
			</p>
		</div>
	);
}
