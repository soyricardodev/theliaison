import Image from "next/image";
import { Badge } from "@theliaison/ui/badge";
import { Button } from "@theliaison/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@theliaison/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@theliaison/ui/table";
import type { Tables } from "@theliaison/supabase/database-types";

type SelectProduct = Tables<"products">;

export function Product({ product }: { product: SelectProduct }) {
	return (
		<TableRow>
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
			<TableCell>
				<Badge variant="outline" className="capitalize">
					{product.active ? "Active" : "Inactive"}
				</Badge>
			</TableCell>
			<TableCell className="hidden md:table-cell">P</TableCell>
			<TableCell className="hidden md:table-cell">ST</TableCell>
			<TableCell className="hidden md:table-cell">AA</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>
							<form>
								<button type="submit">Delete</button>
							</form>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
}
