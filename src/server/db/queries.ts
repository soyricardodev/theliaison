import { nanoid } from "nanoid";
import type { PollFormValues } from "~/app/(polling)/create/_components/create-poll-scratch";
import { createClient } from "~/utils/supabase/client";

export async function createPollWithOptions(
	values: PollFormValues,
	image: string,
) {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		throw new Error("Unauthorized");
	}

	const pollQuestionFormatted = values.question
		.replace(/[^a-zA-Z0-9]/g, "-")
		.toLowerCase();
	const pollRandomId = nanoid().substring(0, 6);
	const pollQuestionId = `${pollQuestionFormatted}-${pollRandomId}`;

	const { error: createPollError } = await supabase.from("polls").insert({
		id: pollQuestionId,
		question: values.question,
		user_id: user.id,
		image,
	});

	if (createPollError) {
		console.log(createPollError, "createPollError");
		throw new Error(`Unable to create poll: ${createPollError.message}`);
	}

	const optionsToInsert = [];

	for (const option of values.options) {
		const optionToInsert = {
			text: option.value,
			poll_id: pollQuestionId,
		};

		optionsToInsert.push(optionToInsert);
	}

	const { error: createPollOptionsError } = await supabase
		.from("options")
		.insert(optionsToInsert);

	if (createPollOptionsError) {
		console.log(createPollOptionsError, "createPollOptionsError");
		throw new Error("Unable to create poll options");
	}

	const categoriesToInsert = [];

	for (const category of values.categories) {
		const categoryToInsert = {
			categorie_id: Number(category),
			poll_id: pollQuestionId,
		};

		categoriesToInsert.push(categoryToInsert);
	}

	const { error: createPollCategoriesError } = await supabase
		.from("polls_categories")
		.insert(categoriesToInsert);

	if (createPollCategoriesError) {
		throw new Error("Unable to create poll categories");
	}

	return pollQuestionId;
}

export async function getUserPolls() {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		throw new Error("Unauthorized");
	}

	const { data: polls, error: getPollsError } = await supabase
		.from("polls")
		.select("*")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false })
		.limit(10)
		.select();

	if (getPollsError || !polls) {
		throw new Error("Unable to get polls");
	}

	return polls;
}

export async function insertPollVote(pollId: string, optionId: number) {
	const supabase = createClient();

	const {
		data: { user },
		error: getUserError,
	} = await supabase.auth.getUser();

	if (getUserError || !user) {
		throw new Error("Unauthorized");
	}

	const { data, error: insertPollVoteError } = await supabase
		.from("votes")
		.insert({
			poll_id: pollId,
			option_id: optionId,
			user_id: user.id,
		})
		.select("*");

	if (insertPollVoteError) {
		console.log(insertPollVoteError, "inserting vote");
		throw new Error("Unable to insert poll vote");
	}

	return data;
}
