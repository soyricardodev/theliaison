"use client";

import type { RadioProps } from "@nextui-org/react";
import { Radio } from "@nextui-org/react";
import type React from "react";

import { cn } from "@theliaison/ui";

export type PlanRadioProps = RadioProps & {
	icon?: React.ReactNode;
	monthlyPrice?: number;
	label?: string;
};

export const PlanRadio = ({
	ref,
	icon,
	monthlyPrice,
	label,
	description,
	className,
	classNames = {},
	...props
}: PlanRadioProps & {
	ref?: React.RefObject<HTMLInputElement>;
}) => (
	<Radio
		ref={ref}
		classNames={{
			...classNames,
			base: cn(
				"m-0 inline-flex max-w-[100%] items-center justify-between px-3 py-4",
				"3 border-medium border-default-100 w-full cursor-pointer flex-row-reverse rounded-lg",
				"data-[selected=true]:bg-secondary-50 data-[selected=true]:border-secondary",
				classNames?.base,
				className,
			),
			wrapper: cn(
				"group-data-[focus-visible=true]:ring-secondary",
				classNames?.wrapper,
			),
			labelWrapper: cn("ml-0", classNames?.labelWrapper),
		}}
		color="secondary"
		{...props}
	>
		<div className="flex w-full items-center gap-3">
			<div className="item-center bg-secondary-50 group-data-[selected=true]:bg-secondary-100 flex rounded-full p-2">
				{icon}
			</div>
			<div className="flex w-full flex-col gap-1">
				<div className="flex items-center gap-1">
					<p className="text-small">{label}</p>
					<span className="text-tiny text-default-500 mt-0.5">
						{monthlyPrice !== undefined && ` $${monthlyPrice} per month`}
					</span>
				</div>
				<p className="text-tiny text-default-400">{description}</p>
			</div>
		</div>
	</Radio>
);

PlanRadio.displayName = "PlanRadio";
