import { Container } from "~/components/container";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { getURL } from "~/utils/helpers";
import { Polls } from "./_components/polls";

const fetchPolls = async () => {
	const url = getURL("/api/polls/get");
	console.log(url);
	const res = await fetch(url, {
		method: "GET",
		next: { tags: ["polls"] },
	});

	const data = await res.json();

	return data.data as PollWithOptionsAndVotes[];
};

export default async function ExplorePage() {
	const data = await fetchPolls();

	console.log({ data });

	return (
		<Container>
			<h2 className="text-4xl font-semibold">Explore</h2>

			<Polls polls={data} />
		</Container>
	);
}
