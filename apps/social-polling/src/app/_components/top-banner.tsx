"use client";

import { Icon } from "@iconify/react";
import { Button, Link } from "@nextui-org/react";
import React from "react";

import { cn } from "@theliaison/ui";

export default function TopBanner({
	text,
	href,
	linkText = "Explore",
	hideCloseButton = false,
}: {
	text: string;
	href: string;
	linkText?: string;
	hideCloseButton?: boolean;
}) {
	return (
		<div className="border-b-1 border-divider from-default-100 via-danger-100 to-secondary-100 flex w-full items-center gap-x-3 bg-gradient-to-r px-6 py-2 sm:px-3.5 sm:before:flex-1">
			<p className="text-small text-foreground">
				<Link className="text-inherit" href={href}>
					{text}&nbsp;
				</Link>
			</p>
			<Button
				as={Link}
				className="text-small group relative h-9 overflow-hidden bg-transparent font-normal"
				color="default"
				endContent={
					<Icon
						className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
						icon="solar:arrow-right-linear"
						width={16}
					/>
				}
				href={href}
				style={{
					border: "solid 2px transparent",
					backgroundImage:
						"linear-gradient(hsl(var(--nextui-danger-50)), hsl(var(--nextui-danger-50))), linear-gradient(to right, #F871A0, #9353D3)",
					backgroundOrigin: "border-box",
					backgroundClip: "padding-box, border-box",
				}}
				variant="bordered"
			>
				{linkText}
			</Button>
			<div className="flex flex-1 justify-end">
				<Button
					isIconOnly
					aria-label="Close Banner"
					className={cn("-m-1", hideCloseButton && "hidden")}
					size="sm"
					variant="light"
				>
					<Icon
						aria-hidden="true"
						className="text-default-500"
						icon="lucide:x"
						width={20}
					/>
				</Button>
			</div>
		</div>
	);
}
