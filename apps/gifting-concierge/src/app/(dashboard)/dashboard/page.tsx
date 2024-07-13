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
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@theliaison/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@theliaison/ui/tabs";
import { File, ListFilter, PlusCircle } from "lucide-react";

export default function DashboardPage() {
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
				<Card>
					<CardHeader>
						<CardTitle>Products</CardTitle>
						<CardDescription>
							Manage your products and view their sales performance.
						</CardDescription>
					</CardHeader>
					<CardContent>content</CardContent>
					<CardFooter>
						<div className="text-xs text-muted-foreground">
							Showing <strong>1-10</strong> of <strong>32</strong> products
						</div>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
