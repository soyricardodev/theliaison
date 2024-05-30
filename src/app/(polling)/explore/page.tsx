import { Container } from "~/components/container";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { Polls } from "./_components/polls";
import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ExplorePage({
	searchParams,
}: {
	searchParams: string | undefined;
}) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("polls")
		.select(`
      id,
      question,
      image,
      options (id, text),
      votes (id, poll_id, option_id),
      users (id, username, avatar_url),
      categories (id, name)
    `)
		.limit(15)
		.order("created_at", { ascending: false });

	if (error || !data) {
		redirect("/");
	}

	const pollWithVotesAndUser: PollWithOptionsAndVotes[] = [];

	for (let i = 0; i < data.length; i++) {
		const pollData = data[i];

		if (!pollData) continue;

		const votesByOption: Record<number, number> = {};
		const totalVotes = pollData.votes?.length ?? 0;

		for (let j = 0; j < (pollData.options?.length ?? 0); j++) {
			const option = pollData.options[j];
			if (option) {
				votesByOption[option.id] = 0;
			}
		}

		for (let k = 0; k < (pollData.votes?.length ?? 0); k++) {
			const vote = pollData.votes[k];
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
			id: pollData.id,
			question: pollData.question,
			image: pollData.image ?? undefined,
			options: (pollData.options ?? []).map((option) => ({
				...option,
				votes: votesByOption[option?.id] ?? 0,
				percentage: votesPercentage[option?.id] ?? 0,
			})),
			user: {
				id: pollData.users?.id ?? "",
				username: pollData.users?.username ?? "",
				avatar_url: pollData.users?.avatar_url ?? null,
			},
			categories: pollData.categories ?? [],
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
