"use client";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import React from "react";

export function FloatingAICta() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button
				onPress={onOpen}
				color="primary"
				radius="md"
				className="fixed flex flex-col z-50 bottom-4 right-4 text-xl py-1 h-20"
			>
				<span>TL</span>
				<strong>Ask AI</strong>
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className="max-w-screen-lg min-h-80">
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 bg-content2 text-black border-b text-2xl font-bold">
								The Gifting Concierge AI
							</ModalHeader>
							<ModalBody>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Magna exercitation reprehenderit magna aute tempor cupidatat
									consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
									incididunt cillum quis. Velit duis sit officia eiusmod Lorem
									aliqua enim laboris do dolor eiusmod. Et mollit incididunt
									nisi consectetur esse laborum eiusmod pariatur proident Lorem
									eiusmod et. Culpa deserunt nostrud ad veniam.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
