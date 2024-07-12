import { VerifyOtp } from "./verify-otp";

export default function VerifyEmailPage({
	params: { email },
}: {
	params: { email: string };
}) {
	return <VerifyOtp email={email} />;
}
