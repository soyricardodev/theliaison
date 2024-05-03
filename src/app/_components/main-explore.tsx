import { createClient } from "~/utils/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PollCard, PollsContainer } from "./polls";
import type { PollWithOptionsAndVotes } from "~/types/poll";

export async function MainExplore() {
	const supabase = createClient();
	const pollsWithOptionsQuery = supabase.from("polls").select(`
    id,
    question,
    options (id, text),
		votes (id, poll_id, option_id, user_id),
		profiles (id, username, avatar_url)
  `);

	const { data } = await pollsWithOptionsQuery;

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
		<div className="mx-auto flex max-w-7xl flex-col px-6 pb-20">
			<div className="grid gap-4">
				<h2 className="text-4xl font-semibold">Explore</h2>
				<ExplorePolls featuredPolls={dataToRender} newPolls={dataToRender} />
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
		<Tabs defaultValue="new" className="grid gap-6">
			<TabsList className="flex items-center gap-2 justify-start bg-transparent">
				<TabsTrigger value="new">New Polls</TabsTrigger>
				<TabsTrigger value="featured">Featured</TabsTrigger>
			</TabsList>
			<TabsContent value="new" className="mt-0">
				{newPolls != null ? <Polls polls={newPolls} /> : null}
			</TabsContent>
			<TabsContent value="featured" className="mt-0">
				{featuredPolls != null ? <Polls polls={featuredPolls} /> : null}
			</TabsContent>
		</Tabs>
	);
}

export function Polls({ polls }: { polls: PollWithOptionsAndVotes[] }) {
	return (
		<PollsContainer>
			{polls.map((poll, idx) => (
				<PollCard poll={poll} key={`${poll.id}-${idx}`} />
			))}
		</PollsContainer>
	);
}
