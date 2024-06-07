"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { parseDate } from "@internationalized/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DateInput,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { countries } from "~/utils/countries";
import { createClient } from "~/utils/supabase/client";

const relationshipStatuses = [
  {
    label: "Single",
    value: "single",
  },
  {
    label: "Married",
    value: "married",
  },
  {
    label: "Divorced",
    value: "divorced",
  },
  {
    label: "Widowed",
    value: "widowed",
  },
  {
    label: "Separated",
    value: "separated",
  },
  {
    label: "Loving relationship",
    value: "loving relationship",
  },
];

const genders = [
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Other",
    value: "other",
  },
];

type Genders = "female" | "male" | "other";
type RelationshipStatus =
  | "single"
  | "married"
  | "divorced"
  | "widowed"
  | "separated"
  | "loving relationship";

export function UserDataForm({
  postUpdateData,
}: {
  postUpdateData: () => void;
}) {
  const [gender, setGender] = useState(new Set([]));
  const [relationshipStatus, setRelationshipStatus] =
    useState<RelationshipStatus>("single");
  const [country, setCountry] = useState<string>("US");
  const [city, setCity] = useState<string>("US");
  const [dob, setDob] = useState(parseDate("2024-04-04"));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      redirect("/signup");
    }

    const { data: userData, error: updateUserDataError } = await supabase
      .from("users")
      .update({
        gender: gender.currentKey as Genders,
        relationship_status:
          relationshipStatus.currentKey as RelationshipStatus,
        country: country.toString(),
        city: city.toString(),
        birthday_date: dob.toString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (updateUserDataError || !userData) {
      console.log(updateUserDataError, "updateUserDataError");
      return;
    }

    postUpdateData();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Select
        variant="bordered"
        label="Select your gender"
        placeholder="Select your gender"
        className="dark"
        isRequired
        selectedKeys={gender}
        onSelectionChange={setGender}
      >
        {genders.map((gender) => (
          <SelectItem key={gender.value} value={gender.value} className="dark">
            {gender.label}
          </SelectItem>
        ))}
      </Select>
      <DateInput
        className="dark"
        classNames={{
          input: "text-white",
          label: "text-white",
          inputWrapper: "text-white",
        }}
        variant="bordered"
        label="Date of birth"
        isRequired
        onChange={setDob}
        value={dob}
      />

      <Select
        variant="bordered"
        label="Select your relationship status"
        placeholder="Select your relationship status"
        className="dark"
        isRequired
        onSelectionChange={(value) => {
          setRelationshipStatus(String(value) as RelationshipStatus);
        }}
        value={relationshipStatus}
      >
        {relationshipStatuses.map((status) => (
          <SelectItem key={status.value} value={status.value} className="dark">
            {status.label}
          </SelectItem>
        ))}
      </Select>

      <Autocomplete
        defaultItems={countries}
        label="Select your country"
        placeholder="Select your country"
        className="dark"
        variant="bordered"
        onSelectionChange={(value) => {
          setCountry(String(value));
        }}
        value={country}
        isRequired
        defaultSelectedKey={"US"}
      >
        {(country) => (
          <AutocompleteItem
            value={country.isoCode}
            className="dark"
            key={country.isoCode}
          >
            {country.label}
          </AutocompleteItem>
        )}
      </Autocomplete>

      <Autocomplete
        defaultItems={countries}
        label="Select your state"
        placeholder="Select your state"
        className="dark"
        variant="bordered"
        onSelectionChange={(value) => {
          setCity(String(value));
        }}
        value={city}
        isRequired
        defaultSelectedKey={"US"}
      >
        {(state) => (
          <AutocompleteItem
            value={state.isoCode}
            className="dark"
            key={state.isoCode}
          >
            {state.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Button type="submit" color="secondary">
        Go to checkout
      </Button>
    </form>
  );
}
