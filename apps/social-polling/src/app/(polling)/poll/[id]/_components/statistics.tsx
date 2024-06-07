"use client";

import { BarList, Card } from "@tremor/react";

export function Statistics({
  votes,
}: {
  votes: {
    genders: Record<string, number>;
    countries: Record<string, number>;
    relationships: Record<string, number>;
  };
}) {
  const genders = Object.keys(votes.genders).map((gender) => {
    return {
      name: gender,
      value: votes.genders[gender] ?? 0,
    };
  });

  const countries = Object.keys(votes.countries).map((country) => {
    return {
      name: country,
      value: votes.countries[country] ?? 0,
    };
  });

  const relationships = Object.keys(votes.relationships).map((relationship) => {
    return {
      name: relationship,
      value: votes.relationships[relationship] ?? 0,
    };
  });

  return (
    <div className="w-full">
      <Card className="mx-auto w-full">
        <h3 className="text-tremor-title text-tremor-content-strong font-medium">
          Poll Analytics
        </h3>{" "}
        <p className="text-tremor-default text-tremor-content mt-4 flex items-center justify-between">
          {" "}
          <span>Genders</span> <span>Votes</span>{" "}
        </p>
        <BarList className="mt-2 capitalize" data={genders} />
        <p className="text-tremor-default text-tremor-content mt-4 flex items-center justify-between">
          {" "}
          <span>Countries</span> <span>Votes</span>{" "}
        </p>
        <BarList className="mt-2 capitalize" data={countries} />
        <p className="text-tremor-default text-tremor-content mt-4 flex items-center justify-between">
          {" "}
          <span>Relationship Status</span> <span>Votes</span>{" "}
        </p>
        <BarList className="mt-2 capitalize" data={relationships} />
      </Card>
    </div>
  );
}
