import type {
	NameType,
	Payload,
} from "recharts/types/component/DefaultTooltipContent";

export type Interval = "preserveStartEnd" | "equidistantPreserveStart";

const colorValues = [
	"slate",
	"gray",
	"zinc",
	"neutral",
	"stone",
	"red",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"emerald",
	"teal",
	"cyan",
	"sky",
	"blue",
	"indigo",
	"violet",
	"purple",
	"fuchsia",
	"pink",
	"rose",
] as const;

export type Color = (typeof colorValues)[number];

export type IntervalType = "preserveStartEnd" | Interval;

interface BaseAnimationTimingProps {
	animationDuration?: number;
	showAnimation?: boolean;
}

export type CustomTooltipProps = {
	payload:
		| Payload<string | number | (string | number)[], string | number>[]
		| undefined;
	active: boolean | undefined;
	label: NameType | undefined;
};

type FixedProps = {
	eventType: "dot" | "category" | "bar" | "slice" | "bubble";
	categoryClicked: string;
};

type BaseEventProps = FixedProps & {
	[key: string]: number | string;
};

export type EventProps = BaseEventProps | null | undefined;

export type ValueFormatter = (value: number) => string;

interface BaseChartProps
	extends BaseAnimationTimingProps,
		React.HTMLAttributes<HTMLDivElement> {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any[];
	categories: string[];
	index: string;
	colors?: (Color | string)[];
	valueFormatter?: ValueFormatter;
	startEndOnly?: boolean;
	showXAxis?: boolean;
	showYAxis?: boolean;
	yAxisWidth?: number;
	intervalType?: IntervalType;
	showTooltip?: boolean;
	showLegend?: boolean;
	showGridLines?: boolean;
	autoMinValue?: boolean;
	minValue?: number;
	maxValue?: number;
	allowDecimals?: boolean;
	noDataText?: string;
	onValueChange?: (value: EventProps) => void;
	enableLegendSlider?: boolean;
	customTooltip?: React.ComponentType<CustomTooltipProps>;
	rotateLabelX?: {
		angle: number;
		verticalShift?: number;
		xAxisHeight?: number;
	};
	tickGap?: number;
	xAxisLabel?: string;
	yAxisLabel?: string;
}

export default BaseChartProps;
