import { DashboardSidebar } from "~/components/sidebar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <DashboardSidebar>{children}</DashboardSidebar>;
}
