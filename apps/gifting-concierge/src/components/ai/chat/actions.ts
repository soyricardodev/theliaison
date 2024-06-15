import { createAI, getAIState } from "ai/rsc";
import { createClient } from "~/supabase/server";
import { nanoid } from "~/utils";
import type { Chat, Message } from "~/utils/types";

export type AIState = {
	chatId: string;
	messages: Message[];
};

export type UIState = {
	id: string;
	display: React.ReactNode;
}[];

// export const AI = createAI<AIState, UIState>({
// 	actions: {},
// 	initialUIState: [],
// 	initialAIState: { chatId: nanoid(), messages: [] },
// 	onGetUIState: async () => {
// 		"use server";

// 		const supabase = createClient();
// 		const {
// 			data: { user },
// 			error,
// 		} = await supabase.auth.getUser();

// 		if (user) {
// 			const aiState = getAIState();

// 			// if (aiState) {
// 			// 	const uiState = getUIStateFromAIState(aiState);
// 			// 	return uiState;
// 			// }
// 		}
// 	},
// });
// export const getUIStateFromAIState = (aiState: Chat) => {
// 	return aiState.messages
//     .filter(message => message.role !== 'system')
//     .map((message, index) => ({
//       id: `${aiState.chatId}-${index}`,
//       display:
//         message.role === 'tool' ? (
//           message.content.map(tool => {
//             return tool.toolName === 'listStocks' ? (
//               <BotCard>
//                 {/* TODO: Infer types based on the tool result*/}
//                 {/* @ts-expect-error */}
//                 <Stocks props={tool.result} />
//               </BotCard>
//             ) : tool.toolName === 'showStockPrice' ? (
//               <BotCard>
//                 <Stock props=tool.result/>
//               </BotCard>
//             ) : tool.toolName === 'showStockPurchase' ? (
//               <BotCard>
//                 <Purchase props=tool.result/>
//               </BotCard>
//             ) : tool.toolName === 'getEvents' ? (
//               <BotCard>
//                 <Events props=tool.result/>
//               </BotCard>
//             ) : null
//           })
//         ) : message.role === 'user' ? (
//           <UserMessage>{message.content as string}</UserMessage>
//         ) : message.role === 'assistant' &&
//           typeof message.content === 'string' ? (
//           <BotMessage content={message.content} />
//         ) : null
//     }))
// };
