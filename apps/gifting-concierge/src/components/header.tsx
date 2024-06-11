"use client";

import {
	Avatar,
	Badge,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@nextui-org/react";
import { BellIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";
import React from "react";
import { useCartStore } from "~/store/cart";
import { NotificationsCard } from "./notifications/notifications-header-card";

export function Header() {
	const { shoppingCart, setIsOpen, isOpen } = useCartStore();

	const handleToggleCart = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Navbar
			isBordered
			classNames={{
				item: "data-[active=true]:text-primary",
				wrapper: "px-4 sm:px-6",
			}}
			height="64px"
		>
			<NavbarBrand>
				<NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
				{/* <AcmeIcon /> */}
				<p>TL</p>
				<p className="font-bold text-inherit hidden sm:block">
					Gifting Concierge
				</p>
			</NavbarBrand>

			{/* Right Menu */}
			<NavbarContent
				className="ml-auto h-12 max-w-fit items-center gap-0"
				justify="end"
			>
				<NavbarItem className="mr-2 hidden lg:flex">
					<Input
						aria-label="Search"
						classNames={{
							inputWrapper: "bg-content2 dark:bg-content1",
						}}
						labelPlacement="outside"
						placeholder="Search..."
						radius="full"
						startContent={<SearchIcon className="text-default-500 size-5" />}
					/>
				</NavbarItem>
				{/* Mobile search */}
				<NavbarItem className="lg:hidden">
					<Button isIconOnly radius="full" variant="light">
						<SearchIcon className="text-default-500 size-5" />
					</Button>
				</NavbarItem>
				{/* Shopping Cart */}
				<NavbarItem>
					<Button
						isIconOnly
						radius="full"
						variant="light"
						className="overflow-visible"
						onClick={handleToggleCart}
					>
						<Badge
							color="success"
							content={shoppingCart.length}
							showOutline={false}
							size="md"
						>
							<ShoppingCartIcon className="text-default-500 size-6" />
						</Badge>
					</Button>
				</NavbarItem>
				{/* Notifications */}
				<NavbarItem className="flex">
					<Popover offset={12} placement="bottom-end">
						<PopoverTrigger>
							<Button
								disableRipple
								isIconOnly
								className="overflow-visible"
								radius="full"
								variant="light"
							>
								<Badge color="danger" content="5" showOutline={false} size="md">
									<BellIcon className="text-default-500 size-6" />
								</Badge>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
							<NotificationsCard className="w-full shadow-none" />
						</PopoverContent>
					</Popover>
				</NavbarItem>
				{/* User Menu */}
				<NavbarItem className="px-2">
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<button className="mt-1 h-8 w-8 transition-transform">
								<Badge
									color="success"
									content=""
									placement="bottom-right"
									shape="circle"
								>
									<Avatar
										size="sm"
										src="https://i.pravatar.cc/150?u=a04258114e29526708c"
									/>
								</Badge>
							</button>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2">
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">johndoe@example.com</p>
							</DropdownItem>
							<DropdownItem key="settings">My Settings</DropdownItem>
							<DropdownItem key="team_settings">Team Settings</DropdownItem>
							<DropdownItem key="analytics">Analytics</DropdownItem>
							<DropdownItem key="system">System</DropdownItem>
							<DropdownItem key="configurations">Configurations</DropdownItem>
							<DropdownItem key="help_and_feedback">
								Help & Feedback
							</DropdownItem>
							<DropdownItem key="logout" color="danger">
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
			</NavbarContent>

			{/* Mobile Menu */}
			<NavbarMenu>
				<NavbarMenuItem>
					<Link className="w-full" color="foreground" href="#">
						Dashboard
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem isActive>
					<Link aria-current="page" className="w-full" color="primary" href="#">
						Deployments
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link className="w-full" color="foreground" href="#">
						Analytics
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link className="w-full" color="foreground" href="#">
						Team
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link className="w-full" color="foreground" href="#">
						Settings
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}
