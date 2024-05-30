import { redirect } from "next/navigation";
import { Container } from "~/components/container";
import { categories } from "~/lib/categories";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/server";
import { Polls } from "./_components/polls";

export default async function ExplorePage({
	searchParams,
}: {
	searchParams: { category: string | undefined };
}) {
	const supabase = createClient();
	const categoryId = categories.find(
		(category) =>
			category.name.toLowerCase() === searchParams.category?.toLowerCase(),
	)?.id;

	const queryPollsData = await supabase
		.from("polls_categories")
		.select(`
      polls (
				id,
				question,
				image,
				options (id, text),
				votes (id, poll_id, option_id),
				users (id, username, avatar_url),
				categories (id, name)
			)
    `)
		.limit(15);

	const queryPollsDataByCategory = await supabase
		.from("polls_categories")
		.select(`
		  *,
      polls (
				id,
				question,
				image,
				options (id, text),
				votes (id, poll_id, option_id),
				users (id, username, avatar_url),
				categories (id, name)
			),
			categories (id, name)
    `)
		.eq("categorie_id", Number(categoryId));

	console.log({ categoryId });

	const { data, error } =
		categoryId != null ? await queryPollsDataByCategory : await queryPollsData;

	console.log({ data });

	if (error) {
		redirect("/");
	}

	const pollWithVotesAndUser: PollWithOptionsAndVotes[] = [];

	for (let i = 0; i < data.length; i++) {
		const pollData = data[i];

		if (!pollData?.polls) continue;

		const votesByOption: Record<number, number> = {};
		const totalVotes = pollData.polls.votes?.length ?? 0;

		for (let j = 0; j < (pollData.polls.options?.length ?? 0); j++) {
			const option = pollData.polls.options[j];
			if (option) {
				votesByOption[option.id] = 0;
			}
		}

		for (let k = 0; k < (pollData.polls.votes?.length ?? 0); k++) {
			const vote = pollData.polls.votes[k];
			if (vote) {
				votesByOption[vote.option_id]++;
			}
		}

		const votesPercentage: Record<number, number> = {};
		for (const optionId in votesByOption) {
			const votes = votesByOption[optionId];
			const percentage = totalVotes > 0 ? ((votes ?? 0) / totalVotes) * 100 : 0;
			votesPercentage[optionId] = percentage;
		}

		const dataToPush: PollWithOptionsAndVotes = {
			id: pollData.polls.id,
			question: pollData.polls.question,
			image: pollData.polls.image ?? undefined,
			options: (pollData.polls.options ?? []).map((option) => ({
				...option,
				votes: votesByOption[option?.id] ?? 0,
				percentage: votesPercentage[option?.id] ?? 0,
			})),
			user: {
				id: pollData.polls.users?.id ?? "",
				username: pollData.polls.users?.username ?? "",
				avatar_url: pollData.polls.users?.avatar_url ?? null,
			},
			categories: pollData.polls.categories ?? [],
		};

		pollWithVotesAndUser.push(dataToPush);
	}

	return (
		<Container>
			<h2 className="text-4xl font-semibold">Explore</h2>

			<Polls polls={pollWithVotesAndUser} />
		</Container>
	);
}
