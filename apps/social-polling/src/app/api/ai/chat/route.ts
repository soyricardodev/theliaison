import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

import { env } from "~/env";

const config = new Configuration({
	apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
	try {
		const { messages } = await request.json();

		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			stream: true,
			messages,
		});

		const stream = OpenAIStream(response);

		return new StreamingTextResponse(stream);
	} catch (error) {
		return new Response("Error generating stream", {
			status: 500,
			statusText: String(error),
		});
	}
}
