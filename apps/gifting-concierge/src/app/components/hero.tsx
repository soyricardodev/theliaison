import { cn } from "@theliaison/ui";
import { buttonVariants } from "@theliaison/ui/button";
import Link from "next/link";

import { HeroTextAnimation } from "./hero-text-animation";
import { SendGiftDialog } from "./send-gift-popover";

export function Hero() {
	return (
		<section
			id="hero"
			className="relative flex flex-col items-center justify-center h-[calc(100vh-100px)] mx-auto z-10 max-w-[80rem] px-6 text-center md:px-8"
		>
			<HeroTextAnimation>
				<SendGiftDialog />

				<Link
					href="/how-it-works"
					className={cn(
						buttonVariants({ variant: "link" }),
						"w-fit mx-auto hover:font-semibold hover:text-primary text-base sm:text-lg transition-colors hover:no-underline text-black",
					)}
				>
					How it works
				</Link>
			</HeroTextAnimation>
		</section>
	);
}
