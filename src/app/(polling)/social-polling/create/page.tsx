import { User } from "@supabase/supabase-js";
import { Crown } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Container } from "~/components/container";
import { Badge } from "~/components/ui/badge";
import type { Tables } from "~/types/database-types";
import { createClient } from "~/utils/supabase/server";
import { CreatePoll } from "./_components/create-poll";

type UserSubscription = Tables<"subscriptions">;

type PollSubscription = "Poll Creator" | "Basic";

export default async function CreatePollPage() {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (!user || error) {
		return redirect("/auth/signin");
	}
	const { data: userProfile } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.maybeSingle();

	if (!userProfile) {
		return redirect("/auth/signin");
	}

	const { data: subscription, error: subscriptionError } = await supabase
		.from("subscriptions")
		.select("*, prices(*, products(*))")
		.in("status", ["trialing", "active"])
		.maybeSingle();

	if (subscriptionError || !subscription) {
		return redirect("/social-polling");
	}

	if (
		subscription?.status !== "active" ||
		subscription.prices?.products?.name !== "Poll Creator"
	) {
		return redirect("/social-polling");
	}

	const { data: polls } = await supabase
		.from("polls")
		.select("*")
		.eq("user_id", user.id);

	console.log(userProfile, subscription);

	return (
		<Container>
			<div className="w-full flex items-center gap-2 p-6 rounded-lg bg-black">
				<div>
					<Image
						src={
							// userProfile.avatar_url ??
							"https://vercel.com/api/www/avatar/1?s=64"
						}
						alt="avatar"
						width={64}
						height={64}
						className="rounded-full"
					/>
				</div>
				<div className="text-white">
					<div className="text-xl font-bold flex gap-1 items-center">
						<p>{userProfile.full_name}</p>
						<Badge className="bg-yellow-500 flex gap-1">
							<Crown className="size-4" />
							{subscription?.prices?.products?.name}
						</Badge>
					</div>
					<p className="text-base font-light">@{userProfile.username}</p>
				</div>
			</div>

			<div className="w-full my-20">
				<div className="flex gap-4 items-center">
					<h3 className="text-3xl font-bold">Polls</h3>
					<CreatePoll />
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{polls != null && polls.length > 0 ? (
						polls.map((poll) => (
							<div key={poll.id} className="w-full">
								<div className="flex items-center justify-between">
									<p className="text-lg font-medium">{poll.question}</p>
								</div>
							</div>
						))
					) : (
						<p>No polls yet. Create a poll to start polling!</p>
					)}
				</div>
			</div>
		</Container>
	);
}
