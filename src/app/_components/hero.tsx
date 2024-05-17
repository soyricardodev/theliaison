import Link from "next/link";
import { ChevronRightIcon, MoveUpRightIcon } from "lucide-react";
import { SearchForm } from "./search-form";
import { Button, ButtonGroup } from "@nextui-org/react";
import AnimatedGradientText from "~/components/magicui/animated-gradient-text";

export function Hero() {
	const categories = [
		{
			id: 1,
			name: "Trending",
			href: "/c/trending",
		},
		{
			id: 2,
			name: "Relationship",
			href: "/c/relationship",
		},
		{
			id: 3,
			name: "Dating",
			href: "/c/dating",
		},
		{
			id: 4,
			name: "Sex",
			href: "/c/sex",
		},
		{
			id: 5,
			name: "Self Care",
			href: "/c/selfcare",
		},
		{
			id: 6,
			name: "Entertainment",
			href: "/c/entertainment",
		},
	];

	return (
		<div className="relative mb-4 flex items-center justify-center py-[26vh] pt-[18vh] sm:pt-[26vh]">
			<div className="relative flex w-full flex-col items-center gap-6 px-6 text-center">
				<div className="flex w-full flex-col items-center gap-6 pb-8">
					<div className="z-10 flex items-center justify-center">
						<AnimatedGradientText>
							🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
							<span
								className={
									"inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent"
								}
							>
								Introducing The Liaison AI
							</span>
							<ChevronRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
						</AnimatedGradientText>
					</div>
					<h1 className="text-balance bg-gradient-to-br from-black from-30% to-black/60 bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-7xl">
						Ask The Liaison
					</h1>
					<p className="max-w-[64rem] text-balance text-lg tracking-tight text-gray-500 md:text-xl">
						Sharing collective insights and <strong>perspectives</strong>.
						Sharing collective insights and <strong>perspectives</strong>.
					</p>
				</div>
				<div className="z-10 m-auto flex w-full flex-col divide-zinc-600 overflow-hidden rounded-full bg-gray-900 shadow-lg shadow-black/40 sm:max-w-xl">
					<SearchForm />
				</div>

				<div className="absolute top-full mx-auto mt-6 flex max-w-full flex-wrap items-center justify-center gap-2 whitespace-nowrap px-4 text-sm">
					<ButtonGroup size="sm" variant="bordered">
						{categories.map((categorie, idx) => (
							<CategoryCTA
								key={`${categorie.name}-${idx}`}
								name={categorie.name}
								href={categorie.href}
							/>
						))}
					</ButtonGroup>
				</div>
			</div>
		</div>
	);
}

function CategoryCTA({ name, href }: { name: string; href: string }) {
	return (
		<Button
			as={Link}
			href={href}
			endContent={<MoveUpRightIcon width={15} height={15} />}
			variant="bordered"
		>
			{name}
		</Button>
	);
}
