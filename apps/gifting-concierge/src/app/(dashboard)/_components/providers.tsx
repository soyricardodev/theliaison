import { TooltipProvider } from "@theliaison/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
	return <TooltipProvider>{children}</TooltipProvider>;
}
