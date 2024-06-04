import { Chip } from "@nextui-org/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Toaster } from "~/components/ui/sonner";
import { categories } from "~/lib/categories";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/server";
import { PollStats, type RawData } from "./_components/poll-stats";
import { ShareSocial } from "./_components/share-social";
import { SuggestedPolls } from "./_components/suggested-polls";
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
		votes (id, poll_id, options(id, text), user_id, users(country, gender, relationship_status, birthday_date)),
		users (id, username, avatar_url),
		image,
		comments (id, content, created_at, users (id, username, avatar_url), upvotes, downvotes),
		categories (id, name),
		embedding
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

	const votesData: RawData[] = data?.votes?.map((vote) => {
		return {
			option_id: vote.options?.id as number,
			name: vote.options?.text as string,
			country: vote.users?.country as string,
			gender: vote.users?.gender as string,
			relationship_status: vote.users?.relationship_status as string,
		};
	});
	console.log({ votesData });

	const votesByOption: Record<number, number> = {};
	const totalVotes = data.votes.length;

	for (const option of data.options) {
		votesByOption[option.id] = 0;
	}

	for (const vote of data.votes) {
		votesByOption[vote.options?.id as number]++;
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

	const subscriptionActive = subscription?.status === "active";
	const isPollCreator = subscription?.prices?.products?.name === "Poll Creator";
	const isCommunityInsider =
		subscription?.prices?.products?.name === "Community Insider";

	const userCanVote =
		subscriptionActive &&
		(isPollCreator || isCommunityInsider) &&
		!userAlreadyVoted;

	return (
		<main className="flex-1 overflow-auto">
			<div className="flex flex-col max-w-screen-2xl mx-auto">
				<div className="flex flex-1 flex-col gap-3 my-4 px-8 pb-2 pt-10 md:pt-16 lg:pt-24 max-w-screen-2xl mx-auto">
					<div className="flex flex-col gap-6 max-w-screen-xl mx-auto items-center justify-start">
						<div className="flex flex-col items-center justify-center gap-2">
							<h2 className="text-2xl md:text-3xl text-center text-pretty font-bold">
								{dataToRender.question}
							</h2>
							<Image
								alt={`Poll ${dataToRender.question}`}
								className="rounded-lg mt-4 object-cover"
								height={600}
								src={`/polls/${dataToRender.image}`}
								style={{
									aspectRatio: "600/600",
									objectFit: "cover",
								}}
								width={600}
							/>
							<div className="mt-2.5 flex items-center gap-2">
								{data.categories.map((category) => {
									const cat = categories.find(
										(cat) => cat.id === Number(category.id),
									);
									const color = cat?.color;

									return (
										<Chip
											key={category.id}
											className="flex items-center gap-2 capitalize"
											color={color}
										>
											{category.name}
										</Chip>
									);
								})}
							</div>
						</div>

						{/* Poll Data */}
						<div className="relative max-w-screen-lg flex h-full w-full flex-col gap-3 lg:p-3">
							<ul className="w-full grid gap-6">
								{dataToRender.options.map((option) => (
									<OptionToVote
										option={option}
										key={option.id}
										pollId={id}
										alreadyVoted={userAlreadyVoted}
										userId={user?.id}
										optionVotedId={optionSelectedForUserLoggedIn?.options?.id}
										canVote={userCanVote}
									/>
								))}
							</ul>
							<div>
								<p className="text-sm text-gray-800">
									Total Votes: {totalVotes}
								</p>
							</div>
							<ShareSocial id={dataToRender.id} />
						</div>

						{/* Poll Comments */}
						<div className="order-2 shrink-0 origin-left overflow-scroll flex-col rounded-lg py-2 transition-all duration-300 ease-out @container lg:flex  md:max-h-[calc(100vh-190px)] w-full">
							<ScrollArea className="w-full flex flex-col gap-2 p-2">
								<h5 className="text-lg font-medium py-3">Comments</h5>
								{user != null && <FormComment pollId={id} />}

								<ul className="w-full flex flex-col gap-2">
									<Comments serverComments={data.comments} />
								</ul>
							</ScrollArea>
						</div>

						<PollStats stats={votesData} />

						<SuggestedPolls
							pollId={data.id}
							pollEmbedding={data.embedding as unknown as number[]}
						/>

						{/* {isPollCreator || isCommunityInsider ? ( */}
						{/* <Statistics votes={statistics} /> */}
						{/* ) : null} */}
					</div>
				</div>
			</div>
			<Toaster />
		</main>
	);
}
