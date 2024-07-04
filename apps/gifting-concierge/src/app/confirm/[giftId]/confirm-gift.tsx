"use client";

import { useMediaQuery } from "@theliaison/hooks";
import { Button } from "@theliaison/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@theliaison/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@theliaison/ui/drawer";
import { ScrollArea } from "@theliaison/ui/scroll-area";
import { ChevronRightIcon } from "lucide-react";
import { useConfirmDialogStore } from "~/store/confirm-dialog";

export function ConfirmGift({ children }: { children: React.ReactNode }) {
	const { isOpen, setIsOpen } = useConfirmDialogStore();
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<div className="relative group">
						<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
						<Button className="bg-white hover:bg-white text-black px-6 w-full rounded-full font-semibold h-12 pl-5 pr-2 text-base relative">
							Receive gift
							<span className="text-[#70757E]">
								<ChevronRightIcon />
							</span>
						</Button>
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[525px] dark">
					<DialogHeader>
						<DialogTitle className="text-foreground">
							Shipping Details
						</DialogTitle>
						<DialogDescription>
							Please provide your shipping details.
						</DialogDescription>
					</DialogHeader>
					{children}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<div className="relative group">
					<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
					<Button className="bg-white hover:bg-white text-black px-6 w-full rounded-full font-semibold h-12 pl-5 pr-2 text-base relative">
						Receive gift
						<span className="text-[#70757E]">
							<ChevronRightIcon />
						</span>
					</Button>
				</div>
			</DrawerTrigger>
			<DrawerContent className="min-h-full max-h-[80%] dark">
				<DrawerHeader className="text-left">
					<DrawerTitle className="text-foreground">
						Shipping Details
					</DrawerTitle>
					<DrawerDescription>
						Please provide your shipping details.
					</DrawerDescription>
				</DrawerHeader>
				<ScrollArea className="min-h-[600px] h-[700px] w-full px-4 py-6">
					{children}
				</ScrollArea>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button
							variant="outline"
							className="dark text-foreground border-foreground/90"
						>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
