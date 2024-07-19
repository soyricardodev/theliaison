"use client";

import { type SVGProps, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
	Input,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	Textarea,
} from "@nextui-org/react";
import {
	EmbeddedCheckout,
	EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { cn } from "@theliaison/ui";
import { Button } from "@theliaison/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@theliaison/ui/form";
import { Step, Stepper, useStepper } from "@theliaison/ui/stepper";
import { toast } from "sonner";
import { env } from "~/env";
import { useFormStore } from "./form-store";
import {
	MailIcon,
	PhoneIcon,
	TwitchIcon as LucideTwitchIcon,
	UserIcon,
} from "lucide-react";

const steps: Array<{ label: string; description: string }> = [
	{
		label: "Gift Link",
		description: "Provide gift links and we'll take care of the rest.",
	},
	{
		label: "Recipient Info",
		description:
			"Share recipient's name and contact info (phone/email/social media).",
	},
	{
		label: "Pay for Service",
		description: "Pay $10 to let us send the gift anonymously.",
	},
];

const _customGiftSteps = [
	{
		label: "Send a Thoughtful Gift",
		description:
			"Provide recipient's name and contact info (phone/email/social media).",
	},
	{
		label: "Pay for Service",
		description: "Pay $10 to let us send the gift anonymously.",
	},
];

export function StepperForm() {
	return (
		<div className="flex w-full flex-col gap-4">
			<Stepper variant="circle-alt" initialStep={0} steps={steps}>
				{steps.map((stepProps, index) => {
					if (index === 0) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<FirstStepForm />
							</Step>
						);
					}

					if (index === 1) {
						return (
							<Step key={stepProps.label} {...stepProps}>
								<SecondStepForm />
							</Step>
						);
					}

					return (
						<Step key={stepProps.label} {...stepProps}>
							<ThirdStepForm />
						</Step>
					);
				})}
				<MyStepperFooter />
			</Stepper>
		</div>
	);
}

const FirstFormSchema = z.object({
	giftLink: z.string().url({ message: "Invalid URL" }),
	giftSpecifications: z
		.string()
		.min(5, { message: "Gift specifications are required" }),
});

function FirstStepForm() {
	const { nextStep } = useStepper();
	const { setGiftLink, setGiftSpecifications } = useFormStore();

	const form = useForm<z.infer<typeof FirstFormSchema>>({
		resolver: zodResolver(FirstFormSchema),
		defaultValues: { giftLink: "", giftSpecifications: "" },
	});

	function onSubmit(data: z.infer<typeof FirstFormSchema>) {
		setGiftLink(data.giftLink);
		setGiftSpecifications(data.giftSpecifications);
		nextStep();
		toast("First step submitted!");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="giftLink"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="url"
									label="Gift Link"
									placeholder="Link to the gift you'd like to send"
									labelPlacement="outside"
									startContent={
										<div className="pointer-events-none flex items-center">
											<LinkIcon className="text-xl" />
										</div>
									}
									description="Paste the link to the gift you want to send."
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="giftSpecifications"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									label="Gift Specifications"
									placeholder="Order details such as size, color, quantity."
									labelPlacement="outside"
									description="Give us a little more information about the product like size, color, quantity, etc."
									startContent={
										<div className="pointer-events-none flex items-center">
											<PenIcon className="text-xl" />
										</div>
									}
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>
				<StepperFormActions />
			</form>
		</Form>
	);
}

const SecondFormSchema = z.object({
	recipientContactWay: z.enum(["email", "phone", "social"]),
	recipientName: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	recipientEmail: z.string().email({ message: "Invalid email" }).optional(),
	recipientPhoneNumber: z.string().optional(),
	recipientSocialPlatform: z.string().optional(),
	recipientSocialHandle: z.string().optional(),
});

function SecondStepForm() {
	const { nextStep } = useStepper();
	const {
		setRecipientContactWay,
		recipientContactWay,
		setRecipientEmail,
		setRecipientPhoneNumber,
		setRecipientSocialPlatform,
		setRecipientSocialHandle,
		setRecipientName,
	} = useFormStore();

	const form = useForm<z.infer<typeof SecondFormSchema>>({
		resolver: zodResolver(SecondFormSchema),
		defaultValues: {
			recipientContactWay: "email",
		},
	});

	function onSubmit(data: z.infer<typeof SecondFormSchema>) {
		setRecipientContactWay(data.recipientContactWay);
		setRecipientEmail(data.recipientEmail);
		setRecipientPhoneNumber(data.recipientPhoneNumber);
		setRecipientSocialPlatform(data.recipientSocialPlatform);
		setRecipientSocialHandle(data.recipientSocialHandle);
		setRecipientName(data.recipientName);

		nextStep();
		toast("Second step submitted!");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 mt-12 flex flex-col gap-4"
			>
				<RadioGroup
					defaultValue={recipientContactWay}
					onValueChange={(value) =>
						setRecipientContactWay(value as "email" | "phone" | "social")
					}
					classNames={{
						wrapper: cn("flex flex-row items-center justify-center"),
						base: cn("flex items-center justify-center gap-4"),
					}}
					label="Select a way to contact the recipient"
				>
					<CustomRadio description="" value="email">
						<MailIcon className="mb-3 text-5xl" />
						Email
					</CustomRadio>
					<CustomRadio description="" value="phone">
						<PhoneIcon className="mb-3 text-5xl" />
						Phone
					</CustomRadio>
					<CustomRadio description="" value="social">
						<LucideTwitchIcon className="mb-3 text-5xl" />
						Social
					</CustomRadio>
				</RadioGroup>

				<FormField
					control={form.control}
					name="recipientName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="John Doe"
									label="Recipient Name"
									labelPlacement="outside"
									startContent={<UserIcon className="text-xl" />}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{recipientContactWay === "email" ? (
					<FormField
						control={form.control}
						name="recipientEmail"
						render={({ field }) => (
							<FormControl>
								<Input
									type="email"
									label="Email"
									placeholder="recipient@gmail.com"
									labelPlacement="outside"
									startContent={
										<div className="pointer-events-none flex items-center">
											<MailIcon className="text-base" />
										</div>
									}
									description="Enter the recipient's email address."
									{...field}
								/>
							</FormControl>
						)}
					/>
				) : null}

				{recipientContactWay === "phone" ? (
					<FormField
						control={form.control}
						name="recipientPhoneNumber"
						render={({ field }) => (
							<FormControl>
								<Input
									label="Phone Number"
									placeholder="+1 (555) 555-5555"
									labelPlacement="outside"
									startContent={
										<div className="pointer-events-none flex items-center">
											<PhoneIcon className="text-base" />
										</div>
									}
									description="Enter the recipient's phone number with country code."
									{...field}
								/>
							</FormControl>
						)}
					/>
				) : null}

				{recipientContactWay === "social" ? (
					<>
						<FormField
							control={form.control}
							name="recipientSocialPlatform"
							render={({ field }) => (
								<FormControl>
									<Select
										label="Social Platform"
										placeholder="Facebook / Twitter / Instagram / Snapchat"
										labelPlacement="outside"
										onChange={(value) => field.onChange(value)}
										startContent={<ChatRoundIcon className="text-xl" />}
									>
										<SelectItem
											key="facebook"
											startContent={<FacebookIcon className="text-xl" />}
										>
											Facebook
										</SelectItem>
										<SelectItem
											key="x"
											startContent={<XIcon className="text-xl" />}
										>
											X (Twitter)
										</SelectItem>
										<SelectItem
											key="instagram"
											startContent={
												<InstagramIcon className="text-xl text-black" />
											}
										>
											Instagram
										</SelectItem>
										<SelectItem
											key="snapchat"
											startContent={<SnapchatIcon className="text-xl" />}
										>
											Snapchat
										</SelectItem>
										<SelectItem
											key="tiktok"
											startContent={<TikTokIcon className="text-xl" />}
										>
											TikTok
										</SelectItem>
										<SelectItem
											key="youtube"
											startContent={<YouTubeIcon className="text-xl" />}
										>
											YouTube
										</SelectItem>
										<SelectItem
											key="reddit"
											startContent={<RedditIcon className="text-xl" />}
										>
											Reddit
										</SelectItem>
										<SelectItem
											key="kick"
											startContent={<KickIcon className="text-xl" />}
										>
											Kick
										</SelectItem>
										<SelectItem
											key="twitch"
											startContent={<TwitchIcon className="text-xl" />}
										>
											Twitch
										</SelectItem>
										<SelectItem
											key="github"
											startContent={<GithubIcon className="text-xl" />}
										>
											Github
										</SelectItem>
										<SelectItem
											key="telegram"
											startContent={<TelegramIcon className="text-xl" />}
										>
											Telegram
										</SelectItem>
										<SelectItem
											key="threads"
											startContent={<ThreadsIcon className="text-xl" />}
										>
											Threads
										</SelectItem>
									</Select>
								</FormControl>
							)}
						/>

						<FormField
							control={form.control}
							name="recipientSocialHandle"
							render={({ field }) => (
								<FormControl>
									<Input
										label="Recipient Social Handle"
										placeholder="@recipient_social_handle"
										labelPlacement="outside"
										startContent={
											<div className="pointer-events-none flex items-center">
												<LucideTwitchIcon className="text-base" />
											</div>
										}
										description="This is the username of the recipient's social media account."
										{...field}
									/>
								</FormControl>
							)}
						/>
					</>
				) : null}
				<StepperFormActions />
			</form>
		</Form>
	);
}

function ThirdStepForm() {
	const { nextStep } = useStepper();
	const form = useForm<z.infer<typeof SecondFormSchema>>({
		resolver: zodResolver(SecondFormSchema),
		defaultValues: {
			recipientContactWay: "email",
		},
	});

	const stripePromise = loadStripe(
		env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
	);

	const fetchClientSecret = useCallback(async () => {
		return fetch("/api/payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => data.client_secret);
	}, []);

	const options = { fetchClientSecret };

	function onSubmit(_data: z.infer<typeof SecondFormSchema>) {
		nextStep();
		toast("Second step submitted!");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-14">
				<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
					<EmbeddedCheckout className="max-h-[80dvh]" />
				</EmbeddedCheckoutProvider>
				<StepperFormActions />
			</form>
		</Form>
	);
}

function StepperFormActions() {
	const {
		prevStep,
		resetSteps,
		isDisabledStep,
		hasCompletedAllSteps,
		isLastStep,
	} = useStepper();

	return (
		<div className="w-full flex justify-end gap-2">
			{hasCompletedAllSteps ? (
				<Button type="button" onClick={resetSteps}>
					Reset
				</Button>
			) : (
				<>
					<Button
						disabled={isDisabledStep}
						onClick={prevStep}
						variant="secondary"
						type="button"
					>
						Prev
					</Button>
					<Button type="submit">{isLastStep ? "Finish" : "Next"}</Button>
				</>
			)}
		</div>
	);
}

function MyStepperFooter() {
	const { activeStep, resetSteps, steps } = useStepper();

	if (activeStep !== steps.length) {
		return null;
	}

	return (
		<div className="flex items-center justify-end gap-2">
			<Button onClick={resetSteps}>Reset Stepper with Form</Button>
		</div>
	);
}

const CustomRadio = ({
	children,
	description,
	value,
}: {
	children: React.ReactNode;
	description: string;
	value: string;
}) => {
	return (
		<Radio
			value={value}
			description={description}
			classNames={{
				base: cn(
					"inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
					"flex-row-reverse max-w-fit cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
					"data-[selected=true]:border-primary",
				),
			}}
		>
			{children}
		</Radio>
	);
};

export function ChatRoundIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Chat Round Icon</title>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M22 12c0 5.523-4.477 10-10 10c-1.6 0-3.112-.376-4.452-1.044a1.634 1.634 0 0 0-1.149-.133l-2.226.596a1.3 1.3 0 0 1-1.591-1.592l.595-2.226a1.633 1.633 0 0 0-.134-1.148A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10m-14.5-.892c0 1.369 1.319 2.805 2.529 3.834c.823.7 1.235 1.051 1.971 1.051s1.148-.35 1.971-1.051c1.21-1.03 2.529-2.465 2.529-3.834c0-2.677-2.475-3.676-4.5-1.608c-2.025-2.068-4.5-1.069-4.5 1.608"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function LinkIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Link</title>
			<path
				fill="currentColor"
				d="M19.739 4.261a6.867 6.867 0 0 0-9.711 0l-.72.721a.75.75 0 0 0 1.06 1.06l.72-.72a5.367 5.367 0 1 1 7.59 7.59l-.72.72a.75.75 0 0 0 1.06 1.06l.72-.72a6.867 6.867 0 0 0 0-9.71M6.043 9.307a.75.75 0 0 1 0 1.06l-.721.722a5.367 5.367 0 1 0 7.59 7.59l.72-.722a.75.75 0 0 1 1.06 1.06l-.72.722a6.867 6.867 0 0 1-9.71-9.711l.72-.72a.75.75 0 0 1 1.06 0"
				opacity={0.5}
			/>
			<path
				fill="currentColor"
				d="M14.693 9.307a.75.75 0 0 1 0 1.06l-4.325 4.326a.75.75 0 1 1-1.06-1.06l4.325-4.326a.75.75 0 0 1 1.06 0"
			/>
		</svg>
	);
}

function PenIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<title>Pen</title>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M3.25 22a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75"
				clipRule="evenodd"
				opacity={0.5}
			/>
			<path
				fill="currentColor"
				d="M19.08 7.372a3.147 3.147 0 0 0-4.45-4.45l-.71.71l.031.089c.26.75.751 1.733 1.675 2.656a7.004 7.004 0 0 0 2.745 1.705z"
				opacity={0.5}
			/>
			<path
				fill="currentColor"
				d="m13.951 3.6l-.03.03l.03.09c.26.75.75 1.732 1.674 2.656A7.005 7.005 0 0 0 18.37 8.08l-6.85 6.85c-.462.462-.693.693-.948.891c-.3.234-.625.435-.969.6c-.291.138-.601.241-1.22.448l-3.268 1.09a.849.849 0 0 1-1.073-1.074l1.089-3.268c.206-.62.31-.93.448-1.22c.164-.344.365-.67.6-.97c.198-.254.429-.485.89-.947z"
			/>
		</svg>
	);
}

const TwitchIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		id="Layer_1"
		x={0}
		y={0}
		style={{
			// @ts-ignore
			enableBackground: "new 0 0 2400 2800",
		}}
		viewBox="0 0 2400 2800"
		width="1em"
		height="1em"
		{...props}
	>
		<title>Twitch</title>
		<style>{".st1{fill:#9146ff}"}</style>
		<path
			d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z"
			style={{
				fill: "#fff",
			}}
		/>
		<g id="Layer_1-2">
			<path
				d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z"
				className="st1"
			/>
			<path
				d="M1700 550h200v600h-200zM1150 550h200v600h-200z"
				className="st1"
			/>
		</g>
	</svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 1200 1227"
		{...props}
	>
		<title>X</title>
		<path
			fill="#000"
			d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
		/>
	</svg>
);

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 36 36"
		fill="url(#a)"
		height="1em"
		width="1em"
		{...props}
	>
		<title>Facebook</title>
		<defs>
			<linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="a">
				<stop offset="0%" stopColor="#0062E0" />
				<stop offset="100%" stopColor="#19AFFF" />
			</linearGradient>
		</defs>
		<path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" />
		<path
			fill="#FFF"
			d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
		/>
	</svg>
);

const YouTubeIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 256 180"
		width="1em"
		height="1em"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid"
		{...props}
	>
		<title>YouTube</title>
		<path
			d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
			fill="red"
		/>
		<path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
	</svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		preserveAspectRatio="xMidYMid"
		viewBox="0 0 256 256"
		{...props}
	>
		<title>Instagram</title>
		<path
			fill="#000"
			d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
		/>
	</svg>
);

const RedditIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		className="_1O4jTk-dZ-VIxsCuYB6OR8"
		viewBox="0 0 216 216"
		width="1em"
		height="1em"
		{...props}
	>
		<title>Reddit</title>
		<defs>
			<radialGradient
				id="snoo-radial-gragient"
				cx={169.75}
				cy={92.19}
				r={50.98}
				fx={169.75}
				fy={92.19}
				gradientTransform="matrix(1 0 0 .87 0 11.64)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0} stopColor="#feffff" />
				<stop offset={0.4} stopColor="#feffff" />
				<stop offset={0.51} stopColor="#f9fcfc" />
				<stop offset={0.62} stopColor="#edf3f5" />
				<stop offset={0.7} stopColor="#dee9ec" />
				<stop offset={0.72} stopColor="#d8e4e8" />
				<stop offset={0.76} stopColor="#ccd8df" />
				<stop offset={0.8} stopColor="#c8d5dd" />
				<stop offset={0.83} stopColor="#ccd6de" />
				<stop offset={0.85} stopColor="#d8dbe2" />
				<stop offset={0.88} stopColor="#ede3e9" />
				<stop offset={0.9} stopColor="#ffebef" />
			</radialGradient>
			<radialGradient
				xlinkHref="#snoo-radial-gragient"
				id="snoo-radial-gragient-2"
				cx={47.31}
				r={50.98}
				fx={47.31}
			/>
			<radialGradient
				xlinkHref="#snoo-radial-gragient"
				id="snoo-radial-gragient-3"
				cx={109.61}
				cy={85.59}
				r={153.78}
				fx={109.61}
				fy={85.59}
				gradientTransform="matrix(1 0 0 .7 0 25.56)"
			/>
			<radialGradient
				id="snoo-radial-gragient-4"
				cx={-6.01}
				cy={64.68}
				r={12.85}
				fx={-6.01}
				fy={64.68}
				gradientTransform="matrix(1.07 0 0 1.55 81.08 27.26)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0} stopColor="#f60" />
				<stop offset={0.5} stopColor="#ff4500" />
				<stop offset={0.7} stopColor="#fc4301" />
				<stop offset={0.82} stopColor="#f43f07" />
				<stop offset={0.92} stopColor="#e53812" />
				<stop offset={1} stopColor="#d4301f" />
			</radialGradient>
			<radialGradient
				xlinkHref="#snoo-radial-gragient-4"
				id="snoo-radial-gragient-5"
				cx={-73.55}
				cy={64.68}
				r={12.85}
				fx={-73.55}
				fy={64.68}
				gradientTransform="matrix(-1.07 0 0 1.55 62.87 27.26)"
			/>
			<radialGradient
				id="snoo-radial-gragient-6"
				cx={107.93}
				cy={166.96}
				r={45.3}
				fx={107.93}
				fy={166.96}
				gradientTransform="matrix(1 0 0 .66 0 57.4)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0} stopColor="#172e35" />
				<stop offset={0.29} stopColor="#0e1c21" />
				<stop offset={0.73} stopColor="#030708" />
				<stop offset={1} />
			</radialGradient>
			<radialGradient
				xlinkHref="#snoo-radial-gragient"
				id="snoo-radial-gragient-7"
				cx={147.88}
				cy={32.94}
				r={39.77}
				fx={147.88}
				fy={32.94}
				gradientTransform="matrix(1 0 0 .98 0 .54)"
			/>
			<radialGradient
				id="snoo-radial-gragient-8"
				cx={131.31}
				cy={73.08}
				r={32.6}
				fx={131.31}
				fy={73.08}
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0.48} stopColor="#7a9299" />
				<stop offset={0.67} stopColor="#172e35" />
				<stop offset={0.75} />
				<stop offset={0.82} stopColor="#172e35" />
			</radialGradient>
			<style>
				{"\n            .snoo-cls-11{stroke-width:0;fill:#ffc49c}\n        "}
			</style>
		</defs>
		<path
			fill="#ff4500"
			strokeWidth={0}
			d="M108 0C48.35 0 0 48.35 0 108c0 29.82 12.09 56.82 31.63 76.37l-20.57 20.57C6.98 209.02 9.87 216 15.64 216H108c59.65 0 108-48.35 108-108S167.65 0 108 0Z"
		/>
		<circle
			cx={169.22}
			cy={106.98}
			r={25.22}
			fill="url(#snoo-radial-gragient)"
			strokeWidth={0}
		/>
		<circle
			cx={46.78}
			cy={106.98}
			r={25.22}
			fill="url(#snoo-radial-gragient-2)"
			strokeWidth={0}
		/>
		<ellipse
			cx={108.06}
			cy={128.64}
			fill="url(#snoo-radial-gragient-3)"
			strokeWidth={0}
			rx={72}
			ry={54}
		/>
		<path
			fill="url(#snoo-radial-gragient-4)"
			strokeWidth={0}
			d="M86.78 123.48c-.42 9.08-6.49 12.38-13.56 12.38s-12.46-4.93-12.04-14.01c.42-9.08 6.49-15.02 13.56-15.02s12.46 7.58 12.04 16.66Z"
		/>
		<path
			fill="url(#snoo-radial-gragient-5)"
			strokeWidth={0}
			d="M129.35 123.48c.42 9.08 6.49 12.38 13.56 12.38s12.46-4.93 12.04-14.01c-.42-9.08-6.49-15.02-13.56-15.02s-12.46 7.58-12.04 16.66Z"
		/>
		<ellipse
			cx={79.63}
			cy={116.37}
			className="snoo-cls-11"
			rx={2.8}
			ry={3.05}
		/>
		<ellipse
			cx={146.21}
			cy={116.37}
			className="snoo-cls-11"
			rx={2.8}
			ry={3.05}
		/>
		<path
			fill="url(#snoo-radial-gragient-6)"
			strokeWidth={0}
			d="M108.06 142.92c-8.76 0-17.16.43-24.92 1.22-1.33.13-2.17 1.51-1.65 2.74 4.35 10.39 14.61 17.69 26.57 17.69s22.23-7.3 26.57-17.69c.52-1.23-.33-2.61-1.65-2.74-7.77-.79-16.16-1.22-24.92-1.22Z"
		/>
		<circle
			cx={147.49}
			cy={49.43}
			r={17.87}
			fill="url(#snoo-radial-gragient-7)"
			strokeWidth={0}
		/>
		<path
			fill="url(#snoo-radial-gragient-8)"
			strokeWidth={0}
			d="M107.8 76.92c-2.14 0-3.87-.89-3.87-2.27 0-16.01 13.03-29.04 29.04-29.04 2.14 0 3.87 1.73 3.87 3.87s-1.73 3.87-3.87 3.87c-11.74 0-21.29 9.55-21.29 21.29 0 1.38-1.73 2.27-3.87 2.27Z"
		/>
		<path
			fill="#842123"
			strokeWidth={0}
			d="M62.82 122.65c.39-8.56 6.08-14.16 12.69-14.16 6.26 0 11.1 6.39 11.28 14.33.17-8.88-5.13-15.99-12.05-15.99s-13.14 6.05-13.56 15.2c-.42 9.15 4.97 13.83 12.04 13.83h.52c-6.44-.16-11.3-4.79-10.91-13.2Zm90.48 0c-.39-8.56-6.08-14.16-12.69-14.16-6.26 0-11.1 6.39-11.28 14.33-.17-8.88 5.13-15.99 12.05-15.99 7.07 0 13.14 6.05 13.56 15.2.42 9.15-4.97 13.83-12.04 13.83h-.52c6.44-.16 11.3-4.79 10.91-13.2Z"
		/>
	</svg>
);

const KickIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 933 300"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>Kick</title>
		<g clipPath="url(#clip0_9790_492437)">
			<g clipPath="url(#clip1_9790_492437)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0 0H100V66.6667H133.333V33.3333H166.667V0H266.667V100H233.333V133.333H200V166.667H233.333V200H266.667V300H166.667V266.667H133.333V233.333H100V300H0V0ZM666.667 0H766.667V66.6667H800V33.3333H833.333V0H933.333V100H900V133.333H866.667V166.667H900V200H933.333V300H833.333V266.667H800V233.333H766.667V300H666.667V0ZM300 0H400V300H300V0ZM533.333 0H466.667V33.3333H433.333V266.667H466.667V300H533.333H633.333V200H533.333V100H633.333V0H533.333Z"
					fill="#000"
				/>
			</g>
		</g>
		<defs>
			<clipPath id="clip0_9790_492437">
				<rect width={933} height={300} fill="white" />
			</clipPath>
			<clipPath id="clip1_9790_492437">
				<rect width={933.333} height={300} fill="white" />
			</clipPath>
		</defs>
	</svg>
);

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 256 250"
		width="1em"
		height="1em"
		fill="#000"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid"
		{...props}
	>
		<title>Github</title>
		<path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
	</svg>
);

const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid"
		viewBox="0 0 256 290"
		width="1em"
		height="1em"
		{...props}
	>
		<title>TikTok</title>
		<path
			fill="#FF004F"
			d="M189.72022 104.42148c18.67797 13.3448 41.55932 21.19661 66.27233 21.19661V78.08728c-4.67694.001-9.34196-.48645-13.91764-1.4554v37.41351c-24.71102 0-47.5894-7.85181-66.27232-21.19563v96.99656c0 48.5226-39.35537 87.85513-87.8998 87.85513-18.11308 0-34.94847-5.47314-48.93361-14.85978 15.96175 16.3122 38.22162 26.4315 62.84826 26.4315 48.54742 0 87.90477-39.33253 87.90477-87.85712v-96.99457h-.00199Zm17.16896-47.95275c-9.54548-10.4231-15.81283-23.89299-17.16896-38.78453v-6.11347h-13.18894c3.31982 18.92715 14.64335 35.09738 30.3579 44.898ZM69.67355 225.60685c-5.33316-6.9891-8.21517-15.53882-8.20226-24.3298 0-22.19236 18.0009-40.18631 40.20915-40.18631 4.13885-.001 8.2529.6324 12.19716 1.88328v-48.59308c-4.60943-.6314-9.26154-.89945-13.91167-.80117v37.82253c-3.94726-1.25089-8.06328-1.88626-12.20313-1.88229-22.20825 0-40.20815 17.99196-40.20815 40.1873 0 15.6937 8.99747 29.28075 22.1189 35.89954Z"
		/>
		<path d="M175.80259 92.84876c18.68293 13.34382 41.5613 21.19563 66.27232 21.19563V76.63088c-13.79353-2.93661-26.0046-10.14114-35.18573-20.16215-15.71554-9.80162-27.03808-25.97185-30.3579-44.898H141.8876v189.84333c-.07843 22.1318-18.04855 40.05229-40.20915 40.05229-13.05889 0-24.66039-6.22169-32.00788-15.8595-13.12044-6.61879-22.1179-20.20683-22.1179-35.89854 0-22.19336 17.9999-40.1873 40.20815-40.1873 4.255 0 8.35614.66217 12.20312 1.88229v-37.82254c-47.69165.98483-86.0473 39.93316-86.0473 87.83429 0 23.91184 9.55144 45.58896 25.05353 61.4276 13.98514 9.38565 30.82053 14.85978 48.9336 14.85978 48.54544 0 87.89981-39.33452 87.89981-87.85612V92.84876h-.00099Z" />
		<path
			fill="#00F2EA"
			d="M242.07491 76.63088V66.51456c-12.4384.01886-24.6326-3.46278-35.18573-10.04683 9.34196 10.22255 21.64336 17.27121 35.18573 20.16315Zm-65.54363-65.06015a67.7881 67.7881 0 0 1-.72869-5.45726V0h-47.83362v189.84531c-.07644 22.12883-18.04557 40.04931-40.20815 40.04931-6.50661 0-12.64987-1.54375-18.09025-4.28677 7.34749 9.63681 18.949 15.8575 32.00788 15.8575 22.15862 0 40.13171-17.9185 40.20915-40.0503V11.57073h34.64368ZM99.96593 113.58077V102.8112c-3.9969-.54602-8.02655-.82003-12.06116-.81805C39.35537 101.99315 0 141.32669 0 189.84531c0 30.41846 15.46735 57.22621 38.97116 72.99536-15.5021-15.83765-25.05353-37.51576-25.05353-61.42661 0-47.90014 38.35466-86.84847 86.0483-87.8333Z"
		/>
	</svg>
);

const SnapchatIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="147.353 39.286 514.631 514.631"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		xmlSpace="preserve"
		fill="#000000"
		width="1em"
		height="1em"
		{...props}
	>
		<title>Snapchat</title>
		<g id="SVGRepo_bgCarrier" strokeWidth={0} />
		<g
			id="SVGRepo_tracerCarrier"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<g id="SVGRepo_iconCarrier">
			<path
				style={{
					fill: "#FFFC00",
				}}
				d="M147.553,423.021v0.023c0.308,11.424,0.403,22.914,2.33,34.268 c2.042,12.012,4.961,23.725,10.53,34.627c7.529,14.756,17.869,27.217,30.921,37.396c9.371,7.309,19.608,13.111,30.94,16.771 c16.524,5.33,33.571,7.373,50.867,7.473c10.791,0.068,21.575,0.338,32.37,0.293c78.395-0.33,156.792,0.566,235.189-0.484 c10.403-0.141,20.636-1.41,30.846-3.277c19.569-3.582,36.864-11.932,51.661-25.133c17.245-15.381,28.88-34.205,34.132-56.924 c3.437-14.85,4.297-29.916,4.444-45.035v-3.016c0-1.17-0.445-256.892-0.486-260.272c-0.115-9.285-0.799-18.5-2.54-27.636 c-2.117-11.133-5.108-21.981-10.439-32.053c-5.629-10.641-12.68-20.209-21.401-28.57c-13.359-12.81-28.775-21.869-46.722-26.661 c-16.21-4.327-32.747-5.285-49.405-5.27c-0.027-0.004-0.09-0.173-0.094-0.255H278.56c-0.005,0.086-0.008,0.172-0.014,0.255 c-9.454,0.173-18.922,0.102-28.328,1.268c-10.304,1.281-20.509,3.21-30.262,6.812c-15.362,5.682-28.709,14.532-40.11,26.347 c-12.917,13.386-22.022,28.867-26.853,46.894c-4.31,16.084-5.248,32.488-5.271,49.008"
			/>
			<path
				style={{
					fill: "#FFFFFF",
				}}
				d="M407.001,473.488c-1.068,0-2.087-0.039-2.862-0.076c-0.615,0.053-1.25,0.076-1.886,0.076 c-22.437,0-37.439-10.607-50.678-19.973c-9.489-6.703-18.438-13.031-28.922-14.775c-5.149-0.854-10.271-1.287-15.22-1.287 c-8.917,0-15.964,1.383-21.109,2.389c-3.166,0.617-5.896,1.148-8.006,1.148c-2.21,0-4.895-0.49-6.014-4.311 c-0.887-3.014-1.523-5.934-2.137-8.746c-1.536-7.027-2.65-11.316-5.281-11.723c-28.141-4.342-44.768-10.738-48.08-18.484 c-0.347-0.814-0.541-1.633-0.584-2.443c-0.129-2.309,1.501-4.334,3.777-4.711c22.348-3.68,42.219-15.492,59.064-35.119 c13.049-15.195,19.457-29.713,20.145-31.316c0.03-0.072,0.065-0.148,0.101-0.217c3.247-6.588,3.893-12.281,1.926-16.916 c-3.626-8.551-15.635-12.361-23.58-14.882c-1.976-0.625-3.845-1.217-5.334-1.808c-7.043-2.782-18.626-8.66-17.083-16.773 c1.124-5.916,8.949-10.036,15.273-10.036c1.756,0,3.312,0.308,4.622,0.923c7.146,3.348,13.575,5.045,19.104,5.045 c6.876,0,10.197-2.618,11-3.362c-0.198-3.668-0.44-7.546-0.674-11.214c0-0.004-0.005-0.048-0.005-0.048 c-1.614-25.675-3.627-57.627,4.546-75.95c24.462-54.847,76.339-59.112,91.651-59.112c0.408,0,6.674-0.062,6.674-0.062 c0.283-0.005,0.59-0.009,0.908-0.009c15.354,0,67.339,4.27,91.816,59.15c8.173,18.335,6.158,50.314,4.539,76.016l-0.076,1.23 c-0.222,3.49-0.427,6.793-0.6,9.995c0.756,0.696,3.795,3.096,9.978,3.339c5.271-0.202,11.328-1.891,17.998-5.014 c2.062-0.968,4.345-1.169,5.895-1.169c2.343,0,4.727,0.456,6.714,1.285l0.106,0.041c5.66,2.009,9.367,6.024,9.447,10.242 c0.071,3.932-2.851,9.809-17.223,15.485c-1.472,0.583-3.35,1.179-5.334,1.808c-7.952,2.524-19.951,6.332-23.577,14.878 c-1.97,4.635-1.322,10.326,1.926,16.912c0.036,0.072,0.067,0.145,0.102,0.221c1,2.344,25.205,57.535,79.209,66.432 c2.275,0.379,3.908,2.406,3.778,4.711c-0.048,0.828-0.248,1.656-0.598,2.465c-3.289,7.703-19.915,14.09-48.064,18.438 c-2.642,0.408-3.755,4.678-5.277,11.668c-0.63,2.887-1.271,5.717-2.146,8.691c-0.819,2.797-2.641,4.164-5.567,4.164h-0.441 c-1.905,0-4.604-0.346-8.008-1.012c-5.95-1.158-12.623-2.236-21.109-2.236c-4.948,0-10.069,0.434-15.224,1.287 c-10.473,1.744-19.421,8.062-28.893,14.758C444.443,462.88,429.436,473.488,407.001,473.488"
			/>
			<path
				style={{
					fill: "#020202",
				}}
				d="M408.336,124.235c14.455,0,64.231,3.883,87.688,56.472c7.724,17.317,5.744,48.686,4.156,73.885 c-0.248,3.999-0.494,7.875-0.694,11.576l-0.084,1.591l1.062,1.185c0.429,0.476,4.444,4.672,13.374,5.017l0.144,0.008l0.15-0.003 c5.904-0.225,12.554-2.059,19.776-5.442c1.064-0.498,2.48-0.741,3.978-0.741c1.707,0,3.521,0.321,5.017,0.951l0.226,0.09 c3.787,1.327,6.464,3.829,6.505,6.093c0.022,1.28-0.935,5.891-14.359,11.194c-1.312,0.518-3.039,1.069-5.041,1.7 c-8.736,2.774-21.934,6.96-26.376,17.427c-2.501,5.896-1.816,12.854,2.034,20.678c1.584,3.697,26.52,59.865,82.631,69.111 c-0.011,0.266-0.079,0.557-0.229,0.9c-0.951,2.24-6.996,9.979-44.612,15.783c-5.886,0.902-7.328,7.5-9,15.17 c-0.604,2.746-1.218,5.518-2.062,8.381c-0.258,0.865-0.306,0.914-1.233,0.914c-0.128,0-0.278,0-0.442,0 c-1.668,0-4.2-0.346-7.135-0.922c-5.345-1.041-12.647-2.318-21.982-2.318c-5.21,0-10.577,0.453-15.962,1.352 c-11.511,1.914-20.872,8.535-30.786,15.543c-13.314,9.408-27.075,19.143-48.071,19.143c-0.917,0-1.812-0.031-2.709-0.076 l-0.236-0.01l-0.237,0.018c-0.515,0.045-1.034,0.068-1.564,0.068c-20.993,0-34.76-9.732-48.068-19.143 c-9.916-7.008-19.282-13.629-30.791-15.543c-5.38-0.896-10.752-1.352-15.959-1.352c-9.333,0-16.644,1.428-21.978,2.471 c-2.935,0.574-5.476,1.066-7.139,1.066c-1.362,0-1.388-0.08-1.676-1.064c-0.844-2.865-1.461-5.703-2.062-8.445 c-1.676-7.678-3.119-14.312-9.002-15.215c-37.613-5.809-43.659-13.561-44.613-15.795c-0.149-0.352-0.216-0.652-0.231-0.918 c56.11-9.238,81.041-65.408,82.63-69.119c3.857-7.818,4.541-14.775,2.032-20.678c-4.442-10.461-17.638-14.653-26.368-17.422 c-2.007-0.635-3.735-1.187-5.048-1.705c-11.336-4.479-14.823-8.991-14.305-11.725c0.601-3.153,6.067-6.359,10.837-6.359 c1.072,0,2.012,0.173,2.707,0.498c7.747,3.631,14.819,5.472,21.022,5.472c9.751,0,14.091-4.537,14.557-5.055l1.057-1.182 l-0.085-1.583c-0.197-3.699-0.44-7.574-0.696-11.565c-1.583-25.205-3.563-56.553,4.158-73.871 c23.37-52.396,72.903-56.435,87.525-56.435c0.36,0,6.717-0.065,6.717-0.065C407.744,124.239,408.033,124.235,408.336,124.235 M408.336,115.197h-0.017c-0.333,0-0.646,0-0.944,0.004c-2.376,0.024-6.282,0.062-6.633,0.066c-8.566,0-25.705,1.21-44.115,9.336 c-10.526,4.643-19.994,10.921-28.14,18.66c-9.712,9.221-17.624,20.59-23.512,33.796c-8.623,19.336-6.576,51.905-4.932,78.078 l0.006,0.041c0.176,2.803,0.361,5.73,0.53,8.582c-1.265,0.581-3.316,1.194-6.339,1.194c-4.864,0-10.648-1.555-17.187-4.619 c-1.924-0.896-4.12-1.349-6.543-1.349c-3.893,0-7.997,1.146-11.557,3.239c-4.479,2.63-7.373,6.347-8.159,10.468 c-0.518,2.726-0.493,8.114,5.492,13.578c3.292,3.008,8.128,5.782,14.37,8.249c1.638,0.645,3.582,1.261,5.641,1.914 c7.145,2.271,17.959,5.702,20.779,12.339c1.429,3.365,0.814,7.793-1.823,13.145c-0.069,0.146-0.138,0.289-0.201,0.439 c-0.659,1.539-6.807,15.465-19.418,30.152c-7.166,8.352-15.059,15.332-23.447,20.752c-10.238,6.617-21.316,10.943-32.923,12.855 c-4.558,0.748-7.813,4.809-7.559,9.424c0.078,1.33,0.39,2.656,0.931,3.939c0.004,0.008,0.009,0.016,0.013,0.023 c1.843,4.311,6.116,7.973,13.063,11.203c8.489,3.943,21.185,7.26,37.732,9.855c0.836,1.59,1.704,5.586,2.305,8.322 c0.629,2.908,1.285,5.898,2.22,9.074c1.009,3.441,3.626,7.553,10.349,7.553c2.548,0,5.478-0.574,8.871-1.232 c4.969-0.975,11.764-2.305,20.245-2.305c4.702,0,9.575,0.414,14.48,1.229c9.455,1.574,17.606,7.332,27.037,14 c13.804,9.758,29.429,20.803,53.302,20.803c0.651,0,1.304-0.021,1.949-0.066c0.789,0.037,1.767,0.066,2.799,0.066 c23.88,0,39.501-11.049,53.29-20.799l0.022-0.02c9.433-6.66,17.575-12.41,27.027-13.984c4.903-0.814,9.775-1.229,14.479-1.229 c8.102,0,14.517,1.033,20.245,2.15c3.738,0.736,6.643,1.09,8.872,1.09l0.218,0.004h0.226c4.917,0,8.53-2.699,9.909-7.422 c0.916-3.109,1.57-6.029,2.215-8.986c0.562-2.564,1.46-6.674,2.296-8.281c16.558-2.6,29.249-5.91,37.739-9.852 c6.931-3.215,11.199-6.873,13.053-11.166c0.556-1.287,0.881-2.621,0.954-3.979c0.261-4.607-2.999-8.676-7.56-9.424 c-51.585-8.502-74.824-61.506-75.785-63.758c-0.062-0.148-0.132-0.295-0.205-0.438c-2.637-5.354-3.246-9.777-1.816-13.148 c2.814-6.631,13.621-10.062,20.771-12.332c2.07-0.652,4.021-1.272,5.646-1.914c7.039-2.78,12.07-5.796,15.389-9.221 c3.964-4.083,4.736-7.995,4.688-10.555c-0.121-6.194-4.856-11.698-12.388-14.393c-2.544-1.052-5.445-1.607-8.399-1.607 c-2.011,0-4.989,0.276-7.808,1.592c-6.035,2.824-11.441,4.368-16.082,4.588c-2.468-0.125-4.199-0.66-5.32-1.171 c0.141-2.416,0.297-4.898,0.458-7.486l0.067-1.108c1.653-26.19,3.707-58.784-4.92-78.134c-5.913-13.253-13.853-24.651-23.604-33.892 c-8.178-7.744-17.678-14.021-28.242-18.661C434.052,116.402,416.914,115.197,408.336,115.197"
			/>
			<rect
				x={147.553}
				y={39.443}
				style={{
					fill: "none",
				}}
				width={514.231}
				height={514.23}
			/>
		</g>
	</svg>
);

const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 256 256"
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		preserveAspectRatio="xMidYMid"
		{...props}
	>
		<title>Telegram</title>
		<defs>
			<linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
				<stop offset="0%" stopColor="#2AABEE" />
				<stop offset="100%" stopColor="#229ED9" />
			</linearGradient>
		</defs>
		<path
			fill="url(#a)"
			d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"
		/>
		<path
			fill="#FFF"
			d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z"
		/>
	</svg>
);

const ThreadsIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		aria-label="Threads"
		viewBox="0 0 192 192"
		width="1em"
		height="1em"
		{...props}
	>
		<title>Threads</title>
		<path
			fill="#000"
			d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.194 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 95.932L13 96v.067c.224 28.617 6.882 51.447 19.788 67.854C47.292 182.358 68.882 191.806 96.957 192h.113c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.723-24.553ZM98.44 129.507c-10.44.588-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.114 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.802 29.274Z"
			className="x19hqcy"
		/>
	</svg>
);
