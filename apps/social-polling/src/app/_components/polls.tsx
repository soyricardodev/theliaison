"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chip, Progress } from "@nextui-org/react";

import type { PollWithOptionsAndVotes } from "~/types/poll";
import { MagicCard, MagicContainer } from "~/components/magicui/magic-card";
import { categories } from "~/lib/categories";
import { cn } from "~/lib/utils";

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
    <li className="w-full space-y-4">
      <Link
        className="aspect-preview group relative block w-full overflow-hidden rounded-lg border border-gray-200 p-4 shadow transition-all hover:shadow-lg"
        href={`/poll/${poll.id}`}
      >
        <p className="mb-4 text-pretty text-lg  font-semibold leading-none">
          {poll.question}
        </p>
        <div className="flex flex-col gap-4 py-2 text-base">
          {poll.options.map((option, idx) => (
            <div key={`${option.id}-${idx}`} className="flex gap-2">
              <p className="text-sm font-normal">{option.votes}</p>
              <div className="flex w-full flex-col gap-y-0.5">
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
                <span className="line-clamp-1 text-ellipsis text-left text-sm">
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

export function NewPollsAproach({
  polls,
  // delay = 0,
}: {
  polls: PollWithOptionsAndVotes[];
  delay?: number;
}) {
  const router = useRouter();
  const POLLS_HOME_PAGE_COUNT = 15;

  return (
    <MagicContainer className="columns-1 justify-center md:columns-2 lg:columns-3">
      {polls.map((poll, idx) => {
        const firstCategory = poll.categories?.[0];
        const categoryId = firstCategory?.id ?? 1;
        const category = categories.find(
          (category) => category.id === categoryId,
        );
        const hex = category?.hex;
        const color = category?.color;

        const delay =
          idx >= POLLS_HOME_PAGE_COUNT
            ? (idx - POLLS_HOME_PAGE_COUNT) / 15
            : idx / 15;

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
  );
}
