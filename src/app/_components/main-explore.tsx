import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/server";
import { ExplorePollsTabs } from "./explore-polls-tabs";
import { NewPollsAproach } from "./polls";

export async function MainExplore() {
	const supabase = createClient();
	const pollsWithOptionsQuery = supabase.from("polls").select(`
    id,
    question,
    options (id, text),
		votes (id, poll_id, option_id, user_id),
		users (id, username, avatar_url),
		image,
		categories (*)
  `);

	const { data } = await pollsWithOptionsQuery;

	function calculateVotes() {
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

	const dataToRender = calculateVotes();
	const dataToRenderStructuredClone = structuredClone(dataToRender);
	const dataToRenderReversed = dataToRenderStructuredClone.reverse();

	return (
		<div className="mx-auto flex max-w-7xl flex-col px-6 pb-20">
			<div className="grid gap-4">
				<h2 className="text-4xl font-bold font-heading">Explore</h2>
				<ExplorePolls
					featuredPolls={dataToRenderReversed}
					newPolls={dataToRender}
				/>
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
