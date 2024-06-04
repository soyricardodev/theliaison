import { Card, CardBody, CardFooter } from "@nextui-org/react";

import { getSuggestedPolls } from "../../actions/polls";
import Link from "next/link";
import Image from "next/image";

export async function SuggestedPolls({
	pollId,
	pollEmbedding,
}: { pollId: string; pollEmbedding: number[] }) {
	const { data, error } = await getSuggestedPolls(pollEmbedding);

	if (!data || error) return null;

	const polls = data.filter((poll) => poll.id !== pollId);

	return (
		<div className="flex flex-col gap-4 px-1">
			<h2 className="text-xl font-semibold">Suggested Polls</h2>

			<div className="flex gap-2 flex-col md:flex-row">
				{polls.map((poll) => (
					<Link key={poll.id} href={`/poll/${poll.id}`}>
						<Card shadow="sm" isPressable fullWidth>
							<CardBody className="overflow-visible p-0">
								<Image
									alt={poll.question}
									className="shadow-small rounded-large object-cover h-[250px] w-auto"
									src={`/polls/${poll.image}`}
									width={250}
									height={250}
								/>
							</CardBody>
							<CardFooter className="text-base justify-between">
								<b>{poll.question}</b>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
