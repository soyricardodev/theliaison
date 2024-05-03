"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import { createClient } from "~/utils/supabase/client";

type OptionToVote = {
	canVote: boolean;
	pollId: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	option: any;
	alreadyVoted: boolean;
	optionVotedId?: number;
	userId?: string;
};

export function OptionToVote({
	canVote,
	option,
	pollId,
	alreadyVoted,
	optionVotedId,
	userId,
}: OptionToVote) {
	const supabase = createClient();
	const router = useRouter();

	async function vote() {
		if (alreadyVoted) {
			return toast.error("You have already voted.");
		}

		if (canVote && !alreadyVoted && userId != null) {
			const { error: voteError } = await supabase.from("votes").insert({
				poll_id: pollId,
				option_id: option.id,
				user_id: userId,
			});

			if (voteError) {
				return toast.error("Error voting.");
			}

			toast.success("Vote successful!");
			router.refresh();
		}
	}

	return (
		<li
			className={cn(
				"hover:bg-gray-300 bg-gray-200 px-3 py-2 rounded-lg transition-colors cursor-crosshair",
				alreadyVoted && "hover:bg-gray-200 cursor-not-allowed",
				optionVotedId === option.id &&
					"bg-gray-300 hover:bg-gray-200 cursor-crosshair",
			)}
			onClick={vote}
		>
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-center mr-4">
					<span className="text-sm md:text-base">{option.votes}</span>
				</div>
				<div className="flex flex-col w-full gap-3">
					<p className="text-sm md:text-lg font-medium">{option.text}</p>
					<Progress value={option.percentage} className="h-[10px]" />
					<p className="text-base text-right text-gray-500">
						{option.percentage}%
					</p>
				</div>
			</div>
		</li>
	);
}
