"use client";

import * as React from "react";

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

export function ConfirmGift({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="bg-white text-black hover:bg-[#DBD0C5] text-sm px-6">
						Receive Gift
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[525px] dark">
					<DialogHeader>
						<DialogTitle className="text-foreground">
							Get Shipping Details
						</DialogTitle>
						<DialogDescription>
							Please provide your shipping details. Click confirm when you're
							done.
						</DialogDescription>
					</DialogHeader>
					{children}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen} className="dark">
			<DrawerTrigger asChild>
				<Button className="bg-white text-black hover:bg-[#DBD0C5] text-sm px-6">
					Receive Gift
				</Button>
			</DrawerTrigger>
			<DrawerContent className="min-h-full max-h-[80%] dark">
				<DrawerHeader className="text-left">
					<DrawerTitle className="text-foreground">
						Get Shipping Details
					</DrawerTitle>
					<DrawerDescription>
						Please provide your shipping details. Click confirm when you're
						done.
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
