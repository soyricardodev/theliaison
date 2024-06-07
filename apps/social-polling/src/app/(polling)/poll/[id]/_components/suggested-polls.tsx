import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

import { getSuggestedPolls } from "../../actions/polls";

export async function SuggestedPolls({
  pollId,
  pollEmbedding,
}: {
  pollId: string;
  pollEmbedding: number[];
}) {
  const { data, error } = await getSuggestedPolls(pollEmbedding);

  if (!data || error) return null;

  const polls = data.filter((poll) => poll.id !== pollId);

  return (
    <div className="flex flex-col gap-4 px-1">
      <h2 className="text-xl font-semibold">Suggested Polls</h2>

      <div className="flex flex-col gap-2 md:flex-row">
        {polls.map((poll) => (
          <Link key={poll.id} href={`/poll/${poll.id}`}>
            <Card shadow="sm" isPressable fullWidth>
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={poll.question}
                  className="shadow-small rounded-large h-[250px] w-auto object-cover"
                  src={`/polls/${poll.image}`}
                  width={250}
                  height={250}
                />
              </CardBody>
              <CardFooter className="justify-between text-base">
                <b>{poll.question}</b>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
