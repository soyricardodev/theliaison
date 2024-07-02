"use client";

import type { IconProps } from "@iconify/react";

import { Icon } from "@iconify/react";
import { Link, Spacer } from "@nextui-org/react";
import React from "react";

import { WordRotate } from "@theliaison/ui/magicui/word-rotate";

type SocialIconProps = Omit<IconProps, "icon">;

const navLinks = [
	{
		name: "Home",
		href: "#",
	},
	{
		name: "About",
		href: "#",
	},
	{
		name: "Services",
		href: "#",
	},
	{
		name: "Social Polling",
		href: "#",
	},
	{
		name: "Contact",
		href: "#",
	},
	{
		name: "Blog",
		href: "#",
	},
	{
		name: "Gifting Concierge",
		href: "#",
	},
];

const socialItems = [
	{
		name: "Instagram",
		href: "#",
		icon: (props: SocialIconProps) => (
			<Icon {...props} icon="fontisto:instagram" />
		),
	},
	{
		name: "Twitter",
		href: "#",
		icon: (props: SocialIconProps) => (
			<Icon {...props} icon="fontisto:twitter" />
		),
	},
	{
		name: "YouTube",
		href: "#",
		icon: (props: SocialIconProps) => (
			<Icon {...props} icon="fontisto:youtube" />
		),
	},
];

export function Footer() {
	return (
		<footer className="flex w-full flex-col">
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
				<div className="flex items-center justify-center">
					<span className="text-medium font-medium">
						<strong>TL</strong> Gifting Concierge
					</span>
				</div>
				<div>
					<WordRotate
						words={[
							'"A gift consist not in what is done or given, but in the intention of the giver or doer." - Seneca',
							'"The manner of giving is worth more than the gift." - Pierre Corneille',
							'"Every gift which is given, even though it be small, is in reality great, if it is given with affection." - Pindar',
							'"We make a living by what we get, but we make a life by what we give." - Winston Churchill',
							'"No one has ever overcome poor by giving." - Anne Frank',
							'"It is not how much we give, but how much love we put into giving." - Mother Teresa',
							'"For it is in giving that we receive." - Francis of Assisi',
							'"Gratitude is not only the greatest of virtues, but the parent of all others." - Cicero',
							'"When we give cheerfully and accept gratefully, everyone is blessed." - Maya Angelou',
							'"The meaning of life is to find your gift. The purpose of life is to give it away." - Pablo Picasso',
						]}
						duration={5000}
					/>
				</div>
				<Spacer y={4} />
				<div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
					{navLinks.map((item) => (
						<Link
							key={item.name}
							isExternal
							className="text-default-500"
							href={item.href}
							size="sm"
						>
							{item.name}
						</Link>
					))}
				</div>
				<Spacer y={6} />
				<div className="flex justify-center gap-x-4">
					{socialItems.map((item) => (
						<Link
							key={item.name}
							isExternal
							className="text-default-400"
							href={item.href}
						>
							<span className="sr-only">{item.name}</span>
							<item.icon aria-hidden="true" className="w-5" />
						</Link>
					))}
				</div>
				<Spacer y={4} />
				<p className="mt-1 text-center text-small text-default-400">
					&copy; {new Date().getFullYear()} The Liaison. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
