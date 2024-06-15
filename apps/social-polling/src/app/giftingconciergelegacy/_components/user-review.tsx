"use client";

import { Avatar } from "@nextui-org/react";
import type React from "react";

import { cn } from "@theliaison/ui";

export type UserReviewProps = React.HTMLAttributes<HTMLDivElement> & {
	avatar: string;
	name: string;
	role: string;
	content: string;
};

export const UserReview = ({
	ref,
	children,
	name,
	avatar,
	content,
	className,
	...props
}: UserReviewProps & {
	ref?: React.RefObject<HTMLDivElement>;
}) => (
	<div
		ref={ref}
		className={cn(
			"rounded-medium bg-content1 shadow-small flex flex-col gap-2.5 p-5",
			className,
		)}
		{...props}
	>
		<div className="flex items-center gap-2">
			<Avatar alt={name} className="h-7 w-7" size="sm" src={avatar} />
			<span className="text-small text-foreground">{name}</span>
		</div>
		<p className="text-default-700">{content || children}</p>
	</div>
);

UserReview.displayName = "UserReview";
