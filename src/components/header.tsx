import Image from "next/image";
import Link from "next/link";

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
import { Button, buttonVariants } from "./ui/button";

export function Header() {
	return (
		<div className="sticky top-0 z-20">
			<header className="flex w-full flex-col gap-3 bg-white/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:h-16 md:flex-row md:items-center lg:px-4">
				<div className="flex w-full items-center gap-8">
					<div className="flex items-center gap-2">
						<Link
							className="rounded focus:outline-0 focus:ring-0 focus-visible:bg-zinc-200"
							href="/"
						>
							<span className="sr-only">Home</span>
							<Logo />
						</Link>
					</div>
					<div className="ml-auto flex items-center gap-2 sm:gap-4">
						<CreatePollButton />
						<Menu />
					</div>
				</div>
			</header>
		</div>
	);
}

async function CreatePollButton() {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (!user || error) {
		return null;
	}

	return (
		<Link
			className={cn(buttonVariants({ size: "sm" }), "text-xs h-8")}
			href="/create"
		>
			<span className="hidden sm:inline">Create Poll</span>
			<span className="sm:hidden">Create</span>
		</Link>
	);
}

async function Menu() {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	const { data: profileData } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user != null ? user.id : "")
		.single();

	const username = profileData?.username ?? "default";

	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger
					className={cn(
						user != null &&
							"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 size shrink-0 rounded-full border",
						user == null &&
							"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 h-8 w-8 shrink-0 rounded-full border border-gray-200",
					)}
				>
					{user != null && !error ? (
						<Image
							alt="soyricardodev"
							className="shrink-0 select-none rounded-full"
							src={`https://vercel.com/api/www/avatar/${username}?s=64`}
							width={32}
							height={32}
						/>
					) : (
						<MenuIcon className="text-gray-500 size-4" />
					)}
					<span className="sr-only">Toggle Menu</span>
				</MenubarTrigger>
				<MenubarContent className="min-w-[16rem]  bg-white rounded-xl max-h-[80vh] w-[360px] origin-top-right overflow-y-auto md:max-h-[calc(100vh-64px)]">
					{user != null && !error ? (
						<>
							<div className="p-4">
								<Link
									className="mr-2 grid truncate text-sm"
									href={`/${username}`}
								>
									<span className="font-medium" id="user-name"></span>
									<span className="text-zinc-500">{user.email}</span>
								</Link>
							</div>
							<MenubarSeparator />
							<div className="p-2" role="group">
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/explore">
										<LayoutDashboardIcon className="text-zinc-800 size-4" />
										<span>Explore</span>
									</Link>
								</MenubarItem>
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href={`/${username}`}>
										<PersonIcon className="text-zinc-800 size-4" />
										<span>Profile</span>
									</Link>
								</MenubarItem>
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/faq">
										<QuestionMarkCircledIcon className="text-zinc-800 size-4" />
										<span>FAQs</span>
									</Link>
								</MenubarItem>
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/subscription">
										<CreditCardIcon className="text-zinc-800 size-4" />
										<span>Subscription & Billing</span>
									</Link>
								</MenubarItem>
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/pricing">
										<CircleDollarSignIcon className="text-zinc-800 size-4" />
										<span>Pricing</span>
									</Link>
								</MenubarItem>
							</div>
							<MenubarSeparator />
							<div className="p-2" role="group">
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/">
										<ExitIcon className="text-zinc-800 size-4" />
										<span>Logout</span>
									</Link>
								</MenubarItem>
							</div>
						</>
					) : (
						<>
							<div className="p-2">
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/">
										<PersonIcon className="text-zinc-800 size-4" />
										<span>Login</span>
									</Link>
								</MenubarItem>
							</div>
							<MenubarSeparator />
							<div className="p-2" role="group">
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/explore">
										<LayoutDashboardIcon className="text-zinc-800 size-4" />
										<span>Explore</span>
									</Link>
								</MenubarItem>
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/services">
										<CommandIcon className="text-zinc-800 size-4" />
										<span>Services</span>
									</Link>
								</MenubarItem>
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/faq">
										<QuestionMarkCircledIcon className="text-zinc-800 size-4" />
										<span>FAQs</span>
									</Link>
								</MenubarItem>
								<MenubarItem asChild className="rounded-md py-2.5 gap-2.5">
									<Link href="/pricing">
										<CircleDollarSignIcon className="text-zinc-800 size-4" />
										<span>Pricing</span>
									</Link>
								</MenubarItem>
							</div>
						</>
					)}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
