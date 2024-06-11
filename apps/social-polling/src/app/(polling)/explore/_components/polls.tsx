import { Chip, Progress } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import { MagicCard, MagicContainer } from "~/components/magicui/magic-card";
import { categories } from "~/lib/categories";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { getPolls, getPollsByCategory } from "../../actions/polls";

export async function Polls({
	categoryId,
}: {
	categoryId: number | undefined;
}) {
	const PAGE_COUNT = 15;
	let pollData: PollWithOptionsAndVotes[] = [];

	if (categoryId != null) {
		const { data, error } = await getPollsByCategory(categoryId);

		if (error) return;

		pollData = data;
	} else {
		const { data, error } = await getPolls();

		if (error) return;

		pollData = data;
	}

	return (
		<div className="grid gap-4">
			<MagicContainer className="columns-1 justify-center md:columns-2 lg:columns-3">
				{pollData.map((poll, idx) => {
					const delay =
						idx >= PAGE_COUNT * 2 ? (idx - PAGE_COUNT) / 15 : idx / 15;

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
							className="mb-6 flex h-fit w-full cursor-pointer flex-col items-center gap-2 overflow-hidden !opacity-100"
						>
							<Link href={`/poll/${poll.id}`}>
								<div className="rounded-large relative mb-2 shadow-none shadow-black/5">
									<figure className="rounded-large max-h-64 w-full overflow-hidden">
										<Image
											alt={poll.question}
											src={`/polls/${poll.image}`}
											className="rounded-large size-full object-cover shadow-black/5"
											height={256}
											width={300}
										/>
									</figure>
								</div>
								<h3 className="text-pretty text-lg font-semibold">
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
								<div className="flex w-full flex-col gap-4 py-2">
									{poll.options.map((option, idx) => (
										<div key={`${option.id}-${idx}`} className="flex gap-2">
											<div className="flex w-full flex-col gap-y-0.5">
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
