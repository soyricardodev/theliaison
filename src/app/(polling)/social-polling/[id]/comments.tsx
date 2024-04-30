"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "~/utils/supabase/client";
import { Tables } from "~/types/database-types";
import { comment } from "postcss";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

type Profile = Tables<"profiles">;
type Comments = Tables<"comments">;

export function Comments({ pollId }: { pollId: number }) {
	const supabase = createClient();
	const router = useRouter();
	const [comments, setComments] = useState<Comments[]>([]);
	const [user, setUser] = useState<Profile | null>(null);

	const [comment, setComment] = useState("");

	useEffect(() => {
		const getComments = async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (error || !user) {
				throw new Error("Unauthorized");
			}

			const { data, error: getCommentsError } = await supabase
				.from("comments")
				.select("*")
				.eq("poll_id", pollId)
				.order("created_at", { ascending: false })
				.limit(10)
				.select();

			console.log(data);

			if (getCommentsError || !data) {
				console.log(getCommentsError);
			}
			setComments(data ?? []);

			const { data: userData, error: userError } = await supabase
				.from("profiles")
				.select("*")
				.eq("id", user.id)
				.single();

			if (userData && !userError) {
				setUser(userData);
			}
		};

		getComments();
	}, []);

	async function handleCommentSubmit() {
		const { error: insertCommentError } = await supabase
			.from("comments")
			.insert({
				content: comment,
				poll_id: pollId,
				user_id: user!.id,
			})
			.select("*");

		toast.success("Comment added successfully!");
		router.refresh();
		setComment("");
	}

	return (
		<div>
			{comments.map((comment, idx) => (
				<div
					key={`${comment.id}-${idx}`}
					className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer flex flex-col gap-5 justify-between items-center"
				>
					<div>{comment.content}</div>
					<div>comment by @{user?.username}</div>
				</div>
			))}

			{comments.length === 0 && (
				<div className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer flex justify-between items-center">
					<div>No comments yet</div>
				</div>
			)}

			<form
				onSubmit={() => {
					handleCommentSubmit();
				}}
			>
				<Input
					placeholder="Add a comment"
					onChange={(e) => setComment(e.target.value)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
}
