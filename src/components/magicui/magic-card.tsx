"use client";

import { motion } from "framer-motion";
import {
	type CSSProperties,
	type ReactElement,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "~/lib/utils";

interface MousePosition {
	x: number;
	y: number;
}

function useMousePosition(): MousePosition {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const handleMouseMove = (event: globalThis.MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return mousePosition;
}

interface MagicContainerProps {
	children?: ReactNode;
	className?: string;
}

const MagicContainer = ({ children, className }: MagicContainerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const mousePosition = useMousePosition();
	const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

	useEffect(() => {
		if (containerRef.current) {
			containerSize.current.w = containerRef.current.offsetWidth;
			containerSize.current.h = containerRef.current.offsetHeight;
		}
		containerRef.current &&
			setBoxes(
				Array.from(containerRef.current.children).map(
					(el) => el as HTMLElement,
				),
			);
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			containerSize.current.w = containerRef.current.offsetWidth;
			containerSize.current.h = containerRef.current.offsetHeight;
		}

		window.addEventListener("resize", () => {
			if (containerRef.current) {
				containerSize.current.w = containerRef.current.offsetWidth;
				containerSize.current.h = containerRef.current.offsetHeight;
			}
		});

		return () => {
			window.removeEventListener("resize", () => {
				if (containerRef.current) {
					containerSize.current.w = containerRef.current.offsetWidth;
					containerSize.current.h = containerRef.current.offsetHeight;
				}
			});
		};
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect();
			const { w, h } = containerSize.current;
			const x = mousePosition.x - rect.left;
			const y = mousePosition.y - rect.top;
			const inside = x < w && x > 0 && y < h && y > 0;

			mouse.current.x = x;
			mouse.current.y = y;

			for (const box of boxes) {
				const boxX =
					-(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
				const boxY =
					-(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
				box.style.setProperty("--mouse-x", `${boxX}px`);
				box.style.setProperty("--mouse-y", `${boxY}px`);

				if (inside) {
					box.style.setProperty("--opacity", "1");
				} else {
					box.style.setProperty("--opacity", "0");
				}
			}
		}
	}, [boxes, mousePosition]);

	return (
		<div className={cn("h-full w-full", className)} ref={containerRef}>
			{children}
		</div>
	);
};

interface MagicCardProps {
	/**
	 * @default <div />
	 * @type ReactElement
	 * @description
	 * The component to be rendered as the card
	 * */
	as?: ReactElement;
	/**
	 * @default ""
	 * @type string
	 * @description
	 * The className of the card
	 */
	className?: string;

	/**
	 * @default ""
	 * @type ReactNode
	 * @description
	 * The children of the card
	 * */
	children?: ReactNode;

	/**
	 * @default 600
	 * @type number
	 * @description
	 * The size of the spotlight effect in pixels
	 * */
	size?: number;

	/**
	 * @default true
	 * @type boolean
	 * @description
	 * Whether to show the spotlight
	 * */
	spotlight?: boolean;

	/**
	 * @default "rgba(255,255,255,0.03)"
	 * @type string
	 * @description
	 * The color of the spotlight
	 * */
	spotlightColor?: string;

	/**
	 * @default true
	 * @type boolean
	 * @description
	 * Whether to isolate the card which is being hovered
	 * */
	isolated?: boolean;

	/**
	 * @default "rgba(255,255,255,0.03)"
	 * @type string
	 * @description
	 * The background of the card
	 * */
	background?: string;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;

	onClick?: () => void;

	borderColor?: string;

	delay?: number;
}

const MagicCard: React.FC<MagicCardProps> = ({
	className,
	children,
	size = 600,
	spotlight = false,
	borderColor,
	isolated = false,
	onClick,
	delay = 0,
	...props
}) => {
	return (
		<motion.div
			onClick={onClick}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.4,
				ease: [0.25, 0.25, 0, 1],
				delay,
			}}
			style={
				{
					"--mask-size": `${size}px`,
					"--border-color": `${borderColor}`,
				} as CSSProperties
			}
			className={cn(
				"relative z-0 h-full w-full rounded-2xl p-6",
				"bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),var(--border-color),transparent_100%)]",
				className,
			)}
			{...props}
		>
			{children}

			{/* Background */}
			<div className={"absolute inset-[1px] -z-20 rounded-2xl bg-white"} />
		</motion.div>
	);
};

export { MagicCard, MagicContainer };
