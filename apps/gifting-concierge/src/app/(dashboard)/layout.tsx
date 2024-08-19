import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@theliaison/ui/breadcrumb";
import { Button } from "@theliaison/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@theliaison/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@theliaison/ui/tooltip";
import {
	Home,
	LineChart,
	Package,
	PanelLeft,
	Settings,
	ShoppingCart,
	Users2,
} from "lucide-react";
import Link from "next/link";
import { NavItem } from "./_components/nav-item";
import { Providers } from "./_components/providers";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<div className="flex min-h-screen w-full flex-col bg-background/90">
				<DesktopNav />

				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
					<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
						<MobileNav />
						<DashboardBreadcrumb />
					</header>
					<main className="grid flex-1 items-start gap-2 p-4 sm:p-6 md:gap-4 bg-transparent">
						{children}
					</main>
				</div>
			</div>
		</Providers>
	);
}

function DesktopNav() {
	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
				<Link
					href="/dashboard"
					className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
				>
					<strong>TL</strong>
					<span className="sr-only">The Liaison</span>
				</Link>
				<NavItem label="Dashboard" href="/dashboard">
					<Home className="size-5" />
				</NavItem>
				<NavItem label="Orders" href="/dashboard/orders">
					<ShoppingCart className="size-5" />
				</NavItem>
				<NavItem label="Products" href="/dashboard/products">
					<Package className="size-5" />
				</NavItem>
				<NavItem label="Customers" href="/dashboard/customers">
					<Users2 className="size-5" />
				</NavItem>
				<NavItem label="Analytics" href="#">
					<LineChart className="size-5" />
				</NavItem>
			</nav>
			<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<Settings className="h-5 w-5" />
							<span className="sr-only">Settings</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Settings</TooltipContent>
				</Tooltip>
			</nav>
		</aside>
	);
}

function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
					<PanelLeft className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-xs">
				<nav className="grid gap-6 text-lg font-medium">
					<Link
						href="/dashboard"
						className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
					>
						<strong>TL</strong>
						<span className="sr-only">The Liaison</span>
					</Link>
					<Link
						href="/dashboard"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Home className="h-5 w-5" />
						Dashboard
					</Link>
					<Link
						href="/dashboard/orders"
						className="flex items-center gap-4 px-2.5 text-foreground"
					>
						<ShoppingCart className="h-5 w-5" />
						Orders
					</Link>
					<Link
						href="/dashboard/products"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Package className="h-5 w-5" />
						Products
					</Link>
					<Link
						href="/dashboard/customers"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<Users2 className="h-5 w-5" />
						Customers
					</Link>
					<Link
						href="/dashboard/settings"
						className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<LineChart className="h-5 w-5" />
						Settings
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
}

function DashboardBreadcrumb() {
	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/dashboard">Dashboard</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/dashboard/orders">Orders</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Recent Orders</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
