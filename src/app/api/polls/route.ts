import OpenAI from "openai";
import { env } from "~/env";
import type { Tables } from "~/types/database-types";

type Poll = Tables<"polls">;

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	const poll = (await req.json()) as Poll;

	const embeddingResponse = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: poll.question,
	});
}
