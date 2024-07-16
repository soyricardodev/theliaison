import { OrdersTable } from "./orders-table";
import { getAllOrdersQuery } from "./orders-query";

export async function AllOrders() {
	const { data, error } = await getAllOrdersQuery;

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}
	return <OrdersTable orders={data} />;
}
