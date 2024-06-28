import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";
import { FloatingAICta } from "./ai/floating-ai-cta";
import { ShoppingCartCta } from "./header/shopping-cart-cta";
import { UserMenu } from "./header/user-menu";

export function Header() {
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
				<p>TL</p>{" "}
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
					<FloatingAICta />
				</NavbarItem>
				{/* Shopping Cart */}
				<NavbarItem>
					<ShoppingCartCta />
				</NavbarItem>
				{/* Mobile search */}
				<NavbarItem className="lg:hidden flex items-center">
					<Button isIconOnly radius="full" variant="light">
						<FloatingAICta />
					</Button>
				</NavbarItem>
				{/* User Menu */}
				<NavbarItem className="px-2">
					<UserMenu />
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
