"use client";

import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { NewPollsAproach } from "~/app/_components/polls";
import { useMounted } from "~/hooks/use-mounted";
import type { PollWithOptionsAndVotes } from "~/types/poll";

export function Polls({ polls }: { polls: Array<PollWithOptionsAndVotes> }) {
	const [loadedPolls, setLoadedPolls] =
		useState<Array<PollWithOptionsAndVotes>>(polls);
	const mounted = useMounted();

	function handleScroll() {
		console.log("scrolled debounced");
	}
	const handleDebouncedScroll = useDebounceCallback(handleScroll, 200);

	useEffect(() => {
		if (!mounted) return;
		window.addEventListener("scroll", handleDebouncedScroll);
		return () => {
			window.removeEventListener("scroll", handleDebouncedScroll);
		};
	}, [mounted, handleDebouncedScroll]);

	return (
		<div className="grid gap-4">
			<NewPollsAproach polls={loadedPolls} />
		</div>
	);
}
