import { SidebarWrapper } from "~/components/sidebar/sidebar-wrapper";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-dvh w-full">
			<SidebarWrapper />

			<div className="w-full flex-1 flex-col p-4">{children}</div>
		</div>
	);
}
