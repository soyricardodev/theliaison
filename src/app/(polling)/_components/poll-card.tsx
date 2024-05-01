export function PollCard({
	question,
	options,
}: {
	question: string;
	options: Array<{ id: number; text: string; votes: number | null }>;
}) {
	return (
		<div className="group relative block aspect-preview w-full overflow-hidden rounded-lg border border-gray-200 shadow transition-all hover:shadow-lg p-4 cursor-pointer">
			<p className="text-lg font-semibold mb-2">{question}</p>

			<div className="flex flex-col gap-2">
				{options.map((option, idx) => (
					<div
						key={`${option.id}-${idx}`}
						className="flex w-full justify-between items-center gap-2 bg-black/10 p-1 rounded-lg"
					>
						<p className="shrink w-full p-2 px-4">{option.text}</p>

						<div className="text-center flex items-center justify-center px-2 py-1 text-base rounded-full bg-white mr-1 w-fit">
							{option.votes != null ? option.votes : 200}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
