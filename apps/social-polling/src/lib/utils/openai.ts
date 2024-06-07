import type OpenAI from "openai";
import type { z } from "zod";
import { OpenAIStream } from "ai";
import zodToJsonSchema from "zod-to-json-schema";

import type {
  TAnyToolDefinitionArray,
  TToolDefinitionMap,
} from "./tool-definition";

const consumeStream = async (stream: ReadableStream) => {
  const reader = stream.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }
};

export function runOpenAICompletion<
  T extends Omit<
    Parameters<typeof OpenAI.prototype.chat.completions.create>[0],
    "functions"
  >,
  const TFunctions extends TAnyToolDefinitionArray,
>(
  openai: OpenAI,
  params: T & {
    functions: TFunctions;
  },
) {
  let text = "";
  let hasFunction = false;

  type TToolMap = TToolDefinitionMap<TFunctions>;
  let onTextContent: (text: string, isFinal: boolean) => void = () => {};

  const functionsMap: Record<string, TFunctions[number]> = {};
  for (const fn of params.functions) {
    functionsMap[fn.name] = fn;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onFunctionCall = {} as any;

  const { functions, ...rest } = params;

  (async () => {
    consumeStream(
      OpenAIStream(
        (await openai.chat.completions.create({
          ...rest,
          stream: true,
          functions: functions.map((fn) => ({
            name: fn.name,
            description: fn.description,
            parameters: zodToJsonSchema(fn.parameters) as Record<
              string,
              unknown
            >,
          })),
          // biome-ignore lint/suspicious/noExplicitAny: here we need the type to be any
        })) as any,
        {
          async experimental_onFunctionCall(functionCallPayload) {
            hasFunction = true;

            if (!onFunctionCall[functionCallPayload.name]) {
              return;
            }

            // we need to convert arguments from z.input to z.output
            // this is necessary if someone uses a .default in their schema
            const zodSchema =
              functionsMap[functionCallPayload.name]?.parameters;
            const parsedArgs = zodSchema?.safeParse(
              functionCallPayload.arguments,
            );

            if (!parsedArgs?.success) {
              throw new Error(
                "Invalid function call in message. Expected a function call object",
              );
            }

            onFunctionCall[functionCallPayload.name]?.(parsedArgs.data);
          },
          onToken(token) {
            text += token;
            if (text.startsWith("{")) return;
            onTextContent(text, false);
          },
          onFinal() {
            if (hasFunction) return;
            onTextContent(text, true);
          },
        },
      ),
    );
  })();

  return {
    onTextContent: (
      callback: (text: string, isFinal: boolean) => void | Promise<void>,
    ) => {
      onTextContent = callback;
    },
    onFunctionCall: <TName extends TFunctions[number]["name"]>(
      name: TName,
      callback: (
        args: z.output<
          TName extends keyof TToolMap
            ? TToolMap[TName] extends infer TToolDef
              ? TToolDef extends TAnyToolDefinitionArray[number]
                ? TToolDef["parameters"]
                : never
              : never
            : never
        >,
      ) => void | Promise<void>,
    ) => {
      onFunctionCall[name] = callback;
    },
  };
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const runAsyncFnWithoutBlocking = (
  // biome-ignore lint/suspicious/noExplicitAny: here we need the type to be any
  fn: (...args: any) => Promise<any>,
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Fake data
export function getStockPrice(name: string) {
  let total = 0;
  for (let i = 0; i < name.length; i++) {
    total = (total + name.charCodeAt(i) * 9999121) % 9999;
  }
  return total / 100;
}
