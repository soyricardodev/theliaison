import { redirect } from "next/navigation";
import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";
import { createClient } from "~/utils/supabase/server";
import CustomerPortalForm from "./_components/customer-portal-form";

export default async function Account() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: subscription, error } = await supabase
		.from("subscriptions")
		.select("*, prices(*, products(*))")
		.in("status", ["active"])
		.maybeSingle();

	if (error) {
		console.log(error);
	}

	if (!user) {
		return redirect("/signin");
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading="Account"
				text="Manage your account billing and subscriptions."
			/>
			<div className="grid gap-10">
				<CustomerPortalForm subscription={subscription} />
			</div>
		</DashboardShell>
	);
}
