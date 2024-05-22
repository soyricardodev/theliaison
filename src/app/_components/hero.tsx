import { Button } from "@nextui-org/react";
import {
	ChevronRightIcon,
	CircleUserRoundIcon,
	HandHeartIcon,
	HeartIcon,
	MoveUpRightIcon,
	RabbitIcon,
	TreePalmIcon,
	VideoIcon,
} from "lucide-react";
import Link from "next/link";
import AnimatedGradientText from "~/components/magicui/animated-gradient-text";
import { SearchForm } from "./search-form";

interface Category {
	id: number;
	name: string;
	href: string;
	icon: JSX.Element;
	color: "default" | "primary" | "danger" | "success" | "secondary" | "warning";
}

export function Hero() {
	const categories: Array<Category> = [
		{
			id: 1,
			name: "Trending",
			href: "/c/trending",
			icon: <TreePalmIcon className="size-5" />,
			color: "default",
		},
		{
			id: 2,
			name: "Relationship",
			href: "/c/relationship",
			icon: <HeartIcon className="size-5" />,
			color: "secondary",
		},
		{
			id: 3,
			name: "Dating",
			href: "/c/dating",
			icon: <HandHeartIcon className="size-5" />,
			color: "primary",
		},
		{
			id: 6,
			name: "Entertainment",
			href: "/c/entertainment",
			icon: <VideoIcon className="size-5" />,
			color: "warning",
		},
		{
			id: 4,
			name: "Sex",
			href: "/c/sex",
			icon: <RabbitIcon className="size-5" />,
			color: "danger",
		},
		{
			id: 5,
			name: "Self Care",
			href: "/c/selfcare",
			icon: <CircleUserRoundIcon className="size-5" />,
			color: "success",
		},
	];

	return (
		<div className="relative mb-4 flex items-center justify-center py-[24vh] -mt-28 sm:pt-[26vh]">
			<div className="relative flex w-full flex-col items-center gap-6 px-6 text-center">
				<div className="flex w-full flex-col items-center gap-2 pb-8">
					<Link href="/ai" className="z-10 flex items-center justify-center">
						<AnimatedGradientText>
							🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-400/80" />{" "}
							<span
								className={
									"inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent"
								}
							>
								Introducing The Liaison AI
							</span>
							<ChevronRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
						</AnimatedGradientText>
					</Link>
					<h1 className="bg-gradient-to-br bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter text-transparent from-black from-40% to-black/40 sm:text-6xl md:text-7xl lg:text-7xl text-balance">
						Ask The Liaison
					</h1>
					<p className="max-w-[60rem] text-pretty text-lg tracking-tight text-gray-500 md:text-xl">
						<strong>Speak Your Mind. Find Your People.</strong> <br />
						Unfiltered opinions on life, love, and everything in between.
					</p>
				</div>
				<div className="z-10 m-auto flex w-full flex-col overflow-hidden rounded-full sm:max-w-xl">
					<SearchForm />
				</div>

				<div className="mx-auto flex flex-wrap items-center justify-center gap-2 whitespace-nowrap px-4 text-sm max-w-sm md:max-w-xl lg:max-w-2xl">
					{categories.map((categorie, idx) => (
						<CategoryCTA key={`${categorie.name}-${idx}`} {...categorie} />
					))}
				</div>
			</div>
		</div>
	);
}

function CategoryCTA({ name, href, icon, color }: Category) {
	return (
		<Button
			as={Link}
			href={href}
			endContent={<MoveUpRightIcon width={15} height={15} />}
			startContent={icon}
			variant="flat"
			color={color}
		>
			{name}
		</Button>
	);
}
