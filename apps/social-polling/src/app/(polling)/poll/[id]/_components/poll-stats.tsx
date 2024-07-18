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
				className="mb-6 mt-4 rounded border p-2"
			>
				<option value="totalVotes">All Votes</option>
				<option value="gender_male">Male</option>
				<option value="gender_female">Female</option>
				<option value="relationshipStatus_single">Single</option>
				<option value="relationshipStatus_married">Married</option>
			</select>
			<div className="flex flex-wrap justify-around">
				<div className="w-full p-4 lg:w-1/2">
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
						className="mx-auto mt-4 max-w-xl"
					/>
				</div>
			</div>
		</div>
	);
};
