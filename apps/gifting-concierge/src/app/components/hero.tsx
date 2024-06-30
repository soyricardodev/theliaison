"use client";

import { cn } from "@theliaison/ui";
import { Button, buttonVariants } from "@theliaison/ui/button";
import { Particles } from "@theliaison/ui/magicui/particles";
import { motion, useInView } from "framer-motion";
import { GiftIcon, StoreIcon, CircleHelpIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@theliaison/ui/drawer";

export function Hero() {
	const fadeInRef = useRef(null);
	const fadeInInView = useInView(fadeInRef, {
		once: true,
	});

	const fadeUpVariants = {
		initial: {
			opacity: 0,
			y: 24,
		},
		animate: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<section
			id="hero"
			className="relative h-full mx-auto z-10 mt-28 max-w-[80rem] px-6 text-center md:px-8"
		>
			<Particles
				className="absolute inset-0 -z-10"
				quantity={100}
				ease={80}
				color={"#000000"}
				refresh
			/>
			<motion.h1
				ref={fadeInRef}
				className="text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.1,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				<strong>Secure and Private Gifting.</strong>{" "}
				<span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary/80">
					Made Easy.
				</span>
			</motion.h1>
			<motion.p
				className="text-balance text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-black via-gray-700 to-gray-400 md:text-xl mb-12"
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.2,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				Gift Effortlessly, Surprise Instantly.
				<br />
				<strong>No Address Needed.</strong>
			</motion.p>

			<motion.div
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				className="grid grid-cols-1 gap-2 mx-auto w-full max-w-sm"
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.3,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				<Drawer>
					<DrawerTrigger asChild>
						<Button size="lg" className="flex gap-2 items-center text-base">
							Choose Gift
							<GiftIcon className="size-5 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
						</Button>
					</DrawerTrigger>
					<DrawerContent className="max-w-[361px] mx-auto rounded-[36px] bg-[#FEFFFE]">
						<div className="px-6 pb-6 pt-2 5">
							<DrawerClose asChild>
								<button
									className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
									type="button"
									style={{ top: 28, right: 28 }}
								>
									<svg
										width="12"
										height="12"
										viewBox="0 0 12 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="vaul-scrollable"
									>
										<title>Close</title>
										<path
											d="M10.4854 1.99998L2.00007 10.4853"
											stroke="#999999"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M10.4854 10.4844L2.00007 1.99908"
											stroke="#999999"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</DrawerClose>
							<header className="mb-4 -mt-6 flex h-[72px] items-center border-b border-[#F7F7F7] pl-2">
								<h2 className="text-[19px] font-semibold text-[#222222] md:font-medium">
									Options
								</h2>
							</header>

							<div className="space-y-3">
								<a
									href="/giftshop"
									className="textLeft flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
								>
									<StoreIcon />
									Our Gifts Shop
								</a>
								<button
									type="button"
									className="textLeft flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
								>
									<GiftIcon />
									Send a custom gift
								</button>
								<button
									type="button"
									className="textLeft flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
								>
									<LinkIcon />
									Send a gift from a link
								</button>
							</div>
						</div>
					</DrawerContent>
				</Drawer>

				<Link
					href="/how-it-works"
					className={cn(
						buttonVariants({ variant: "ghost", size: "lg" }),
						"text-base",
					)}
				>
					How it Works
				</Link>
			</motion.div>
		</section>
	);
}
