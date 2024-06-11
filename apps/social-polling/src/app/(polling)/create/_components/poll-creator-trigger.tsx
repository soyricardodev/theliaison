"use client";

import { ArrowRightIcon, ZapIcon } from "lucide-react";
import { useState } from "react";

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
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@theliaison/ui/drawer";

import { Container } from "~/components/container";
import { useMediaQuery } from "~/hooks/use-media-query";
import { CreatePollScratch } from "./create-poll-scratch";

export function PollCreatorTrigger() {
	const [open, setOpen] = useState(false);

	const isDesktop = useMediaQuery("(min-width: 768px)");

	return (
		<>
			<Container>
				{isDesktop ? (
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<div
								className="bg-content4 hover:bg-content3 group flex cursor-pointer items-center justify-between rounded-md px-6 py-8 transition-colors"
								tabIndex={0}
								role="button"
							>
								<div className="flex items-center gap-x-4">
									<div className="rounded-full border-2 border-yellow-500 p-2 transition-colors group-hover:bg-yellow-500">
										<ZapIcon className="size-8 text-yellow-500  transition-colors group-hover:text-black" />
									</div>
									<div>
										<h3 className="text-2xl font-bold">Create from scratch</h3>
										<p>Create a new poll from scratch</p>
									</div>
								</div>

								<div className="rounded-full border-2 border-transparent p-2 transition-colors group-hover:border-black">
									<ArrowRightIcon className="size-8" />
								</div>
							</div>
						</DialogTrigger>
						<DialogContent className="sm:max-w-2xl">
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click save when you're
									done.
								</DialogDescription>
							</DialogHeader>
							<CreatePollScratch />
						</DialogContent>
					</Dialog>
				) : (
					<Drawer open={open} onOpenChange={setOpen}>
						<DrawerTrigger asChild>
							<div
								className="bg-content4 hover:bg-content3 group flex cursor-pointer items-center justify-between rounded-md px-6 py-8 transition-colors"
								tabIndex={0}
								role="button"
							>
								<div className="flex items-center gap-x-4">
									<div className="rounded-full border-2 border-yellow-500 p-2 transition-colors group-hover:bg-yellow-500">
										<ZapIcon className="size-8 text-yellow-500  transition-colors group-hover:text-black" />
									</div>
									<div>
										<h3 className="text-2xl font-bold">Create from scratch</h3>
										<p>Create a new poll from scratch</p>
									</div>
								</div>

								<div className="rounded-full border-2 border-transparent p-2 transition-colors group-hover:border-black">
									<ArrowRightIcon className="size-8" />
								</div>
							</div>
						</DrawerTrigger>
						<DrawerContent className="px-4 pb-4">
							<DrawerHeader className="text-left">
								<DrawerTitle>Edit profile</DrawerTitle>
								<DrawerDescription>
									Make changes to your profile here. Click save when you're
									done.
								</DrawerDescription>
							</DrawerHeader>
							<CreatePollScratch />
						</DrawerContent>
					</Drawer>
				)}
				<div
					className="bg-content4 hover:bg-content3 group flex cursor-pointer items-center justify-between rounded-md px-6 py-8 transition-colors"
					tabIndex={0}
					role="button"
				>
					<div className="flex items-center gap-x-4">
						<div className="rounded-full border-2 border-yellow-500 p-2 transition-colors group-hover:bg-yellow-500">
							<ZapIcon className="size-8 text-yellow-500  transition-colors group-hover:text-black" />
						</div>
						<div>
							<h3 className="text-2xl font-bold">Create from scratch</h3>
							<p>Create a new poll from scratch</p>
						</div>
					</div>

					<div className="rounded-full border-2 border-transparent p-2 transition-colors group-hover:border-black">
						<ArrowRightIcon className="size-8" />
					</div>
				</div>
			</Container>
		</>
	);
}
