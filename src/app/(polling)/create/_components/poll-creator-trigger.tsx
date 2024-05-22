"use client";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { ArrowRightIcon, BotIcon, ZapIcon } from "lucide-react";
import { useState } from "react";
import { CreatePollScratch } from "./create-poll-scratch";
export function PollCreatorTrigger() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [modal, setModal] = useState<"scratch" | "ai">("scratch");

	function handleOpenModal(modal: "scratch" | "ai") {
		setModal(modal);
		onOpen();
	}

	return (
		<>
			<div className="grid gap-2 max-w-screen-xl px-20">
				<div
					className="cursor-pointer transition-colors group bg-content4 hover:bg-content3 px-6 py-8 rounded-md flex justify-between items-center"
					onClick={() => handleOpenModal("scratch")}
					onKeyDown={() => handleOpenModal("scratch")}
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

				<div
					className="cursor-pointer hover:bg-content3 transition-colors group bg-content4 px-6 py-8 rounded-md flex justify-between items-center"
					onClick={() => handleOpenModal("scratch")}
					onKeyDown={() => handleOpenModal("scratch")}
				>
					<div className="flex items-center gap-x-4">
						<div className="p-2 border-2 rounded-full border-purple-500 group-hover:bg-purple-500 transition-colors">
							<BotIcon className="size-8 text-purple-500  group-hover:text-black transition-colors" />
						</div>
						<div>
							<h3 className="text-2xl font-bold">Create with AI</h3>
							<p>Create a new poll with AI</p>
						</div>
					</div>

					<div className="border-2 border-transparent group-hover:border-black rounded-full p-2 transition-colors">
						<ArrowRightIcon className="size-8" />
					</div>
				</div>
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
				<ModalContent>
					{(onClose) => (
						<>
							{modal === "scratch" ? (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Create your poll
									</ModalHeader>
									<ModalBody>
										<CreatePollScratch />
									</ModalBody>
								</>
							) : null}

							{modal === "ai" ? (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Create your poll
									</ModalHeader>
									<ModalBody>
										<CreatePollScratch />
									</ModalBody>
								</>
							) : null}
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
