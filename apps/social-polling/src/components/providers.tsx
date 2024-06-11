"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<QueryClientProvider client={queryClient}>
			<NextUIProvider navigate={router.push}>{children}</NextUIProvider>
		</QueryClientProvider>
	);
}
