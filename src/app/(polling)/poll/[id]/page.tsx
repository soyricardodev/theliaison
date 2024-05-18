import Image from "next/image";
import { redirect } from "next/navigation";
import { Progress } from "@nextui-org/react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Toaster } from "~/components/ui/sonner";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/server";
import { Comments } from "./comments";
import { FormComment } from "./form-comment";
import { OptionToVote } from "./option-to-vote";

export default async function PollPage({
	params: { id },
}: { params: { id: string } }) {
	const supabase = createClient();
	const pollsWithOptionsQuery = supabase
		.from("polls")
		.select(`
    id,
    question,
    options (id, text),
		votes (id, poll_id, option_id, user_id),
		users (id, username, avatar_url),
		image
  `)
		.eq("id", id)
		.single();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data, error } = await pollsWithOptionsQuery;

	if (!data || error) {
		return redirect("/");
	}

	const votesByOption: Record<number, number> = {};
	const totalVotes = data.votes.length;

	for (const option of data.options) {
		votesByOption[option.id] = 0;
	}

	for (const vote of data.votes) {
		votesByOption[vote.option_id]++;
	}

	const votesPercentage: Record<number, number> = {};
	for (const optionId in votesByOption) {
		const votes = votesByOption[optionId];
		const percentage =
			totalVotes > 0 ? ((votes ?? 0) / (totalVotes ?? 0)) * 100 : 0;
		votesPercentage[optionId] = Math.round(percentage);
	}

	const optionSelectedForUserLoggedIn = data.votes.find(
		(vote) => vote.user_id === user?.id,
	);

	const userAlreadyVoted = optionSelectedForUserLoggedIn != null;

	const dataToRender: PollWithOptionsAndVotes = {
		id: data.id,
		question: data.question,
		options: data.options.map((option) => ({
			...option,
			votes: votesByOption[option.id],
			percentage: votesPercentage[option.id],
		})),
		user: {
			id: data.users?.id ?? "",
			username: data.users?.username ?? "",
			avatar_url: data.users?.avatar_url ?? null,
		},
		image: data.image ?? undefined,
	};

	// * User Subscription
	const { data: subscription } = await supabase
		.from("subscriptions")
		.select("*, prices(*, products(*))")
		.eq("user_id", user?.id ?? "")
		.single();

	const userCanVote =
		(subscription?.status === "active" &&
			subscription?.prices?.products?.name === "Poll Creator") ||
		!userAlreadyVoted;

	// * Comments
	const { data: comments } = await supabase
		.from("comments")
		.select(`
			id,
			content,
			created_at,
			users (id, username, avatar_url)
		`)
		.eq("poll_id", id)
		.order("created_at", { ascending: false });

	console.log(comments);

	return (
		<main className="flex-1 overflow-auto">
			<div className="flex flex-col max-w-screen-2xl mx-auto">
				<div className="flex flex-1 flex-col gap-3 p-4 pb-2 pt-3 md:pt-16 lg:pt-24">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h2 className="text-2xl font-semibold">
								{dataToRender.question}
							</h2>
							<Image
								alt={`Poll ${dataToRender.question}`}
								className="rounded-lg mt-4 object-cover"
								height={400}
								src={`/polls/${dataToRender.image}`}
								style={{
									aspectRatio: "600/400",
									objectFit: "cover",
								}}
								width={600}
							/>
						</div>

						{/* Poll Data */}
						<div className="relative flex h-full w-full flex-col gap-3 lg:p-3">
							<ul className="w-full grid gap-6">
								{dataToRender.options.map((option) => (
									<OptionToVote
										option={option}
										key={option.id}
										pollId={Number(id)}
										alreadyVoted={userAlreadyVoted}
										userId={user?.id}
										optionVotedId={optionSelectedForUserLoggedIn?.option_id}
										canVote={userCanVote}
									/>
								))}
							</ul>
							<div>
								<p className="text-sm text-gray-500">
									Total Votes: {totalVotes}
								</p>
							</div>
						</div>

						{/* Poll Comments */}
						<div className="order-2 shrink-0 origin-left overflow-scroll flex-col rounded-lg py-2 transition-all duration-300 ease-out @container lg:flex  md:max-h-[calc(100vh-190px)] w-full">
							<ScrollArea className="w-full flex flex-col gap-2 p-2">
								<h5 className="text-lg font-medium py-3">Comments</h5>
								{user != null && <FormComment pollId={Number(id)} />}

								<ul className="w-full flex flex-col gap-2">
									<Comments serverComments={comments ?? []} />
								</ul>
							</ScrollArea>
						</div>

						<div>stats</div>
					</div>
				</div>
			</div>
			<Toaster />
		</main>
	);
}
