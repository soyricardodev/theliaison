import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { createClient } from "~/supabase/server";

export default async function StatusGiftIdPage({
	params: { giftId },
}: {
	params: { giftId: string };
}) {
	const giftIdAsNumber = Number(giftId);

	if (Number.isNaN(giftIdAsNumber)) {
		return (
			<div>
				The gift with id: {giftId} does not exist. Please contact support for
				assistance.
			</div>
		);
	}

	const supabase = createClient();

	const { data, error } = await supabase
		.from("gifts")
		.select("id, created_at, status, sender_id")
		.eq("id", giftIdAsNumber)
		.single();

	console.log({ data });

	if (error) {
		return (
			<div>
				The gift with id: {giftId} does not exist. Please contact support for
				assistance.
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center p-4 lg:p-8">
			<Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
				<CardHeader className="bg-[#17c964] py-8 px-10 text-white">
					<div className="flex items-center justify-between">
						<div className="text-3xl font-bold mr-4">Order Placed</div>
						<Chip
							variant="faded"
							color="secondary"
							className="bg-white/20 text-white"
						>
							#GFT-{giftIdAsNumber}
						</Chip>
					</div>
				</CardHeader>
				<CardBody className="p-8 lg:p-10 space-y-6">
					<div className="text-center">
						<GiftIcon className="size-20 mx-auto text-[#17c964]" />
						<h2 className="text-2xl lg:text-3xl font-bold">Congratulations!</h2>
						<p className="text-gray-500 text-lg">
							Your order has been created successfully.
						</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-gray-500 text-lg">Gift Status:</div>
						{data.status}
					</div>
					<div className="flex items-center justify-between">
						<div className="text-gray-500 text-lg">Gift ID:</div>
						<div className="font-medium text-lg">GFT-{giftIdAsNumber}</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

function GiftIcon({ className }: { className: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Gift</title>
			<rect x="3" y="8" width="18" height="4" rx="1" />
			<path d="M12 8v13" />
			<path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
			<path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
		</svg>
	);
}
