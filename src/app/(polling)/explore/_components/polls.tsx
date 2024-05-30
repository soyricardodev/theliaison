import { Chip, Progress } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { MagicCard, MagicContainer } from "~/components/magicui/magic-card";
import { categories } from "~/lib/categories";
import { getPolls, getPollsByCategory } from "../../actions/polls";
import type { PollWithOptionsAndVotes } from "~/types/poll";

export async function Polls({
	categoryId,
}: { categoryId: number | undefined }) {
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
			<MagicContainer className="justify-center columns-1 md:columns-2 lg:columns-3">
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
							className="w-full h-fit cursor-pointer flex flex-col gap-2 items-center overflow-hidden mb-6 !opacity-100"
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
