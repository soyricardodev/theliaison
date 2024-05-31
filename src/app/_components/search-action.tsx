"use server";

import { Redis } from "@upstash/redis";
import OpenAI from "openai";
import { env } from "~/env";
import { createClient } from "~/utils/supabase/server";

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
});

const redis = Redis.fromEnv();

export async function searchPolls(query: string) {
	const cachedEmbeddingResponse = (await redis.get(`embedding-${query}`)) as
		| number[]
		| null;

	if (cachedEmbeddingResponse != null) {
		const supabase = createClient();

		const { data, error } = await supabase.rpc("search_polls", {
			// @ts-expect-error - TODO: Fix this type error
			query_embedding: cachedEmbeddingResponse,
			similarity_threshold: 0.75,
			match_count: 10,
		});

		if (data) {
			return { data, error };
		}

		return { data: [], error };
	}

	const embeddingResponse = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: query,
	});

	const embedding = embeddingResponse.data[0]?.embedding;

	if (embedding != null && embedding.length > 0) {
		await redis.set(`embedding-${query}`, embedding);
	}

	const supabase = createClient();

	const { data, error } = await supabase.rpc("search_polls", {
		// @ts-expect-error - TODO: Fix this type error
		query_embedding: embedding,
		similarity_threshold: 0.75,
		match_count: 10,
	});

	if (data) {
		return { data, error };
	}

	return { data: [], error };
}
