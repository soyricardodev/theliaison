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
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";
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
import { useMediaQuery } from "~/hooks/use-media-query";
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
	question: "How do you feel about marvel?",
	options: [
		{
			value: "I don't know",
		},
		{
			value: "I really don't know",
		},
		{
			value: "Does not matter",
		},
		{
			value: "REAAAAAAAAALLY GOOOOOOOOD!!!!!!",
		},
	],
	categories: ["1"],
};

export function CreatePoll() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Create Poll</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] min-w-[650px]">
					<DialogHeader>
						<DialogTitle>Create a Poll</DialogTitle>
						<DialogDescription>
							Make your poll here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<CreatePollForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>Create Poll</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Create a Poll</DrawerTitle>
					<DrawerDescription>
						Make your poll here. Click save when you're done.
					</DrawerDescription>
				</DrawerHeader>
				<CreatePollForm className="px-4" />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function CreatePollForm({ className }: React.ComponentProps<"form">) {
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
		toast.message(
			<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
				<code className="text-white">{JSON.stringify(data, null, 2)}</code>
			</pre>,
		);

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
