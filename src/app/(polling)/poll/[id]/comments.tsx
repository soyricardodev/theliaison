"use client";
import { useEffect, useState } from "react";
import { getTimeAgo } from "~/lib/utils";
import { createClient } from "~/utils/supabase/client";
import CardReview from "./_components/card-review";

type Comment = {
	content: string;
	created_at: string;
	id: number;
	users: {
		id: string;
		username: string;
		avatar_url: string | null;
	} | null;
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
						.from("users")
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

		return () => {
			channel.unsubscribe();
		};
	}, [supabase, comments]);

	return comments != null
		? comments.map((comment) => {
				return (
					<CardReview
						key={comment.id}
						commentId={comment.id}
						content={comment.content}
						rating={3}
						title="Title"
						user={{
							avatar: comment.users?.avatar_url ?? "",
							name: comment.users?.username ?? "",
						}}
						createdAt={getTimeAgo(comment.created_at)}
					/>
				);
			})
		: null;
}
