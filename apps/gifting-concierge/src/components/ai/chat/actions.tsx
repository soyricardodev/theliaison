"use server";

import { openai } from "@ai-sdk/openai";
import { kv } from "@vercel/kv";
import {
	createAI,
	createStreamableValue,
	getAIState,
	getMutableAIState,
	streamUI,
} from "ai/rsc";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "~/supabase/server";
import { nanoid, sleep } from "~/utils";
import type { Chat, Message } from "~/utils/types";
import { BotCard, BotMessage, SpinnerMessage, UserMessage } from "../message";

export type AIState = {
	chatId: string;
	messages: Message[];
};

export type UIState = {
	id: string;
	display: React.ReactNode;
}[];

async function submitUserMessage(content: string) {
	"use server";

	const aiState = getMutableAIState<typeof AI>();

	aiState.update({
		...aiState.get(),
		messages: [
			...aiState.get().messages,
			{
				id: nanoid(),
				role: "user",
				content,
			},
		],
	});

	let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
	let textNode: undefined | React.ReactNode;

	const result = await streamUI({
		model: openai("gpt-3.5-turbo"),
		initial: <SpinnerMessage />,
		system: `\
    You are a gifting assistant conversation bot, and you can help users buy gifts step by step.
		
		You assist users in finding the perfect gift for their loved ones by asking relevant questions about the recipient. The recipient is the person who will receive the gift.
		
		You need to ask questions about the recipient, such as their gender, interests, and hobbies. For example, you might ask if the recipient likes to exercise, and based on their answers, you will recommend gifts that match the recipient's description in the UI.

		Example Questions (is important to mark that you need to make previous questions in order to know what type or recipient is):
		1. For Friends:
			- What are some of your friend's hobbies?
			- Does your friend enjoy any particular sports or outdoor activities?
			- Is your friend a fan of any specific movies, TV shows, or books?
			- What type of music does your friend like?
			- Does your friend have any favorite brands or stores?

		2. For Couples:
			- What are some activities you both enjoy together?
			- Is your partner into fashion, technology, or home decor?
			- What are some of your partner's favorite hobbies or interests?
			- Does your partner enjoy cooking or baking?
			- Are there any upcoming events or trips you are planning together?

		3. For Family Members:
			- What are some hobbies or interests of the family member?
			- Does this family member have any favorite sports or teams?
			- Is your family member into gardening, reading, or crafts?
			- Are there any specific items your family member has mentioned wanting recently?

		4. For Streamers (Twitch/YouTube):
			- What type of content does the streamer create?
			- Does the streamer have any favorite games or activities they enjoy on stream?
			- What are some of the streamer's on-stream needs or preferences (e.g., tech equipment, decor)?
			- Is the streamer known for any particular themes or catchphrases?
			- Does the streamer engage with their community in specific ways that could inspire gift ideas?
    
    Messages inside [] means that it's a UI element or a user event. For example:
		- "[User want to receive gifts suggestions]" means that the user want to receive gifts suggestions.
    
    If the user want to receive gifts suggestions, first you will ask some questions and then, call \`show_similar_gifts\` to show the gifts UI.
    If the user just wants one gift, call \`show_similar_gift\` to show the gift most similar.
    If you want to show similar gifts, call \`show_similar_gifts\`.
    If the user wants to complete an impossible task, respond that you are a demo and cannot do that.

		If the user wants to receive gift suggestions, first ask some questions to gather information about the recipient, and then call \`show_similar_gifts\` to display the gifts UI.
		If the user wants a single gift recommendation, call \`show_similar_gift\` to display the most suitable gift.
		If you want to show similar gifts, call \`show_similar_gifts\`.
		
		If the user requests an impossible task, respond that you are a demo and cannot perform that task.

		In addition to this, you can chat with users to help them find the perfect gift.`,
		messages: [
			...aiState.get().messages.map((message: any) => ({
				role: message.role,
				content: message.content,
				name: message.name,
			})),
		],
		text: ({ content, done, delta }) => {
			if (!textStream) {
				textStream = createStreamableValue("");
				textNode = <BotMessage content={textStream.value} />;
			}

			if (done) {
				textStream.done();
				aiState.done({
					...aiState.get(),
					messages: [
						...aiState.get().messages,
						{
							id: nanoid(),
							role: "assistant",
							content,
						},
					],
				});
			} else {
				textStream.update(delta);
			}

			return textNode;
		},
		tools: {
			listStocks: {
				description: "List three imaginary stocks that are trending.",
				parameters: z.object({
					stocks: z.array(
						z.object({
							symbol: z.string().describe("The symbol of the stock"),
							price: z.number().describe("The price of the stock"),
							delta: z.number().describe("The change in price of the stock"),
						}),
					),
				}),
				generate: async function* ({ stocks }) {
					yield (
						<BotCard>
							<div>skeleton</div>
							{/* <StocksSkeleton /> */}
						</BotCard>
					);

					await sleep(1000);

					const toolCallId = nanoid();

					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: "assistant",
								content: [
									{
										type: "tool-call",
										toolName: "listStocks",
										toolCallId,
										args: { stocks },
									},
								],
							},
							{
								id: nanoid(),
								role: "tool",
								content: [
									{
										type: "tool-result",
										toolName: "listStocks",
										toolCallId,
										result: stocks,
									},
								],
							},
						],
					});

					return (
						<BotCard>
							<div>stocks</div>
							{/* <Stocks props={stocks} /> */}
						</BotCard>
					);
				},
			},
			showSimilarGifts: {
				description:
					"Show similar gifts to the user based on the recipient description, the gifts should be on our store.",
				parameters: z.object({
					recipientDescription: z
						.string()
						.describe("The description of the recipient"),
					gifts: z.array(
						z.object({
							id: z.string().describe("The id of the gift"),
							name: z.string().describe("The name of the gift"),
							description: z.string().describe("The description of the gift"),
							image: z.string().describe("The image of the gift"),
							unit_amount: z.number().describe("The price of the gift"),
							similarity: z.number().describe("The similarity of the gift"),
						}),
					),
				}),
				generate: async function* ({ recipientDescription, gifts }) {
					yield (
						<BotCard>
							<div>skeleton</div>
						</BotCard>
					);

					const openAIEmbedding = openai.embedding("text-embedding-ada-002");

					const recipientDescriptionEmbedding = await openAIEmbedding.doEmbed({
						values: Array.from(recipientDescription),
					});
					const descriptionEmbedding =
						recipientDescriptionEmbedding.embeddings[0];
					const supabase = createClient();
					const { data, error } = await supabase.rpc("search_gifts", {
						// @ts-expect-error - TODO: Fix this type error
						query_embedding: descriptionEmbedding,
						similarity_threshold: 0.75,
						match_count: 5,
					});

					const toolCallId = nanoid();

					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: "assistant",
								content: [
									{
										type: "tool-call",
										toolName: "showSimilarGifts",
										toolCallId,
										args: { recipientDescription },
									},
								],
							},
							{
								id: nanoid(),
								role: "tool",
								content: [
									{
										type: "tool-result",
										toolName: "showSimilarGifts",
										toolCallId,
										result: { gifts },
									},
								],
							},
						],
					});

					return (
						<BotCard>
							<div>similar gifts </div>
							<pre>
								data
								<code>{JSON.stringify(data, null, 2)}</code>
								<div>
									{data?.map((gift) => (
										<div key={gift.id}>
											{gift.name}
											<Image
												src={gift.image}
												width={200}
												height={200}
												alt={gift.name}
											/>
											<p>
												{Intl.NumberFormat("en-US", {
													style: "currency",
													currency: "USD",
													minimumFractionDigits: 0,
												}).format(gift.unit_amount / 100)}
											</p>
										</div>
									))}
								</div>
							</pre>
						</BotCard>
					);
				},
			},
			showStockPrice: {
				description:
					"Get the current stock price of a given stock or currency. Use this to show the price to the user.",
				parameters: z.object({
					symbol: z
						.string()
						.describe(
							"The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.",
						),
					price: z.number().describe("The price of the stock."),
					delta: z.number().describe("The change in price of the stock"),
				}),
				generate: async function* ({ symbol, price, delta }) {
					yield (
						<BotCard>
							{/* <StockSkeleton /> */}
							<div>skeleton</div>
						</BotCard>
					);

					await sleep(1000);

					const toolCallId = nanoid();

					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: "assistant",
								content: [
									{
										type: "tool-call",
										toolName: "showStockPrice",
										toolCallId,
										args: { symbol, price, delta },
									},
								],
							},
							{
								id: nanoid(),
								role: "tool",
								content: [
									{
										type: "tool-result",
										toolName: "showStockPrice",
										toolCallId,
										result: { symbol, price, delta },
									},
								],
							},
						],
					});

					return (
						<BotCard>
							<div>stocks</div>
							{/* <Stock props={{ symbol, price, delta }} /> */}
						</BotCard>
					);
				},
			},
			showStockPurchase: {
				description:
					"Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.",
				parameters: z.object({
					symbol: z
						.string()
						.describe(
							"The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.",
						),
					price: z.number().describe("The price of the stock."),
					numberOfShares: z
						.number()
						.describe(
							"The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.",
						),
				}),
				// biome-ignore lint/correctness/useYield: <explanation>
				generate: async function* ({ symbol, price, numberOfShares = 100 }) {
					const toolCallId = nanoid();

					if (numberOfShares <= 0 || numberOfShares > 1000) {
						aiState.done({
							...aiState.get(),
							messages: [
								...aiState.get().messages,
								{
									id: nanoid(),
									role: "assistant",
									content: [
										{
											type: "tool-call",
											toolName: "showStockPurchase",
											toolCallId,
											args: { symbol, price, numberOfShares },
										},
									],
								},
								{
									id: nanoid(),
									role: "tool",
									content: [
										{
											type: "tool-result",
											toolName: "showStockPurchase",
											toolCallId,
											result: {
												symbol,
												price,
												numberOfShares,
												status: "expired",
											},
										},
									],
								},
								{
									id: nanoid(),
									role: "system",
									content: "[User has selected an invalid amount]",
								},
							],
						});

						return <BotMessage content={"Invalid amount"} />;
					}
					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: "assistant",
								content: [
									{
										type: "tool-call",
										toolName: "showStockPurchase",
										toolCallId,
										args: { symbol, price, numberOfShares },
									},
								],
							},
							{
								id: nanoid(),
								role: "tool",
								content: [
									{
										type: "tool-result",
										toolName: "showStockPurchase",
										toolCallId,
										result: {
											symbol,
											price,
											numberOfShares,
										},
									},
								],
							},
						],
					});

					return (
						<BotCard>
							{/* <Purchase
                  props={{
                    numberOfShares,
                    symbol,
                    price: +price,
                    status: 'requires_action'
                  }}
                /> */}
							purchase
						</BotCard>
					);
				},
			},
			getEvents: {
				description:
					"List funny imaginary events between user highlighted dates that describe stock activity.",
				parameters: z.object({
					events: z.array(
						z.object({
							date: z
								.string()
								.describe("The date of the event, in ISO-8601 format"),
							headline: z.string().describe("The headline of the event"),
							description: z.string().describe("The description of the event"),
						}),
					),
				}),
				generate: async function* ({ events }) {
					yield (
						<BotCard>
							<div>events skeleton</div>
						</BotCard>
					);

					await sleep(1000);

					const toolCallId = nanoid();

					aiState.done({
						...aiState.get(),
						messages: [
							...aiState.get().messages,
							{
								id: nanoid(),
								role: "assistant",
								content: [
									{
										type: "tool-call",
										toolName: "getEvents",
										toolCallId,
										args: { events },
									},
								],
							},
							{
								id: nanoid(),
								role: "tool",
								content: [
									{
										type: "tool-result",
										toolName: "getEvents",
										toolCallId,
										result: events,
									},
								],
							},
						],
					});

					return (
						<BotCard>
							{/* <Events props={events} /> */}
							<div>Events</div>
						</BotCard>
					);
				},
			},
		},
	});

	return {
		id: nanoid(),
		display: result.value,
	};
}

export const AI = createAI<AIState, UIState>({
	actions: {
		submitUserMessage,
	},
	initialUIState: [],
	initialAIState: { chatId: nanoid(), messages: [] },
	onGetUIState: async () => {
		"use server";

		const supabase = createClient();
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (user) {
			const aiState = getAIState();

			if (aiState) {
				// @ts-expect-error missing types
				const uiState = getUIStateFromAIState(aiState);
				return uiState;
			}
		}
	},
	onSetAIState: async ({ state }) => {
		"use server";

		const supabase = createClient();
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (user) {
			const { chatId, messages } = state;

			const createdAt = new Date();
			const userId = user.id;
			const path = `/chat/${chatId}`;

			const firstMessageContent = messages[0]?.content as string;
			const title = firstMessageContent.substring(0, 100);

			const chat: Chat = {
				id: chatId,
				title,
				userId,
				createdAt,
				messages,
				path,
			};

			// * TODO: save chat
			// await saveChat(chat)
		} else {
			return;
		}
	},
});

export const getUIStateFromAIState = async (aiState: Chat) => {
	return aiState.messages
		.filter((message) => message.role !== "system")
		.map((message, index) => ({
			id: `${aiState.chatId}-${index}`,
			display:
				message.role === "tool" ? (
					message.content.map((tool) => {
						return tool.toolName === "listStocks" ? (
							<BotCard key={tool.toolName}>
								<div>ListStocks</div>
								{/* TODO: Infer types based on the tool result*/}
								{/* <Stocks props={tool.result} /> */}
							</BotCard>
						) : tool.toolName === "showStockPrice" ? (
							<BotCard key={tool.toolName}>
								<div>showStockPrice</div>
								{/* <Stock props={tool.result} /> */}
							</BotCard>
						) : tool.toolName === "showStockPurchase" ? (
							<BotCard key={tool.toolName}>
								<div>showStockPurchase</div>
								{/* <Purchase props={tool.result} /> */}
							</BotCard>
						) : tool.toolName === "getEvents" ? (
							<BotCard key={tool.toolName}>
								<div>GetEvents</div>
								{/* <Events props={tool.result} /> */}
							</BotCard>
						) : null;
					})
				) : message.role === "user" ? (
					<UserMessage>{message.content as string}</UserMessage>
				) : message.role === "assistant" &&
					typeof message.content === "string" ? (
					<BotMessage content={message.content} />
				) : null,
		}));
};

export async function getChat(id: string, userId: string) {
	const chat = await kv.hgetall<Chat>(`chat:${id}`);

	if (!chat || (userId && chat.userId !== userId)) {
		return null;
	}

	return chat;
}

export async function removeChat({ id, path }: { id: string; path: string }) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			error: "Unauthorized",
		};
	}

	//Convert uid to string for consistent comparison with session.user.id
	const uid = String(await kv.hget(`chat:${id}`, "userId"));

	if (uid !== user.id) {
		return {
			error: "Unauthorized",
		};
	}

	await kv.del(`chat:${id}`);
	await kv.zrem(`user:chat:${user.id}`, `chat:${id}`);

	revalidatePath("/");
	return revalidatePath(path);
}

export async function saveChat(chat: Chat) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		const pipeline = kv.pipeline();
		pipeline.hmset(`chat:${chat.id}`, chat);
		pipeline.zadd(`user:chat:${chat.userId}`, {
			score: Date.now(),
			member: `chat:${chat.id}`,
		});
		await pipeline.exec();
	} else {
		return;
	}
}

export async function refreshHistory(path: string) {
	redirect(path);
}
