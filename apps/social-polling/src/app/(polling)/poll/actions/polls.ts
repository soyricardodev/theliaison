"use server";

import { createClient } from "~/utils/supabase/server";

export async function getSuggestedPolls(pollEmbedding: number[]) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("search_polls", {
    // @ts-expect-error - TODO: Fix this type error
    query_embedding: pollEmbedding,
    similarity_threshold: 0.75,
    match_count: 5,
  });

  if (data) {
    return { data, error };
  }

  return { data: [], error };
}
