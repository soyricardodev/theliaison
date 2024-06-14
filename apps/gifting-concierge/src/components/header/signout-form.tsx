"use client";

import { signOut } from "./actions";
import { LogOutIcon } from "lucide-react";

export function SignOutForm() {
	return (
		<form
			action={signOut}
			className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
		>
			<button type="submit" className="flex gap-2 w-full">
				<LogOutIcon className="size-5" />
				Log Out
			</button>
		</form>
	);
}
