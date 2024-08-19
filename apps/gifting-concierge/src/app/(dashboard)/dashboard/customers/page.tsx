import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import { getCustomers } from "./actions";
import { Customers } from "./customers";

export default async function CustomersPage() {
	const { customers } = await getCustomers();

	return (
		<Card className="bg-background text-foreground">
			<CardHeader>
				<CardTitle>Customers</CardTitle>
				<CardDescription>View all customers and their orders.</CardDescription>
			</CardHeader>
			<CardContent>
				<Customers customers={customers} />
			</CardContent>
		</Card>
	);
}
