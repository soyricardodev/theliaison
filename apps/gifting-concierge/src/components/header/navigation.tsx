import {
	CircleHelp,
	CircleUserRound,
	GiftIcon,
	LogOutIcon,
	PackageIcon,
	UserRoundIcon,
} from "lucide-react";
import Link from "next/link";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuGroup,
} from "@theliaison/ui/dropdown-menu";
import { Separator } from "@theliaison/ui/separator";

const menuItemsLoggedOut = [
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
}

export function HeaderNavigation(props: HeaderNavigationProps) {
	const { isLoggedIn } = props;

	if (!isLoggedIn) return <HeaderNavigationLoggedOut />;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-8 w-8 shrink-0 rounded-full border"
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
			<DropdownMenuContent className="min-w-[16rem] rounded-xl bg-white z-50 overflow-hidden shadow-none">
				<DropdownMenuGroup className="p-2">
					<DropdownMenuItem asChild>
						<Link
							href="/profile"
							className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3"
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
								className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3"
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

function HeaderNavigationLoggedOut() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-8 w-8 shrink-0 rounded-full border"
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
			<DropdownMenuContent className="min-w-[16rem] rounded-xl bg-white z-50 overflow-hidden shadow-none">
				<DropdownMenuGroup className="p-2">
					{menuItemsLoggedOut.map((menuLink) => (
						<DropdownMenuItem asChild key={menuLink.key}>
							<Link
								href={menuLink.href}
								className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50gap-3"
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
							className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3"
						>
							<UserRoundIcon className="size-5" />
							<span>Sign In</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link
							href="/register"
							className="cursor-pointer relative flex select-none items-center rounded-md px-2 py-2.5 text-sm outline-none transition-colors focus:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3"
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
