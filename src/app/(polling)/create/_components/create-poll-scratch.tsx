"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FileImageIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { categories } from "~/lib/categories";
import { createPollWithOptions } from "~/server/db/queries";
import { createClient } from "~/utils/supabase/client";

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
				value: z.string({ required_error: "Please enter an option" }).min(3, {
					message: "Option must be at least 3 characters.",
				}),
			}),
		)
		.min(4)
		.max(6)
		.nonempty(),
});

export type PollFormValues = z.infer<typeof pollFormSchema>;

export function CreatePollScratch() {
	const supabase = createClient();
	const router = useRouter();
	const form = useForm<PollFormValues>({
		resolver: zodResolver(pollFormSchema),
		mode: "onChange",
		defaultValues: {
			question: "",
			options: [
				{
					value: "",
				},
				{
					value: "",
				},
			],
		},
	});

	const [pollImage, setPollImage] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);

	const [creatingPoll, setCreatingPoll] = useState(false);

	const inputImageRef = useRef<HTMLInputElement>(null);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "options",
	});

	const onSubmit = async (data: PollFormValues) => {
		try {
			toast.loading("Creating poll...");
			const pollToCreate = await createPollWithOptions(data, pollImage);
			toast.success("Poll created successfully");
			router.push(`/poll/${pollToCreate.id}`);
		} catch (error) {
			console.log(error);
			toast.error("Error creating poll");
		}
	};

	async function onUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
		try {
			setUploading(true);
			if (!event.target.files || event.target.files.length === 0) {
				toast.error("You must select an image to upload.");
				throw new Error("You must select an image to upload.");
			}

			const file = event.target.files[0];

			if (!file) {
				toast.error("You must select an image to upload.");
				throw new Error("You must select an image to upload.");
			}

			const fileExt = file.name.split(".").pop();
			const filePath = `${Math.random()}.${fileExt}`;

			const { error: uploadError } = await supabase.storage
				.from("polls")
				.upload(filePath, file);

			if (uploadError) {
				toast.error("Error uploading image");
				throw uploadError;
			}

			setPollImage(filePath);
		} catch (error) {
			console.log(error);
		} finally {
			setUploading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				className="grid gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					const formValues = form.getValues();
					// @ts-expect-error missing types
					const categories = formValues.categories.split(",");
					const parsed = pollFormSchema.safeParse({
						...formValues,
						categories,
					});

					if (!parsed.success) {
						toast.error("Invalid form data");
						return;
					}

					onSubmit(parsed.data);
				}}
			>
				<FormField
					control={form.control}
					name="question"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="What is the most important factor in maintaining a healthy relationship?"
									label="Question"
									type="text"
									isRequired
									required
									variant="bordered"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="categories"
					render={({ field }) => (
						<FormItem>
							<Select
								label="Categories"
								placeholder="Select your categories"
								selectionMode="multiple"
								isRequired
								required
								variant="bordered"
								{...field}
							>
								{categories.map((categorie) => (
									<SelectItem
										key={categorie.id}
										value={categorie.id}
										className="capitalize"
									>
										{categorie.name}
									</SelectItem>
								))}
							</Select>
						</FormItem>
					)}
				/>

				{fields.map((field, index) => (
					<FormField
						control={form.control}
						key={field.id}
						name={`options.${index}.value`}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										label={`Option ${index + 1}`}
										placeholder="Option"
										isRequired
										required
										endContent={
											index === 4 || index === 5 ? (
												<Button isIconOnly onPress={() => remove(index)}>
													<TrashIcon className="size-4 text-red-500" />
												</Button>
											) : null
										}
										variant="bordered"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}

				<div className="flex gap-1 justify-center items-center">
					<Button
						type="button"
						startContent={<PlusCircleIcon className="size-4" />}
						className="text-black w-full"
						onClick={() => {
							if (fields.length < 6) {
								append({ value: "" });
							} else {
								toast.error("You can only add 6 options");
							}
						}}
						variant="bordered"
					>
						Add option
					</Button>

					<input
						className="hidden"
						ref={inputImageRef}
						type="file"
						accept="image/*"
						onChange={onUploadImage}
						disabled={uploading}
					/>

					<Button
						type="button"
						startContent={<FileImageIcon className="size-4" />}
						className="text-black w-full"
						onClick={() => {
							inputImageRef.current?.click();
						}}
						variant="bordered"
						isDisabled={uploading}
						disabled={uploading}
						isLoading={uploading}
					>
						{uploading ? "Uploading ..." : "Upload image"}
					</Button>
				</div>
				<Button type="submit" className="w-full" color="secondary">
					Create poll
				</Button>
			</form>
		</Form>
	);
}
