import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import { Customers } from "./customers";
import { getCustomers } from "./actions";

export default async function CustomersPage() {
	const { customers } = await getCustomers();

	return (
		<Card>
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
