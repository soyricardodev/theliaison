"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@theliaison/ui/button";
import { Input } from "@theliaison/ui/input";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@theliaison/ui";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@theliaison/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@theliaison/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { getFedexLocations } from "./actions";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
	hideTitle?: boolean;
	giftId: number;
	recipientId: string;
	senderId: string;
};

const ShippingFormSchema = z.object({
	postal_code: z
		.string({ required_error: "Your postal code is required" })
		.min(4, { message: "Your postal code should be at least 4 digits" }),
});

const ShippingForm = ({
	className,
	senderId,
	giftId,
	recipientId,
}: ShippingFormProps) => {
	const form = useForm<z.infer<typeof ShippingFormSchema>>({
		resolver: zodResolver(ShippingFormSchema),
	});

	const [fedexLocationData, setFedexLocationData] = useState<any>();

	async function onSubmit(data: z.infer<typeof ShippingFormSchema>) {
		toast.info("Getting fedex locations...");
		const fedexLocation = await getFedexLocations(data.postal_code);
		setFedexLocationData(fedexLocation?.locationDetailList);
		console.log(fedexLocation);
		toast.success("FedEx locations fetched successfully!");
		// console.log(data);
		// toast.promise(
		// 	validateRecipientAddress({
		// 		streetLines: [data.address_line_1 ?? ""],
		// 		city: data.city,
		// 		stateOrProvinceCode: data.country,
		// 		postalCode: data.postal_code,
		// 	}),
		// 	{
		// 		loading: "Validating address...",
		// 		success: async (validated) => {
		// 			if (validated) {
		// 				toast.promise(
		// 					confirmGiftFromRecipient({
		// 						sender_id: senderId,
		// 						address_line_1: data.address_line_1,
		// 						city: data.city,
		// 						country: data.country,
		// 						email: data.email,
		// 						name: data.name,
		// 						phone: data.phone,
		// 						postal_code: data.postal_code,
		// 						recipient_id: recipientId,
		// 						gift_id: giftId,
		// 					}),
		// 					{
		// 						loading: "Confirming gift...",
		// 						success: () => {
		// 							redirect("/details/thanks");
		// 						},
		// 						error: "Something went wrong confirming your gift",
		// 					},
		// 				);
		// 			}
		// 			return "Your address is invalid";
		// 		},
		// 		error: "Address validation failed",
		// 	},
		// );
	}

	return (
		<Form {...form}>
			<form
				className={cn("space-y-6 h-full dark", className)}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
					<FormField
						control={form.control}
						name="postal_code"
						render={({ field }) => (
							<FormItem className="w-full text-white">
								<FormLabel className="text-foreground">
									Postal Code/ZIP
								</FormLabel>
								<FormControl>
									<Input placeholder="90210" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Select>
					<SelectTrigger>
						Select a location
						<ChevronDownIcon className="ml-2 h-4 w-4" />
					</SelectTrigger>
					<SelectContent>
						{fedexLocationData?.map((location) => (
							<SelectItem
								value={location.distance.value}
								key={location.distance.value}
								className="grid grid-cols-2 gap-1 grid-flow-col"
							>
								<div>
									<p className="font-semibold">
										{location.contactAndAddress.address.streetLines[0]}
									</p>
									<p>{location.contactAndAddress.address.city}</p>
								</div>
								<div className="flex gap-2">
									<p className="font-semibold">{location.distance.value}</p>
									<p>{location.distance.units}</p>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Button
					type="submit"
					className="w-full bg-white text-black hover:bg-[#DBD0C5]"
				>
					Confirm
				</Button>
			</form>
		</Form>
	);
};

export default ShippingForm;
