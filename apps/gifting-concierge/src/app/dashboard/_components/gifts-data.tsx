import { createClient } from "~/supabase/server";

import { Badge } from "@theliaison/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@theliaison/ui/table";
import Link from "next/link";

export async function GiftsData() {
	const supabase = createClient();
	const { data, error } = await supabase.from("gifts").select("*");

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	const status = ({
		confirmed,
		rejected,
	}: { confirmed: boolean; rejected: boolean }) => {
		return rejected ? "Declined" : confirmed ? "Confirmed" : "Pending";
	};
	const statusVariant = ({
		confirmed,
		rejected,
	}: { confirmed: boolean; rejected: boolean }) => {
		return rejected ? "destructive" : confirmed ? "default" : "secondary";
	};

	function transformPGDate(createdAtString: string) {
		const createdAtDate = new Date(createdAtString);

		const formattedDate = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

		const sanDiegoOffset = createdAtDate.getTimezoneOffset() - 480;
		const sanDiegoDate = new Date(
			createdAtDate.getTime() + sanDiegoOffset * 60 * 1000,
		);
		const sanDiegoFormattedDate = `${sanDiegoDate.toLocaleDateString()} ${sanDiegoDate.toLocaleTimeString()}`;

		const prettySanDiegoFormattedDate = `${sanDiegoDate.toLocaleDateString().replaceAll("/", "-")} (${sanDiegoDate.toLocaleTimeString(
			"en-US",
			{
				hour: "numeric",
				minute: "numeric",
			},
		)})`;

		return {
			formattedDate,
			sanDiegoFormattedDate,
			prettySanDiegoFormattedDate,
		};
	}

	return (
		<Card>
			<CardHeader className="px-7">
				<CardTitle>Orders</CardTitle>
				<CardDescription>
					Recent orders from the Gifting Concierge.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead className="hidden sm:table-cell">Recipient</TableHead>
							<TableHead className="hidden sm:table-cell">Status</TableHead>
							<TableHead className="hidden md:table-cell">Date</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((gift) => (
							<TableRow key={gift.id}>
								<TableCell>
									<Link href={`/dashboard/users/${gift.sender_name}`}>
										<div className="font-medium">{gift.sender_name}</div>
										<div className="hidden text-sm text-muted-foreground md:inline">
											ricardo@mail.com
										</div>
									</Link>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Link href={`/dashboard/gifting-concierge/${gift.id}`}>
										<div className="font-medium">{gift.recipient_name}</div>
										<div className="hidden text-sm text-muted-foreground md:inline">
											{gift.recipient_social}
										</div>
									</Link>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge
										className="text-xs"
										variant={statusVariant({
											confirmed: gift.is_confirmed,
											rejected: gift.is_rejected,
										})}
									>
										{status({
											confirmed: gift.is_confirmed,
											rejected: gift.is_rejected,
										})}
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{transformPGDate(gift.created_at).prettySanDiegoFormattedDate}
								</TableCell>
								<TableCell className="text-right">
									{Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(gift.total_price)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
