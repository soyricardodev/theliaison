import Link from "next/link";
import { LoginForm } from "./_components/login-form";

export default function Signin() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-[hsl(240_5.88%_10%)] px-8 pb-10 pt-6 shadow-sm mx-auto md:mx-0">
			<p className="pb-2 text-xl font-medium text-white">Login</p>
			<LoginForm />
			<p className="text-center text-small text-white">
				Need to create an account?{" "}
				<Link
					className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-white"
					href="/signup"
				>
					Sign Up
				</Link>
			</p>
		</div>
	);
}
