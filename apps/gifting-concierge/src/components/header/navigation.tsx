import {
	CircleHelp,
	CircleUserRound,
	GiftIcon,
	HomeIcon,
	LogOutIcon,
	PackageIcon,
	UserRoundIcon,
	BadgeInfoIcon,
	ListIcon
} from "lucide-react";
import Link from "next/link";

import { cn } from "@theliaison/ui";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@theliaison/ui/dropdown-menu";
import { Separator } from "@theliaison/ui/separator";

const menuItemsLoggedOut = [
	{
		key: "home",
		label: "Home",
		href: "/",
		Icon: <HomeIcon className="mr-2 size-5 text-foreground" />,
	},
	{
		key: "about",
		label: "About",
		href: "/about",
		Icon: <BadgeInfoIcon className="mr-2 size-5 text-foreground" />,
	},
	{
		key: "services",
		label: "Services",
		href: "/services",
		Icon: <ListIcon className="mr-2 size-5 text-foreground" />,
	},
	{
		key: "giftshop",
		label: "Gift shop",
		href: "/giftshop",
		Icon: <GiftIcon className="mr-2 size-5 text-foreground" />,
	},
	{
		key: "send-custom",
		label: "Send custom gift",
		href: "/send",
		Icon: <PackageIcon className="mr-2 size-5 text-foreground" />,
	},
	{
		key: "faq",
		label: "FAQs",
		href: "/faq",
		Icon: <CircleHelp className="mr-2 size-5 text-foreground" />,
	},
];

const menuItemsLoggedIn = [
	{
		key: "giftshop",
		label: "Giftshop",
		href: "/giftshop",
		Icon: <GiftIcon className="mr-2 size-5 text-foreground" />,
	},
	{
		key: "send-custom",
		label: "Send Custom Gift",
		href: "/send",
		Icon: <PackageIcon className="mr-2 size-5 text-foreground" />,
	},
	{
		key: "faq",
		label: "FAQs",
		href: "/faq",
		Icon: <CircleHelp className="mr-2 size-5 text-foreground" />,
	},
	// {
	// 	key: "logout",
	// 	label: "Logout",
	// 	href: "/auth/logout",
	// 	Icon: (
	// 		<LogOutIcon
	// 			className="mr-2 size-5 text-foreground"
	// 			onClick={() => fetch("/auth/signout", { method: "POST" })}
	// 		/>
	// 	),
	// },
];

interface HeaderNavigationProps {
	isLoggedIn: boolean;
	isDarkMode?: boolean;
}

export function HeaderNavigation(props: HeaderNavigationProps) {
	const { isLoggedIn } = props;

	if (!isLoggedIn)
		return <HeaderNavigationLoggedOut isDarkMode={props.isDarkMode} />;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={cn("inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-8 w-8 shrink-0 rounded-full border dark:text-gray-400 dark:hover:bg-gray-600 dark:border-gray-600", {
						dark: props.isDarkMode,
					})}
				>
					<svg
						className="size-5"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path
							d="M3.75 9h16.5m-16.5 6.75h16.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn(
					"min-w-[16rem] rounded-xl z-50 overflow-hidden shadow-none dark:bg-black dark:border-gray-600",
					{
						dark: props.isDarkMode,
					},
				)}
			>
				<DropdownMenuGroup className="p-2">
					<DropdownMenuItem asChild>
						<Link
							href="/profile"
							className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3 dark:focus:bg-zinc-600 dark:hover:bg-zinc-600"
						>
							<UserRoundIcon className="size-5" />
							<span>Profile</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<Separator className="h-px" />
				<DropdownMenuGroup className="p-2">
					{menuItemsLoggedIn.map((menuLink) => (
						<DropdownMenuItem asChild key={menuLink.key}>
							<Link
								href={menuLink.href}
								className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3 dark:focus:bg-zinc-600 dark:hover:bg-zinc-600"
							>
								{menuLink.Icon}
								{menuLink.label}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function HeaderNavigationLoggedOut({ isDarkMode }: { isDarkMode?: boolean }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={cn(
						"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-8 w-8 shrink-0 rounded-full border dark:text-gray-400 dark:hover:bg-gray-600 dark:border-gray-600",
						{
							dark: isDarkMode,
						},
					)}
				>
					<svg
						className="size-5"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Menu</title>
						<path
							d="M3.75 9h16.5m-16.5 6.75h16.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn(
					"min-w-[16rem] rounded-xl z-50 overflow-hidden shadow-none dark:bg-black dark:text-white dark:hover:bg-zinc-600",
					{
						dark: isDarkMode,
					},
				)}
			>
				<DropdownMenuGroup className="p-2">
					{menuItemsLoggedOut.map((menuLink) => (
						<DropdownMenuItem asChild key={menuLink.key}>
							<Link
								href={menuLink.href}
								className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 dark:focus:bg-zinc-600 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3 dark:hover:bg-zinc-600"
							>
								{menuLink.Icon}
								{menuLink.label}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<Separator className="h-px" />
				<DropdownMenuGroup className="p-2">
					<DropdownMenuItem asChild>
						<Link
							href="/login"
							className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 dark:focus:bg-zinc-600 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3 dark:hover:bg-zinc-600"
						>
							<UserRoundIcon className="size-5" />
							<span>Sign In</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link
							href="/register"
							className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 dark:focus:bg-zinc-600 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3 dark:hover:bg-zinc-600"
						>
							<CircleUserRound className="size-5" />
							<span>Sign Up</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
