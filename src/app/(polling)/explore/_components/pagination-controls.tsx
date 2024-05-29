"use client";

import type { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export const PaginationControls: FC<PaginationControlsProps> = ({
	hasNextPage,
	hasPrevPage,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = searchParams.get("page") ?? "1";
	const per_page = searchParams.get("per_page") ?? "10";

	return (
		<div className="flex gap-2">
			<button
				type="button"
				disabled={!hasPrevPage}
				className="bg-blue-500 text-white p-1"
				onClick={() => {
					router.push(`/explore?page=${Number(page) - 1}&per_page=${per_page}`);
				}}
			>
				prev page
			</button>

			<div>
				{page} / {Math.ceil(10 / Number(per_page))}
			</div>

			<button
				type="button"
				disabled={!hasNextPage}
				className="bg-blue-500 text-white p-1"
				onClick={() => {
					router.push(`/explore?page=${Number(page) + 1}&per_page=${per_page}`);
				}}
			>
				next page
			</button>
		</div>
	);
};
