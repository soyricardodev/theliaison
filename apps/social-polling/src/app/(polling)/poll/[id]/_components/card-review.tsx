import type React from "react";

import { cn } from "@theliaison/ui";

import type { ReviewType } from "./review";
import Review from "./review";

export type CardReviewProps = React.HTMLAttributes<HTMLDivElement> & ReviewType;

const CardReview = ({
	ref,
	className,
	...review
}: CardReviewProps & {
	ref?: React.RefObject<HTMLDivElement>;
}) => (
	<div
		ref={ref}
		className={cn("rounded-medium bg-content1 shadow-small p-5", className)}
	>
		<Review {...review} />
	</div>
);

CardReview.displayName = "CardReview";

export default CardReview;
