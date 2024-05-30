"use client";

import { Chip, Progress } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { MagicCard, MagicContainer } from "~/components/magicui/magic-card";
import { useMounted } from "~/hooks/use-mounted";
import { categories } from "~/lib/categories";
import type { PollWithOptionsAndVotes } from "~/types/poll";

export function Polls({ polls }: { polls: Array<PollWithOptionsAndVotes> }) {
	const PAGE_COUNT = 10;
	const [loadedPolls, setLoadedPolls] =
		useState<PollWithOptionsAndVotes[]>(polls);
	const [offset, setOffset] = useState(1);
	const [isInView, setIsInView] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLast, setIsLast] = useState(false);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const mounted = useMounted();

	function handleScroll() {
		if (mounted && containerRef.current != null) {
			const container = containerRef.current;
			const { bottom } = container.getBoundingClientRect();
			const { innerHeight } = window;
			setIsInView(bottom <= innerHeight);
		}
	}
	const handleDebouncedScroll = useDebounceCallback(() => {
		if (!isLast) handleScroll();
	}, 300);

	async function loadMorePolls(offset: number) {
		setIsLoading(true);
		setOffset((prev) => prev + 1);

		const from = offset * PAGE_COUNT;
		const to = from + PAGE_COUNT - 1;

		const url = `/api/polls/get?from=${from}&to=${to}`;
		console.log(url);
		const res = await fetch(url, {
			method: "GET",
			next: { tags: ["polls"] },
		});

		const json = await res.json();

		const data = json.data as PollWithOptionsAndVotes[];

		if (data.length === 0) {
			console.log("No more data");
			setIsLast(true);
		}

		setLoadedPolls((prevPolls) => [...prevPolls, ...data]);
		setIsLoading(false);
	}

	useEffect(() => {
		if (!mounted) return;
		window.addEventListener("scroll", handleDebouncedScroll);
		return () => {
			window.removeEventListener("scroll", handleDebouncedScroll);
		};
	}, [mounted, handleDebouncedScroll]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Just need the isInView effect to run
	useEffect(() => {
		if (isInView) {
			loadMorePolls(offset);
		}
	}, [isInView]);

	return (
		<div className="grid gap-4" ref={containerRef}>
			{isLoading ? <p>Loading</p> : null}
			<MagicContainer className="justify-center columns-1 md:columns-2 lg:columns-3">
				{polls.map((poll, idx) => {
					const delay =
						idx >= PAGE_COUNT * 2
							? (idx - PAGE_COUNT * (offset - 1)) / 15
							: idx / 15;

					const firstCategory = poll.categories?.[0];
					const categoryId = firstCategory?.id ?? 1;
					const category = categories.find(
						(category) => category.id === categoryId,
					);
					const hex = category?.hex;
					const color = category?.color;

					return (
						<MagicCard
							delay={delay}
							key={`${poll.id}-${idx}`}
							borderColor={hex}
							className="w-full h-fit cursor-pointer flex flex-col gap-2 items-center overflow-hidden mb-6"
						>
							<Link href={`/poll/${poll.id}`}>
								<div className="relative shadow-black/5 shadow-none rounded-large mb-2">
									<figure className="w-full max-h-64 overflow-hidden rounded-large">
										<Image
											alt={poll.question}
											src={`/polls/${poll.image}`}
											className="shadow-black/5 object-cover rounded-large size-full"
											height={256}
											width={300}
										/>
									</figure>
								</div>
								<h3 className="text-lg font-semibold text-pretty">
									{poll.question}
								</h3>
								<div className="flex w-full items-start gap-2">
									{poll.categories?.map((category) => (
										<Chip
											key={category.id}
											color={color}
											variant="bordered"
											className="capitalize"
										>
											{category.name}
										</Chip>
									))}
								</div>
								<div className="flex flex-col gap-4 py-2 w-full">
									{poll.options.map((option, idx) => (
										<div key={`${option.id}-${idx}`} className="flex gap-2">
											<div className="flex flex-col gap-y-0.5 w-full">
												<Progress
													color="secondary"
													showValueLabel
													label={option.text}
													value={option.percentage}
												/>
											</div>
										</div>
									))}
								</div>
								<div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(200,200,200,0.3),rgba(255,255,255,0))]" />
							</Link>
						</MagicCard>
					);
				})}
			</MagicContainer>
		</div>
	);
}
