"use server";

import { createClient } from "~/utils/supabase/server";

export async function upvoteComment(commentId: number) {
	const supabase = createClient();

	const { data, error } = await supabase.rpc("upvote_comment", {
		p_comment_id: commentId,
	});

	if (error) {
		return { data, error };
	}

	return { data, error };
}

export async function downvoteComment(commentId: number) {
	const supabase = createClient();

	const { data, error } = await supabase.rpc("downvote_comment", {
		p_comment_id: commentId,
	});

	if (error) {
		return { data, error };
	}

	return { data, error };
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
