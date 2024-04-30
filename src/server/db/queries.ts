import { PollFormValues } from "~/app/(polling)/social-polling/create/_components/create-poll";
import { createClient } from "~/utils/supabase/client";

export async function createPollWithOptions(values: PollFormValues) {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		throw new Error("Unauthorized");
	}

	const { data: poll, error: createPollError } = await supabase
		.from("polls")
		.insert({
			question: values.question,
			user_id: user.id,
		})
		.select("*");

	if (createPollError || !poll) {
		throw new Error("Unable to create poll");
	}

	const optionsToInsert = values.options.map((option) => ({
		text: option.value,
		poll_id: poll[0]!.id,
	}));

	const { data: pollOptions, error: createPollOptionsError } = await supabase
		.from("options")
		.insert(optionsToInsert)
		.select();

	if (createPollOptionsError || !pollOptions) {
		throw new Error("Unable to create poll options");
	}

	const categoriesToInsert = values.categories.map((category) => ({
		categorie_id: Number(category),
		poll_id: poll[0]!.id,
	}));

	const { error: createPollCategoriesError } = await supabase
		.from("polls_categories")
		.insert(categoriesToInsert);

	if (createPollCategoriesError) {
		console.log(createPollCategoriesError);
		throw new Error("Unable to create poll categories");
	}

	return poll[0]!;
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

export async function insertPollVote(pollId: number, optionId: number) {
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
