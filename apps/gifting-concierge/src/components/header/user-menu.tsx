import { Avatar, Badge } from "@nextui-org/react";
import { Button } from "@theliaison/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@theliaison/ui/dropdown-menu";
import {
	CircleUserRoundIcon,
	GiftIcon,
	HeartHandshakeIcon,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "~/supabase/server";
import { SignOutForm } from "./signout-form";

export async function UserMenu() {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) {
		return (
			<div className="flex gap-2">
				<Button variant="outline" asChild>
					<Link href="/login">Login</Link>
				</Button>
				<Button asChild>
					<Link href="/register">Sign Up</Link>
				</Button>
			</div>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="mt-1 h-8 w-8 transition-transform" type="button">
					<Badge
						color="success"
						content=""
						placement="bottom-right"
						shape="circle"
					>
						<Avatar size="sm" />
					</Badge>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				aria-label="Profile Actions"
				className="w-56 shadow-lg [&>a]:cursor-pointer"
			>
				<DropdownMenuItem asChild>
					<Link href="/profile" className="font-medium flex gap-2">
						{user?.email}
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/profile/gifts" className="flex gap-2">
						<GiftIcon className="size-5" />
						My Gifts
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/help-and-feedback" className="flex gap-2">
						<HeartHandshakeIcon className="size-5" />
						Help & Feedback
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<SignOutForm />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
