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
	const { data, error } = await supabase.from("gifts").select(`
		id,
		status,
		recipient_id,
		gift_recipients(id, name),
		users(id, full_name, username),
		created_at
	`);

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

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
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((gift) => (
							<TableRow key={gift.id}>
								<TableCell>
									<Link href={`/dashboard/users/${gift.users?.username}`}>
										<div className="font-medium">{gift.users?.full_name}</div>
										<div className="hidden text-sm text-muted-foreground md:inline">
											ricardo@mail.com
										</div>
									</Link>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Link
										href={`/dashboard/gifting-concierge/${gift.id}`}
										className="font-medium"
									>
										{gift.gift_recipients?.name}
									</Link>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs">{gift.status}</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{transformPGDate(gift.created_at).prettySanDiegoFormattedDate}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
