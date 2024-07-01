"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { cn } from "@theliaison/ui";
import { Button, buttonVariants } from "@theliaison/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@theliaison/ui/drawer";
import { Particles } from "@theliaison/ui/magicui/particles";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@theliaison/ui/form";
import { motion, useInView } from "framer-motion";
import {
	GiftIcon,
	StoreIcon,
	LinkIcon,
	Link2Icon,
	MailIcon,
	TwitterIcon,
	PhoneIcon,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@theliaison/ui/input";
import { RadioGroup, RadioGroupItem } from "@theliaison/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@theliaison/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@theliaison/ui/card";
import { Label } from "@theliaison/ui/label";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export function Hero() {
	const [isInitialDrawerState, setIsInitialDrawerState] = useState(true);
	const [showSendGiftFromLink, setShowSendGiftFromLink] = useState(false);
	const [showSendCustomGift, setShowSendCustomGift] = useState(false);

	const fadeInRef = useRef(null);
	const fadeInInView = useInView(fadeInRef, {
		once: true,
	});

	const fadeUpVariants = {
		initial: {
			opacity: 0,
			y: 24,
		},
		animate: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<section
			id="hero"
			className="relative h-full mx-auto z-10 mt-28 max-w-[80rem] px-6 text-center md:px-8"
		>
			<Particles
				className="absolute inset-0 -z-10"
				quantity={100}
				ease={80}
				color={"#000000"}
				refresh
			/>
			<motion.h1
				ref={fadeInRef}
				className="text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.1,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				<strong>Secure and Private Gifting.</strong>{" "}
				<span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary/80">
					Made Easy.
				</span>
			</motion.h1>
			<motion.p
				className="text-balance text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-black via-gray-700 to-gray-400 md:text-xl mb-12"
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.2,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				Gift Effortlessly, Surprise Instantly.
				<br />
				<strong>No Address Needed.</strong>
			</motion.p>

			<motion.div
				animate={fadeInInView ? "animate" : "initial"}
				variants={fadeUpVariants}
				className="grid grid-cols-1 gap-2 mx-auto w-full max-w-sm"
				initial={false}
				transition={{
					duration: 0.6,
					delay: 0.3,
					ease: [0.21, 0.47, 0.32, 0.98],
					type: "spring",
				}}
			>
				<Drawer>
					<DrawerTrigger asChild>
						<Button size="lg" className="flex gap-2 items-center text-base">
							Choose Gift
							<GiftIcon className="size-5 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
						</Button>
					</DrawerTrigger>
					<DrawerContent className="max-w-[361px] mx-auto rounded-[36px] bg-[#FEFFFE]">
						<div className="px-6 pb-6 pt-2 5">
							<DrawerClose asChild>
								<button
									className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
									type="button"
									style={{ top: 28, right: 28 }}
								>
									<svg
										width="12"
										height="12"
										viewBox="0 0 12 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="vaul-scrollable"
									>
										<title>Close</title>
										<path
											d="M10.4854 1.99998L2.00007 10.4853"
											stroke="#999999"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M10.4854 10.4844L2.00007 1.99908"
											stroke="#999999"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</DrawerClose>

							{showSendCustomGift ? (
								<>
									<SendGiftHeader
										descriptions={[
											{
												text: "Give us a way to contact the recipient.",
												icon: (
													<LinkIcon className="size-6" width={24} height={24} />
												),
											},
											{
												text: "We will send the gift to the recipient's email address.",
												icon: (
													<MailIcon className="size-6" width={24} height={24} />
												),
											},
										]}
										heading="Send a custom gift"
										headingIcon={<GiftIcon className="size-[48px]" />}
									/>
									<SendCustomGift
										cancelFunction={() => {
											setShowSendCustomGift(false);
											setIsInitialDrawerState(true);
										}}
									/>
								</>
							) : null}

							{showSendGiftFromLink ? (
								<>
									<SendGiftHeader
										descriptions={[
											{
												text: "Give us a way to contact the recipient",
												icon: (
													<LinkIcon className="size-6" width={24} height={24} />
												),
											},
											{
												text: "We will send the gift to the recipient's email address.",
												icon: (
													<MailIcon className="size-6" width={24} height={24} />
												),
											},
										]}
										heading="Send a Gift from a link"
										headingIcon={<Link2Icon className="size-[48px]" />}
									/>

									<SendGiftFromLink
										cancelFunction={() => {
											setShowSendGiftFromLink(false);
											setIsInitialDrawerState(true);
										}}
									/>
								</>
							) : null}

							{isInitialDrawerState ? (
								<>
									<header className="mb-4 -mt-6 flex h-[72px] items-center border-b border-[#F7F7F7] pl-2">
										<h2 className="text-[19px] font-semibold text-[#222222] md:font-medium">
											Options
										</h2>
									</header>
									<div className="space-y-3">
										<a
											href="/giftshop"
											className="textLeft flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
										>
											<StoreIcon />
											Our Gifts Shop
										</a>
										<button
											type="button"
											className="textLeft flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
											onClick={() => {
												setShowSendCustomGift(true);
												setIsInitialDrawerState(false);
											}}
										>
											<GiftIcon />
											Send a custom gift
										</button>
										<button
											type="button"
											className="textLeft flex h-12 w-full items-center gap-[15px] rounded-[16px] bg-[#F7F8F9] px-4 text-[17px] font-semibold text-[#222222] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium"
											onClick={() => {
												setShowSendGiftFromLink(true);
												setIsInitialDrawerState(false);
											}}
										>
											<LinkIcon />
											Send a gift from a link
										</button>
									</div>
								</>
							) : null}
						</div>
					</DrawerContent>
				</Drawer>

				<Link
					href="/how-it-works"
					className={cn(
						buttonVariants({ variant: "ghost", size: "lg" }),
						"text-base",
					)}
				>
					How it Works
				</Link>
			</motion.div>
		</section>
	);
}

function SendGiftHeader({
	descriptions,
	heading,
	headingIcon,
}: {
	heading: string | JSX.Element;
	headingIcon: JSX.Element;
	descriptions: Array<{ text: string; icon: JSX.Element }>;
}) {
	return (
		<>
			<header className="mt-[21px] border-b border-[#F5F5F5] pb-6">
				{headingIcon}
				<h2 className="mt-2.5 text-[22px] font-semibold text-[#222222] md:font-medium">
					{heading}
				</h2>
			</header>
			<ul className="mt-1">
				{descriptions.map((description, index) => (
					<li
						key={`${index}-${description.text}`}
						className="grid grid-cols-[25px_1fr] items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium"
					>
						{description.icon}
						{description.text}
					</li>
				))}
			</ul>
		</>
	);
}

const sendGiftFromLinkSchema = z.object({
	recipientName: z.string().min(1, { message: "Recipient name is required" }),
	recipientEmail: z
		.string()
		.email({ message: "Invalid email" })
		.min(4, { message: "Email length should be atleast 4 characters" })
		.optional(),
	recipientSocial: z.string().optional(),
	recipientSocialHandle: z
		.string()
		.optional()
		.refine(
			(value) => {
				if (!value) return false;
				return value.startsWith("@");
			},
			{ message: "Should start with @" },
		),
	recipientPhone: z.string().optional(),
	giftLink: z.string().url({ message: "Invalid URL" }),
});

function SendGiftFromLink({ cancelFunction }: { cancelFunction: () => void }) {
	const [contactMethod, setContactMethod] = useState<
		"email" | "phone" | "social"
	>("social");

	const form = useForm<z.infer<typeof sendGiftFromLinkSchema>>({
		resolver: zodResolver(sendGiftFromLinkSchema),
		mode: "onChange",

		defaultValues: {
			recipientName: "",
			recipientEmail: "",
			recipientSocial: "",
			recipientSocialHandle: "",
			recipientPhone: "",
			giftLink: "",
		},
	});

	function handleSubmit(data: z.infer<typeof sendGiftFromLinkSchema>) {
		console.log(data);
	}

	const { formState } = form;

	return (
		<div className="mt-7 flex flex-col gap-4">
			<Form {...form}>
				<form
					id="send-gift-from-link-form"
					name="send-gift-from-link-form"
					className="flex w-full flex-col gap-3"
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<FormField
						control={form.control}
						name="recipientName"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Recipient Name</FormLabel>
								<FormControl>
									<Input
										required
										placeholder="John Doe"
										className=""
										{...field}
									/>
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
								<TwitterLogoIcon className="mb-3 size-6" />
								Social
							</Label>
						</div>
						<div>
							<RadioGroupItem
								value="email"
								id="email"
								className="peer sr-only"
							/>
							<Label
								htmlFor="email"
								className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<MailIcon className="mb-3 size-6" />
								Email
							</Label>
						</div>
						<div>
							<RadioGroupItem
								value="phone"
								id="phone"
								className="peer sr-only"
							/>
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
								<FormItem className="w-full">
									<FormLabel>Recipient Email</FormLabel>
									<FormControl>
										<Input
											placeholder="johndoe@example.com"
											className=""
											{...field}
										/>
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
								<FormItem className="w-full">
									<FormLabel>Recipient Phone</FormLabel>
									<FormControl>
										<Input
											placeholder="+1 (555) 555-5555"
											className=""
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : null}

					<FormField
						control={form.control}
						name="giftLink"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Gift Link</FormLabel>
								<FormControl>
									<Input
										required
										placeholder="https://gift.example.com"
										className=""
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<div className="flex gap-4">
				<button
					type="button"
					className="flex h-12 w-full items-center justify-center gap-[15px] rounded-full text-center text-[19px] font-semibold transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium bg-[#F0F2F4] text-[#222222]"
					onClick={cancelFunction}
				>
					Cancel
				</button>
				<button
					type="submit"
					form="send-gift-from-link-form"
					className="flex h-12 w-full items-center justify-center gap-[15px] rounded-full text-center text-[19px] font-semibold transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium bg-primary text-white"
					onClick={() => {
						console.log(form.getValues());
						console.log({
							form,
							formState,
							errors: formState.errors,
							isValid: formState.isValid,
						});
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
}

function SendCustomGift({ cancelFunction }: { cancelFunction: () => void }) {
	const [contactMethod, setContactMethod] = useState<
		"email" | "phone" | "social"
	>("social");

	const form = useForm<z.infer<typeof sendGiftFromLinkSchema>>({
		resolver: zodResolver(sendGiftFromLinkSchema),
		mode: "onChange",

		defaultValues: {
			recipientName: "",
			recipientEmail: "",
			recipientSocial: "",
			recipientSocialHandle: "",
			recipientPhone: "",
		},
	});

	function handleSubmit(data: z.infer<typeof sendGiftFromLinkSchema>) {
		console.log(data);
	}

	const { formState } = form;

	return (
		<div className="mt-7 flex flex-col gap-4">
			<Form {...form}>
				<form
					id="send-gift-from-link-form"
					name="send-gift-from-link-form"
					className="flex w-full flex-col gap-3"
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<FormField
						control={form.control}
						name="recipientName"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Recipient Name</FormLabel>
								<FormControl>
									<Input
										required
										placeholder="John Doe"
										className=""
										{...field}
									/>
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
								<TwitterLogoIcon className="mb-3 size-6" />
								Social
							</Label>
						</div>
						<div>
							<RadioGroupItem
								value="email"
								id="email"
								className="peer sr-only"
							/>
							<Label
								htmlFor="email"
								className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<MailIcon className="mb-3 size-6" />
								Email
							</Label>
						</div>
						<div>
							<RadioGroupItem
								value="phone"
								id="phone"
								className="peer sr-only"
							/>
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
								<FormItem className="w-full">
									<FormLabel>Recipient Email</FormLabel>
									<FormControl>
										<Input
											placeholder="johndoe@example.com"
											className=""
											{...field}
										/>
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
								<FormItem className="w-full">
									<FormLabel>Recipient Phone</FormLabel>
									<FormControl>
										<Input
											placeholder="+1 (555) 555-5555"
											className=""
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : null}
				</form>
			</Form>
			<div className="flex gap-4">
				<button
					type="button"
					className="flex h-12 w-full items-center justify-center gap-[15px] rounded-full text-center text-[19px] font-semibold transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium bg-[#F0F2F4] text-[#222222]"
					onClick={cancelFunction}
				>
					Cancel
				</button>
				<button
					type="submit"
					form="send-gift-from-link-form"
					className="flex h-12 w-full items-center justify-center gap-[15px] rounded-full text-center text-[19px] font-semibold transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-95 md:font-medium bg-primary text-white"
					onClick={() => {
						console.log(form.getValues());
						console.log({
							form,
							formState,
							errors: formState.errors,
							isValid: formState.isValid,
						});
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
}
