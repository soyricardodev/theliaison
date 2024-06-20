export function EmptyScreen() {
	return (
		<div className="mx-auto max-w-2xl px-4">
			<div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
				<h1 className="text-lg font-semibold">
					Welcome to The Liaison AI Chatbot!
				</h1>
				<p className="leading-normal text-muted-foreground">
					This AI chatbot can help you to find the perfect gift for your loved
					one.
				</p>
			</div>
		</div>
	);
}
