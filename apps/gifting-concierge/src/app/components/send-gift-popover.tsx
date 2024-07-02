import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@theliaison/ui/popover";
import { Button } from "@theliaison/ui/button";
import { GiftIcon, LinkIcon, StoreIcon } from "lucide-react";
import Link from "next/link";

export function SendGiftPopover() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size="lg"
					className="flex gap-2 items-center rounded-full h-14 text-base sm:text-lg"
				>
					What would you like to send?
					<GiftIcon className="size-5 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] sm:w-[400px] rounded-xl">
				<div className="space-y-3">
					<Link
						href="/giftshop"
						className="text-left flex h-12 w-full items-center gap-[15px] rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all px-4 text-[17px] font-semibold text-[#222222] focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
					>
						<StoreIcon />
						Our gift shop
					</Link>
					<Link
						href="/send"
						className="text-left flex h-12 w-full items-center gap-[15px] rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all px-4 text-[17px] font-semibold text-[#222222] focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
					>
						<GiftIcon />
						Send a custom gift
					</Link>
					<Link
						href="/send-by-link"
						className="text-left flex h-12 w-full items-center gap-[15px] rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all px-4 text-[17px] font-semibold text-[#222222] focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
					>
						<LinkIcon />
						Send a gift from a link
					</Link>
				</div>
			</PopoverContent>
		</Popover>
	);
}
