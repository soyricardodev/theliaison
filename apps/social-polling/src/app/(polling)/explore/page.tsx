import { CategoryCTA } from "~/app/_components/hero";
import { SearchForm } from "~/app/_components/search-form";
import { Container } from "~/components/container";
import { categories } from "~/lib/categories";
import { Polls } from "./_components/polls";

export default async function ExplorePage({
	searchParams,
}: {
	searchParams: { category: string | undefined };
}) {
	const category = categories.find(
		(category) =>
			category.name.toLowerCase() === searchParams.category?.toLowerCase(),
	);
	const categoryId = category?.id;
	const categoryHEX = category?.hex;

	return (
		<Container className="flex flex-col gap-4">
			<div className="my-10 flex flex-col items-center justify-center gap-5 py-20">
				<h2 className="font-heading mb-6 text-center text-6xl font-bold">
					Explore polls{" "}
					{categoryId != null ? (
						<>
							of{" "}
							<span
								className="capitalize italic [letter-spacing:.02px]"
								style={{ color: categoryHEX }}
							>
								{searchParams.category}
							</span>
						</>
					) : null}
				</h2>
				<SearchForm />
				<div className="mx-auto flex max-w-sm flex-wrap items-center justify-center gap-2 whitespace-nowrap px-4 text-sm md:max-w-xl lg:max-w-2xl">
					{categories.map((category, idx) => (
						<CategoryCTA key={`${category.name}-${idx}`} {...category} />
					))}
				</div>
			</div>

			<Polls categoryId={categoryId} />
		</Container>
	);
}
