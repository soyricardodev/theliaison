import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
	ExitIcon,
	PersonIcon,
	QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
	CircleDollarSignIcon,
	CommandIcon,
	CreditCardIcon,
	LayoutDashboardIcon,
	MenuIcon,
} from "lucide-react";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from "~/components/ui/menubar";
import { cn } from "~/lib/utils";
import { createClient } from "~/utils/supabase/server";
import { Logo } from "./logo";
import { buttonVariants } from "./ui/button";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	Dropdown,
	DropdownTrigger,
	Button,
	NavbarItem,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";

export function Header() {
	const icons = {
		chevron: <ChevronDown fill="currentColor" height={16} width={16} />,
		scale: (
			<Scale
				className="text-warning"
				fill="currentColor"
				height={30}
				width={30}
			/>
		),
		lock: (
			<Lock
				className="text-success"
				fill="currentColor"
				height={30}
				width={30}
			/>
		),
		activity: (
			<Activity
				className="text-secondary"
				fill="currentColor"
				height={30}
				width={30}
			/>
		),
		flash: (
			<Flash
				className="text-primary"
				fill="currentColor"
				height={30}
				width={30}
			/>
		),
		server: (
			<Server
				className="text-success"
				fill="currentColor"
				height={30}
				width={30}
			/>
		),
		user: (
			<TagUser
				className="text-danger"
				fill="currentColor"
				height={30}
				width={30}
			/>
		),
	};

	return (
		<Navbar isBlurred>
			<NavbarBrand>
				<Logo isWhite />
			</NavbarBrand>
			<NavbarContent justify="end">
				<Dropdown>
					<NavbarItem>
						<DropdownTrigger>
							<Button
								disableRipple
								className="p-0 bg-transparent data-[hover=true]:bg-transparent"
								endContent={icons.chevron}
								radius="sm"
								variant="light"
							>
								Features
							</Button>
						</DropdownTrigger>
					</NavbarItem>
					<DropdownMenu
						aria-label="ACME features"
						className="w-[340px]"
						itemClasses={{
							base: "gap-4",
						}}
					>
						<DropdownItem
							key="autoscaling"
							description="ACME scales apps to meet user demand, automagically, based on load."
							startContent={icons.scale}
						>
							Autoscaling
						</DropdownItem>
						<DropdownItem
							key="usage_metrics"
							description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
							startContent={icons.activity}
						>
							Usage Metrics
						</DropdownItem>
						<DropdownItem
							key="production_ready"
							description="ACME runs on ACME, join us and others serving requests at web scale."
							startContent={icons.flash}
						>
							Production Ready
						</DropdownItem>
						<DropdownItem
							key="99_uptime"
							description="Applications stay on the grid with high availability and high uptime guarantees."
							startContent={icons.server}
						>
							+99% Uptime
						</DropdownItem>
						<DropdownItem
							key="supreme_support"
							description="Overcome any challenge with a supporting team ready to respond."
							startContent={icons.user}
						>
							+Supreme Support
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
		</Navbar>
	);
}

interface IconProps {
	fill?: string;
	height?: number;
	width?: number;
	className?: string;
}

export const ChevronDown = ({ fill, height, width, ...props }: IconProps) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			height={height || 24}
			viewBox="0 0 24 24"
			width={width || 24}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit={10}
				strokeWidth={1.5}
			/>
		</svg>
	);
};

export const Lock = ({ fill, height, width, ...props }: IconProps) => {
	const color = fill;

	return (
		<svg
			aria-hidden="true"
			height={height || 24}
			viewBox="0 0 24 24"
			width={width || 24}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g transform="translate(3.5 2)">
				<path
					d="M9.121,6.653V4.5A4.561,4.561,0,0,0,0,4.484V6.653"
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth={1.5}
					transform="translate(3.85 0.75)"
				/>
				<path
					d="M.5,0V2.221"
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth={1.5}
					transform="translate(7.91 12.156)"
				/>
				<path
					d="M7.66,0C1.915,0,0,1.568,0,6.271s1.915,6.272,7.66,6.272,7.661-1.568,7.661-6.272S13.4,0,7.66,0Z"
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth={1.5}
					transform="translate(0.75 6.824)"
				/>
			</g>
		</svg>
	);
};

export const Activity = ({ fill, height, width, ...props }: IconProps) => {
	return (
		<svg
			aria-hidden="true"
			height={height || 24}
			viewBox="0 0 24 24"
			width={width || 24}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g
				fill="none"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit={10}
				strokeWidth={1.5}
			>
				<path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
				<path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
				<path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
			</g>
		</svg>
	);
};

export const Flash = ({
	fill = "currentColor",
	height,
	width,
	...props
}: IconProps) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			height={height}
			viewBox="0 0 24 24"
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit={10}
				strokeWidth={1.5}
			/>
		</svg>
	);
};

export const Server = ({
	fill = "currentColor",
	height,
	width,
	...props
}: IconProps) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			height={height}
			viewBox="0 0 24 24"
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
			/>
		</svg>
	);
};

export const TagUser = ({
	fill = "currentColor",
	height,
	width,
	...props
}: IconProps) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			height={height}
			viewBox="0 0 24 24"
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.98c0-1.64 1.34-2.97 3-2.97h12c1.66 0 3 1.33 3 2.97v10.91c0 1.63-1.34 2.97-3 2.97Z"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit={10}
				strokeWidth={1.5}
			/>
			<path
				d="M12 10a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 10ZM16 15.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
			/>
		</svg>
	);
};

export const Scale = ({
	fill = "currentColor",
	height,
	width,
	...props
}: IconProps) => {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			height={height}
			viewBox="0 0 24 24"
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
			/>
			<path
				d="M18 10V6h-4M6 14v4h4"
				stroke={fill}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
			/>
		</svg>
	);
};

// export function LegacyHeader() {
// 	return (
// 		<div className="sticky top-0 z-20">
// 			<header className="flex w-full flex-col gap-3 bg-white/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:h-16 md:flex-row md:items-center lg:px-4">
// 				<div className="flex w-full items-center gap-8">
// 					<div className="flex items-center gap-2">
// 						<Link
// 							className="rounded focus:outline-0 focus:ring-0 focus-visible:bg-zinc-200"
// 							href="/"
// 						>
// 							<span className="sr-only">Home</span>
// 							<Logo />
// 						</Link>
// 					</div>
// 					<div className="ml-auto flex items-center gap-2 sm:gap-4">
// 						<CreatePollButton />
// 						<Menu />
// 					</div>
// 				</div>
// 			</header>
// 		</div>
// 	);
// }

// async function CreatePollButton() {
// 	const supabase = createClient();
// 	const {
// 		data: { user },
// 		error,
// 	} = await supabase.auth.getUser();

// 	if (!user || error) {
// 		return null;
// 	}

// 	return (
// 		<Link
// 			className={cn(buttonVariants({ size: "sm" }), "text-xs h-8")}
// 			href="/create"
// 		>
// 			<span className="hidden sm:inline">Create Poll</span>
// 			<span className="sm:hidden">Create</span>
// 		</Link>
// 	);
// }

// async function Menu() {
// 	const supabase = createClient();
// 	const {
// 		data: { user },
// 		error,
// 	} = await supabase.auth.getUser();

// 	const { data: profileData } = await supabase
// 		.from("users")
// 		.select("*")
// 		.eq("id", user != null ? user.id : "")
// 		.single();

// 	const username = profileData?.username ?? "default";

// 	return (
// 		<Menubar>
// 			<MenubarMenu>
// 				<MenubarTrigger
// 					className={cn(
// 						user != null &&
// 							"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 size shrink-0 rounded-full border",
// 						user == null &&
// 							"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-8 w-8 shrink-0 rounded-full border border-gray-200",
// 					)}
// 				>
// 					{user != null && !error ? (
// 						<Image
// 							alt="soyricardodev"
// 							className="shrink-0 select-none rounded-full"
// 							src={`https://vercel.com/api/www/avatar/${username}?s=64`}
// 							width={32}
// 							height={32}
// 						/>
// 					) : (
// 						<MenuIcon className="text-gray-500 size-4" />
// 					)}
// 					<span className="sr-only">Toggle Menu</span>
// 				</MenubarTrigger>
// 				<MenubarContent className="min-w-[16rem]  bg-white rounded-xl max-h-[80vh] w-[360px] origin-top-right overflow-y-auto md:max-h-[calc(100vh-64px)]">
// 					{user != null && !error ? (
// 						<>
// 							<div className="p-4">
// 								<Link
// 									className="mr-2 grid truncate text-sm"
// 									href={`/${username}`}
// 								>
// 									<span className="font-medium" id="user-name">
// 										{username}
// 									</span>
// 									<span className="text-zinc-500">{user.email}</span>
// 								</Link>
// 							</div>
// 							<MenubarSeparator />
// 							<div className="p-2" role="group">
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/explore">
// 										<LayoutDashboardIcon className="text-zinc-800 size-4" />
// 										<span>Explore</span>
// 									</Link>
// 								</MenubarItem>
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href={`/${username}`}>
// 										<PersonIcon className="text-zinc-800 size-4" />
// 										<span>Profile</span>
// 									</Link>
// 								</MenubarItem>
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/faq">
// 										<QuestionMarkCircledIcon className="text-zinc-800 size-4" />
// 										<span>FAQs</span>
// 									</Link>
// 								</MenubarItem>
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/subscription">
// 										<CreditCardIcon className="text-zinc-800 size-4" />
// 										<span>Subscription & Billing</span>
// 									</Link>
// 								</MenubarItem>
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/pricing">
// 										<CircleDollarSignIcon className="text-zinc-800 size-4" />
// 										<span>Pricing</span>
// 									</Link>
// 								</MenubarItem>
// 							</div>
// 							<MenubarSeparator />
// 							<div className="p-2" role="group">
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/">
// 										<ExitIcon className="text-zinc-800 size-4" />
// 										<span>Logout</span>
// 									</Link>
// 								</MenubarItem>
// 							</div>
// 						</>
// 					) : (
// 						<>
// 							<div className="p-2">
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/login">
// 										<PersonIcon className="text-zinc-800 size-4" />
// 										<span>Login</span>
// 									</Link>
// 								</MenubarItem>
// 							</div>
// 							<MenubarSeparator />
// 							<div className="p-2" role="group">
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/explore">
// 										<LayoutDashboardIcon className="text-zinc-800 size-4" />
// 										<span>Explore</span>
// 									</Link>
// 								</MenubarItem>
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/services">
// 										<CommandIcon className="text-zinc-800 size-4" />
// 										<span>Services</span>
// 									</Link>
// 								</MenubarItem>
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/faq">
// 										<QuestionMarkCircledIcon className="text-zinc-800 size-4" />
// 										<span>FAQs</span>
// 									</Link>
// 								</MenubarItem>
// 								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
// 									<Link href="/pricing">
// 										<CircleDollarSignIcon className="text-zinc-800 size-4" />
// 										<span>Pricing</span>
// 									</Link>
// 								</MenubarItem>
// 							</div>
// 						</>
// 					)}
// 				</MenubarContent>
// 			</MenubarMenu>
// 		</Menubar>
// 	);
// }
