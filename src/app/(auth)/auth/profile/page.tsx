import { redirect } from "next/navigation";

import { createClient } from "~/utils/supabase/server";
import { ProfileForm } from "./_components/profile-form";

export default async function PrivatePage() {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error || !user) {
		redirect("/auth/signin");
	}

	return (
		<div>
			<ProfileForm user={user} />
		</div>
	);
}
