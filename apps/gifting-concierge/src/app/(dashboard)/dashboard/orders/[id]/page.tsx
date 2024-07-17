import { createClient } from "~/supabase/server";

export default async function Component({
	params: { id },
}: {
	params: { id: string };
}) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("gifts")
		.select(`
			id,
			type,
			status,
			users(id, full_name, email),
			gift_recipients(id, name),
			gifts_orders_links(id, link, specs),
			updated_at,
			created_at
		`)
		.eq("id", id)
		.single();

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
