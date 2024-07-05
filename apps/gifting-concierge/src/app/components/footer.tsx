"use client";

import type { IconProps } from "@iconify/react";
import Link from "next/link";

import React from "react";

import { cn } from "@theliaison/ui";

type SocialIconProps = Omit<IconProps, "icon">;

const footerNavigation: Array<{
	name: string;
	links: Array<{
		name: string;
		href: string;
	}>;
}> = [
	{
		name: "Services",
		links: [
			{
				name: "Social Polling",
				href: "https://theliaison.vercel.app",
			},
			{
				name: "Gifting Concierge",
				href: "https://giftingconcierge.theliaison.vercel.app",
			},
			{
				name: "Personal Branding",
				href: "https://theliaison.vercel.app/services",
			},
		],
	},
	{
		name: "Helpful Links",
		links: [
			{
				name: "FAQs",
				href: "/faq",
			},
			{
				name: "Blog",
				href: "https://theliaison.vercel.app/blog",
			},
		],
	},
];

const socialItems = [
	{
		name: "Instagram",
		href: "https://www.instagram.com/asktheliaison/",
		icon: (props: SocialIconProps) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="44"
				height="44"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<title>Instagram</title>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
				<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
				<path d="M16.5 7.5l0 .01" />
			</svg>
		),
	},
	{
		name: "X",
		href: "https://x.com/asktheliaison",
		icon: (props: SocialIconProps) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="44"
				height="44"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<title>X</title>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 4l11.733 16h4.267l-11.733 -16z" />
				<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
			</svg>
		),
	},
	{
		name: "Tiktok",
		href: "https://www.tiktok.com/@asktheliaison",
		icon: (props: SocialIconProps) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="44"
				height="44"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<title>Tiktok</title>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
			</svg>
		),
	},
	{
		name: "YouTube",
		href: "https://www.youtube.com/channel/asktheliaison",
		icon: (props: SocialIconProps) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="44"
				height="44"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<title>YouTube</title>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
				<path d="M10 9l5 3l-5 3z" />
			</svg>
		),
	},
];

export function Footer({ isDark }: { isDark?: boolean }) {
	return (
		<footer
			className={cn("bg-white dark:bg-transparent", {
				dark: isDark,
			})}
		>
			<div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div>
						<div className="flex gap-2 justify-center text-primary dark:text-white sm:justify-start">
							<span>TL</span> <strong>Gifting Concierge</strong>
						</div>

						<ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
							{socialItems.map(({ icon: Icon, name, href }) => (
								<li key={name}>
									<Link
										href={href}
										rel="noreferrer"
										target="_blank"
										className="text-black hover:text-black/75 dark:text-white dark:hover:text-white/75"
									>
										<span className="sr-only">{name}</span>
										<Icon className="size-6 stroke-current" />
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
						{footerNavigation.map(({ name, links }) => (
							<div className="text-center sm:text-left" key={name}>
								<p className="text-lg font-medium text-gray-900 dark:text-white">
									{name}
								</p>

								<ul className="mt-8 space-y-4 text-sm">
									{links.map(({ name, href }) => (
										<li key={name}>
											<Link
												className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
												href={href}
											>
												{name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}

						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-gray-900 dark:text-white">
								Contact Us
							</p>

							<ul className="mt-8 space-y-4 text-sm">
								<li>
									<a
										className="flex items-center justify-center gap-1.5 sm:justify-start"
										href="mailto:support@theliaison.com"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="size-5 shrink-0 text-gray-900 dark:text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<title>Email</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>

										<span className="flex-1 text-gray-700 dark:text-white">
											support@theliaison.com
										</span>
									</a>
								</li>

								<li className="flex items-start justify-center gap-1.5 sm:justify-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="size-5 shrink-0 text-gray-900 dark:text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<title>Location</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>

									<p className="-mt-0.5 not-italic text-gray-700 dark:text-white w-full">
										Southern California{" "}
										<span className="dark:hidden inline">🖤</span>
										<span className="hidden dark:inline">🤍</span>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-6">
					<div className="text-center sm:flex gap-4 sm:text-left">
						<p className="text-sm text-gray-500 dark:text-white flex gap-1">
							<span className="block sm:inline">All rights reserved.</span>

							<Link
								className="inline-block text-primary underline transition hover:text-primary/75 dark:hover:text-secondary/75 dark:text-secondary"
								href="/terms-of-service"
							>
								Terms & Conditions
							</Link>

							<span>&middot;</span>

							<Link
								className="inline-block text-primary underline transition hover:text-primary/75 dark:hover:text-secondary/75 dark:text-secondary"
								href="/privacy-policy"
							>
								Privacy Policy
							</Link>
						</p>

						<p className="mt-4 text-sm text-gray-500 dark:text-white sm:order-first sm:mt-0">
							&copy; {new Date().getFullYear()} The Liaison
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
