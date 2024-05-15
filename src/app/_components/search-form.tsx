"use client";
import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import type { Tables } from "~/types/database-types";
import { createClient } from "~/utils/supabase/client";

import { SearchPlaceholder } from "~/components/search-placeholder";

type Polls = Tables<"polls">;

export function SearchForm() {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState<Polls[]>();
	const [searchError, setSearchError] = useState<PostgrestError>();

	const supabase = createClient();

	async function getSearchData() {
		const { data, error } = await supabase
			.from("polls")
			.select()
			.textSearch("question", `"${searchText}"`, {
				type: "websearch",
				config: "english",
			});

		if (data != null || !error) {
			setSearchResults(data);
		}
		if (error != null) {
			setSearchError(error);
		}
		return { data, error };
	}

	useEffect(() => {
		getSearchData();
	}, [getSearchData]);
	return (
		<SearchPlaceholder
			placeholders={[
				"How important is humor in a potential partner?",
				"What is the biggest obstacle to a fulfilling sex life?",
				"How do you feel about splitting the bill on a date?",
			]}
			onChange={() => {}}
			onSubmit={() => {}}
		/>
	);
}
