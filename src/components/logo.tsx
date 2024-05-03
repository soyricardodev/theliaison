import Image from "next/image";
import { cn } from "~/lib/utils";
import { logoBlack } from "~/assets/images";

export function Logo({ className }: { className?: string }) {
	return (
		<Image
			src={logoBlack}
			alt="The Liaison Logo"
			width={40}
			height={40}
			className={cn(className)}
		/>
	);
}
