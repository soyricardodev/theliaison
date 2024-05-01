import { profile } from "console";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Container } from "~/components/container";
import { Badge } from "~/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { createClient } from "~/utils/supabase/server";
import { Comments } from "./comments";
import { Votes } from "./votes";

export default async function Poll({
	params: { id },
}: { params: { id: string } }) {
	const idAsNumber = Number(id);

	if (Number.isNaN(idAsNumber)) redirect("/social-polling");

	const supabase = createClient();

	const { data, error } = await supabase
		.from("polls")
		.select(`
      id,
      question,
      user_id,
      created_at,
      options (id, text, votes)
    `)
		.eq("id", idAsNumber)
		.single();

	if (!data || error) {
		return redirect("/social-polling");
	}

	console.log("optid", idAsNumber);

	const { data: votesOfPoll, error: votesError } = await supabase
		.from("votes")
		.select("*")
		.eq("poll_id", idAsNumber);

	console.log(votesOfPoll, "votesOfPoll");

	if (votesError) {
		console.log(votesError);
		// return redirect("/social-polling");
	}
	// votes is equal to 0 if no votes have been made, and the number of votes if votes have been made, i mean, the count or length of the array
	const optionsWithVotes = data.options.map((option) => ({
		...option,
		votes: votesOfPoll?.length
			? votesOfPoll.filter((vote) => vote.option_id === option.id).length
			: 0,
	}));

	console.log(optionsWithVotes, "optionsWithVotes");

	const { data: userData, error: userError } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", data.user_id)
		.single();

	if (userError) return redirect("/social-polling");

	return (
		<Container>
			<Card className="max-w-xl w-full mx-auto">
				<CardHeader>
					<CardTitle className="text-center">{data.question}</CardTitle>
					<div className="text-base text-black">
						<div className="flex items-center justify-center gap-2 w-full mx-auto">
							<Image
								src={"https://vercel.com/api/www/avatar/1?s=64"}
								alt="avatar"
								width={30}
								height={30}
								className="rounded-full"
							/>
							Created by{" "}
							<strong className="font-semibold">@{userData.username}</strong>
							<Badge className="cursor-pointer hover:bg-black/80">Follow</Badge>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Votes options={optionsWithVotes} pollId={idAsNumber} />
				</CardContent>
				<CardFooter className="flex flex-col gap-2 w-full items-start">
					<CardDescription className="text-lg font-semibold text-black">
						Comments
					</CardDescription>

					<CardContent className="flex flex-col gap-2">
						<Comments pollId={idAsNumber} />
					</CardContent>
				</CardFooter>
			</Card>
		</Container>
	);
}
