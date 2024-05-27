import OpenAI from "openai";
import { env } from "~/env";
import { createClient } from "~/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query");

	if (!query) {
		return NextResponse.json({ error: "No query provided" });
	}

	const embeddingResponse = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: query,
	});

	const embedding = embeddingResponse.data[0]?.embedding;

	const supabase = createClient();

	const { data, error } = await supabase.rpc("search_polls", {
		// @ts-expect-error - TODO: Fix this type error
		query_embedding: embedding,
		similarity_threshold: 0.75,
		match_count: 10,
	});

	if (data) {
		return NextResponse.json({ data });
	}

	return NextResponse.json({ error });
}
