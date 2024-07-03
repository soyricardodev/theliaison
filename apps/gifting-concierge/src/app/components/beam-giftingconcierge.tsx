"use client";

import { cn } from "@theliaison/ui";
import { AnimatedBeam } from "@theliaison/ui/magicui/animated-beam";
import { UserRoundIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { forwardRef, useRef } from "react";
import type React from "react";
const Circle = forwardRef<
	HTMLDivElement,
	{ className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
				className,
			)}
		>
			{children}
		</div>
	);
});

export function BeamGiftingConcierge({
	className,
}: {
	className?: string;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const div1Ref = useRef<HTMLDivElement>(null);
	const div6Ref = useRef<HTMLDivElement>(null);
	const div7Ref = useRef<HTMLDivElement>(null);

	return (
		<div
			className={cn(
				"relative flex w-full max-w-[600px] items-center justify-center overflow-hidden rounded-lg bg-background p-10 mx-auto",
				className,
			)}
			ref={containerRef}
		>
			<div className="flex h-full w-full flex-row items-center justify-between gap-10">
				<div className="flex flex-col justify-center">
					<Circle ref={div7Ref}>
						<UserRoundIcon className="size-11 text-primary" />
					</Circle>
				</div>
				<div className="flex flex-col justify-center">
					<Circle ref={div6Ref} className="size-24">
						<Image
							src="/logo-white.webp"
							alt="The Liaison Logo"
							width={64}
							height={64}
							className="size-16"
						/>
					</Circle>
				</div>
				<div className="flex flex-col justify-center gap-2">
					<Circle ref={div1Ref}>
						<HeartIcon className="size-11" />
					</Circle>
				</div>
			</div>

			{/* AnimatedBeams */}
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div1Ref}
				toRef={div6Ref}
				duration={3}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div7Ref}
				duration={3}
			/>
		</div>
	);
}
