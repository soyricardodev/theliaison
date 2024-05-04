"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { createPollWithOptions } from "~/server/db/queries";

const categories = [
	{
		id: 1,
		value: "trending",
	},
	{
		id: 2,
		value: "relationships",
	},
	{
		id: 3,
		value: "dating",
	},
	{
		id: 4,
		value: "sex",
	},
	{
		id: 5,
		value: "self care",
	},
	{
		id: 6,
		value: "entertainment",
	},
] as const;

const pollFormSchema = z.object({
	question: z.string({ required_error: "Please enter a question" }).min(3, {
		message: "Question must be at least 3 characters.",
	}),
	categories: z
		.array(z.string())
		.refine((value) => value.some((item) => item), {
			message: "You have to select at least one category.",
		}),
	options: z
		.array(
			z.object({
				value: z.string(),
			}),
		)
		.max(4),
});

export type PollFormValues = z.infer<typeof pollFormSchema>;

const defaultValues: Partial<PollFormValues> = {
	question:
		"What is the most important factor in maintaining a healthy relationship?",
	options: [
		{
			value: "Communication",
		},
		{
			value: "Trust",
		},
		{
			value: "Empathy",
		},
		{
			value: "Honesty",
		},
	],
	categories: ["2"],
};

export function CreatePollForm({ className }: React.ComponentProps<"form">) {
	const router = useRouter();
	const form = useForm<PollFormValues>({
		resolver: zodResolver(pollFormSchema),
		defaultValues,
		mode: "onChange",
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "options",
	});

	async function onSubmit(data: PollFormValues) {
		toast.promise(createPollWithOptions(data), {
			loading: "Creating poll",
			success: () => {
				router.refresh();
				return "Poll created successfully";
			},
			error: "Error creating poll",
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("grid items-start gap-4", className)}
			>
				<FormField
					control={form.control}
					name="question"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base">Question</FormLabel>
							<FormControl>
								<Input placeholder="How do you feel about this?" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="categories"
					render={() => (
						<FormItem>
							<div className="mb-4">
								<FormLabel className="text-base">Categories</FormLabel>
								<FormDescription>
									Select the categories you want to display in the poll.
								</FormDescription>
							</div>
							{categories.map((category) => (
								<FormField
									key={category.id}
									control={form.control}
									name="categories"
									render={({ field }) => {
										return (
											<FormItem
												key={category.id}
												className="flex flex-row items-start space-x-3 space-y-0 text-base"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(String(category.id))}
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([
																		...field.value,
																		String(category.id),
																	])
																: field.onChange(
																		field.value?.filter(
																			(value) => value !== String(category.id),
																		),
																	);
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal capitalize">
													{category.value}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
						</FormItem>
					)}
				/>

				<div className="flex flex-col gap-2">
					<div className="mb-4">
						<FormLabel className="text-base">Options</FormLabel>
						<FormDescription>Write the options of your poll.</FormDescription>
					</div>
					{fields.map((field, index) => (
						<FormField
							control={form.control}
							key={field.id}
							name={`options.${index}.value`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Option {index + 1}</FormLabel>
									<FormControl>
										<Input placeholder="Option" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
				</div>
				<Button type="submit">Save changes</Button>
			</form>
		</Form>
	);
}
