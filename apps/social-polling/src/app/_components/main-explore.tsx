import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/server";
import { ExplorePollsTabs } from "./explore-polls-tabs";
import { NewPollsAproach } from "./polls";

export async function MainExplore() {
	const supabase = createClient();
	const featuredPollsWithOptionsQuery = supabase
		.from("polls")
		.select(
			`
    id,
    question,
    options (id, text),
		votes (id, poll_id, option_id, user_id),
		users (id, username, avatar_url),
		image,
		categories (*)
  `,
		)
		.eq("is_featured", true);
	const pollsWithOptionsQuery = supabase
		.from("polls")
		.select(
			`
    id,
    question,
    options (id, text),
		votes (id, poll_id, option_id, user_id),
		users (id, username, avatar_url),
		image,
		categories (*)
  `,
		)
		.eq("is_featured", false);

	const { data: featuredPollsQuery } = await featuredPollsWithOptionsQuery;
	const { data: allPollsQuery } = await pollsWithOptionsQuery;

	function calculateVotes(data: any) {
		const votesDetailsArray: PollWithOptionsAndVotes[] = [];

		if (!data) return votesDetailsArray;

		for (const pollData of data) {
			const votesByOption: Record<number, number> = {};
			const totalVotes = pollData.votes.length;

			for (const option of pollData.options) {
				votesByOption[option.id] = 0;
			}

			for (const vote of pollData.votes) {
				votesByOption[vote.option_id]++;
			}

			const votesPercentage: Record<number, number> = {};
			for (const optionId in votesByOption) {
				const votes = votesByOption[optionId];
				const percentage =
					totalVotes > 0 ? ((votes ?? 0) / (totalVotes ?? 0)) * 100 : 0;
				votesPercentage[optionId] = percentage;
			}

			const dataToPush: PollWithOptionsAndVotes = {
				id: pollData.id,
				question: pollData.question,
				image: pollData.image ?? undefined,
				options: pollData.options.map((option) => ({
					...option,
					votes: votesByOption[option.id],
					percentage: votesPercentage[option.id],
				})),
				user: {
					id: pollData.users?.id ?? "",
					username: pollData.users?.username ?? "",
					avatar_url: pollData.users?.avatar_url ?? null,
				},
				categories: pollData.categories,
			};

			votesDetailsArray.push(dataToPush);
		}

		return votesDetailsArray;
	}

	const featuredPolls = calculateVotes(featuredPollsQuery);
	const allPolls = calculateVotes(allPollsQuery);

	return (
		<div className="mx-auto flex max-w-7xl flex-col px-6 pb-20">
			<div className="grid gap-4">
				<h2 className="font-heading text-4xl font-bold">Explore</h2>
				<ExplorePolls featuredPolls={featuredPolls} newPolls={allPolls} />
			</div>
		</div>
	);
}

export function ExplorePolls({
	newPolls,
	featuredPolls,
}: {
	newPolls: PollWithOptionsAndVotes[];
	featuredPolls: PollWithOptionsAndVotes[];
}) {
	return (
		<ExplorePollsTabs
			allPolls={newPolls != null ? <NewPollsAproach polls={newPolls} /> : null}
			featuredPolls={
				featuredPolls != null ? <NewPollsAproach polls={featuredPolls} /> : null
			}
		/>
	);
}
