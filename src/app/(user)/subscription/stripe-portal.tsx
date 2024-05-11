"use client";

import { usePathname, useRouter } from "next/navigation";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { createStripePortal } from "~/utils/stripe/server";

export function StripePortal() {
	const router = useRouter();
	const currentPath = usePathname();

	async function handleCreatePortal() {
		const redirectUrl = await createStripePortal(currentPath);
		return router.push(redirectUrl);
	}
	return (
		<button
			className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline text-blue-500 text-sm"
			onClick={handleCreatePortal}
		>
			<span>Go to the customer portal</span>
			<svg
				aria-hidden="true"
				className="opacity-70"
				height="7"
				viewBox="0 0 6 6"
				width="7"
			>
				<path
					d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
					fill="currentColor"
				/>
			</svg>
		</button>
	);
}

export function StripePortalButton() {
	const router = useRouter();
	const currentPath = usePathname();

	async function handleCreatePortal() {
		const redirectUrl = await createStripePortal(currentPath);
		return router.push(redirectUrl);
	}
	return (
		<button
			onClick={handleCreatePortal}
			className={cn(buttonVariants({ variant: "outline" }), "rounded-md")}
		>
			<span>Upgrade</span>
			<svg
				aria-hidden="true"
				className="opacity-70"
				height="7"
				viewBox="0 0 6 6"
				width="7"
			>
				<path
					d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
					fill="currentColor"
				/>
			</svg>
		</button>
	);
}
