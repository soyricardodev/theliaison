"use server";

import { createClient } from "~/utils/supabase/server";

export async function upvoteComment(commentId: number) {
	const supabase = createClient();

	const { data: upvotesData, error: upvotesCountError } = await supabase
		.from("comments")
		.select("upvotes")
		.eq("id", commentId)
		.single();

	if (!upvotesData || upvotesCountError) {
		return { data: upvoteComment, error: upvotesCountError };
	}

	const upvotesCount = upvotesData?.upvotes;

	const { data, error } = await supabase
		.from("comments")
		.update({
			upvotes: upvotesCount + 1,
		})
		.eq("id", commentId)
		.select("upvotes")
		.single();

	if (error) {
		return { data, error };
	}

	return { data: data.upvotes, error: null };
}

export async function downvoteComment(commentId: number) {
	const supabase = createClient();

	const { data: downvotesData, error: downvotesCountError } = await supabase
		.from("comments")
		.select("downvotes")
		.eq("id", commentId)
		.single();

	if (!downvotesData || downvotesCountError) {
		return { data: upvoteComment, error: downvotesCountError };
	}

	const downvotesCount = downvotesData?.downvotes;

	const { data, error } = await supabase
		.from("comments")
		.update({
			downvotes: downvotesCount + 1,
		})
		.eq("id", commentId)
		.select("downvotes")
		.single();

	console.log("data", data, "error", error);

	if (error) {
		return { data, error };
	}

	return { data: data.downvotes, error: null };
}

export async function createComment(
	content: string,
	pollId: string,
	userId: string,
) {
	const supabase = createClient();

	const { data, error } = await supabase.from("comments").insert({
		content,
		poll_id: pollId,
		user_id: userId,
	});

	if (error) {
		return { data, error };
	}

	return { data, error };
}

export async function replyComment(
	content: string,
	pollId: string,
	commentId: number,
	userId: string,
) {
	const supabase = createClient();

	const { data, error } = await supabase.from("comments").insert({
		content,
		poll_id: pollId,
		user_id: userId,
		parent_comment_id: commentId,
	});

	if (error) {
		return { data, error };
	}

	return { data, error };
}
