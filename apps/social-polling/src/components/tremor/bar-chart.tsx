"use client";

import ChartLegend from "@tremor/react/dist/components/chart-elements/common/ChartLegend";
import React, { useState } from "react";
import {
	Bar,
	CartesianGrid,
	Label,
	Legend,
	BarChart as ReChartsBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
// import { colorPalette, getColorClassNames, tremorTwMerge } from "lib";
import type { AxisDomain } from "recharts/types/util/types";

import type BaseChartProps from "./base-chart-props";
import type { Color, ValueFormatter } from "./base-chart-props";
import ChartTooltip from "./chart-tooltip";
import { colorPalette, getColorClassNames, tremorTwMerge } from "./utils";

export function deepEqual(obj1: any, obj2: any) {
	if (obj1 === obj2) return true;

	if (
		typeof obj1 !== "object" ||
		typeof obj2 !== "object" ||
		obj1 === null ||
		obj2 === null
	)
		return false;

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false;

	for (const key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
	}

	return true;
}

const renderShape = (
	props: any,
	activeBar: any | undefined,
	activeLegend: string | undefined,
	layout: string,
) => {
	const { fillOpacity, name, payload, value } = props;
	let { x, width, y, height } = props;

	if (Number.isNaN(width)) {
		width = 0;
	}

	if (Number.isNaN(height)) {
		height = 0;
	}

	if (layout === "horizontal" && height < 0) {
		y += height;
		height = Math.abs(height); // height must be a positive number
	} else if (layout === "vertical" && width < 0) {
		x += width;
		width = Math.abs(width); // width must be a positive number
	}

	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={height}
			opacity={
				activeBar || (activeLegend && activeLegend !== name)
					? deepEqual(activeBar, { ...payload, value })
						? fillOpacity
						: 0.3
					: fillOpacity
			}
		/>
	);
};

export interface BarChartProps extends BaseChartProps {
	layout?: "vertical" | "horizontal";
	stack?: boolean;
	relative?: boolean;
	barCategoryGap?: string | number;
}

export const getYAxisDomain = (
	autoMinValue: boolean,
	minValue: number | undefined,
	maxValue: number | undefined,
) => {
	const minDomain = autoMinValue ? "auto" : minValue ?? 0;
	const maxDomain = maxValue ?? "auto";
	return [minDomain, maxDomain];
};

export const defaultValueFormatter: ValueFormatter = (value: number) =>
	value.toString();

export const BaseColors: { [key: string]: Color } = {
	Slate: "slate",
	Gray: "gray",
	Zinc: "zinc",
	Neutral: "neutral",
	Stone: "stone",
	Red: "red",
	Orange: "orange",
	Amber: "amber",
	Yellow: "yellow",
	Lime: "lime",
	Green: "green",
	Emerald: "emerald",
	Teal: "teal",
	Cyan: "cyan",
	Sky: "sky",
	Blue: "blue",
	Indigo: "indigo",
	Violet: "violet",
	Purple: "purple",
	Fuchsia: "fuchsia",
	Pink: "pink",
	Rose: "rose",
};

export const themeColorRange: Color[] = [
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Blue,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Cyan,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Sky,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Indigo,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Violet,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Purple,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Fuchsia,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Slate,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Gray,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Zinc,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Neutral,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Stone,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Red,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Orange,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Amber,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Yellow,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Lime,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Green,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Emerald,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Teal,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Pink,
	// @ts-expect-error - TODO: Fix this type error
	BaseColors.Rose,
];

export const constructCategoryColors = (
	categories: string[],
	colors: (Color | string)[],
): Map<string, Color | string> => {
	const categoryColors = new Map<string, Color | string>();
	categories.forEach((category, idx) => {
		// @ts-expect-error - TODO: Fix this type error
		categoryColors.set(category, colors[idx % colors.length]);
	});
	return categoryColors;
};

export function BarChart(props: BarChartProps) {
	const {
		data = [],
		categories = [],
		index,
		colors = themeColorRange,
		valueFormatter = defaultValueFormatter,
		layout = "horizontal",
		stack = false,
		relative = false,
		startEndOnly = false,
		animationDuration = 900,
		showAnimation = false,
		showXAxis = true,
		showYAxis = true,
		yAxisWidth = 56,
		intervalType = "equidistantPreserveStart",
		showTooltip = true,
		showLegend = true,
		showGridLines = true,
		autoMinValue = false,
		minValue,
		maxValue,
		allowDecimals = true,
		onValueChange,
		enableLegendSlider = false,
		customTooltip,
		rotateLabelX,
		barCategoryGap,
		tickGap = 5,
		xAxisLabel,
		yAxisLabel,
	} = props;
	const CustomTooltip = customTooltip;

	const paddingValue = !showXAxis && !showYAxis ? 0 : 20;
	const [legendHeight, setLegendHeight] = useState(60);
	const categoryColors = constructCategoryColors(categories, colors);
	const [activeBar, setActiveBar] = React.useState<any | undefined>(undefined);
	const [activeLegend, setActiveLegend] = useState<string | undefined>(
		undefined,
	);
	const hasOnValueChange = !!onValueChange;

	function onBarClick(data: any, _idx: number, event: React.MouseEvent) {
		event.stopPropagation();
		if (!onValueChange) return;
		if (deepEqual(activeBar, { ...data.payload, value: data.value })) {
			setActiveLegend(undefined);
			setActiveBar(undefined);
			onValueChange?.(null);
		} else {
			setActiveLegend(data.tooltipPayload?.[0]?.dataKey);
			setActiveBar({
				...data.payload,
				value: data.value,
			});
			onValueChange?.({
				eventType: "bar",
				categoryClicked: data.tooltipPayload?.[0]?.dataKey,
				...data.payload,
			});
		}
	}

	function onCategoryClick(dataKey: string) {
		if (!hasOnValueChange) return;
		if (dataKey === activeLegend && !activeBar) {
			setActiveLegend(undefined);
			onValueChange?.(null);
		} else {
			setActiveLegend(dataKey);
			setActiveBar(undefined);
			onValueChange?.({
				eventType: "category",
				categoryClicked: dataKey,
			});
		}
		setActiveBar(undefined);
	}
	const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

	return (
		<div className={tremorTwMerge("h-80 w-full")}>
			<ResponsiveContainer className="h-full w-full">
				{data?.length ? (
					<ReChartsBarChart
						barCategoryGap={barCategoryGap}
						data={data}
						stackOffset={stack ? "sign" : relative ? "expand" : "none"}
						layout={layout === "vertical" ? "vertical" : "horizontal"}
						onClick={
							hasOnValueChange && (activeLegend || activeBar)
								? () => {
										setActiveBar(undefined);
										setActiveLegend(undefined);
										onValueChange?.(null);
									}
								: undefined
						}
						margin={{
							bottom: xAxisLabel ? 30 : undefined,
							left: yAxisLabel ? 20 : undefined,
							right: yAxisLabel ? 5 : undefined,
							top: 5,
						}}
					>
						{showGridLines ? (
							<CartesianGrid
								className={tremorTwMerge(
									// common
									"stroke-1",
									// light
									"stroke-tremor-border",
									// dark
									"dark:stroke-dark-tremor-border",
								)}
								horizontal={layout !== "vertical"}
								vertical={layout === "vertical"}
							/>
						) : null}

						{layout !== "vertical" ? (
							<XAxis
								padding={{ left: paddingValue, right: paddingValue }}
								hide={!showXAxis}
								dataKey={index}
								interval={startEndOnly ? "preserveStartEnd" : intervalType}
								tick={{ transform: "translate(0, 6)" }}
								ticks={
									startEndOnly
										? [data[0][index], data[data.length - 1][index]]
										: undefined
								}
								fill=""
								stroke=""
								className={tremorTwMerge(
									// common
									"text-tremor-label mt-4",
									// light
									"fill-tremor-content",
									// dark
									"dark:fill-dark-tremor-content",
								)}
								tickLine={false}
								axisLine={false}
								angle={rotateLabelX?.angle}
								dy={rotateLabelX?.verticalShift}
								height={rotateLabelX?.xAxisHeight ?? 0}
								minTickGap={tickGap}
							>
								{xAxisLabel && (
									<Label
										position="insideBottom"
										offset={-20}
										className="fill-tremor-content-emphasis text-tremor-default dark:fill-dark-tremor-content-emphasis font-medium"
									>
										{xAxisLabel}
									</Label>
								)}
							</XAxis>
						) : (
							<XAxis
								hide={!showXAxis}
								type="number"
								tick={{ transform: "translate(-3, 0)" }}
								domain={yAxisDomain as AxisDomain}
								fill=""
								stroke=""
								className={tremorTwMerge(
									// common
									"text-tremor-label",
									// light
									"fill-tremor-content",
									// dark
									"dark:fill-dark-tremor-content",
								)}
								tickLine={false}
								axisLine={false}
								tickFormatter={valueFormatter}
								minTickGap={tickGap}
								allowDecimals={allowDecimals}
								angle={rotateLabelX?.angle}
								dy={rotateLabelX?.verticalShift}
								height={rotateLabelX?.xAxisHeight}
							>
								{xAxisLabel && (
									<Label
										position="insideBottom"
										offset={-20}
										className="fill-tremor-content-emphasis text-tremor-default dark:fill-dark-tremor-content-emphasis font-medium"
									>
										{xAxisLabel}
									</Label>
								)}
							</XAxis>
						)}
						{layout !== "vertical" ? (
							<YAxis
								width={yAxisWidth}
								hide={!showYAxis}
								axisLine={false}
								tickLine={false}
								type="number"
								domain={yAxisDomain as AxisDomain}
								tick={{ transform: "translate(-3, 0)" }}
								fill=""
								stroke=""
								className={tremorTwMerge(
									// common
									"text-tremor-label",
									// light
									"fill-tremor-content",
									// dark
									"dark:fill-dark-tremor-content",
								)}
								tickFormatter={
									relative
										? (value: number) => `${(value * 100).toString()} %`
										: valueFormatter
								}
								allowDecimals={allowDecimals}
							>
								{yAxisLabel && (
									<Label
										position="insideLeft"
										style={{ textAnchor: "middle" }}
										angle={-90}
										offset={-15}
										className="fill-tremor-content-emphasis text-tremor-default dark:fill-dark-tremor-content-emphasis font-medium"
									>
										{yAxisLabel}
									</Label>
								)}
							</YAxis>
						) : (
							<YAxis
								width={yAxisWidth}
								hide={!showYAxis}
								dataKey={index}
								axisLine={false}
								tickLine={false}
								ticks={
									startEndOnly
										? [data[0][index], data[data.length - 1][index]]
										: undefined
								}
								type="category"
								interval="preserveStartEnd"
								tick={{ transform: "translate(0, 6)" }}
								fill=""
								stroke=""
								className={tremorTwMerge(
									// common
									"text-tremor-label",
									// light
									"fill-tremor-content",
									// dark
									"dark:fill-dark-tremor-content",
								)}
							>
								{yAxisLabel && (
									<Label
										position="insideLeft"
										style={{ textAnchor: "middle" }}
										angle={-90}
										offset={-15}
										className="fill-tremor-content-emphasis text-tremor-default dark:fill-dark-tremor-content-emphasis font-medium"
									>
										{yAxisLabel}
									</Label>
								)}
							</YAxis>
						)}
						<Tooltip
							wrapperStyle={{ outline: "none" }}
							isAnimationActive={false}
							cursor={{ fill: "#d1d5db", opacity: "0.15" }}
							content={
								showTooltip ? (
									({ active, payload, label }) =>
										CustomTooltip ? (
											<CustomTooltip
												payload={payload?.map((payloadItem: any) => ({
													...payloadItem,
													color:
														categoryColors.get(payloadItem.dataKey) ??
														BaseColors.Gray,
												}))}
												active={active}
												label={label}
											/>
										) : (
											<ChartTooltip
												active={active}
												payload={payload}
												label={label}
												valueFormatter={valueFormatter}
												categoryColors={categoryColors}
											/>
										)
								) : (
									<></>
								)
							}
							position={{ y: 0 }}
						/>
						{showLegend ? (
							<Legend
								verticalAlign="top"
								height={legendHeight}
								content={({ payload }) =>
									ChartLegend(
										{ payload },
										categoryColors,
										setLegendHeight,
										activeLegend,
										hasOnValueChange
											? (clickedLegendItem: string) =>
													onCategoryClick(clickedLegendItem)
											: undefined,
										enableLegendSlider,
									)
								}
							/>
						) : null}
						{categories.map((category) => (
							<Bar
								className={tremorTwMerge(
									getColorClassNames(
										// @ts-expect-error - TODO: Fix this type error
										categoryColors.get(category) ?? BaseColors.Gray,
										colorPalette.background,
									).fillColor,
									onValueChange ? "cursor-pointer" : "",
								)}
								key={category}
								name={category}
								type="linear"
								stackId={stack || relative ? "a" : undefined}
								dataKey={category}
								fill=""
								isAnimationActive={showAnimation}
								animationDuration={animationDuration}
								shape={(props: any) =>
									renderShape(props, activeBar, activeLegend, layout)
								}
								onClick={onBarClick}
							/>
						))}
					</ReChartsBarChart>
				) : (
					// <NoData noDataText={noDataText} />
					<div>No Data</div>
				)}
			</ResponsiveContainer>
		</div>
	);
}
