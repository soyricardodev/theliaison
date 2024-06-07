"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "lucide-react";

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
    <div className="relative mx-auto flex w-full flex-col gap-2">
      <form
        className="border-default-400 relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full border bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200"
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
            "relative z-50 h-full w-full rounded-full border-none bg-transparent pl-4 pr-20 text-sm text-black focus:outline-none focus:ring-0 sm:pl-10 sm:text-base"
          }
          placeholder="Search for a poll"
        />

        <button
          disabled={!searchText || searchText.trim().length === 0}
          type="submit"
          className="absolute right-2 top-1/2 z-50 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black transition duration-200 disabled:bg-gray-100"
        >
          <SearchIcon width={24} height={24} className="size-4 text-gray-300" />
        </button>
      </form>

      {isFocused ? (
        <div className="bg-content2 border-content3 absolute left-0 right-0 top-[55px] z-50 mx-auto h-auto min-h-[100px] w-[576px] max-w-xl rounded-lg border fade-in">
          {searchResults.data.map((poll) => (
            <Link
              key={poll.id}
              href={`/poll/${poll.id}`}
              className="hover:bg-content3 flex items-center gap-4 rounded-lg p-4 transition-colors"
            >
              <Image
                src={`/polls/${poll.image}`}
                alt={poll.question}
                width={150}
                height={150}
                className="h-[150px] w-[150px] rounded-lg object-cover"
              />
              <p className="text-pretty text-left text-lg font-semibold leading-tight">
                {poll.question}
              </p>
            </Link>
          ))}
          {searchResults.data.length === 0 ? (
            <p className="text-content3-foreground text-center text-sm">
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
