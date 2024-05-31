"use client";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { searchPolls } from "./search-action";

export function SearchForm() {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState<{
		data: Array<{
			question: string;
			id: string;
			image: string;
			similarity: number;
		}>;
	}>({ data: [] });
	const [isFocused, setIsFocused] = useState(false);
	const [isInputEmpty, setIsInputEmpty] = useState(true);

	useEffect(() => {
		if (searchText.trim() === "") {
			setIsInputEmpty(true);
		} else {
			setIsInputEmpty(false);
		}
	}, [searchText]);

	async function handleSubmit() {
		const res = await searchPolls(searchText);

		setSearchResults(res);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			handleSubmit();
		}

		if (e.key === "Escape") {
			setSearchText("");
			setSearchResults({ data: [] });
		}
	}

	return (
		<div className="w-full mx-auto flex flex-col gap-2 relative">
			<form
				className="w-full relative max-w-xl mx-auto bg-white h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 border border-default-400"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<input
					onChange={(e) => setSearchText(e.target.value)}
					onKeyDown={handleKeyDown}
					value={searchText}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onClick={() => setIsFocused(true)}
					type="text"
					className={
						"w-full relative text-sm sm:text-base z-50 border-none bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20"
					}
					placeholder="Search for a poll"
				/>

				<button
					disabled={!searchText || searchText.trim().length === 0}
					type="submit"
					className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black transition duration-200 flex items-center justify-center"
				>
					<SearchIcon width={24} height={24} className="text-gray-300 size-4" />
				</button>
			</form>

			{isFocused ? (
				<div className="absolute left-0 right-0 top-[55px] rounded-lg h-auto fade-in mx-auto z-50 min-h-[100px] max-w-xl w-[576px] bg-content2 border-content3 border">
					{searchResults.data.map((poll) => (
						<Link
							key={poll.id}
							href={`/poll/${poll.id}`}
							className="flex gap-4 items-center hover:bg-content3 transition-colors p-4 rounded-lg"
						>
							<Image
								src={`/polls/${poll.image}`}
								alt={poll.question}
								width={150}
								height={150}
								className="rounded-lg object-cover h-[150px] w-[150px]"
							/>
							<p className="text-lg font-semibold text-left text-pretty leading-tight">
								{poll.question}
							</p>
						</Link>
					))}
					{searchResults.data.length === 0 ? (
						<p className="text-center text-sm text-content3-foreground">
							{isInputEmpty
								? "Write a question and press enter or the search icon"
								: "No results found"}
						</p>
					) : null}
				</div>
			) : null}
		</div>
	);
}
