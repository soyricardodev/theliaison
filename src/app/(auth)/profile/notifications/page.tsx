import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";
import { Separator } from "~/components/ui/separator";
import { NotificationsForm } from "./_components/notifications-form";

export default function SettingsNotificationsPage() {
	return (
		<DashboardShell>
			<DashboardHeader
				heading="Notifications"
				text="Configure how you receive notifications."
			/>
			<div className="grid gap-10">
				<NotificationsForm />
			</div>
		</DashboardShell>
	);
}
