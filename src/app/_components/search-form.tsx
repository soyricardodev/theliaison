import { SearchIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export function SearchForm() {
	return (
		<div className="z-10 m-auto flex w-full flex-col divide-zinc-600 overflow-hidden rounded-xl bg-gray-900 shadow-lg shadow-black/40 sm:max-w-xl">
			<form className="relative z-10 h-full w-full min-w-0 bg-gray-900 p-3 md:pl-4">
				<div className="relative flex w-full flex-1 items-center transition-all duration-300 flex-col gap-6">
					<label htmlFor="search" className="sr-only">
						Search
					</label>
					<div className="relative w-full flex h-full">
						<textarea
							id="search"
							placeholder="Write your question here"
							className="min-h-[1.5rem] w-full flex-[1_0_50%] resize-none border-0 bg-transparent pr-2 text-sm leading-relaxed text-white shadow-none outline-none ring-0 [scroll-padding-block:0.75rem] selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 disabled:bg-transparent disabled:opacity-80 [&_textarea]:px-0"
							required
							rows={1}
							spellCheck={false}
						/>
						<Button
							className="absolute text-sm right-0 -top-[7.5px]"
							size="icon"
							variant={"secondary"}
						>
							<SearchIcon className="size-5 text-gray-900" />
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
