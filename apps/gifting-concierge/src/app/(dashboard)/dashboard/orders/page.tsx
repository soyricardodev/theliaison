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
import { createClient } from "~/supabase/server";

export default async function Component() {
	const supabase = createClient();

	const { data, error } = await supabase.from("gifts").select(`
			id,
			users(*),
			recipient_id,
			gift_recipients(id, name),
			status
		`);

	console.log({ data });

	return (
		<Card>
			<CardHeader className="px-7">
				<CardTitle>Orders</CardTitle>
				<CardDescription>Recent orders from your store.</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Sender</TableHead>
							<TableHead>Recipient</TableHead>
							<TableHead className="hidden sm:table-cell">Type</TableHead>
							<TableHead className="hidden sm:table-cell">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{JSON.stringify(data, null, 2)}
						{JSON.stringify(error, null, 2)}
						{data?.map((order) => (
							<TableRow key={order.id}>
								<TableCell>
									<div className="font-medium">{order.users?.full_name}</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										{order.users?.username}
									</div>
								</TableCell>
								<TableCell>
									<div className="font-medium">@{}</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										data
									</div>
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge className="text-xs" variant="secondary">
										{order.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
						<TableRow className="bg-accent">
							<TableCell>
								<div className="font-medium">Liam Johnson</div>
								<div className="hidden text-sm text-muted-foreground md:inline">
									liam@example.com
								</div>
							</TableCell>
							<TableCell>
								<div className="font-medium">Emma Brown</div>
								<div className="hidden text-sm text-muted-foreground md:inline">
									emma@example.com
								</div>
							</TableCell>
							<TableCell className="hidden sm:table-cell">Store</TableCell>
							<TableCell className="hidden sm:table-cell">
								<Badge className="text-xs" variant="secondary">
									Awaiting Confirmation
								</Badge>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
