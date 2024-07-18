import { Avatar, Badge } from "@nextui-org/react";
import { Button } from "@theliaison/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@theliaison/ui/dropdown-menu";
import { GiftIcon, HeartHandshakeIcon } from "lucide-react";
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
				<Button variant="ghost" asChild>
					<Link href="/login" className="hidden md:block rounded-full">
						Login
					</Link>
				</Button>
				<Button asChild className="rounded-full">
					<Link href="/register">
						<span className="hidden md:block">Sign Up</span>
						<span className="md:hidden">Get Started</span>
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="mt-1 size-8 transition-transform" type="button">
					<Badge color="success" placement="bottom-right" shape="circle">
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
