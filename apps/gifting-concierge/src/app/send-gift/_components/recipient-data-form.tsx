"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@theliaison/ui";
import { Button } from "@theliaison/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@theliaison/ui/form";
import { Input } from "@theliaison/ui/input";
import { RadioGroup, RadioGroupItem } from "@theliaison/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@theliaison/ui/select";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const recipientSchema = z.object({
	recipient_name: z.string().min(1, "You need to enter a name"),
	knows_address: z.enum(["yes", "no"]),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	postal_code: z.string().optional(),
	country: z.string().optional(),
	has_contact: z.enum(["yes", "no"]),
	phone: z.string().optional(),
	email: z.string().email("Please provide a valid email").optional(),
	social_platform: z.string().optional(),
	social_handle: z.string().optional(),
});

type RecipientDataFormValues = z.infer<typeof recipientSchema>;

const giftSchema = z.object({
	sender_id: z.number().int().positive(),
	recipient_id: z.number().int().positive(),
	status: z.enum([
		"awaiting_recipient_confirmation",
		"awaiting_invoice_payment",
		"preparing_gift",
		"shipped",
		"delivered",
		"cancelled",
	]),
});

const giftPaymentSchema = z.object({
	gift_id: z.number().int().positive(),
	delivery_fee: z.number().optional(),
	service_fee: z.number().optional(),
	total_price: z.number().optional(),
	invoice_link: z.string().url().optional(),
	payment_status: z.enum(["pending", "paid", "failed"]).optional(),
});

const giftShippingSchema = z.object({
	gift_id: z.number().int().positive(),
	shipping_status: z.enum([
		"not_shipped",
		"in_transit",
		"near_delivery",
		"delivered",
	]),
	tracking_number: z.string().optional(),
});

export const RecipientDataForm = () => {
	const [[page, direction], setPage] = React.useState([0, 0]);

	const form = useForm<RecipientDataFormValues>({
		resolver: zodResolver(recipientSchema),
		defaultValues: {
			knows_address: "no",
			has_contact: "yes",
		},
	});

	const knowsAddress = form.watch("knows_address");
	const hasContact = form.watch("has_contact");

	const onSubmit = (values: RecipientDataFormValues) => {
		console.log(values);
		return;
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 20 : -20,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 20 : -20,
			opacity: 0,
		}),
	};

	const paginate = (newDirection: number) => {
		if (page + newDirection < 0 || page + newDirection > 2) return;

		setPage([page + newDirection, newDirection]);
	};

	const formCtaLabel = React.useMemo(() => {
		switch (page) {
			case 0:
				return "Continue to send gift";
			case 1:
				return "Finish gift";
			case 2:
				return "Place gift";
			default:
				return "Continue to shipping";
		}
	}, [page]);

	const formStepTitle = React.useMemo(() => {
		switch (page) {
			case 0:
				return "Give Us some information";
			case 1:
				return "Who do you want to send the gift to?";
			case 2:
				return "Confirm and Finish";
			default:
				return "Review your gift";
		}
	}, [page]);

	const formStepsContent = React.useMemo(() => {
		switch (page) {
			case 0:
				return (
					<>
						<FormField
							control={form.control}
							name="recipient_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Recipient Name</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormDescription>
										This is the name of the recipient. It will be used to create
										the gift.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="knows_address"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Did you know the address?</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="yes" />
												</FormControl>
												<FormLabel className="font-normal">
													Yes, I know the address
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="no" />
												</FormControl>
												<FormLabel className="font-normal">
													No, I don't know the address
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				);
			case 1:
				return knowsAddress === "yes" ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-1">
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Recipient Address</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Recipient city</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Recipient state</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="postal_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Recipient postal_code</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Recipient country</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				) : (
					<FormField
						control={form.control}
						name="has_contact"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>
									Did you have any other contact information? (Instagram, Phone,
									Email, etc.)
								</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-1"
									>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="yes" />
											</FormControl>
											<FormLabel className="font-normal">
												Yes, I have other contact information (social media,
												email, etc.)
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="no" />
											</FormControl>
											<FormLabel className="font-normal">
												No, I don't have other contact information
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				);
			case 2:
				return (
					<>
						{hasContact === "yes" && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4">
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Recipient Phone Number</FormLabel>
											<FormControl>
												<Input placeholder="+1 (555) 555-5555" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Recipient Email</FormLabel>
											<FormControl>
												<Input placeholder="recipient@email.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="social_platform"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Social Platform</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a Social Platform" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="facebook">Facebook</SelectItem>
													<SelectItem value="instagram">Instagram</SelectItem>
													<SelectItem value="twitch">Twitch</SelectItem>
													<SelectItem value="tiktok">Tiktok</SelectItem>
													<SelectItem value="x">X (Twitter)</SelectItem>
													<SelectItem value="snapchat">Snapchat</SelectItem>
													<SelectItem value="youtube">Youtube</SelectItem>
													<SelectItem value="linkedin">LinkedIn</SelectItem>
													<SelectItem value="github">Github</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="social_handle"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Social Handle</FormLabel>
											<FormControl>
												<Input
													placeholder="@recipient_social_handle"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}
					</>
				);
			default:
				return null;
		}
	}, [page, form.control, knowsAddress, hasContact]);

	return (
		<Form {...form}>
			<AnimatePresence custom={direction} initial={false} mode="wait">
				<LazyMotion features={domAnimation}>
					<m.form
						// onSubmit={(e) => {
						// 	e.preventDefault();
						// 	form.handleSubmit(onSubmit);
						// }}
						key={page}
						animate="center"
						className="mt-8 flex flex-col gap-3"
						custom={direction}
						exit="exit"
						initial="enter"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
						variants={variants}
						onSubmit={(e) => {
							e.preventDefault();
							console.log("submit", e);
						}}
					>
						<h4 className="text-lg font-bold">{formStepTitle}</h4>
						{formStepsContent}
						<div className="w-full flex justify-end gap-2">
							<Button
								type="button"
								onClick={() => paginate(-1)}
								variant={"outline"}
							>
								Go Back
							</Button>
							<Button
								className="bg-foreground text-background"
								onClick={() => paginate(1)}
								type="button"
							>
								{formCtaLabel}
							</Button>
						</div>

						<Button
							type="submit"
							className={cn("hidden", {
								block: page === 2,
							})}
						>
							Create
						</Button>
					</m.form>
				</LazyMotion>
			</AnimatePresence>
		</Form>
	);
};
