import { type NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { createClient } from "~/supabase/server";

export async function POST(req: NextRequest) {
	const { userDescription } = await req.json();

	const openAIEmbedding = openai.embedding("text-embedding-ada-002");

	const recipientDescriptionEmbedding = await openAIEmbedding.doEmbed({
		values: Array.from(userDescription),
	});
	const descriptionEmbedding = recipientDescriptionEmbedding.embeddings[0];

	console.log({
		userDescription,
		recipientDescriptionEmbedding,
	});

	const supabase = createClient();
	const { data, error } = await supabase.rpc("search_gifts", {
		// @ts-expect-error - TODO: Fix this type error
		query_embedding: descriptionEmbedding,
		similarity_threshold: 0.75,
		match_count: 5,
	});

	console.log({ data, error });

	return NextResponse.json({
		data,
		error,
		descriptionEmbedding,
		userDescription,
	});
}
