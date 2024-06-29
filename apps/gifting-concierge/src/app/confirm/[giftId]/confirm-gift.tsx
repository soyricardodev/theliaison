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
						Confirm Gift
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] dark">
					<DialogHeader>
						<DialogTitle>Get Shipping Details</DialogTitle>
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
					Confirm Gift
				</Button>
			</DrawerTrigger>
			<DrawerContent className="max-h-[80%] dark">
				<ScrollArea className="h-[500px] w-full px-4">
					<DrawerHeader className="text-left">
						<DrawerTitle>Get Shipping Details</DrawerTitle>
						<DrawerDescription>
							Please provide your shipping details. Click confirm when you're
							done.
						</DrawerDescription>
					</DrawerHeader>
					{children}
					<DrawerFooter className="pt-2">
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
}
