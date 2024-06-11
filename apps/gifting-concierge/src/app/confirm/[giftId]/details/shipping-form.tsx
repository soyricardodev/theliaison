"use client";

import type { InputProps } from "@nextui-org/react";

import {
	Autocomplete,
	AutocompleteItem,
	Avatar,
	Button,
	Input,
} from "@nextui-org/react";
import type React from "react";

import { cn } from "@theliaison/ui";
import { confirmGiftFromRecipient } from "./actions";
import countries from "./countries";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
	variant?: InputProps["variant"];
	hideTitle?: boolean;
	giftId: string;
};

const ShippingForm = ({
	variant = "flat",
	className,
	hideTitle,
	giftId,
}: ShippingFormProps) => {
	return (
		<form
			className={cn("flex flex-col gap-4", className)}
			action={confirmGiftFromRecipient}
		>
			{!hideTitle && (
				<span className="relative text-foreground-500">
					Shipping Information
				</span>
			)}
			<input type="hidden" name="gift_id" value={giftId} />
			<Input
				isRequired
				label="Email address"
				labelPlacement="outside"
				placeholder="Enter your email"
				name="recipient_email"
				type="email"
				variant={variant}
			/>
			<div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
				<Input
					isRequired
					label="First name"
					labelPlacement="outside"
					placeholder="Enter your first name"
					name="recipient_first_name"
					variant={variant}
				/>
				<Input
					isRequired
					label="Last name"
					labelPlacement="outside"
					name="recipient_last_name"
					placeholder="Enter your last name"
					variant={variant}
				/>
			</div>
			<div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
				<Input
					isRequired
					label="Address"
					labelPlacement="outside"
					placeholder="Lane 1, Street 1"
					name="recipient_address"
					variant={variant}
				/>
				<Input
					label="Apt, suite, etc."
					labelPlacement="outside"
					placeholder="Apartment, studio, or floor"
					name="recipient_apartment"
					variant={variant}
				/>
			</div>
			<div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
				<Input
					isRequired
					label="City"
					labelPlacement="outside"
					placeholder="Enter your city"
					name="recipient_city"
					variant={variant}
				/>
				<Autocomplete
					isRequired
					defaultItems={countries}
					label="Country"
					labelPlacement="outside"
					placeholder="Select country"
					name="recipient_country"
					showScrollIndicators={false}
					variant={variant}
				>
					{(item) => (
						<AutocompleteItem
							key={item.code}
							startContent={
								<Avatar
									alt="Country Flag"
									className="h-6 w-6"
									src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
								/>
							}
							value={item.code}
						>
							{item.name}
						</AutocompleteItem>
					)}
				</Autocomplete>
			</div>
			<div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
				<Input
					isRequired
					label="Postal code"
					labelPlacement="outside"
					placeholder="12345"
					name="recipient_pc"
					variant={variant}
				/>
				<Input
					isRequired
					label="Phone number"
					name="recipient_phone"
					labelPlacement="outside"
					placeholder="+1 (555) 555-5555"
					variant={variant}
				/>
			</div>
			<Button type="submit" color="primary">
				Confirm
			</Button>
		</form>
	);
};

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
