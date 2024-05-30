"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";
import { ArrowRightIcon, ZapIcon } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "~/hooks/use-media-query";
import { CreatePollScratch } from "./create-poll-scratch";
import { Container } from "~/components/container";
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
								className="cursor-pointer transition-colors group bg-content4 hover:bg-content3 px-6 py-8 rounded-md flex justify-between items-center"
								tabIndex={0}
								role="button"
							>
								<div className="flex items-center gap-x-4">
									<div className="p-2 border-2 rounded-full border-yellow-500 group-hover:bg-yellow-500 transition-colors">
										<ZapIcon className="size-8 text-yellow-500  group-hover:text-black transition-colors" />
									</div>
									<div>
										<h3 className="text-2xl font-bold">Create from scratch</h3>
										<p>Create a new poll from scratch</p>
									</div>
								</div>

								<div className="border-2 border-transparent group-hover:border-black rounded-full p-2 transition-colors">
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
								className="cursor-pointer transition-colors group bg-content4 hover:bg-content3 px-6 py-8 rounded-md flex justify-between items-center"
								tabIndex={0}
								role="button"
							>
								<div className="flex items-center gap-x-4">
									<div className="p-2 border-2 rounded-full border-yellow-500 group-hover:bg-yellow-500 transition-colors">
										<ZapIcon className="size-8 text-yellow-500  group-hover:text-black transition-colors" />
									</div>
									<div>
										<h3 className="text-2xl font-bold">Create from scratch</h3>
										<p>Create a new poll from scratch</p>
									</div>
								</div>

								<div className="border-2 border-transparent group-hover:border-black rounded-full p-2 transition-colors">
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
					className="cursor-pointer transition-colors group bg-content4 hover:bg-content3 px-6 py-8 rounded-md flex justify-between items-center"
					tabIndex={0}
					role="button"
				>
					<div className="flex items-center gap-x-4">
						<div className="p-2 border-2 rounded-full border-yellow-500 group-hover:bg-yellow-500 transition-colors">
							<ZapIcon className="size-8 text-yellow-500  group-hover:text-black transition-colors" />
						</div>
						<div>
							<h3 className="text-2xl font-bold">Create from scratch</h3>
							<p>Create a new poll from scratch</p>
						</div>
					</div>

					<div className="border-2 border-transparent group-hover:border-black rounded-full p-2 transition-colors">
						<ArrowRightIcon className="size-8" />
					</div>
				</div>
			</Container>
		</>
	);
}
