import { Button } from "@theliaison/ui/button";
import { useAIState, useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import * as React from "react";
import { IconShare } from "../ui/icons";
import { ButtonScrollToBottom } from "./button-scroll-to-bottom";
import type { AI } from "./chat/actions";
import { FooterText } from "./footer";
import { UserMessage } from "./message";
import { PromptForm } from "./prompt-form";

export interface ChatPanelProps {
	id?: string;
	title?: string;
	input: string;
	setInput: (value: string) => void;
	isAtBottom: boolean;
	scrollToBottom: () => void;
}

export function ChatPanel({
	id,
	title,
	input,
	setInput,
	isAtBottom,
	scrollToBottom,
}: ChatPanelProps) {
	const [_aiState] = useAIState();
	const [messages, setMessages] = useUIState<typeof AI>();
	const { submitUserMessage } = useActions();
	const [_shareDialogOpen, setShareDialogOpen] = React.useState(false);

	const exampleMessages = [
		{
			heading: "What are the",
			subheading: "trending gifts today?",
			message: "What are the trending gifts today?",
		},
		{
			heading: "I would like to gift",
			subheading: "a Camera to my friend",
			message: "I would like to gift a Camera to my friend",
		},
		{
			heading: "What are some",
			subheading: "favorite gifts for birthdays?",
			message: "What are some favorite gifts for birthdays?",
		},
	];

	return (
		<div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
			<ButtonScrollToBottom
				isAtBottom={isAtBottom}
				scrollToBottom={scrollToBottom}
			/>

			<div className="mx-auto sm:max-w-2xl sm:px-4">
				<div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
					{messages.length === 0 &&
						exampleMessages.map((example, index) => (
							<div
								key={example.heading}
								className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
									index > 1 && "hidden md:block"
								}`}
								onClick={async () => {
									setMessages((currentMessages) => [
										...currentMessages,
										{
											id: nanoid(),
											display: <UserMessage>{example.message}</UserMessage>,
										},
									]);

									const responseMessage = await submitUserMessage(
										example.message,
									);

									setMessages((currentMessages) => [
										...currentMessages,
										responseMessage,
									]);
								}}
								onKeyUp={async () => {
									setMessages((currentMessages) => [
										...currentMessages,
										{
											id: nanoid(),
											display: <UserMessage>{example.message}</UserMessage>,
										},
									]);

									const responseMessage = await submitUserMessage(
										example.message,
									);

									setMessages((currentMessages) => [
										...currentMessages,
										responseMessage,
									]);
								}}
							>
								<div className="text-sm font-semibold">{example.heading}</div>
								<div className="text-sm text-zinc-600">
									{example.subheading}
								</div>
							</div>
						))}
				</div>

				{messages?.length >= 2 ? (
					<div className="flex h-12 items-center justify-center">
						<div className="flex space-x-2">
							{id && title ? (
								<>
									<Button
										variant="outline"
										onClick={() => setShareDialogOpen(true)}
									>
										<IconShare className="mr-2" />
										Share
									</Button>
									{/* <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages
                    }}
                  /> */}
								</>
							) : null}
						</div>
					</div>
				) : null}

				<div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
					<PromptForm input={input} setInput={setInput} />
					<FooterText className="hidden sm:block" />
				</div>
			</div>
		</div>
	);
}
