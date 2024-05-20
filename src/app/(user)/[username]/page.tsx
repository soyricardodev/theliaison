import { NotebookPenIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PollCard } from "~/app/_components/polls";
import { Separator } from "~/components/ui/separator";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/server";
import { ProfileData } from "./profile-data";

export default async function ProfilePage({
	params: { username },
}: { params: { username: string } }) {
	const supabase = createClient();
	const { data: profileData, error: profileError } = await supabase
		.from("users")
		.select("*")
		.eq("username", username)
		.single();

	if (profileError || !profileData) {
		return redirect("/");
	}

	const pollsWithOptionsQuery = supabase
		.from("polls")
		.select(`
    id,
    question,
    options (id, text),
		votes (id, poll_id, option_id, user_id),
		users (id, username, avatar_url)
  `)
		.eq("user_id", profileData.id);

	const { data: polls } = await pollsWithOptionsQuery;

	function calculateVotes() {
		const votesDetailsArray: PollWithOptionsAndVotes[] = [];

		for (const pollData of polls) {
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
					id: pollData.profiles?.id ?? "",
					username: pollData.profiles?.username ?? "",
					avatar_url: pollData.profiles?.avatar_url ?? null,
				},
			};

			votesDetailsArray.push(dataToPush);
		}

		return votesDetailsArray;
	}

	const dataToRender = calculateVotes();

	return (
		<main className="flex-1 overflow-auto">
			<div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 px-4 pb-14 md:grid-cols-3 md:gap-8 md:px-6 md:pt-11 lg:grid-cols-4 lg:gap-[60px]">
				<div className="relative flex flex-col gap-4">
					<div className="flex flex-col gap-2.5">
						<Image
							alt={`${profileData.username}'s avatar`}
							src={`https://vercel.com/api/www/avatar/${profileData.username}`}
							width={256}
							height={256}
							className="size-12 rounded-full"
							draggable={false}
						/>
						<div className="grid gap-2">
							<h1 className="text-[32px] font-semibold leading-none tracking-tight">
								{profileData.full_name}
							</h1>
							<p className="whitespace-nowrap text-sm text-gray-600">
								@{profileData.username}
							</p>
						</div>
						<ProfileData
							fullName={profileData.full_name!}
							instagram={profileData.username!}
						/>
					</div>
				</div>
				<div className="flex flex-col md:col-span-2 lg:col-span-3 lg:py-14">
					<div className="mb-4 flex w-full flex-col-reverse justify-between sm:mb-0 sm:flex-row sm:items-center">
						<span className="mt-2 hidden text-sm text-gray-950 sm:mt-0 sm:inline">
							Recent polls
						</span>
						{/* TODO: Add Tabs navbar (recent poll &, starred polls) */}
					</div>
					<Separator className="bg-gray-200 mb-6 mt-3 hidden sm:flex" />
					{polls != null && polls.length > 0 ? (
						<UserPollsContainer>
							{dataToRender.map((poll, idx) => (
								<PollCard key={idx} poll={poll} />
							))}
						</UserPollsContainer>
					) : (
						<div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-zinc-200 py-20 text-zinc-600">
							<NotebookPenIcon className="size-8" />
							<p className="max-w-sm px-5 text-center font-medium text-balance">
								No polls created yet.
							</p>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}

function UserPollsContainer({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className="flex flex-col gap-12">
				<ul className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{children}
				</ul>
			</div>
		</div>
	);
}
