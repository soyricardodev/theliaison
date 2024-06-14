import { createClient } from "~/supabase/server";
import { Avatar, Badge } from "@nextui-org/react";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@theliaison/ui/dropdown-menu";
import { SignOutForm } from "./signout-form";

export async function UserMenu() {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	console.log(user);
	if (error) {
		return <p>Error: {error.message}</p>;
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
						<Avatar
							size="sm"
							src="https://i.pravatar.cc/150?u=a04258114e29526708c"
						/>
					</Badge>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent aria-label="Profile Actions">
				<DropdownMenuItem key="profile" className="h-14 gap-2">
					<p className="font-semibold">Signed in as</p>
					<p className="font-semibold">{user?.email}</p>
				</DropdownMenuItem>
				<DropdownMenuItem key="settings">My Settings</DropdownMenuItem>
				<DropdownMenuItem key="team_settings">Team Settings</DropdownMenuItem>
				<DropdownMenuItem key="analytics">Analytics</DropdownMenuItem>
				<DropdownMenuItem key="system">System</DropdownMenuItem>
				<DropdownMenuItem key="configurations">Configurations</DropdownMenuItem>
				<DropdownMenuItem key="help_and_feedback">
					Help & Feedback
				</DropdownMenuItem>
				<DropdownMenuItem key="logout">
					<SignOutForm />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
