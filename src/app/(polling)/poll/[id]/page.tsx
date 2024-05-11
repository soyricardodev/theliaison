import Image from "next/image";
import { redirect } from "next/navigation";
import { Progress } from "~/components/ui/progress";
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
		profiles (id, username, avatar_url)
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
			id: data.profiles?.id ?? "",
			username: data.profiles?.username ?? "",
			avatar_url: data.profiles?.avatar_url ?? null,
		},
	};

	console.log({ optionSelectedForUserLoggedIn, userAlreadyVoted });

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
			*,
			profiles (id, username, avatar_url)
		`)
		.eq("poll_id", id)
		.order("created_at", { ascending: false });

	return (
		<main className="flex-1 overflow-auto">
			<div className="flex flex-col max-w-screen-2xl mx-auto">
				<div className="flex flex-1 flex-col gap-3 border-t bg-gray-50 p-4 pb-2 pt-3 lg:border-t-0 lg:bg-white lg:pt-0">
					<div className="flex flex-1 flex-col items-start gap-4 md:flex-row">
						{/* Poll Data */}
						<div className="relative flex h-full w-full flex-1 flex-col gap-3 rounded-xl bg-[#fafafa] sm:order-2 lg:p-3">
							<h3 className="text-2xl font-semibold">
								{dataToRender.question}
							</h3>

							<ul className="w-full grid gap-2">
								{dataToRender.options.map((option) => {
									if (
										userAlreadyVoted &&
										option.id === optionSelectedForUserLoggedIn?.option_id
									) {
										return (
											<li
												key={option.id}
												className="hover:bg-gray-300 bg-gray-300 px-3 py-2 rounded-lg transition-colors cursor-crosshair"
											>
												<div className="flex items-center gap-2">
													<div className="flex items-center justify-center mr-4">
														<span className="text-sm md:text-base">
															{option.votes}
														</span>
													</div>
													<div className="flex flex-col w-full gap-3">
														<div className="flex justify-between items-center">
															<p className="text-sm md:text-lg font-medium">
																{option.text}
															</p>
															<Image
																alt={`${option.text}'s Avatar`}
																className="shrink-0 select-none rounded-full"
																loading="eager"
																src={`https://vercel.com/api/www/avatar/${option.text}?s=64`}
																width={32}
																height={32}
															/>
														</div>
														<Progress
															value={option.percentage}
															className="h-[10px]"
														/>
														<p className="text-base text-right text-gray-500">
															{option.percentage}%
														</p>
													</div>
												</div>
											</li>
										);
									}

									return (
										<OptionToVote
											option={option}
											key={option.id}
											pollId={Number(id)}
											alreadyVoted={userAlreadyVoted}
											userId={user?.id}
											optionVotedId={optionSelectedForUserLoggedIn?.option_id}
											canVote={userCanVote}
										/>
									);
								})}
							</ul>
							<div>
								<p className="text-sm text-gray-500">
									Total Votes: {totalVotes}
								</p>
							</div>
						</div>

						{/* Poll Comments */}
						<div className="order-2 shrink-0 origin-left overflow-scroll flex-col rounded-lg bg-gray-100 py-2 transition-all duration-300 ease-out @container lg:flex w-full md:w-[300px] lg:w-[350px] md:max-h-[calc(100vh-190px)]">
							<ScrollArea className="w-full flex flex-col gap-2 p-2">
								<h5 className="text-lg font-medium py-3 md:border-t-2 md:border-gray-200">
									Comments
								</h5>
								{user != null && <FormComment pollId={Number(id)} />}

								<ul className="w-full flex flex-col gap-2">
									<Comments serverComments={comments ?? []} />
								</ul>
							</ScrollArea>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</main>
	);
}
