import { Button } from "@theliaison/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@theliaison/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@theliaison/ui/table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { createClient } from "~/supabase/server";

export default async function GiftsPage() {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("products")
		.select(`
      id,
      name,
      image,
      type,
      active,
      prices(id, unit_amount)  
    `)
		.eq("type", "gift")
		.eq("active", true);

	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Products</CardTitle>
					<CardDescription>
						Manage your gift products and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="hidden w-[100px] sm:table-cell">
									<span className="sr-only">Image</span>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead className="hidden md:table-cell">Price</TableHead>
								<TableHead>
									<span className="sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.map((product, index) => (
								<TableRow key={product.id}>
									<TableCell className="hidden sm:table-cell">
										<Image
											alt="Product image"
											className="aspect-square rounded-md object-cover"
											height="64"
											src={product.image ?? "/placeholder.svg"}
											width="64"
										/>
									</TableCell>
									<TableCell className="font-medium">{product.name}</TableCell>
									<TableCell className="hidden md:table-cell">
										{Intl.NumberFormat("en-US", {
											style: "currency",
											currency: "USD",
										}).format((product.prices[0]?.unit_amount ?? 0) / 100)}
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													aria-haspopup="true"
													size="icon"
													variant="ghost"
												>
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">Toggle menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem>Edit</DropdownMenuItem>
												<DropdownMenuItem>Delete</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						Showing <strong>1 - {data.length}</strong> of{" "}
						<strong>{data?.length}</strong> products
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
