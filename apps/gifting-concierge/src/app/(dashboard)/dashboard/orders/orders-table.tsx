import { Avatar } from "@nextui-org/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { cn } from "@theliaison/ui";
import { Badge } from "@theliaison/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import type { Orders } from "./orders-query";

export function OrdersTable({ orders }: { orders: Orders }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="hidden sm:table-cell" />
					<TableHead>Sender</TableHead>
					<TableHead>Recipient</TableHead>
					<TableHead className="hidden sm:table-cell">Type</TableHead>
					<TableHead className="hidden sm:table-cell">Status</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders?.map((order, idx) => (
					<TableRow key={order.id} className={cn({ "bg-accent": idx % 2 })}>
						<TableCell className="hidden sm:table-cell">
							<div className="flex items-center justify-center space-x-2">
								<Avatar src={order.users?.avatar_url ?? ""} showFallback />
							</div>
						</TableCell>
						<TableCell>
							<div className="font-medium">{order.users?.full_name}</div>
							<div className="hidden text-sm text-muted-foreground md:inline">
								{order.users?.email}
							</div>
						</TableCell>
						<TableCell>
							<div className="font-medium">{order.gift_recipients?.name}</div>
						</TableCell>
						<TableCell className="hidden sm:table-cell capitalize">
							{order.type}
						</TableCell>
						<TableCell className="hidden sm:table-cell">
							<Badge className="text-xs capitalize" variant="secondary">
								{order.status.replaceAll("_", " ")}
							</Badge>
						</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<DotsHorizontalIcon />
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link
											href={`/dashboard/orders/${order.id}`}
											className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										>
											<EyeIcon className="h-5 w-5" />
											<span>View</span>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
