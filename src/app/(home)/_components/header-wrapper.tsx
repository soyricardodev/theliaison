"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logoBlack } from "~/assets/images";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { UserButtonNavbarMobile } from "./user-button-navbar-mobile";
import { UserButtonNavbar } from "./user-button-navbar";

const SCROLL_BOUNDARY = 100;

export function HeaderWrapper({
	children,
}: React.HTMLAttributes<HTMLDivElement>) {
	const [scrollY, setScrollY] = useState(0);
	const headerParentRef = useRef<HTMLDivElement>(null);

	const getBreakpoint = (width: number) => {
		if (width < 640) return "xs";
		if (width < 768) return "sm";
		if (width < 1024) return "md";
		if (width < 1280) return "lg";
		if (width < 1536) return "xl";
		return "2xl";
	};

	const [breakpoint, setBreakpoint] = useState("2xl");

	useEffect(() => {
		const handleResize = () => {
			setBreakpoint(getBreakpoint(window.innerWidth));
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const active =
		scrollY >= SCROLL_BOUNDARY ||
		breakpoint === "xs" ||
		breakpoint === "sm" ||
		breakpoint === "md";

	useEffect(() => {
		const handleScroll = () => {
			if (headerParentRef.current) {
				setScrollY(headerParentRef.current.scrollTop);
			}
		};

		const parentElement = headerParentRef.current;
		parentElement?.addEventListener("scroll", handleScroll);

		return () => {
			parentElement?.removeEventListener("scroll", handleScroll);
		};
	}, [headerParentRef.current]);

	return (
		<div ref={headerParentRef}>
			<div className="h-[100vh]">
				<header className="mx-auto flex max-w-[84rem] items-center justify-between bg-transparent px-10 py-7 w-full">
					<div
						className={cn(
							"hidden flex-row items-center justify-center gap-2 lg:flex transition-all",
							active && "!hidden",
						)}
					>
						<Link href="#" className="flex h-8 w-8">
							<Image
								src={logoBlack}
								className="h-full w-full"
								width={60}
								height={60}
								alt="The Liaison Logo"
							/>
						</Link>
						<Link href="/" className="font-heading font-black text-2xl">
							The Liaison
						</Link>
					</div>
					<div className="absolute xl:w-fit mx-auto inset-x-0 top-6 z-50 flex items-center justify-center">
						<motion.div
							initial={{ x: 0 }}
							animate={{
								boxShadow: active
									? "0 0 0 1px rgba(17,24,28,.08), 0 1px 2px -1px rgba(17,24,28,.08), 0 2px 4px rgba(17,24,28,.04)"
									: "none",
							}}
							transition={{
								ease: "linear",
								duration: 0.05,
								delay: 0.05,
							}}
							className={cn(
								"supports-backdrop-blur:bg-white/90 mx-4 flex w-full items-center justify-center overflow-hidden rounded-full bg-white bg-white/40 px-3 py-2.5 backdrop-blur-md transition-all lg:w-auto lg:p-1.5 lg:py-2",
							)}
						>
							<ul className="flex h-full w-full flex-row justify-between gap-6 lg:flex-row lg:justify-start lg:gap-1">
								<li className="flex items-center justify-center px-2 py-0.5">
									<Link href="#" className="flex h-8 w-8 lg:hidden">
										<Image
											src={logoBlack}
											className="h-full w-full"
											width={40}
											height={40}
											alt="logo"
										/>
									</Link>
									<Link href="#" className="hidden lg:flex">
										Home
									</Link>
								</li>
								<li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
									<Link href="/#features">Features</Link>
								</li>
								<li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
									<Link href="/social-polling">Social Polling</Link>
								</li>
								<li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
									<Link href="/pricing">Pricing</Link>
								</li>
								<li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
									<Link href="#">Contact</Link>
								</li>
								<AnimatePresence>
									<motion.div
										initial={{ width: 0 }}
										animate={{
											width: active ? "auto" : 0,
										}}
										transition={{
											ease: "easeOut",
											duration: 0.25,
											delay: 0.05,
										}}
									>
										<AnimatePresence>
											{active && <UserButtonNavbarMobile />}
										</AnimatePresence>
									</motion.div>
								</AnimatePresence>
							</ul>
						</motion.div>
					</div>

					<UserButtonNavbar />
				</header>
				{children}
			</div>
		</div>
	);
	[];
}
