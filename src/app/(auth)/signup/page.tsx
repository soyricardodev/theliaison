import Link from "next/link";
import { SignupForm } from "./_components/signup-form";

export default function SignupPage() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-[hsl(240_5.88%_10%)] px-8 pb-10 pt-6 shadow-small mx-auto md:mx-0">
			<p className="pb-2 text-xl font-medium text-white">Sign Up</p>
			<SignupForm />
			<p className="text-center text-small text-white">
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
