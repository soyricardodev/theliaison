"use client";

import { Progress, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
		<Tooltip content={<p>Click to vote</p>} offset={-7}>
			<button
				type="button"
				className={cn(
					"py-4 px-5 rounded-lg transition-colors bg-content1 hover:bg-content2 shadow-large",
					alreadyVoted && "hover:bg-gray-200 cursor-not-allowed",
					optionVotedId === option.id &&
						"bg-gray-300 hover:bg-gray-200 cursor-crosshair",
				)}
				onClick={vote}
				onKeyDown={vote}
			>
				<Progress
					value={option.percentage}
					showValueLabel
					label={<p>{option.text}</p>}
					classNames={{
						track: "drop-shadow-md border border-default",
						label: "tracking-wider font-medium text-default-600",
						value: "text-foreground/60",
					}}
					color="secondary"
				/>
			</button>
		</Tooltip>
	);
}
