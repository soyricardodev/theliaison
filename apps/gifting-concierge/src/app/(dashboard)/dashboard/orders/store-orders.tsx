import { OrdersTable } from "./orders-table";
import { getStoreOrdersQuery } from "./orders-query";

export async function StoreOrders() {
	const { data, error } = await getStoreOrdersQuery;

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}
	return <OrdersTable orders={data} />;
}
