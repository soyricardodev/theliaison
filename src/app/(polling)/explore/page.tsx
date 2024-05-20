import { redirect } from "next/navigation";
import { PollCard } from "~/app/_components/polls";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/server";

export default async function ExplorePage() {
	const supabase = createClient();
	const pollsWithOptionsQuery = supabase.from("polls").select(`
    id,
    question,
    options (id, text),
		votes (id, poll_id, option_id, user_id),
		users (id, username, avatar_url),
		image
  `);

	const { data, error } = await pollsWithOptionsQuery;

	if (!data || error) {
		return redirect("/");
	}

	function calculateVotes() {
		const votesDetailsArray: PollWithOptionsAndVotes[] = [];

		if (!data || error) {
			return votesDetailsArray;
		}

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
				image: pollData.image ?? undefined,
			};

			votesDetailsArray.push(dataToPush);
		}

		return votesDetailsArray;
	}

	const dataToRender = calculateVotes();

	return (
		<div className="grid auto-cols-[minmax(0,_1fr)]">
			<div className="col-start-1 row-start-1">
				<div className="mx-auto my-[60px] max-w-5xl px-6">
					<ul className="mx-auto grid w-full grid-cols-[repeat(auto-fit,_minmax(296px,1fr))] gap-4">
						{dataToRender.map((poll, idx) => (
							<PollCard key={`${poll.id}-${idx}`} poll={poll} />
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
