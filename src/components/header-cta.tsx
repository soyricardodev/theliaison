import { Button, Link } from "@nextui-org/react";
import { createClient } from "~/utils/supabase/server";

export async function HeaderCTA() {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return <LoginCTA />;
	}

	return (
		<Button as={Link} href="/create">
			Create Poll
		</Button>
	);
}

function LoginCTA() {
	return (
		<Button as={Link} href="/login">
			Get Started
		</Button>
	);
}
