import { CreatePollForm } from "./_components/create-poll-form";

export default function Component() {
	return (
		<div className="container mx-auto max-w-screen-md py-12 lg:py-28">
			<div className="space-y-8">
				<div className="space-y-6">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold">Create a New Poll</h1>
						<p className="text-gray-500">
							Get feedback from your audience by creating a new poll.
						</p>
					</div>
					<CreatePollForm className="space-y-4" />
				</div>
			</div>
		</div>
	);
}
