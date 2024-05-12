import Image from "next/image";
import { logoBlack, logoWhite } from "~/assets/images";
import { cn } from "~/lib/utils";

export function Logo({
	className,
	isWhite,
}: { className?: string; isWhite?: boolean }) {
	return (
		<Image
			src={isWhite ? logoWhite : logoBlack}
			alt="The Liaison Logo"
			width={40}
			height={40}
			className={cn(className)}
		/>
	);
}
