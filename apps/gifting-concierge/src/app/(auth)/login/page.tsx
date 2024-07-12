import { LoginForm } from "./login-form";

export default function Login() {
	return (
		<div className="flex items-center justify-center h-screen">
			<LoginForm redirectTo="/" />
		</div>
	);
}
