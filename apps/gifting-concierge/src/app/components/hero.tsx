"use client";

import { cn } from "@theliaison/ui";
import { buttonVariants } from "@theliaison/ui/button";
import { BorderBeam } from "@theliaison/ui/magicui/border-beam";
import { Particles } from "@theliaison/ui/magicui/particles";
import { motion, useInView } from "framer-motion";
import { GiftIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

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
			className="relative h-full mx-auto z-10 mt-32 max-w-[80rem] px-6 text-center md:px-8"
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
				Gift Effortlessly, Surprise Instantly.{" "}
				<strong>No Address Needed.</strong>
			</motion.p>

			<motion.div
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				className="flex flex-row items-center justify-center gap-4 mx-auto w-full"
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.3,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				<Link
					href="/send"
					className={cn(
						buttonVariants({ size: "lg" }),
						"flex gap-2 items-center text-base",
					)}
				>
					Send Gift
					<GiftIcon className="size-5 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
				</Link>

				<Link
					href="/giftshop"
					className={cn(
						buttonVariants({ variant: "secondary", size: "lg" }),
						"flex gap-2 items-center text-base",
					)}
				>
					Shop Now
					<StoreIcon className="size-5 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
				</Link>
			</motion.div>

			<motion.div
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.4,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
				className="relative mt-[8rem] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
			>
				<div className="rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,#ffbd7a,#ffbd7a,transparent_40%)] before:animate-image-glow">
					<BorderBeam />
					<img
						className="block relative w-full h-full  rounded-[inherit] border object-contain"
						src="/dashboard-light.png"
						alt="dashboard"
					/>
				</div>
			</motion.div>
		</section>
	);
}
