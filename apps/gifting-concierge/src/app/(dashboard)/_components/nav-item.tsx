"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@theliaison/ui";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@theliaison/ui/tooltip";

export function NavItem({
	children,
	label,
	href,
}: {
	children: React.ReactNode;
	label: string;
	href: string;
}) {
	const pathname = usePathname();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					href={href}
					className={cn(
						"flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
						{
							"bg-accent text-black": pathname === href,
						},
					)}
				>
					{children}
					<span className="sr-only">{label}</span>
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right">{label}</TooltipContent>
		</Tooltip>
	);
}
