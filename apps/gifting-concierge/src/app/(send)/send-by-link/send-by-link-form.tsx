"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@theliaison/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@theliaison/ui/form";
import { Input } from "@theliaison/ui/input";
import { Label } from "@theliaison/ui/label";
import { RadioGroup, RadioGroupItem } from "@theliaison/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@theliaison/ui/select";
import { MailIcon, PhoneIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { useServerAction } from "zsa-react";
import { sendByLinkSchema } from "../validators";
import { sendGiftFromLinkAction } from "./actions";

export function SendByLinkForm() {
	const { isPending, execute, error } = useServerAction(sendGiftFromLinkAction);

	const [contactMethod, setContactMethod] = useState<
		"email" | "phone" | "social"
	>("social");

	const form = useForm<z.infer<typeof sendByLinkSchema>>({
		resolver: zodResolver(sendByLinkSchema),
		mode: "onChange",
	});

	async function onSubmit(values: z.infer<typeof sendByLinkSchema>) {
		const [data, err] = await execute(values);

		toast.message(<pre>{JSON.stringify(data, null, 2)}</pre>);

		if (err) {
			//  show a toast or something
			toast.error(err.message);
			return;
		}

		// form.reset({ giftLink: "" });
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full max-w-xl mx-auto"
			>
				<FormField
					control={form.control}
					name="giftLink"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Gift Link</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="giftSpecifications"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Gift Specifications</FormLabel>
							<FormControl>
								<Input placeholder="Red" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="recipientName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recipient Name</FormLabel>
							<FormControl>
								<Input placeholder="name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Label htmlFor="social">Recipient Contact Method</Label>
				<RadioGroup
					defaultValue={contactMethod}
					className="grid grid-cols-3 gap-4"
					onValueChange={(value) =>
						setContactMethod(value as "email" | "phone" | "social")
					}
				>
					<div>
						<RadioGroupItem
							value="social"
							id="social"
							className="peer sr-only"
						/>
						<Label
							htmlFor="social"
							className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
						>
							<svg
								xmlns="http:www.w3.org/2000/svg"
								className="mb-3 size-6"
								width="44"
								height="44"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="#2c3e50"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Social</title>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
								<path d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
								<path d="M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
								<path d="M12 14m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
								<path d="M12 7l0 4" />
								<path d="M6.7 17.8l2.8 -2" />
								<path d="M17.3 17.8l-2.8 -2" />
							</svg>
							Social
						</Label>
					</div>
					<div>
						<RadioGroupItem value="email" id="email" className="peer sr-only" />
						<Label
							htmlFor="email"
							className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
						>
							<MailIcon className="mb-3 size-6" />
							Email
						</Label>
					</div>
					<div>
						<RadioGroupItem value="phone" id="phone" className="peer sr-only" />
						<Label
							htmlFor="phone"
							className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
						>
							<PhoneIcon className="mb-3 size-6" />
							Phone
						</Label>
					</div>
				</RadioGroup>

				{contactMethod === "social" ? (
					<div className="grid gap-2">
						<Label htmlFor="social-network">Social Network</Label>
						<Select
							onValueChange={(value) => {
								form.setValue("recipientSocial", value);
							}}
							required
						>
							<SelectTrigger id="social-network">
								<SelectValue placeholder="Social Network" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="facebook">Facebook</SelectItem>
								<SelectItem value="twitter">X (Twitter)</SelectItem>
								<SelectItem value="instagram">Instagram</SelectItem>
								<SelectItem value="linkedin">LinkedIn</SelectItem>
								<SelectItem value="github">Github</SelectItem>
								<SelectItem value="tiktok">TikTok</SelectItem>
								<SelectItem value="twitch">Twitch</SelectItem>
								<SelectItem value="youtube">YouTube</SelectItem>
								<SelectItem value="reddit">Reddit</SelectItem>
								<SelectItem value="kick">Kick</SelectItem>
							</SelectContent>
						</Select>
						<FormField
							control={form.control}
							name="recipientSocialHandle"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input
											placeholder="@recipient_social_handle"
											className=""
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				) : null}

				{contactMethod === "email" ? (
					<FormField
						control={form.control}
						name="recipientEmail"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Recipient Email</FormLabel>
								<FormControl>
									<Input placeholder="email" required {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				) : null}

				{contactMethod === "phone" ? (
					<FormField
						control={form.control}
						name="recipientPhone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Recipient Phone</FormLabel>
								<FormControl>
									<Input placeholder="phone" required {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				) : null}
				<Button disabled={isPending} type="submit" className="w-full">
					{isPending ? "Saving..." : "Save"}
				</Button>
				{error && <div>Error: {JSON.stringify(error.fieldErrors)}</div>}
			</form>
		</Form>
	);
}
