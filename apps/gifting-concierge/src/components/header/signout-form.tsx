"use client";

import { signOut } from "./actions";

export function SignOutForm() {
	return (
		<form action={signOut}>
			<button type="submit">Log Out</button>
		</form>
	);
}
