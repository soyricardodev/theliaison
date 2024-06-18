"use client";

import { cn } from "@theliaison/ui";
import { BorderBeam } from "@theliaison/ui/magicui/border-beam";
import { Particles } from "@theliaison/ui/magicui/particles";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
				className="absolute inset-0"
				quantity={200}
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
				We are the new way
				<br className="hidden lg:block" /> to send gifts.
			</motion.h1>
			<motion.p
				className="text-balance text-lg tracking-tight text-gray-600 md:text-xl mb-12"
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
				The <strong className="font-semibold">BEST</strong> Way to send a gift
				without the address hassle.
			</motion.p>

			<motion.div
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				className="flex flex-col gap-4 lg:flex-row"
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.3,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				<a
					href="/giftshop"
					className={cn(
						// colors
						"bg-black  text-white shadow hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 max-w-fit mx-auto",

						// layout
						"group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-4 py-2 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",

						// animation
						"transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
					)}
				>
					Get Started
					<ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
				</a>
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
