import type { ReviewType } from "./review";

import type React from "react";

import { cn } from "~/lib/utils";

import Review from "./review";

export type CardReviewProps = React.HTMLAttributes<HTMLDivElement> & ReviewType;

const CardReview = ({
	ref,
	className,
	...review
}: CardReviewProps & {
	ref: React.RefObject<HTMLDivElement>;
}) => (
	<div
		ref={ref}
		className={cn("rounded-medium bg-content1 p-5 shadow-small", className)}
	>
		<Review {...review} />
	</div>
);

CardReview.displayName = "CardReview";

export default CardReview;
