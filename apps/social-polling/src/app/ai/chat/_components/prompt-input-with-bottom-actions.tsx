"use client";

import { Icon } from "@iconify/react";
import { Button, ScrollShadow, Tooltip } from "@nextui-org/react";
import { useChat } from "ai/react";
import React from "react";

import { cn } from "@theliaison/ui";

import { MessageCard } from "./message-card";
import { PromptInput } from "./prompt-input";

export function PromptInputWithBottomActions() {
	const ideas = [
		{
			title: "Create a blog post about NextUI",
			description: "explain it in simple terms",
		},
		{
			title: "Give me 10 ideas for my next blog post",
			description: "include only the best ideas",
		},
		{
			title: "Compare NextUI with other UI libraries",
			description: "be as objective as possible",
		},
		{
			title: "Write a text message to my friend",
			description: "be polite and friendly",
		},
	];

	const { handleInputChange, handleSubmit, messages, isLoading, input } =
		useChat({
			api: "/api/ai/chat",
		});

	return (
		<div className="flex w-full flex-col gap-4">
			<ScrollShadow
				// hideScrollBar
				className="flex flex-col gap-4 px-1"
				orientation="vertical"
			>
				{/* {ideas.map(({ title, description }, index) => (
						<Button
							key={`${title}-${description}`}
							className="flex h-14 flex-col items-start gap-0"
							variant="flat"
						>
							<p>{title}</p>
							<p className="text-default-500">{description}</p>
						</Button>
					))} */}
				{messages.map(({ role, content, id }, index) => (
					<MessageCard
						key={id}
						attempts={index === 1 ? 2 : 1}
						avatar={
							role === "assistant"
								? "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png"
								: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png"
						}
						currentAttempt={index === 1 ? 2 : 1}
						message={content}
						messageClassName={
							role === "user" ? "bg-content3 text-content3-foreground" : ""
						}
						// showFeedback={role === "assistant"}
					/>
				))}
			</ScrollShadow>
			<form
				className="rounded-medium bg-default-100 hover:bg-default-200/70 flex w-full flex-col items-start transition-colors"
				onSubmit={handleSubmit}
			>
				<PromptInput
					classNames={{
						inputWrapper: "!bg-transparent shadow-none",
						innerWrapper: "relative",
						input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
					}}
					endContent={
						<div className="flex items-end gap-2">
							<Tooltip showArrow content="Send message">
								<Button
									type="submit"
									isIconOnly
									color={"primary"}
									radius="lg"
									size="sm"
									variant="solid"
									isLoading={isLoading}
									isDisabled={isLoading}
									disabled={isLoading}
								>
									<Icon
										className={cn(
											"[&>path]:stroke-[2px]",
											"text-primary-foreground",
											// !prompt ? "text-default-600" : "text-primary-foreground",
										)}
										icon="solar:arrow-up-linear"
										width={20}
									/>
								</Button>
							</Tooltip>
						</div>
					}
					minRows={3}
					radius="lg"
					// value={prompt}
					variant="flat"
					onChange={handleInputChange}
					isDisabled={isLoading}
					disabled={isLoading}
				/>
				<div className="flex w-full items-center justify-between  gap-2 overflow-scroll px-4 pb-4">
					<div className="flex w-full gap-1 md:gap-3">
						<Button
							size="sm"
							startContent={
								<Icon
									className="text-default-500"
									icon="solar:paperclip-linear"
									width={18}
								/>
							}
							variant="flat"
						>
							Attach
						</Button>
						<Button
							size="sm"
							startContent={
								<Icon
									className="text-default-500"
									icon="solar:soundwave-linear"
									width={18}
								/>
							}
							variant="flat"
						>
							Voice Commands
						</Button>
						<Button
							size="sm"
							startContent={
								<Icon
									className="text-default-500"
									icon="solar:notes-linear"
									width={18}
								/>
							}
							variant="flat"
						>
							Templates
						</Button>
					</div>
					<p className="text-tiny text-default-400 py-1">{input.length}/2000</p>
				</div>
			</form>
		</div>
	);
}
