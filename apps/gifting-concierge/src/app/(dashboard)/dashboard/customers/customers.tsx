import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@theliaison/ui/table";
import type { Stripe } from "stripe";

export function Customers({ customers }: { customers: Stripe.Customer[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="hidden sm:table-cell">Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead className="text-right">Balance</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{customers.map(({ id, email, name, balance }, index) => (
					<TableRow key={id} className={`${index % 2 === 0 ? "bg-background" : "bg-foreground/40"}`}>
						<TableCell className="hidden sm:block">{name}</TableCell>
						<TableCell>{email}</TableCell>
						<TableCell className="text-right">
							{Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							}).format(balance)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
