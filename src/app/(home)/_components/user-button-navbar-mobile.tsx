"use client";
import { motion } from "framer-motion";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "~/utils/supabase/client";

export function UserButtonNavbarMobile() {
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

	return (
		<motion.a
			href={user ? "/profile" : "/auth/signin"}
			initial={{ x: "125%" }}
			animate={{ x: "0" }}
			exit={{
				x: "125%",
				transition: { ease: "easeOut", duration: 2.2 },
			}}
			transition={{ ease: "easeOut", duration: 0.5 }}
			className={cn(buttonVariants())}
		>
			{user ? "Dashboard" : "Get Started"}
		</motion.a>
	);
}
