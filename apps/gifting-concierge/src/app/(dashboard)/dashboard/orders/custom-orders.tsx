import { OrdersTable } from "./orders-table";
import { getCustomOrdersQuery } from "./orders-query";

export async function CustomOrders() {
	const { data, error } = await getCustomOrdersQuery;

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}
	return <OrdersTable orders={data} />;
}
