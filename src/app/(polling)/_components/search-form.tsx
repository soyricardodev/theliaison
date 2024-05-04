import { Search } from "lucide-react";

export function SearchForm() {
	return (
		<div className="z-10 m-auto flex w-full flex-col divide-zinc-600 overflow-hidden rounded-xl bg-gray-900 shadow-lg shadow-black/40 sm:max-w-xl">
			<div style={{ height: 0, transformOrigin: "50% 50% 0px" }} />
			<form className="relative z-10 h-full w-full min-w-0 bg-gray-900 p-3 md:pl-4">
				<div className="relative flex w-full flex-1 items-center transition-all duration-300 flex-col gap-6">
					<label className="sr-only" htmlFor="textarea-input">
						Prompt
					</label>
					<div className="relative flex w-full min-w-0 flex-1 justify-between self-start">
						<textarea
							className="min-h-[1.5rem] w-full flex-[1_0_50%] resize-none border-0 bg-transparent pr-2 text-sm leading-relaxed text-white shadow-none outline-none ring-0 [scroll-padding-block:0.75rem] selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 disabled:bg-transparent disabled:opacity-80 [&_textarea]:px-0"
							id="home-prompt"
							maxLength={1000}
							minLength={2}
							style={{ colorScheme: "dark", height: "69px !important" }}
							placeholder="Find your poll"
							rows={1}
							spellCheck="false"
							defaultValue={"Find your poll"}
						/>
					</div>
					<div className="flex w-full gap-2">
						<div className="" data-state="closed">
							<button
								className="shrink-0 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center bg-transparent text-white hover:bg-gray-800 focus-visible:bg-gray-800 focus-visible:ring-0 h-8 w-8 rounded-md"
								id="send-button"
								type="submit"
							>
								<span className="sr-only">Send</span>
								<Search className="size-5 text-white" />
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
