import { getStoreOrdersQuery } from "./orders-query";
import { OrdersTable } from "./orders-table";

export async function StoreOrders() {
	const { data, error } = await getStoreOrdersQuery;

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}
	return <OrdersTable orders={data} />;
}
