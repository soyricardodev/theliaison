import { Suspense } from "react";
import { Toaster } from "~/components/ui/sonner";

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="min-h-dvh h-full">
			{children}
			<Suspense>
				<Toaster />
			</Suspense>
		</div>
	);
}
