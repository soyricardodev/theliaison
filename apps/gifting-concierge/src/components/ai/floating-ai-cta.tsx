"use client";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ScrollShadow,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { PromptInput } from "./prompt-input";
import { Icon } from "@iconify/react";
import { cn } from "@theliaison/ui";

const ideas = [
	"Create a blog post about NextUI",
	"Give me 10 ideas for my next blog post",
	"Compare NextUI with other UI libraries",
	"Write a text message to my friend",
];

export function FloatingAICta() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [prompt, setPrompt] = useState<string>("");
	return (
		<>
			<Button
				onPress={onOpen}
				color="primary"
				radius="full"
				size="sm"
				className="px-5"
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
								<ScrollShadow className="max-h-[600px] h-full">
									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Harum, omnis nam corporis, quod laborum quos inventore
										numquam quis maiores vero aliquam aliquid! Culpa officia ad
										hic inventore blanditiis ea aut aspernatur voluptates
										doloribus quae ab maiores fuga odit facilis earum quibusdam,
										id dolores facere sequi. Possimus impedit eos, magni id enim
										culpa architecto dolorem eum repellat, repellendus a iure
										porro omnis. Unde voluptas sapiente obcaecati quod excepturi
										labore voluptatem magnam illum provident distinctio autem,
										voluptate modi in, quo dolorum corporis incidunt, illo
										quaerat. Assumenda qui asperiores labore, iusto ipsum enim
										dolore neque explicabo saepe odio voluptas, impedit officiis
										esse veritatis?
									</p>
								</ScrollShadow>
							</ModalBody>
							<ModalFooter>
								<div className="flex w-full flex-col gap-4">
									<ScrollShadow
										hideScrollBar
										className="flex flex-nowrap gap-2"
										orientation="horizontal"
									>
										<div className="flex gap-2">
											{ideas.map((idea, index) => (
												<Button key={idea} variant="flat">
													{idea}
												</Button>
											))}
										</div>
									</ScrollShadow>
									<form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
										<PromptInput
											classNames={{
												inputWrapper: "!bg-transparent shadow-none",
												innerWrapper: "relative",
												input: "pt-1 pb-6 pl-2 !pr-10 text-medium",
											}}
											endContent={
												<div className="absolute right-0 flex h-full flex-col items-end justify-between gap-2">
													<div className="flex items-end gap-2">
														<p className="py-1 text-tiny text-default-400">
															{prompt.length}/2000
														</p>
														<Tooltip showArrow content="Send message">
															<Button
																isIconOnly
																color={!prompt ? "default" : "primary"}
																isDisabled={!prompt}
																radius="lg"
																size="sm"
																variant="solid"
															>
																<Icon
																	className={cn(
																		"[&>path]:stroke-[2px]",
																		!prompt
																			? "text-default-600"
																			: "text-primary-foreground",
																	)}
																	icon="solar:arrow-up-linear"
																	width={20}
																/>
															</Button>
														</Tooltip>
													</div>
												</div>
											}
											minRows={2}
											radius="lg"
											value={prompt}
											variant="flat"
											onValueChange={setPrompt}
										/>
									</form>
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
