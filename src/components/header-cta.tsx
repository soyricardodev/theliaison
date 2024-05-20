import Link from "next/link";
import { Button } from "@nextui-org/react";
import { createClient } from "~/utils/supabase/server";

type HeaderCTAProps =
	| {
			href: string;
			ctaText: string | JSX.Element;
	  }
	| {
			href?: never;
			ctaText?: never;
	  };

export async function HeaderCTA({
	href = "/create",
	ctaText = (
		<>
			<span className="hidden md:block">Create poll</span>
			<span className="block md:hidden">Create</span>
		</>
	),
}: HeaderCTAProps) {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return <LoginCTA />;
	}

	return (
		<Button href={href} as={Link} variant="ghost" size="sm" radius="full">
			{ctaText}
		</Button>
	);
}

function LoginCTA() {
	return (
		<Button href="/login" as={Link} variant="ghost" size="sm" radius="full">
			Get Started
		</Button>
	);
}
