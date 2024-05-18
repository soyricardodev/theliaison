import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";
import { CreatePollForm } from "./_components/create-poll-form";
import { PollCreatorTrigger } from "./_components/poll-creator-trigger";

export default async function Component() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	const { data: subscription } = await supabase
		.from("subscriptions")
		.select("*, prices(*, products(*))")
		.in("status", ["active"])
		.maybeSingle();

	const isPollCreator = subscription?.prices?.products?.name === "Poll Creator";

	return (
		<div className="container mx-auto max-w-screen-md py-12 lg:py-28">
			<div className="space-y-8">
				<div className="space-y-6">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold">Create a New Poll</h1>
						<p className="text-default-600 text-lg">
							Get feedback from your audience by creating a new poll.
						</p>
					</div>
					{!subscription || !isPollCreator ? (
						<div>
							<h3>You don't have an active subscription</h3>
							<Link href="/pricing" className="text-blue-500 hover:underline">
								Go to pricing page
							</Link>
						</div>
					) : null}
					<PollCreatorTrigger />
				</div>
			</div>
		</div>
	);
}
