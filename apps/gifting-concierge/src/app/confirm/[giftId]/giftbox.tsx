"use client";

import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { useRef, useState } from "react";
import giftboxGIF from "~/assets/giftbox.gif";
import { useConfirmDialogStore } from "~/store/confirm-dialog";

export function Giftbox() {
	const { isOpen, setIsOpen } = useConfirmDialogStore();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [offset, setOffset] = useState(0);

	const imageRef = useRef<HTMLImageElement | null>(null);

	const handleMouseEnter = (e: React.MouseEvent) => {
		setMousePosition({ x: e.clientX, y: e.clientY });

		if (imageRef.current) {
			const { top, height } = imageRef.current.getBoundingClientRect();
			const offsetY = top - mousePosition.y + height / 4;

			setOffset(offsetY);
		}
	};

	const toggleDialog = () => setIsOpen(!isOpen);

	return (
		<Tooltip
			content="Receive gift"
			offset={offset}
			delay={1500}
			onClick={toggleDialog}
		>
			<Image
				ref={imageRef}
				src={giftboxGIF}
				alt="Giftbox"
				className="mx-auto max-w-md hover:scale-105 transition-all hover:[filter:drop-shadow(0_0_8px_#f0f0f0)] w-72 md:w-96"
				width={384}
				height={384}
				onClick={toggleDialog}
				onMouseEnter={handleMouseEnter}
			/>
		</Tooltip>
	);
}
