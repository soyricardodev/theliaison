import { createClient } from "~/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@theliaison/ui/card";
import { Avatar } from "@nextui-org/react";
import { Badge } from "@theliaison/ui/badge";

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
			users(id, full_name, email, avatar_url),
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
			<Card className="w-4/5 h-96">
			<CardHeader className="flex items-center">
				<CardTitle className="text-xl">Order</CardTitle>
			</CardHeader>
				<CardContent className="grid grid-cols-8 gap-1 justify-center h-4/5">
					<div className="col-span-2 ">
						<div className="flex items-center justify-center space-x-2">
							<Avatar className="w-44 h-44" src={data.users?.avatar_url ?? ""} showFallback/>
						</div>
					</div>
					<div className="col-span-3 col-start-3">
						<div className="my-2">
							<p className="text-base font-bold">Name</p>
							<p>{data.users?.full_name}</p>
						</div>
						<div className="my-2">
							<p className="text-base font-bold">Type</p>
							<p>{data.type}</p>
						</div>
						<div className="my-2">
							<p className="text-base font-bold">Link</p>
							<p>{data.gifts_orders_links?.link}</p>
						</div>
						<div className="mt-14">
							<p className="text-base font-bold">Recipient</p>
							<p>{data.gift_recipients?.name}</p>
						</div>
					</div>
					<div className="grid col-span-3 col-start-6">
						<div>
							<p className="text-base font-bold">Status</p>
							<Badge className="text-base capitalize" variant="secondary">
								{data.status.replaceAll("_", " ")}
							</Badge>
						</div>
						<div>
							<p className="text-base font-bold">Specs</p>
							<p>{data.gifts_orders_links?.specs}</p>
						</div>
					</div>
				</CardContent>
			</Card>
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
		</div>
	);
}
