"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { insertPollVote } from "~/server/db/queries";

export function Votes({
	options,
	pollId,
}: {
	options: Array<{ votes: string; text: string; id: number }>;
	pollId: number;
}) {
	const router = useRouter();
	async function vote(optionId: number) {
		toast.promise(insertPollVote(pollId, optionId), {
			loading: "Voting...",
			success: () => {
				router.refresh();

				return "Vote successful!";
			},
			error: "Error voting!",
		});
	}

	return (
		<ul className="flex flex-col gap-2 w-full">
			{options.map((option, idx) => (
				<li
					onClick={() => vote(option.id)}
					key={`${option.id}-${idx}`}
					className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer flex justify-between items-center"
				>
					<div>{option.text}</div>
					<div>{option.votes != null ? option.votes : 0}</div>
				</li>
			))}
		</ul>
	);
}
