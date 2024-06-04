"use client";

import { CircleArrowUpIcon, CircleArrowDownIcon } from "lucide-react";
import { Tooltip, User } from "@nextui-org/react";
import type React from "react";
import { downvoteComment, upvoteComment } from "../../actions/comments";
import { useState } from "react";
import { toast } from "sonner";

export type ReviewType = {
	user: {
		name: string;
		avatar: string;
	};
	downvotes: number;
	upvotes: number;
	createdAt: string;
	rating: number;
	title: string;
	content: string;
	commentId: number;
};

export type ReviewProps = React.HTMLAttributes<HTMLDivElement> & ReviewType;

const Review = ({
	id,
	downvotes,
	upvotes,
	commentId,
	ref,
	children,
	user,
	title,
	content,
	rating,
	createdAt,
	...props
}: ReviewProps & {
	ref?: React.RefObject<HTMLDivElement>;
}) => {
	const [upvotesCount, setUpvotesCount] = useState(upvotes);
	const [downvotesCount, setDownvotesCount] = useState(downvotes);

	return (
		<div ref={ref} {...props}>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<User
						avatarProps={{
							src: user.avatar,
						}}
						classNames={{
							name: "font-medium",
							description: "text-small",
						}}
						description={`commented ${createdAt}`}
						name={user.name}
					/>
				</div>
				<div className="flex items-center gap-1">
					<form
						action={async () => {
							setUpvotesCount(upvotesCount + 1);
							// const { data, error } = await upvoteComment(commentId);
							// console.log("data", data, "error", error);

							// if (error || !data) {
							// 	if (upvotesCount !== 0) {
							// 		setUpvotesCount(upvotesCount - 1);
							// 	}
							// 	toast.error("Error upvoting");
							// 	return;
							// }

							// toast.success("Upvoted");

							// if (data != null) {
							// 	setUpvotesCount(data);
							// }
						}}
					>
						<button type="submit">
							<CircleArrowUpIcon className="size-8" />
							{upvotesCount}
						</button>
					</form>
					<form
						action={async () => {
							setDownvotesCount(downvotesCount + 1);
							// const { data, error } = await downvoteComment(commentId);
							// console.log("data", data, "error", error);

							// if (error || !data) {
							// 	if (downvotesCount !== 0) {
							// 		setDownvotesCount(downvotesCount - 1);
							// 	}
							// 	toast.error("Error down");
							// 	return;
							// }

							// toast.success("down");

							// if (data != null) {
							// 	setDownvotesCount(data);
							// }
						}}
					>
						<button type="submit">
							<CircleArrowDownIcon className="size-8" />
							{downvotesCount}
						</button>
					</form>
				</div>
			</div>
			<div className="mt-4 w-full">
				<p className="text-default-900">{content || children}</p>
			</div>
		</div>
	);
};

Review.displayName = "Review";

export default Review;
