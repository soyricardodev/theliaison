"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTimeAgo } from "~/lib/utils";
import { createClient } from "~/utils/supabase/client";

type Comment = {
	content: string;
	created_at: string;
	id: number;
	poll_id: number;
	user_id: string;
	profiles: {
		id: string;
		username: string | null;
		avatar_url: string | null;
	}[];
}[];

export function Comments({
	serverComments,
}: {
	serverComments: Comment;
}) {
	const supabase = createClient();

	const [comments, setComments] = useState<Comment>(serverComments);

	useEffect(() => {
		const channel = supabase
			.channel("realtime-comments")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "comments",
				},
				async (payload) => {
					const { data: profileData, error } = await supabase
						.from("profiles")
						.select("*")
						.eq("id", payload.new.user_id)
						.single();

					if (!profileData || error) {
						return;
					}
					const dataToInsert = {
						...payload.new,
						profiles: {
							id: profileData.id,
							username: profileData.username,
							avatar_url: profileData.avatar_url,
						},
					};
					// @ts-expect-error need debug
					setComments([dataToInsert, ...comments]);
				},
			)
			.subscribe();
	}, [supabase, comments, setComments]);

	return comments != null
		? comments.map((comment) => {
				// @ts-expect-error supabase thinks profiles is an array
				const { username } = comment.profiles;

				return (
					<li key={comment.id} className="px-3 py-2 bg-gray-100 rounded-lg">
						<div className="w-full flex flex-col gap-2">
							<p>{comment.content}</p>
							<div className="flex items-center gap-1 bg-gray-200 w-fit py-0.5 px-2 rounded-full">
								<Image
									alt={`${username}'s Avatar`}
									className="shrink-0 select-none rounded-full"
									loading="eager"
									src={`https://vercel.com/api/www/avatar/${username}?s=48`}
									width={24}
									height={24}
								/>
								<div className="flex items-center gap-1">
									<Link
										href={`/${username}`}
										className="font-medium hover:underline"
									>
										@{username}
									</Link>

									<span className="text-xs text-gray-600">
										{/* Date ago of the comment */}
										{getTimeAgo(comment.created_at)}
									</span>
								</div>
							</div>
						</div>
					</li>
				);
			})
		: null;
}