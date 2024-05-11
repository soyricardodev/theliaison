"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { createClient } from "~/utils/supabase/client";

export function UserButtonNavbar() {
	const [user, setUser] = useState<User | null>(null);
	const supabase = createClient();

	const getUserData = async () => {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error) return setUser(null);

		setUser(user);
	};

	useEffect(() => {
		getUserData();
	}, []);

	if (!user)
		return (
			<Link
				href="/auth/signin"
				className={cn(buttonVariants(), "transition-all")}
			>
				Get Started
			</Link>
		);

	return (
		<Link href="/profile" className={cn(buttonVariants(), "transition-all")}>
			Dashboard
		</Link>
	);
}
