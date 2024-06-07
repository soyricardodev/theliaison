import { Link } from "@nextui-org/react";
import { LoginForm } from "./_components/login-form";

export default function Signin() {
	return (
		<div className="flex w-full items-center justify-center bg-background lg:w-1/2">
			<div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
				<div className="w-full text-left">
					<p className="pb-2 text-xl font-medium">Welcome Back</p>
					<p className="text-small text-default-500">
						Log in to your account to continue
					</p>
				</div>

				<LoginForm />

				<p className="text-center text-small">
					Need to create an account?&nbsp;
					<Link href="/signup" size="sm">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
