import { redirect } from "next/navigation";

import { createClient } from "~/utils/supabase/server";
import { ProfileForm } from "./_components/profile-form";
import { DashboardShell } from "~/components/shell";
import { DashboardHeader } from "~/components/dashboard-header";

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
		<DashboardShell>
			<DashboardHeader heading="Profile" text="Manage your account settings." />
			<div className="grid gap-10">
				<ProfileForm user={user} />
			</div>
		</DashboardShell>
	);
}
