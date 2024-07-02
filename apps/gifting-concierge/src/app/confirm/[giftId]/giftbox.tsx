"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@theliaison/ui/tooltip";
import Image from "next/image";
import giftboxGIF from "~/assets/giftbox2.gif";
import { useConfirmDialogStore } from "~/store/confirm-dialog";

export function Giftbox() {
	const { isOpen, setIsOpen } = useConfirmDialogStore();

	const toggleDialog = () => {
		setIsOpen(!isOpen);
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Image
						src={giftboxGIF}
						alt="Giftbox"
						className="mx-auto max-w-md hover:scale-105 transition-all hover:[filter:drop-shadow(0_0_8px_#f0f0f0)] w-72 md:w-96"
						width={384}
						height={384}
						onClick={toggleDialog}
					/>
				</TooltipTrigger>
				<TooltipContent onClick={toggleDialog}>Receive gift</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
