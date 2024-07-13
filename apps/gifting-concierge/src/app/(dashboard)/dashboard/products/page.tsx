import { Button } from "@theliaison/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@theliaison/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@theliaison/ui/tabs";
import { File, ListFilter, PlusCircle } from "lucide-react";
import { ProductsTable } from "./products-table";
import { getProducts } from "./actions";

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: { q: string; offset: string };
}) {
	const search = searchParams.q ?? "";
	const offset = searchParams.offset ?? 0;
	const { products, newOffset, totalProducts } = await getProducts(
		search,
		Number(offset),
	);

	return (
		<Tabs defaultValue="all">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="active">Active</TabsTrigger>
					<TabsTrigger value="draft">Draft</TabsTrigger>
					<TabsTrigger value="archived" className="hidden sm:flex">
						Archived
					</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-8 gap-1">
								<ListFilter className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Filter
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked>
								Active
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<File className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Export
						</span>
					</Button>
					<Button size="sm" className="h-8 gap-1">
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Product
						</span>
					</Button>
				</div>
			</div>
			<TabsContent value="all">
				<ProductsTable
					products={products}
					offset={newOffset ?? 0}
					totalProducts={totalProducts}
				/>
			</TabsContent>
		</Tabs>
	);
}
