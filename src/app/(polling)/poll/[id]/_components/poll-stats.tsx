"use client";

import { DonutChart, Legend } from "@tremor/react";
import type React from "react";
import { useState } from "react";

export interface RawData {
	option_id: number;
	name: string;
	country: string;
	gender: string;
	relationship_status: string;
}

interface Demographics {
	gender: Record<string, number>;
	relationshipStatus: Record<string, number>;
	country: Record<string, number>;
}

interface Option {
	option: string;
	totalVotes: number;
	demographics: Demographics;
}

const transformRawData = (data: RawData[]) => {
	const optionsMap: Record<string, Demographics & { totalVotes: number }> = {};

	for (let i = 0; i < data.length; i++) {
		const optionData = data[i];

		if (!optionData) continue;

		const { name, gender, relationship_status, country } = optionData;

		if (!optionsMap[name]) {
			optionsMap[name] = {
				totalVotes: 0,
				gender: {},
				relationshipStatus: {},
				country: {},
			};
		}

		// @ts-expect-error - TODO: Fix this type error
		optionsMap[name].totalVotes += 1;
		// @ts-expect-error - TODO: Fix this type error
		optionsMap[name].gender[gender] =
			// @ts-expect-error - TODO: Fix this type error
			(optionsMap[name].gender[gender] || 0) + 1;
		// @ts-expect-error - TODO: Fix this type error
		optionsMap[name].relationshipStatus[relationship_status] =
			// @ts-expect-error - TODO: Fix this type error
			(optionsMap[name].relationshipStatus[relationship_status] || 0) + 1;
		// @ts-expect-error - TODO: Fix this type error
		optionsMap[name].country[country] =
			// @ts-expect-error - TODO: Fix this type error
			(optionsMap[name].country[country] || 0) + 1;
	}

	return Object.entries(optionsMap).map(([option, demographics]) => ({
		option,
		...demographics,
	}));
};

export const PollStats = ({ stats }: { stats: RawData[] }) => {
	const [selectedDemographic, setSelectedDemographic] =
		useState<string>("totalVotes");
	const transformedData = transformRawData(stats);
	console.log(stats);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedDemographic(event.target.value);
	};

	const pieData = transformedData.map((option) => ({
		name: option.option,
		value:
			selectedDemographic === "totalVotes"
				? option.totalVotes
				: selectedDemographic === "gender_male"
					? option.gender?.male || 0
					: selectedDemographic === "gender_female"
						? option.gender?.female || 0
						: selectedDemographic === "gender_nonBinary"
							? option.gender?.nonBinary || 0
							: selectedDemographic === "relationshipStatus_single"
								? option.relationshipStatus?.single || 0
								: selectedDemographic === "relationshipStatus_married"
									? option.relationshipStatus?.married || 0
									: 0,
	}));

	console.log({ transformedData, pieData });

	const legendCategories = Array.from(
		new Set(pieData.map((item) => item.name)),
	);

	const dataFormatter = (number: number) =>
		Intl.NumberFormat("us").format(number).toString();

	const COLORS = [
		"blue",
		"teal",
		"amber",
		"rose",
		"indigo",
		"emerald",
		"cyan",
		"violet",
		"fuchsia",
		"lime",
		"pink",
		"red",
		"purple",
	];

	return (
		<div className="p-6">
			<select
				onChange={handleChange}
				value={selectedDemographic}
				className="mt-4 mb-6 p-2 border rounded"
			>
				<option value="totalVotes">All Votes</option>
				<option value="gender_male">Male</option>
				<option value="gender_female">Female</option>
				<option value="relationshipStatus_single">Single</option>
				<option value="relationshipStatus_married">Married</option>
			</select>
			<div className="flex flex-wrap justify-around">
				<div className="w-full lg:w-1/2 p-4">
					<h3 className="text-lg font-medium">Poll Stats</h3>
					<div className="flex justify-center">
						<DonutChart
							data={pieData}
							category="value"
							index="name"
							valueFormatter={dataFormatter}
							colors={COLORS.slice(0, legendCategories.length)}
							className="w-40"
						/>
					</div>
					<Legend
						categories={legendCategories}
						colors={COLORS.slice(0, legendCategories.length)}
						className="max-w-xl mx-auto mt-4"
					/>
				</div>
			</div>
		</div>
	);
};

// "use client";

// import { DonutChart, Legend } from "@tremor/react";
// import { useState } from "react";
// import { BarChart } from "~/components/tremor/bar-chart";

// export interface RawData {
// 	option_id: number;
// 	name: string;
// 	country: string;
// 	gender: string;
// 	relationship_status: string;
// }
// type Gender =
// 	| "male"
// 	| "female"
// 	| "nonBinary"
// 	| "agender"
// 	| "bigender"
// 	| "genderFluid"
// 	| "genderQueer"
// 	| "pangender"
// 	| "twoSpirit"
// 	| "demiboy"
// 	| "demigirl"
// 	| "transgenderMale"
// 	| "transgenderFemale"
// 	| "other";

// interface Demographics {
// 	gender: Record<Gender, number>;
// 	relationshipStatus: Record<string, Record<Gender, number>>;
// 	country: Record<string, Record<Gender, number>>;
// }

// interface Option {
// 	option: string;
// 	demographics: Demographics;
// }

// const transformRawData = (data: RawData[]): Option[] => {
// 	const optionsMap: Record<string, Demographics> = {};

// 	// biome-ignore lint/complexity/noForEach: <explanation>
// 	data.forEach(({ name, gender, relationship_status, country }) => {
// 		if (!optionsMap[name]) {
// 			optionsMap[name] = {
// 				// @ts-expect-error - TODO: Fix this type error
// 				gender: {},
// 				relationshipStatus: {},
// 				country: {},
// 			};
// 		}

// 		// @ts-expect-error - TODO: Fix this type error
// 		optionsMap[name].gender[gender] =
// 			(optionsMap[name].gender[gender] || 0) + 1;

// 		// @ts-expect-error - TODO: Fix this type error
// 		if (!optionsMap[name].relationshipStatus[relationship_status]) {
// 			// @ts-expect-error - TODO: Fix this type error
// 			optionsMap[name].relationshipStatus[relationship_status] = {};
// 		}
// 		// @ts-expect-error - TODO: Fix this type error
// 		optionsMap[name].relationshipStatus[relationship_status][gender] =
// 			// @ts-expect-error - TODO: Fix this type error
// 			(optionsMap[name].relationshipStatus[relationship_status][gender] || 0) +
// 			1;

// 		// @ts-expect-error - TODO: Fix this type error
// 		if (!optionsMap[name].country[country]) {
// 			// @ts-expect-error - TODO: Fix this type error
// 			optionsMap[name].country[country] = {};
// 		}
// 		// @ts-expect-error - TODO: Fix this type error
// 		optionsMap[name].country[country][gender] =
// 			// @ts-expect-error - TODO: Fix this type error
// 			(optionsMap[name].country[country][gender] || 0) + 1;
// 	});

// 	return Object.entries(optionsMap).map(([option, demographics]) => ({
// 		option,
// 		demographics,
// 	}));
// };

// const transformDataForPieChart = (
// 	data: RawData[],
// ): { name: string; value: number; group: string }[] => {
// 	const result: { name: string; value: number; group: string }[] = [];

// 	for (let i = 0; i < data.length; i++) {
// 		const pollData = data[i];

// 		if (!pollData) continue;

// 		const { name, gender, relationship_status } = pollData;

// 		const existingSegment = result.find(
// 			(segment) =>
// 				segment.name === name &&
// 				segment.group === `${relationship_status}_${gender}`,
// 		);

// 		if (existingSegment) {
// 			existingSegment.value += 1;
// 		} else {
// 			result.push({
// 				name,
// 				value: 1,
// 				group: `${relationship_status}_${gender}`,
// 			});
// 		}
// 	}

// 	return result;
// };

// const COLORS = [
// 	"blue",
// 	"teal",
// 	"amber",
// 	"rose",
// 	"indigo",
// 	"emerald",
// 	"cyan",
// 	"violet",
// 	"fuchsia",
// 	"lime",
// 	"pink",
// ];
// const demographicOptions = [
// 	{ value: "gender_male", label: "Male" },
// 	{ value: "gender_female", label: "Female" },
// 	{ value: "gender_nonBinary", label: "NonBinary" },
// 	{ value: "gender_agender", label: "Agender" },
// 	{ value: "gender_bigender", label: "Bigender" },
// 	{ value: "gender_genderFluid", label: "GenderFluid" },
// 	{ value: "gender_genderQueer", label: "GenderQueer" },
// 	{ value: "gender_pangender", label: "Pangender" },
// 	{ value: "gender_twoSpirit", label: "TwoSpirit" },
// 	{ value: "gender_demiboy", label: "Demiboy" },
// 	{ value: "gender_demigirl", label: "Demigirl" },
// 	{ value: "gender_transgenderMale", label: "TransgenderMale" },
// 	{ value: "gender_transgenderFemale", label: "TransgenderFemale" },
// 	{ value: "gender_other", label: "Other" },
// 	{ value: "relationshipStatus_married", label: "Married" },
// 	{ value: "relationshipStatus_single", label: "Single" },
// 	{ value: "country_US", label: "USA" },
// 	{ value: "country_VE", label: "Venezuela" },
// 	{ value: "country_CA", label: "Canada" },
// 	{ value: "country_UK", label: "United Kingdom" },
// 	{ value: "country_IN", label: "India" },
// ] as const;
// type DemographicOption = (typeof demographicOptions)[number];

// type DemographicCategory = keyof Demographics;

// const getDemographicBreakdown = (
// 	demographics: Demographics,
// 	demographicKey: string,
// ): number | Record<string, number> => {
// 	const [category, key] = demographicKey.split("_") as [
// 		keyof Demographics,
// 		string,
// 	];
// 	if (category === "gender") {
// 		// @ts-expect-error - TODO: Fix this type error
// 		return demographics[category]?.[key] ?? 0;
// 		// biome-ignore lint/style/noUselessElse: <explanation>
// 	} else {
// 		return demographics[category]?.[key] ?? {};
// 	}
// };

// export function PollStats({ stats }: { stats: RawData[] }) {
// 	const [selectedDemographic, setSelectedDemographic] =
// 		useState<DemographicOption["value"]>("gender_female");

// 	const optionCounts: Record<string, number> = {};
// 	const demographicCounts: Record<
// 		string,
// 		Record<string, Record<string, Record<string, Record<string, number>>>>
// 	> = {};

// 	const relevantDemographics: Set<string> = new Set();

// 	for (let i = 0; i < stats.length; i++) {
// 		const stat = stats[i];

// 		if (!stat) continue;

// 		const { name, gender, relationship_status, country } = stat;

// 		relevantDemographics.add(`gender_${gender}`);
// 		relevantDemographics.add(`relationshipStatus_${relationship_status}`);
// 		relevantDemographics.add(`country_${country}`);

// 		optionCounts[name] = (optionCounts[name] || 0) + 1;

// 		if (!demographicCounts[name]) {
// 			demographicCounts[name] = {
// 				gender: {},
// 				relationshipStatus: {},
// 				country: {},
// 			};
// 		}

// 		// @ts-expect-error FIXME
// 		demographicCounts[name].gender[gender] =
// 			(demographicCounts[name].gender[gender] || 0) + 1;

// 		// @ts-expect-error FIXME
// 		if (!demographicCounts[name].relationshipStatus[relationship_status]) {
// 			// @ts-expect-error FIXME
// 			demographicCounts[name].relationshipStatus[relationship_status] = {};
// 		}
// 		// @ts-expect-error FIXME
// 		demographicCounts[name].relationshipStatus[relationship_status][gender] =
// 			(demographicCounts[name].relationshipStatus[relationship_status][
// 				gender
// 			] || 0) + 1;
// 		// @ts-expect-error FIXME
// 		if (!demographicCounts[name].country[country]) {
// 			// @ts-expect-error FIXME
// 			demographicCounts[name].country[country] = {};
// 		}
// 		// @ts-expect-error FIXME
// 		demographicCounts[name].country[country][gender] =
// 			(demographicCounts[name].country[country][gender] || 0) + 1;
// 	}

// 	const pieData = Object.entries(optionCounts).map(([name, votes]) => ({
// 		name,
// 		votes,
// 	}));

// 	const transformedData = transformRawData([
// 		...stats,
// 		...stats,
// 		...stats,
// 		...stats,
// 	]);

// 	const barData = transformedData.map((option) => {
// 		const breakdown = getDemographicBreakdown(
// 			option.demographics,
// 			selectedDemographic,
// 		);
// 		if (typeof breakdown === "number") {
// 			return { name: option.option, votes: breakdown };
// 		}

// 		return { name: option.option, ...breakdown };
// 	});

// 	const transformedDataForPieChart = transformDataForPieChart(dataToUse);

// 	const legendCategories = Array.from(
// 		new Set(transformedDataForPieChart.map((item) => item.group)),
// 	);

// 	const isGenderSpecific =
// 		selectedDemographic.startsWith("relationshipStatus") ||
// 		selectedDemographic.startsWith("country");

// 	const demographicSelect = Array.from(relevantDemographics);

// 	console.log({ demographicCounts, barData, transformedDataForPieChart });

// 	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// 		setSelectedDemographic(event.target.value as DemographicOption["value"]);
// 	};

// 	const categories = isGenderSpecific
// 		? Object.keys(barData[0] ?? {}).filter((key) => key !== "name")
// 		: ["votes"];

// 	return (
// 		<>
// 			<div className="flex items-center justify-center space-x-6">
// 				<DonutChart
// 					data={transformedDataForPieChart}
// 					category="value"
// 					index="name"
// 					colors={COLORS.slice(0, legendCategories.length)}
// 					className="w-40"
// 					// tooltipFormatter={(name, value, props) => `${props.payload.group}: ${value}`}
// 				/>
// 			</div>

// 			<Legend
// 				categories={legendCategories}
// 				colors={COLORS.slice(0, pieData.length)}
// 				className="mx-auto mt-4"
// 			/>

// 			<div className="w-full flex flex-col max-w-screen-2xl mx-auto h-80">
// 				<select onChange={handleChange} value={selectedDemographic}>
// 					<option value="">Select</option>
// 					{demographicSelect.map((option) => (
// 						<option key={option} value={option}>
// 							{option}
// 						</option>
// 					))}
// 				</select>

// 				<BarChart
// 					data={barData}
// 					index="name"
// 					categories={categories}
// 					colors={COLORS}
// 					// valueFormatter={dataFormatter}
// 					yAxisWidth={20}
// 					className="capitalize"
// 				/>
// 			</div>
// 		</>
// 	);
// }
