"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@theliaison/ui/button";
import { Input } from "@theliaison/ui/input";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@theliaison/ui";
import { usStates } from "~/lib/constants/cities";
import { confirmGiftFromRecipient, validateRecipientAddress } from "./actions";

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
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@theliaison/ui/select";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
	hideTitle?: boolean;
	giftId: number;
	recipientId: string;
	senderId: string;
};

const ShippingFormSchema = z.object({
	name: z.string({ required_error: "Your name is required" }),
	email: z
		.string({ required_error: "Your email is required" })
		.email({ message: "Invalid email" }),
	phone: z
		.string({ required_error: "Your phone number is required" })
		.min(10, { message: "Your phone should be at least 10 digits" }),
	address_line_1: z.string({ required_error: "Your address is required" }),
	city: z.string().optional(),
	state: z.string().optional(),
	apartment: z.string().optional(),
	postal_code: z
		.string({ required_error: "Your postal code is required" })
		.min(5, { message: "Your postal code should be at least 5 digits" }),
	country: z.string().default("US"),
});

const ShippingForm = ({
	className,
	senderId,
	giftId,
	recipientId,
}: ShippingFormProps) => {
	const form = useForm<z.infer<typeof ShippingFormSchema>>({
		resolver: zodResolver(ShippingFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address_line_1: "",
			state: "",
			city: "",
			apartment: "",
			postal_code: "",
			country: "US",
		},
	});

	function onSubmit(data: z.infer<typeof ShippingFormSchema>) {
		console.log(data);
		toast.promise(
			validateRecipientAddress({
				streetLines: [data.address_line_1 ?? ""],
				city: data.city,
				stateOrProvinceCode: data.country,
				postalCode: data.postal_code,
			}),
			{
				loading: "Validating address...",
				success: async (validated) => {
					if (validated) {
						toast.promise(
							confirmGiftFromRecipient({
								sender_id: senderId,
								address_line_1: data.address_line_1,
								city: data.city,
								country: data.country,
								email: data.email,
								name: data.name,
								phone: data.phone,
								postal_code: data.postal_code,
								recipient_id: recipientId,
								gift_id: giftId,
							}),
							{
								loading: "Confirming gift...",
								success: () => {
									redirect("/details/thanks");
								},
								error: "Something went wrong confirming your gift",
							},
						);
					}
					return "Your address is invalid";
				},
				error: "Address validation failed",
			},
		);
	}

	return (
		<Form {...form}>
			<form
				className={cn("space-y-6 h-full dark", className)}
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Email</FormLabel>
							<FormControl>
								<Input
									placeholder="your@email.com"
									className="text-white"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full text-white">
								<FormLabel className="text-foreground">Name</FormLabel>
								<FormControl>
									<Input
										placeholder="John Doe"
										className="w-full text-white"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="w-full text-white">
								<FormLabel className="text-foreground">Phone Number</FormLabel>

								<FormControl>
									<Input
										placeholder="+1 (555) 555-5555"
										className="w-full text-white"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
					<FormField
						control={form.control}
						name="address_line_1"
						render={({ field }) => (
							<FormItem className="w-full text-white">
								<FormLabel className="text-foreground">
									Address Line 1
								</FormLabel>
								<FormControl>
									<Input placeholder="Street 1, Lane 1" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="apartment"
						render={({ field }) => (
							<FormItem className="w-full text-white">
								<FormLabel className="text-foreground">
									Apt, suite, etc.
								</FormLabel>
								<FormControl>
									<Input placeholder="Apartment, studio, or floor" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem className="w-full text-white">
								<FormLabel className="text-foreground">City</FormLabel>
								<FormControl>
									<Input placeholder="City" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem className="w-full text-white">
								<FormLabel className="text-foreground">State</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="text-white">
											<SelectValue
												placeholder="Select your state"
												className="text-white"
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent className="dark">
										<SelectGroup>
											{usStates.map((state, _i) => (
												<SelectItem
													key={`${state.abbreviation}-${state.name}`}
													value={state.abbreviation}
													onSelect={() =>
														form.setValue("city", state.abbreviation)
													}
												>
													{state.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="w-full text-white">
								<FormLabel className="text-foreground">Country</FormLabel>
								<FormControl>
									<Input
										placeholder="United States"
										disabled
										className="text-foreground"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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
