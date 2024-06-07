"use client";

import { useState } from "react";
import { DonutChart, Legend } from "@tremor/react";

import { BarChart } from "~/components/tremor/bar-chart";

type Gender =
  | "male"
  | "female"
  | "nonBinary"
  | "agender"
  | "bigender"
  | "genderFluid"
  | "genderQueer"
  | "pangender"
  | "twoSpirit"
  | "demiboy"
  | "demigirl"
  | "transgenderMale"
  | "transgenderFemale"
  | "other";

// type SexualOrientation =
// 	| "heterosexual"
// 	| "homosexual"
// 	| "bisexual"
// 	| "asexual"
// 	| "pansexual"
// 	| "queer"
// 	| "questioning"
// 	| "lesbian"
// 	| "gay"
// 	| "other";

interface Demographics {
  gender: Record<Gender, number>;
  relationshipStatus: Record<string, Record<Gender, number>>;
  country: Record<string, Record<Gender, number>>;
}

interface Option {
  option: string;
  votes: number;
  demographics: Demographics;
}

interface Data {
  question: string;
  options: Option[];
}

const data: Data = {
  question: "How do you feel about splitting the bill on a date?",
  options: [
    {
      option: "I prefer my date to pay the entire bill",
      votes: 100,
      demographics: {
        gender: {
          male: 20,
          female: 40,
          nonBinary: 10,
          agender: 5,
          bigender: 2,
          genderFluid: 5,
          genderQueer: 4,
          pangender: 2,
          twoSpirit: 3,
          demiboy: 1,
          demigirl: 3,
          transgenderMale: 2,
          transgenderFemale: 2,
          other: 1,
        },
        relationshipStatus: {
          married: {
            male: 5,
            female: 10,
            nonBinary: 2,
            agender: 1,
            bigender: 0,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 0,
            twoSpirit: 1,
            demiboy: 0,
            demigirl: 0,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          single: {
            male: 15,
            female: 30,
            nonBinary: 8,
            agender: 4,
            bigender: 2,
            genderFluid: 4,
            genderQueer: 3,
            pangender: 2,
            twoSpirit: 2,
            demiboy: 1,
            demigirl: 3,
            transgenderMale: 2,
            transgenderFemale: 2,
            other: 1,
          },
        },
        country: {
          US: {
            male: 5,
            female: 15,
            nonBinary: 3,
            agender: 1,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          VE: {
            male: 5,
            female: 10,
            nonBinary: 3,
            agender: 1,
            bigender: 0,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 0,
            twoSpirit: 1,
            demiboy: 0,
            demigirl: 0,
            transgenderMale: 1,
            transgenderFemale: 0,
            other: 1,
          },
          CA: {
            male: 5,
            female: 5,
            nonBinary: 1,
            agender: 1,
            bigender: 0,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 0,
            twoSpirit: 0,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 1,
            other: 0,
          },
          UK: {
            male: 3,
            female: 5,
            nonBinary: 1,
            agender: 1,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 0,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 0,
            transgenderMale: 1,
            transgenderFemale: 1,
            other: 0,
          },
          IN: {
            male: 2,
            female: 5,
            nonBinary: 2,
            agender: 1,
            bigender: 0,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 0,
            twoSpirit: 0,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
        },
      },
    },
    {
      option: "I prefer to split it evenly",
      votes: 150,
      demographics: {
        gender: {
          male: 30,
          female: 60,
          nonBinary: 15,
          agender: 7,
          bigender: 5,
          genderFluid: 5,
          genderQueer: 6,
          pangender: 5,
          twoSpirit: 4,
          demiboy: 4,
          demigirl: 5,
          transgenderMale: 2,
          transgenderFemale: 2,
          other: 0,
        },
        relationshipStatus: {
          married: {
            male: 10,
            female: 15,
            nonBinary: 5,
            agender: 2,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 2,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 1,
            transgenderMale: 1,
            transgenderFemale: 1,
            other: 0,
          },
          single: {
            male: 20,
            female: 45,
            nonBinary: 10,
            agender: 5,
            bigender: 4,
            genderFluid: 4,
            genderQueer: 4,
            pangender: 4,
            twoSpirit: 3,
            demiboy: 3,
            demigirl: 4,
            transgenderMale: 1,
            transgenderFemale: 1,
            other: 0,
          },
        },
        country: {
          US: {
            male: 10,
            female: 20,
            nonBinary: 5,
            agender: 2,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 2,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 1,
            other: 0,
          },
          VE: {
            male: 10,
            female: 15,
            nonBinary: 4,
            agender: 1,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          CA: {
            male: 5,
            female: 10,
            nonBinary: 3,
            agender: 1,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 1,
            transgenderMale: 1,
            transgenderFemale: 1,
            other: 0,
          },
          UK: {
            male: 3,
            female: 10,
            nonBinary: 1,
            agender: 1,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 1,
            other: 0,
          },
          IN: {
            male: 2,
            female: 5,
            nonBinary: 2,
            agender: 2,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 1,
            twoSpirit: 0,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
        },
      },
    },
    {
      option:
        "I'm okay with splitting, but I also don't mind if my date insists on paying it",
      votes: 150,
      demographics: {
        gender: {
          male: 40,
          female: 60,
          nonBinary: 20,
          agender: 8,
          bigender: 5,
          genderFluid: 5,
          genderQueer: 4,
          pangender: 3,
          twoSpirit: 2,
          demiboy: 1,
          demigirl: 1,
          transgenderMale: 1,
          transgenderFemale: 0,
          other: 0,
        },
        relationshipStatus: {
          married: {
            male: 10,
            female: 20,
            nonBinary: 6,
            agender: 3,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 2,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          single: {
            male: 30,
            female: 40,
            nonBinary: 14,
            agender: 5,
            bigender: 4,
            genderFluid: 4,
            genderQueer: 2,
            pangender: 2,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 0,
            transgenderMale: 1,
            transgenderFemale: 0,
            other: 0,
          },
        },
        country: {
          US: {
            male: 15,
            female: 20,
            nonBinary: 6,
            agender: 3,
            bigender: 1,
            genderFluid: 2,
            genderQueer: 2,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 1,
            transgenderFemale: 0,
            other: 0,
          },
          VE: {
            male: 10,
            female: 15,
            nonBinary: 5,
            agender: 2,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 1,
            twoSpirit: 0,
            demiboy: 1,
            demigirl: 0,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          CA: {
            male: 5,
            female: 10,
            nonBinary: 3,
            agender: 1,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 0,
            pangender: 1,
            twoSpirit: 0,
            demiboy: 0,
            demigirl: 0,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          UK: {
            male: 5,
            female: 10,
            nonBinary: 4,
            agender: 1,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 0,
            pangender: 0,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 0,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          IN: {
            male: 5,
            female: 5,
            nonBinary: 2,
            agender: 1,
            bigender: 1,
            genderFluid: 0,
            genderQueer: 1,
            pangender: 0,
            twoSpirit: 0,
            demiboy: 0,
            demigirl: 0,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
        },
      },
    },
    {
      option: "I prefer to pay the entire bill by myself",
      votes: 100,
      demographics: {
        gender: {
          male: 25,
          female: 30,
          nonBinary: 10,
          agender: 5,
          bigender: 2,
          genderFluid: 3,
          genderQueer: 2,
          pangender: 3,
          twoSpirit: 2,
          demiboy: 1,
          demigirl: 2,
          transgenderMale: 1,
          transgenderFemale: 1,
          other: 0,
        },
        relationshipStatus: {
          married: {
            male: 5,
            female: 10,
            nonBinary: 3,
            agender: 1,
            bigender: 0,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          single: {
            male: 20,
            female: 20,
            nonBinary: 7,
            agender: 4,
            bigender: 2,
            genderFluid: 2,
            genderQueer: 1,
            pangender: 2,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 1,
            transgenderMale: 1,
            transgenderFemale: 1,
            other: 0,
          },
        },
        country: {
          US: {
            male: 10,
            female: 10,
            nonBinary: 4,
            agender: 2,
            bigender: 1,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          VE: {
            male: 5,
            female: 10,
            nonBinary: 2,
            agender: 1,
            bigender: 0,
            genderFluid: 1,
            genderQueer: 0,
            pangender: 1,
            twoSpirit: 1,
            demiboy: 1,
            demigirl: 1,
            transgenderMale: 1,
            transgenderFemale: 0,
            other: 0,
          },
          CA: {
            male: 5,
            female: 5,
            nonBinary: 2,
            agender: 1,
            bigender: 1,
            genderFluid: 0,
            genderQueer: 0,
            pangender: 1,
            twoSpirit: 0,
            demiboy: 0,
            demigirl: 0,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          UK: {
            male: 3,
            female: 3,
            nonBinary: 1,
            agender: 1,
            bigender: 0,
            genderFluid: 1,
            genderQueer: 1,
            pangender: 0,
            twoSpirit: 0,
            demiboy: 0,
            demigirl: 1,
            transgenderMale: 0,
            transgenderFemale: 0,
            other: 0,
          },
          IN: {
            male: 2,
            female: 2,
            nonBinary: 1,
            agender: 0,
            bigender: 0,
            genderFluid: 0,
            genderQueer: 0,
            pangender: 0,
            twoSpirit: 0,
            demiboy: 0,
            demigirl: 0,
            transgenderMale: 0,
            transgenderFemale: 1,
            other: 0,
          },
        },
      },
    },
  ],
};

const demographicOptions = [
  { value: "gender_male", label: "Male" },
  { value: "gender_female", label: "Female" },
  { value: "gender_nonBinary", label: "NonBinary" },
  { value: "gender_agender", label: "Agender" },
  { value: "gender_bigender", label: "Bigender" },
  { value: "gender_genderFluid", label: "GenderFluid" },
  { value: "gender_genderQueer", label: "GenderQueer" },
  { value: "gender_pangender", label: "Pangender" },
  { value: "gender_twoSpirit", label: "TwoSpirit" },
  { value: "gender_demiboy", label: "Demiboy" },
  { value: "gender_demigirl", label: "Demigirl" },
  { value: "gender_transgenderMale", label: "TransgenderMale" },
  { value: "gender_transgenderFemale", label: "TransgenderFemale" },
  { value: "gender_other", label: "Other" },
  { value: "relationshipStatus_married", label: "Married" },
  { value: "relationshipStatus_single", label: "Single" },
  { value: "country_US", label: "USA" },
  { value: "country_VE", label: "Venezuela" },
  { value: "country_CA", label: "Canada" },
  { value: "country_UK", label: "United Kingdom" },
  { value: "country_IN", label: "India" },
] as const;

type DemographicOption = (typeof demographicOptions)[number];

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
];

type DemographicCategory = keyof Demographics;

const getDemographicBreakdown = (
  demographics: Demographics,
  demographicKey: DemographicOption["value"],
): number | Record<Gender, number> => {
  const [category, key] = demographicKey.split("_") as [
    DemographicCategory,
    string,
  ];
  // @ts-expect-error - TODO: Fix this type error
  return demographics[category]?.[key] ?? 0;
};

export default function Page() {
  const [selectedDemographic, setSelectedDemographic] =
    useState<DemographicOption["value"]>("gender_female");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDemographic(event.target.value as DemographicOption["value"]);
  };

  const pieData: Array<{ name: string; value: number }> = [];

  const barData = data.options.map((option) => {
    const breakdown = getDemographicBreakdown(
      option.demographics,
      selectedDemographic,
    );
    if (typeof breakdown === "number") {
      return { name: option.option, votes: breakdown };
    }

    return { name: option.option, ...breakdown };
  });

  const isGenderSpecific =
    selectedDemographic.startsWith("relationshipStatus") ||
    selectedDemographic.startsWith("country");

  for (let i = 0; i < data.options.length; i++) {
    const option = data.options[i];

    if (option == null) continue;

    pieData.push({
      name: option.option,
      value: option.votes,
    });
  }
  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <select onChange={handleChange} value={selectedDemographic}>
        <option value="">Select</option>
        {demographicOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex items-center justify-center space-x-6">
        <DonutChart
          data={pieData}
          category="value"
          index="name"
          valueFormatter={dataFormatter}
          colors={COLORS.slice(0, pieData.length)}
          className="w-40"
        />
        <Legend
          categories={pieData.map((d) => d.name)}
          colors={COLORS.slice(0, pieData.length)}
          className="mx-auto mt-4 max-w-xs"
        />
      </div>

      <div className="mx-auto h-80 w-full max-w-screen-2xl">
        <BarChart
          data={barData}
          index="name"
          categories={
            isGenderSpecific
              ? Object.keys(barData[0] ?? {}).filter((key) => key !== "name")
              : ["votes"]
          }
          colors={COLORS}
          valueFormatter={dataFormatter}
          yAxisWidth={20}
        />
      </div>
    </div>
  );
}
