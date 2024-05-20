"use client";

import { cubicBezier, motion } from "framer-motion";

function ProcessWork1() {
	const variant1 = {
		initial: {
			x: 35,
			y: 5,
			scale: 0.8,
			rotate: -3,
			zIndex: 1,
			transition: {
				delay: 0.05,
				duration: 0.1,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
		whileHover: {
			x: 0,
			y: 0,
			scale: 1,
			rotate: 0,
			boxShadow:
				"rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
			transition: {
				delay: 0.05,
				duration: 0.1,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
	};
	const variant2 = {
		initial: {
			scale: 1.1,
			zIndex: 2,
			transition: {
				delay: 0.05,
				duration: 0.1,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
		whileHover: {
			scale: 1,
			boxShadow:
				"rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
			transition: {
				delay: 0.05,
				duration: 0.1,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
	};
	const variant3 = {
		initial: {
			x: -35,
			y: 5,
			scale: 0.8,
			rotate: 3,
			zIndex: 1,
			transition: {
				delay: 0.05,
				duration: 0.1,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
		whileHover: {
			x: 0,
			y: 0,
			scale: 1,
			rotate: 0,
			boxShadow:
				"rgba(245,40,145,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
			transition: {
				delay: 0.05,
				duration: 0.1,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
	};

	const containerVariants = {
		initial: {},
		whileHover: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<div className="relative h-full w-full max-w-[32rem] transform-gpu rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] md:max-h-[500px]">
			<motion.div
				variants={containerVariants}
				initial="initial"
				whileHover="whileHover"
				className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
			>
				<div className="flex h-full w-full items-center justify-center rounded-t-xl bg-transparent p-10">
					<motion.div className="flex h-[230px] w-full items-center justify-between gap-x-4">
						<motion.div
							variants={variant1}
							className="z-[3] flex h-fit w-full  flex-col items-center justify-between gap-x-2 gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:border-neutral-800 dark:bg-neutral-900"
						>
							<div className="h-8 w-8 rounded-full bg-pink-300">
								<img
									className="h-full w-full rounded-full object-cover"
									src="https://avatar.vercel.sh/jack"
									alt="jack"
								/>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div className="h-2 w-10 rounded-full bg-neutral-700/50" />
								<div className="h-2 w-10 rounded-full bg-neutral-400/80" />
								<div className="h-2 w-10 rounded-full bg-neutral-300/80" />
								<div className="h-2 w-10 rounded-full bg-neutral-600/80" />
							</div>
						</motion.div>
						<motion.div
							variants={variant2}
							className="z-[3] flex h-fit w-full flex-col items-center justify-between gap-x-2 gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:border-neutral-800 dark:bg-neutral-900"
						>
							<div className="h-8 w-8 rounded-full bg-pink-300">
								<img
									className="h-full w-full rounded-full object-cover"
									src="https://avatar.vercel.sh/christina"
									alt="christina"
								/>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div className="h-2 w-10 rounded-full bg-neutral-700/50" />
								<div className="h-2 w-10 rounded-full bg-neutral-400/80" />
								<div className="h-2 w-10 rounded-full bg-neutral-300/80" />
								<div className="h-2 w-10 rounded-full bg-neutral-600/80" />
							</div>
						</motion.div>
						<motion.div
							variants={variant3}
							className="z-[3] flex h-fit w-full flex-col items-center justify-between gap-x-2 gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:border-neutral-800 dark:bg-neutral-900"
						>
							<div className="h-8 w-8 rounded-full bg-pink-300">
								<img
									className="h-full w-full rounded-full object-cover"
									src="https://avatar.vercel.sh/joshua"
									alt="joshua"
								/>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div className="h-2 w-10 rounded-full bg-neutral-700/50" />
								<div className="h-2 w-10 rounded-full bg-neutral-400/80" />
								<div className="h-2 w-10 rounded-full bg-neutral-300/80" />
								<div className="h-2 w-10 rounded-full bg-neutral-600/80" />
							</div>
						</motion.div>
					</motion.div>
				</div>

				<div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
					<h2 className="text-xl font-semibold">Step 1: Start your journey</h2>
					<p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
						Select your package and sign up.
					</p>
				</div>
			</motion.div>
		</div>
	);
}

function ProcessWork2() {
	const variant1 = {
		initial: {
			viewBox: "0 -950 366 1408",
			filter: "saturate(0.3)",
			opacity: 0.5,
			transition: {
				delay: 0.05,
				duration: 0.3,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
		whileHover: {
			viewBox: "0 -60 366 310",
			filter: "saturate(1)",
			opacity: 1,
			transition: {
				delay: 0.05,
				duration: 0.3,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
	};
	const variant2 = {
		initial: {
			y: 0,
			transition: {
				delay: 0.05,
				duration: 0.3,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
		whileHover: {
			y: 0,
			transition: {
				delay: 0.05,
				duration: 0.3,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
	};

	const containerVariants = {
		initial: {},
		whileHover: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<div className="relative h-full w-full max-w-[32rem] transform-gpu rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] md:max-h-[500px]">
			<motion.div
				variants={containerVariants}
				initial="initial"
				whileHover="whileHover"
				className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
			>
				<div className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-t-xl bg-transparent p-10">
					<div className="relative h-[150px] w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200/50 bg-white dark:border-neutral-700/50 dark:bg-neutral-900">
						<motion.p
							variants={variant2}
							className="absolute left-5 top-5 w-fit text-[15px]"
						>
							+245%
						</motion.p>
						<motion.svg
							aria-hidden="true"
							variants={variant1}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							preserveAspectRatio="none"
							className="absolute inset-0 h-full w-full"
							viewBox="0 -950 366 1408"
						>
							<path
								fill="url(#a)"
								d="M0 193c109.5 0 260.5-52.5 366-192.5v907H0V193Z"
							/>
							<defs>
								<linearGradient
									id="a"
									x1={183}
									x2={183}
									y1={0.5}
									y2={262}
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#22c55e" />
									<stop offset={1} stopColor="#15803d" />
								</linearGradient>
							</defs>
						</motion.svg>
					</div>
				</div>
				<div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
					<h2 className="text-xl font-semibold">Step 2: Onboarding</h2>
					<p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
						Depending on which package you choose, you'll go through an easy
						onboarding process that will help me get to know you.
					</p>
				</div>
			</motion.div>
		</div>
	);
}

function ProcessWork3() {
	const variant1 = {
		initial: {
			y: 0,
			scale: 0.97,
			transition: {
				delay: 0,
				duration: 0.2,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
		whileHover: {
			y: -45,
			scale: 1,
			boxShadow:
				"rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
			transition: {
				delay: 0,
				duration: 0.2,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
	};
	const variant2 = {
		initial: {
			y: 30,
			opacity: 0,
			scale: 0.97,
			transition: {
				delay: 0,
				duration: 0.2,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
		whileHover: {
			y: 10,
			opacity: 1,
			scale: 1,
			boxShadow:
				"rgba(245,40,145,0.05) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
			transition: {
				delay: 0,
				duration: 0.2,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
	};
	const variant3 = {
		initial: {
			x: 30,
			y: 20,
			opacity: 0,
			transition: {
				delay: 0,
				duration: 0.2,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
		whileHover: {
			x: 5,
			y: 5,
			opacity: 1,
			boxShadow:
				"rgba(39,245,76,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
			transition: {
				delay: 0.05,
				duration: 0.2,
				ease: cubicBezier(0.22, 1, 0.36, 1),
			},
		},
	};

	const containerVariants = {
		initial: {},
		whileHover: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<div className="relative h-full w-full max-w-[32rem] transform-gpu rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] md:max-h-[500px]">
			<motion.div
				variants={containerVariants}
				initial="initial"
				whileHover="whileHover"
				className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
			>
				<div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-1 overflow-hidden rounded-t-xl bg-transparent">
					<div className="relative flex flex-col items-center justify-center gap-y-2 px-10 py-20">
						<motion.div
							variants={variant1}
							className=" relative flex items-start gap-x-2 rounded-lg border border-neutral-400/20 bg-white p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-800 dark:bg-neutral-900"
						>
							<div className="h-6 w-6 rounded-full bg-blue-500">
								<img
									className="h-full w-full rounded-full object-cover"
									src="https://avatar.vercel.sh/joshua"
									alt="joshua"
								/>
							</div>
							<div className="w-[calc(100%-3rem)]">
								<h3 className="text-base font-semibold">Steve</h3>
								<p className="text-sm text-neutral-500 dark:text-neutral-400">
									What should I do next?
								</p>
							</div>
						</motion.div>
						<motion.div
							variants={variant2}
							className=" absolute inset-10 -bottom-14 z-[3] m-auto flex h-fit items-start gap-x-2 rounded-lg border border-neutral-400/20 bg-white p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-800 dark:bg-neutral-900"
						>
							<div className="w-8 ">
								<div className="h-6 w-6 rounded-full bg-blue-500">
									<img
										className="h-full w-full rounded-full object-cover"
										src="https://avatar.vercel.sh/christina"
										alt="christina"
									/>
								</div>
							</div>
							<div className="w-[calc(100%-3rem)]">
								<h3 className="text-base font-semibold">Stephanie</h3>
								<p className="text-sm text-neutral-500 dark:text-neutral-400">
									You should be able to do it.
								</p>
							</div>
							<motion.p
								variants={variant3}
								className="highlighted absolute -bottom-2 right-2 w-fit rounded-full border bg-cyan-500 px-2 py-0.5 text-xs text-white"
							>
								sent
							</motion.p>
						</motion.div>
					</div>
				</div>
				<div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
					<h2 className="text-xl font-semibold">Step 3: Lets get started</h2>
					<p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
						I'll provide you with "Step by Steph" feedback.
					</p>
				</div>
			</motion.div>
		</div>
	);
}

export function WorkHeader() {
	return (
		<div className="mx-auto max-w-screen-2xl px-6 lg:px-8 mt-24 sm:mt-32 lg:mt-40">
			<div className="mx-auto max-w-2xl lg:max-w-none">
				<div className="max-w-2xl">
					<h2>
						<span className="mb-6 block font-display text-base font-semibold">
							Our Process
						</span>
						<span className="sr-only"> - </span>
						<span className="block tracking-tight [text-wrap:balance] text-4xl font-bold font-heading sm:text-5xl">
							Here how it works.
						</span>
					</h2>
				</div>
			</div>
		</div>
	);
}

export function Work() {
	return (
		<>
			<WorkHeader />
			<section className="max-w-screen-2xl px-6 lg:px-8 mt-16 mx-auto mb-28">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<div className="grid grid-cols-1 items-center place-items-center justify-center lg:grid-cols-3 w-full gap-8 mt-16">
						<ProcessWork1 />
						<ProcessWork2 />
						<ProcessWork3 />
					</div>
				</div>
			</section>
		</>
	);
}
