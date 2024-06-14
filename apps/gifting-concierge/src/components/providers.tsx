"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@theliaison/ui/sonner";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<Toaster />
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</NextUIProvider>
	);
}
