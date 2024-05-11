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
		profiles (id, username, avatar_url)
  `);

	const { data, error } = await pollsWithOptionsQuery;

	if (!data || error) {
		return redirect("/");
	}

	function calculateVotes() {
		const votesDetailsArray: PollWithOptionsAndVotes[] = [];

		data?.forEach((pollData) => {
			const votesByOption: Record<number, number> = {};
			const totalVotes = pollData.votes.length;

			pollData.options.forEach((option) => {
				votesByOption[option.id] = 0;
			});

			pollData.votes.forEach((vote) => {
				votesByOption[vote.option_id]++;
			});

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
					id: pollData.profiles?.id ?? "",
					username: pollData.profiles?.username ?? "",
					avatar_url: pollData.profiles?.avatar_url ?? null,
				},
			};

			votesDetailsArray.push(dataToPush);
		});

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
