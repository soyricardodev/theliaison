"use client";

import { Icon } from "@iconify/react";
import { Tooltip, User } from "@nextui-org/react";
import type React from "react";

export type ReviewType = {
	user: {
		name: string;
		avatar: string;
	};
	createdAt: string;
	rating: number;
	title: string;
	content: string;
};

export type ReviewProps = React.HTMLAttributes<HTMLDivElement> & ReviewType;

const Review = ({
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
}) => (
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
				<Tooltip content="Upvote">
					<Icon icon="solar:round-arrow-up-bold-duotone" className="size-8" />
				</Tooltip>
				<Tooltip content="Downvote">
					<Icon icon="solar:round-arrow-down-bold-duotone" className="size-8" />
				</Tooltip>
			</div>
		</div>
		<div className="mt-4 w-full">
			<p className="text-default-900">{content || children}</p>
		</div>
	</div>
);

Review.displayName = "Review";

export default Review;
