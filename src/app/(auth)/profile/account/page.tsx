import CustomerPortalForm from "./_components/customer-portal-form";
import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "~/components/shell";
import { DashboardHeader } from "~/components/dashboard-header";

export default async function Account() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: subscription, error } = await supabase
		.from("subscriptions")
		.select("*, prices(*, products(*))")
		.in("status", ["trialing", "active"])
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
