"use client";

import type { IconProps } from "@iconify/react";
import Link from "next/link";

import { cn } from "@theliaison/ui";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@theliaison/ui/accordion";

type SocialIconProps = Omit<IconProps, "icon">;

import type { SVGProps } from "react";
const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		preserveAspectRatio="xMidYMid"
		viewBox="0 0 256 256"
		{...props}
	>
		<title>Instagram</title>
		<path
			fill="#fff"
			d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
		/>
	</svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 1200 1227"
		{...props}
	>
		<title>X</title>
		<path
			fill="#fff"
			d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
		/>
	</svg>
);

const TikTokIcon = (_props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="currentColor"
		viewBox="0 0 16 16"
	>
		<title>TikTok</title>
		<path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
	</svg>
);

const YouTubeIcon = (
	props: SVGProps<SVGSVGElement> & { tickFill?: string },
) => (
	<svg
		viewBox="0 0 256 180"
		width="1em"
		height="1em"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid"
		{...props}
	>
		<title>YouTube</title>
		<path
			d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
			fill={props.fill}
		/>
		<path
			d="m102.421 128.06 66.328-38.418-66.328-38.418z"
			fill={props.tickFill}
		/>
	</svg>
);

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
		iconLegacy: (props: SocialIconProps) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="44"
				height="44"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="transparent"
				{...props}
			>
				<title>Instagram</title>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
				<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
				<path d="M16.5 7.5l0 .01" />
			</svg>
		),
		icon: <InstagramIcon className="size-5" />,
	},
	{
		name: "X",
		href: "https://x.com/asktheliaison",
		iconLegacy: (props: SocialIconProps) => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="44"
				height="44"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<title>X</title>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 4l11.733 16h4.267l-11.733 -16z" fill="none" />
				<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
			</svg>
		),
		icon: <XIcon className="size-5" />,
	},
	{
		name: "Tiktok",
		href: "https://www.tiktok.com/@asktheliaison",
		iconLegacy: (props: SocialIconProps) => (
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
		icon: <TikTokIcon className="size-5" />,
	},
	{
		name: "YouTube",
		href: "https://www.youtube.com/channel/asktheliaison",
		iconLegacy: (props: SocialIconProps) => (
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
		icon: <YouTubeIcon className="size-5" fill="white" tickFill="black" />,
	},
];

export function Footer({ isDark }: { isDark?: boolean }) {
	return (
		<footer
			className={cn("bg-transparent text-black", {
				dark: isDark,
			})}
		>
			<div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="flex flex-col gap-6">
						<div className="flex items-center gap-2 text-foreground dark:text-white sm:justify-start">
							<span className="font-bold sm:font-normal">TL</span>{" "}
							<span className="xs:block sm:hidden text-sm text-black dark:text-white">
								&copy; {new Date().getFullYear()}
							</span>{" "}
							<strong className="hidden sm:inline text-foreground dark:text-white">
								Gifting Concierge
							</strong>
						</div>

						<Accordion
							type="multiple"
							className={cn("block sm:hidden text-black dark:text-white", {
								dark: isDark,
							})}
						>
							{footerNavigation.map(({ name, links }) => (
								<AccordionItem
									key={name}
									value={`item-${name}`}
									className="text-sm border-black dark:border-white"
								>
									<AccordionTrigger className="hover:no-underline">
										{name}
									</AccordionTrigger>
									<AccordionContent>
										<ul className="space-y-2">
											{links.map(({ name, href }) => (
												<li key={name}>
													<Link
														href={href}
														rel="noreferrer"
														target="_blank"
														className="text-white hover:text-black/75 dark:text-gray-300 dark:hover:text-gray-400/75"
													>
														{name}
													</Link>
												</li>
											))}
										</ul>
									</AccordionContent>
								</AccordionItem>
							))}
							<AccordionItem
								value="item-contact"
								className="text-sm border-black dark:border-white"
							>
								<AccordionTrigger className="hover:no-underline">
									Contact
								</AccordionTrigger>
								<AccordionContent>
									<ul className="space-y-4 text-sm">
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

												<span className="flex-1 text-black dark:text-gray-300">
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

											<p className="-mt-0.5 not-italic text-black dark:text-gray-300 w-full">
												Southern California{" "}
												<span className="dark:hidden inline">🖤</span>
												<span className="hidden dark:inline">🤍</span>
											</p>
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						<ul className="hidden sm:flex mt-8 justify-center gap-4 sm:justify-start">
							{socialItems.map(({ iconLegacy: Icon, name, href }) => (
								<li key={name}>
									<Link
										href={href}
										rel="noreferrer"
										target="_blank"
										className="text-black hover:text-black/75 dark:text-white dark:hover:text-white/75"
									>
										<span className="sr-only">{name}</span>
										<Icon
											className="size-6 stroke-current fill-transparent text-foreground"
											width={24}
										/>
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="hidden sm:grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
						{footerNavigation.map(({ name, links }) => (
							<div className="text-center sm:text-left" key={name}>
								<p className="text-lg font-medium text-foreground dark:text-white">
									{name}
								</p>

								<ul className="mt-8 space-y-4 text-sm">
									{links.map(({ name, href }) => (
										<li key={name}>
											<Link
												className="text-foreground transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
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
							<p className="text-lg font-medium text-foreground dark:text-white">
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
											className="size-5 shrink-0 text-foreground dark:text-white"
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

										<span className="flex-1 text-foreground dark:text-white">
											support@theliaison.com
										</span>
									</a>
								</li>

								<li className="flex items-start justify-center gap-1.5 sm:justify-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="size-5 shrink-0 text-foreground dark:text-white"
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

									<p className="-mt-0.5 not-italic text-foreground dark:text-white w-full">
										Southern California{" "}
										<span className="dark:hidden inline">🖤</span>
										<span className="hidden dark:inline">🤍</span>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-4 sm:mt-12 sm:border-t border-foreground dark:border-gray-800 sm:pt-6">
					<div className="hidden text-center sm:flex gap-4 sm:text-left">
						<p className="text-sm text-foreground dark:text-white flex gap-1">
							<span className="block sm:inline">All rights reserved.</span>

							<Link
								className="inline-block text-foreground underline transition hover:text-primary/75 dark:hover:text-secondary/75 dark:text-secondary"
								href="/terms-of-service"
							>
								Terms & Conditions
							</Link>

							<span>&middot;</span>

							<Link
								className="inline-block text-foreground underline transition hover:text-primary/75 dark:hover:text-secondary/75 dark:text-secondary"
								href="/privacy-policy"
							>
								Privacy Policy
							</Link>
						</p>

						<p className="hidden sm:block mt-4 text-sm text-foreground dark:text-white sm:order-first sm:mt-0">
							&copy; {new Date().getFullYear()} The Liaison
						</p>
					</div>

					<div
						className={cn("dark:text-white flex gap-4 sm:hidden", {
							dark: isDark,
						})}
					>
						{socialItems.map(({ iconLegacy: Icon, name, href }) => (
							<a
								key={name}
								href={href}
								rel="noreferrer"
								target="_blank"
								className="text-foreground hover:text-black/75 dark:text-white dark:hover:text-white/75"
							>
								<Icon className="size-6 stroke-current" />
								<span className="sr-only">{name}</span>
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
