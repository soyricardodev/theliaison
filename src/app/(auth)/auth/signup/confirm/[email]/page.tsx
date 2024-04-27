import Image from "next/image";
import Link from "next/link";
import { logoBlack } from "~/assets/images";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function Confirm({
	params: { email },
}: { params: { email: string } }) {
	// const url = "ricardocastro.dev%40gmail.com"
	// const expected = "ricardocastro.dev@gmail.com"
	const urlToEmail = email
		.replace(/%40/g, "@")
		.replace(/%2E/g, ".")
		.replace(/%2B/g, "+");

	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
			<div className="max-w-xl px-5 text-center">
				<div className="flex items-center justify-center">
					<Image
						src={logoBlack}
						alt="The Liaison Logo"
						width={60}
						height={60}
						className="mx-auto"
					/>
				</div>
				<h2 className="mb-2 text-[42px] font-bold font-heading">
					Check your inbox
				</h2>
				<p className="my-2 text-lg">
					We are glad, that you’re with us? We’ve sent you a verification link
					to the email address <span className="font-bold">{urlToEmail}</span>.
				</p>
				<Link
					href="/auth/signin"
					className={cn(
						buttonVariants({ size: "lg" }),
						"rounded-full hover:shadow-2xl transition-shadow my-2",
					)}
				>
					Open the App →
				</Link>
			</div>
		</div>
	);
}
