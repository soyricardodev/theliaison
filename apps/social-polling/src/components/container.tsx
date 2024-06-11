import { cn } from "@theliaison/ui";

export function Container({
	children,
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section className="mx-auto mb-28 mt-16 max-w-screen-2xl px-6 lg:px-8">
			<div className={cn("mx-auto max-w-2xl lg:max-w-none", className)}>
				{children}
			</div>
		</section>
	);
}
