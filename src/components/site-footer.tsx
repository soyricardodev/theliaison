import Image from "next/image";
import { logoBlack } from "~/assets/images";
import { cn } from "~/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className={cn(className)}>
			<div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<Image src={logoBlack} alt="logo" width={40} height={40} />
					<p className="text-center text-sm leading-loose md:text-left">
						The Liaison all rights reserved. {new Date().getFullYear()}
					</p>
				</div>
			</div>
		</footer>
	);
}
