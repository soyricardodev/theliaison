import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@theliaison/ui/tabs";
import { AllOrders } from "./all-orders";
import { CustomOrders } from "./custom-orders";
import { LinkOrders } from "./link-orders";
import { StoreOrders } from "./store-orders";

export default function OrdersPage() {
	return (
		<Card className="bg-background text-foreground border-none">
			<CardHeader className="px-7">
				<CardTitle>Orders</CardTitle>
				<CardDescription>Recent orders from your store.</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="all">
					<TabsList className="bg-background border">
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="link">Link</TabsTrigger>
						<TabsTrigger value="custom">Custom</TabsTrigger>
						<TabsTrigger value="store">Store</TabsTrigger>
					</TabsList>
					<TabsContent value="all">
						<AllOrders />
					</TabsContent>
					<TabsContent value="link">
						<LinkOrders />
					</TabsContent>
					<TabsContent value="custom">
						<CustomOrders />
					</TabsContent>
					<TabsContent value="store">
						<StoreOrders />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
