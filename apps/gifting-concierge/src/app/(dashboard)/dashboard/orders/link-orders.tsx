import { getLinkOrdersQuery } from "./orders-query";
import { OrdersTable } from "./orders-table";

export async function LinkOrders() {
	const { data, error } = await getLinkOrdersQuery;

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}
	return <OrdersTable orders={data} />;
}
