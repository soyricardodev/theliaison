"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@theliaison/ui/sonner";

const queryClient = new QueryClient();

export function Providers({ children, ...props }: ThemeProviderProps) {
	return (
		<NextUIProvider>
			<QueryClientProvider client={queryClient}>
				<NextThemesProvider {...props}>
					<Toaster />
					{children}
				</NextThemesProvider>
			</QueryClientProvider>
		</NextUIProvider>
	);
}
