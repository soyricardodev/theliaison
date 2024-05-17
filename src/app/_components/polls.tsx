"use client";
import { Progress, Image } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MagicCard, MagicContainer } from "~/components/magicui/magic-card";
import { cn } from "~/lib/utils";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/client";

export function PollsContainer({
	children,
	className,
	containerClassName,
}: {
	children: React.ReactNode;
	className?: string;
	containerClassName?: string;
}) {
	return (
		<div className="grid auto-cols-[minmax(0,_1fr)]">
			<div className={cn("col-start-1 row-start-1", containerClassName)}>
				<ul
					className={cn(
						"mx-auto grid w-full grid-cols-[repeat(auto-fit,_minmax(296px,1fr))] gap-4",
						className,
					)}
				>
					{children}
				</ul>
			</div>
		</div>
	);
}

export function PollCard({
	poll,
	credits = true,
}: {
	poll: PollWithOptionsAndVotes;
	credits?: boolean;
}) {
	return (
		<li className="space-y-4 w-full">
			<Link
				className="group relative block aspect-preview w-full overflow-hidden rounded-lg border border-gray-200 shadow transition-all hover:shadow-lg p-4"
				href={`/poll/${poll.id}`}
			>
				<p className="text-lg font-semibold mb-4  leading-none text-pretty">
					{poll.question}
				</p>
				<div className="flex flex-col gap-4 text-base py-2">
					{poll.options.map((option, idx) => (
						<div key={`${option.id}-${idx}`} className="flex gap-2">
							<p className="text-sm font-normal">{option.votes}</p>
							<div className="flex flex-col gap-y-0.5 w-full">
								<p className="font-medium">{option.text}</p>
								<Progress value={option.percentage} className="h-1.5" />
							</div>
						</div>
					))}
				</div>
			</Link>
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<Link href={`/${poll.user.username}`} className="flex-none">
						<span className="sr-only">
							Link to {poll.user.username}'s The Liaison Profile
						</span>
						<Image
							alt={`${poll.user.username}'s Avatar`}
							className="shrink-0 select-none rounded-full"
							loading="eager"
							src={`https://vercel.com/api/www/avatar/${poll.user.username}?s=64`}
							width={32}
							height={32}
						/>
					</Link>
					{credits ? (
						<div className="group relative flex max-w-[70%] items-center">
							<div className="relative inline-flex w-full min-w-0 flex-1 rounded-2xl bg-[#ebebeb] px-3 py-1">
								<span className="text-left text-sm line-clamp-1 text-ellipsis">
									created by{" "}
									<strong className="font-medium">@{poll.user.username}</strong>
								</span>
								<svg
									aria-hidden="true"
									className="absolute"
									fill="none"
									height={14}
									style={{ left: "-5.5px", bottom: "0.246px" }}
									width={13}
								>
									<path
										className="fill-[#ebebeb]"
										d="M6 .246c-.175 5.992-1.539 8.89-5.5 13.5 6.117.073 9.128-.306 12.5-3L6 .246Z"
									/>
								</svg>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</li>
	);
}

function PollImage({ url }: { url: string | undefined }) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const supabase = createClient();

	useEffect(() => {
		async function downloadImage(path: string) {
			try {
				const { data, error } = await supabase.storage
					.from("polls")
					.download(path);
				if (error) throw error;

				const url = URL.createObjectURL(data);
				setImageUrl(url);
			} catch (error) {
				console.log("Error downloading image: ", error);
			}
		}

		if (url != null) downloadImage(url);
	}, [url, supabase]);
	// "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/4.jpeg"
	return (
		<figure className="w-full max-h-48 overflow-hidden rounded-large">
			<Image
				src={imageUrl ?? undefined}
				className="shadow-black/5 object-cover rounded-large size-full"
				isZoomed
			/>
		</figure>
	);
}

export function NewPollsAproach({
	polls,
}: { polls: PollWithOptionsAndVotes[] }) {
	const router = useRouter();
	return (
		<MagicContainer
			className={"gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}
		>
			{polls.map((poll, idx) => (
				<MagicCard
					key={`${poll.id}-${idx}`}
					onClick={() => router.push(`/poll/${poll.id}`)}
					className="flex w-full cursor-pointer flex-col items-center overflow-hidden bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#ffaa40_0,#9c40ff_50%,transparent_100%)] shadow-2xl gap-4"
				>
					<div className="relative shadow-black/5 shadow-none rounded-large">
						<PollImage url={poll.image} />
					</div>
					<h3 className="text-lg font-semibold text-pretty text-white">
						{poll.question}
					</h3>
					<div className="flex flex-col gap-4 py-2 w-full">
						{poll.options.map((option, idx) => (
							<div key={`${option.id}-${idx}`} className="flex gap-2">
								<div className="flex flex-col gap-y-0.5 w-full text-white">
									<Progress
										color="secondary"
										className=""
										showValueLabel
										label={option.text}
										value={option.percentage}
									/>
								</div>
							</div>
						))}
					</div>
					<div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
				</MagicCard>
			))}
		</MagicContainer>
	);
}
