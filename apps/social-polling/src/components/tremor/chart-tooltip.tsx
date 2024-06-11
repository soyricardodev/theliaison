import type React from "react";

import { BaseColors } from "./bar-chart";
import type { Color, ValueFormatter } from "./base-chart-props";
import { colorPalette, getColorClassNames, tremorTwMerge } from "./utils";

// import {
//   BaseColors,
//   getColorClassNames,
//   tremorTwMerge,
//   Color,
//   ValueFormatter,
//   colorPalette,
// } from "lib";

export const ChartTooltipFrame = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<div
		className={tremorTwMerge(
			// common
			"rounded-tremor-default text-tremor-default border",
			// light
			"bg-tremor-background shadow-tremor-dropdown border-tremor-border",
			// dark
			"dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown dark:border-dark-tremor-border",
		)}
	>
		{children}
	</div>
);

export interface ChartTooltipRowProps {
	value: string;
	name: string;
	color: Color | string;
}

export const ChartTooltipRow = ({
	value,
	name,
	color,
}: ChartTooltipRowProps) => (
	<div className="flex items-center justify-between space-x-8">
		<div className="flex items-center space-x-2">
			<span
				className={tremorTwMerge(
					// common
					"rounded-tremor-full h-3 w-3 shrink-0 border-2",
					// light
					"border-tremor-background shadow-tremor-card",
					// dark
					"dark:border-dark-tremor-background dark:shadow-dark-tremor-card",
					getColorClassNames(color, colorPalette.background).bgColor,
				)}
			/>
			<p
				className={tremorTwMerge(
					// commmon
					"whitespace-nowrap text-right",
					// light
					"text-tremor-content",
					// dark
					"dark:text-dark-tremor-content",
				)}
			>
				{name}
			</p>
		</div>
		<p
			className={tremorTwMerge(
				// common
				"whitespace-nowrap text-right font-medium tabular-nums",
				// light
				"text-tremor-content-emphasis",
				// dark
				"dark:text-dark-tremor-content-emphasis",
			)}
		>
			{value}
		</p>
	</div>
);

export interface ChartTooltipProps {
	active: boolean | undefined;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	payload: any;
	label: string;
	categoryColors: Map<string, Color | string>;
	valueFormatter: ValueFormatter;
}

const ChartTooltip = ({
	active,
	payload,
	label,
	categoryColors,
	valueFormatter,
}: ChartTooltipProps) => {
	if (active && payload) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const filteredPayload = payload.filter((item: any) => item.type !== "none");

		return (
			<ChartTooltipFrame>
				<div
					className={tremorTwMerge(
						// light
						"border-tremor-border border-b px-4 py-2",
						// dark
						"dark:border-dark-tremor-border",
					)}
				>
					<p
						className={tremorTwMerge(
							// common
							"font-medium",
							// light
							"text-tremor-content-emphasis",
							// dark
							"dark:text-dark-tremor-content-emphasis",
						)}
					>
						{label}
					</p>
				</div>

				<div className={tremorTwMerge("space-y-1 px-4 py-2")}>
					{filteredPayload.map(
						({ value, name }: { value: number; name: string }, idx: number) => (
							<ChartTooltipRow
								key={`id-${
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									idx
								}`}
								value={valueFormatter(value)}
								name={name}
								color={categoryColors.get(name) ?? BaseColors.Blue}
							/>
						),
					)}
				</div>
			</ChartTooltipFrame>
		);
	}
	return null;
};

export default ChartTooltip;
