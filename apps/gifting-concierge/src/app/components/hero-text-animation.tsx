"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function HeroTextAnimation({ children }: { children: React.ReactNode }) {
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
		<>
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
				<strong>Secure and private gifting.</strong>{" "}
				<span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary/80">
					Made easy.
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
				Gift effortlessly, surprise instantly.
				<br />
				<strong>No address needed.</strong>
			</motion.p>

			<motion.div
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				className="grid grid-cols-1 gap-3 mx-auto w-full max-w-sm"
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.3,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				{children}
			</motion.div>
		</>
	);
}
