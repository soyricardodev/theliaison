import { createClient } from "~/supabase/server";

import { Button } from "@theliaison/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import Image from "next/image";

export default async function GiftingConciergeByIdPage({
	params: { giftId },
}: {
	params: { giftId: string };
}) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("gifts")
		.select(`
			id,
      recipient_id,
			gift_recipients(id, name),
			users(id, full_name, username),
      gifts_products(id, quantity, products(name, image, prices(unit_amount))),
			gift_payments(id, total_price, payment_status, invoice_link, service_fee, delivery_fee)
    `)
		.eq("id", giftId)
		.single();

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	return (
		<div className="mx-auto lg:mt-20">
			<Card className="w-full max-w-4xl">
				<CardHeader className="flex items-center gap-4 border-b pb-4">
					<div className="flex-1">
						<CardTitle>Gifting Concierge</CardTitle>
						<CardDescription>Gift Data</CardDescription>
					</div>
					<Button variant="outline" size="icon">
						<BellIcon className="h-5 w-5" />
						<span className="sr-only">Notifications</span>
					</Button>
				</CardHeader>
				<CardContent className="grid gap-6 py-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="font-semibold text-lg mb-4">Gift Items</h3>
							<div className="grid gap-4">
								{data.gifts_products.map((giftItem) => (
									<div key={giftItem.id}>
										<div className="flex items-center gap-4">
											<Image
												src={giftItem.products?.image ?? "/placeholder.svg"}
												alt={giftItem.products?.name ?? "Gift Item"}
												width={80}
												height={80}
												className="rounded-md"
											/>
											<div className="flex-1">
												<p className="font-medium">{giftItem.products?.name}</p>
												<p className="text-sm text-gray-500 dark:text-gray-400">
													Quantity: {giftItem.quantity}
												</p>
												<p className="text-sm font-medium">
													{Intl.NumberFormat("en-US", {
														style: "currency",
														currency: "USD",
													}).format(
														(giftItem.products?.prices[0]?.unit_amount ?? 0) /
															100 ?? 0,
													)}{" "}
													x {giftItem.quantity} ={" "}
													{Intl.NumberFormat("en-US", {
														style: "currency",
														currency: "USD",
													}).format(
														((giftItem.products?.prices[0]?.unit_amount ?? 0) /
															100) *
															giftItem.quantity ?? 0,
													)}
												</p>
											</div>
										</div>
									</div>
								))}
								<div>
									<div className="flex items-center gap-4">
										<Image
											src={"/placeholder.svg"}
											alt={"Shipping"}
											width={80}
											height={80}
											className="rounded-md"
										/>
										<div className="flex-1">
											<p className="font-medium">Shipping</p>
											<p className="text-sm font-medium">
												{Intl.NumberFormat("en-US", {
													style: "currency",
													currency: "USD",
												}).format(
													(data.gift_payments[0]?.delivery_fee ?? 0) / 100 ?? 0,
												)}
											</p>
										</div>
									</div>
									<div>
										<div className="flex items-center gap-4">
											<Image
												src={"/placeholder.svg"}
												alt={"Shipping"}
												width={80}
												height={80}
												className="rounded-md"
											/>
											<div className="flex-1">
												<p className="font-medium">The Liaison Fee</p>
												<p className="text-sm font-medium">
													{Intl.NumberFormat("en-US", {
														style: "currency",
														currency: "USD",
													}).format(
														(data.gift_payments[0]?.service_fee ?? 0) / 100 ??
															0,
													)}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<h3 className="font-semibold text-lg mb-4">Gift Status</h3>
							<div className="grid gap-4">
								<div className="flex items-center gap-4">
									<TruckIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
									<div className="flex-1">
										<p className="font-medium">
											{data.gift_payments?.[0]?.payment_status}
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Your gift is waiting payment
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h3 className="font-semibold text-lg mb-4">Sender & Recipient</h3>
						<div className="flex items-center gap-4">
							<div className="flex-1">
								<p className="font-medium">Sender: {data.users?.full_name}</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Recipient: {data.gift_recipients?.name}
								</p>
							</div>
							<div className="text-right">
								<p className="font-medium text-lg">
									{Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(
										(data.gift_payments?.[0]?.total_price ?? 0) / 100 ?? 0,
									)}
								</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Total
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			aria-hidden="true"
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
			<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
			<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
		</svg>
	);
}

function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			{...props}
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
			<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
			<path d="M15 18H9" />
			<path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
			<circle cx="17" cy="18" r="2" />
			<circle cx="7" cy="18" r="2" />
		</svg>
	);
}
