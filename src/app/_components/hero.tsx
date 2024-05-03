import { MoveUpRightIcon } from "lucide-react";
import { DotPattern } from "~/components/magicui/dot-pattern";
import { cn } from "~/lib/utils";
import { SearchForm } from "./search-form";

export function Hero() {
	const suggestions = [
		{
			label: "Humor in partner",
			question: "How important is humor in a potential partner?",
			href: "/",
		},
		{
			label: "Sex Life",
			question: "What is the biggest obstacle to a fulfilling sex life?",
			href: "/",
		},
		{
			label: "Modern Relationship",
			question:
				"What do you believe is the biggest challenge in modern relationships?",
			href: "/",
		},
		{
			label: "Bill on a Date",
			question: "How do you feel about splitting the bill on a date?",
			href: "/",
		},
	];

	return (
		<div className="relative mb-4 flex items-center justify-center py-[26vh] pt-[18vh] text-gray-900 sm:pt-[26vh]">
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
				)}
			/>
			<div className="relative flex w-full flex-col items-center gap-6 px-6 text-center">
				<div className="flex w-full flex-col items-center gap-1.5">
					<h2 className="text-4xl font-heading font-medium tracking-tighter sm:text-5xl [@media(max-width:480px)]:text-[2rem]">
						Ask The Liaison.
					</h2>
					<p>Sharing collective insights and perspectives.</p>
				</div>
				<div className="z-10 m-auto flex w-full flex-col divide-zinc-600 overflow-hidden rounded-xl bg-gray-900 shadow-lg shadow-black/40 sm:max-w-xl">
					<SearchForm />
				</div>

				<div className="absolute top-full mx-auto mt-6 flex max-w-full flex-wrap items-center justify-center gap-2 whitespace-nowrap px-4 text-sm">
					{suggestions.map((suggestion, idx) => (
						<SuggestionButton key={idx} name={suggestion.label} />
					))}
				</div>
			</div>
		</div>
	);
}

function SuggestionButton({ name }: { name: string }) {
	return (
		<button className="inline-flex select-none items-center gap-1 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-2 py-0.5 transition-colors hover:border-zinc-800">
			{name}
			<MoveUpRightIcon width={15} height={15} />
		</button>
	);
}
