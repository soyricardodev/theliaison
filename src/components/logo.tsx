import Image from "next/image";
import { logoBlack } from "~/assets/images";
import { cn } from "~/lib/utils";

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
