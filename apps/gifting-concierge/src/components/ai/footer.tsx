import type React from "react";

import { cn } from "@theliaison/ui";
import { ExternalLink } from "../external-link";

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"px-2 text-center text-xs leading-normal text-muted-foreground",
				className,
			)}
			{...props}
		>
			This chatbot is on development. If you have any feedback, please reach out
			to us at{" "}
			<ExternalLink href="mailto:support@theliaison.com">
				support@theliaison.com
			</ExternalLink>
		</p>
	);
}
