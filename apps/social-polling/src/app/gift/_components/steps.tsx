"use client";

import React from "react";
import { Progress, Spacer } from "@nextui-org/react";

import VerticalCollapsibleSteps from "./vertical-collapsible-steps";
import SupportCard from "./support-card";

const steps = [
	{
		title: "Tell us about the gift",
		description:
			"Surprise someone special without the hassle! Share what you'd like to send and who it's for.",
		details: [
			"Choose the perfect gift from our selection or describe a custom option.",
			"Provide the recipient's name (or nickname, if preferred).",
		],
	},
	{
		title: "Leave the contact details to us",
		description:
			"We'll ensure a smooth surprise by discreetly contacting the recipient for their information.",
		details: [
			"We'll reach out to the recipient anonymously on your behalf.",
			"The recipient will securely provide their contact information without revealing the sender.",
		],
	},
	{
		title: "Finalize your order",
		description:
			"Review your selection and ensure everything is perfect for the surprise.",
		details: [
			"Confirm the gift you've chosen and any additional details.",
			"Complete the payment process to get the surprise rolling!",
		],
	},
	{
		title: "We handle the delivery (discreetly!)",
		description:
			"Sit back and relax - we'll take care of getting the gift to the recipient anonymously.",
		details: [
			"We'll manage the entire shipping process, keeping the sender's identity a secret.",
			"The gift arrives at the recipient's doorstep, leaving them wondering who sent it!",
		],
	},
	{
		title: "Surprise delivered!",
		description:
			"The recipient enjoys their surprise, and you've successfully sent a thoughtful gift anonymously.",
		details: [
			"The recipient receives their unexpected present, leaving them delighted.",
			"You can bask in the joy of giving a surprise without revealing yourself.",
		],
	},
];
export function Steps() {
	const [currentStep, setCurrentStep] = React.useState(0);

	return (
		<section className="max-w-screen-2xl py-24 px-16 flex flex-col md:flex-row gap-2 md:gap-8">
			<div className="flex flex-col max-w-sm">
				<h3 className="mb-2 text-3xl font-bold" id="getting-started">
					How it works
				</h3>
				<p className="mb-5 text-lg text-default-500">
					Have you ever wanted to send a gift, but you didn’t know the person’s
					address and you didn’t want to ask for it so you didn’t come across as
					creepy? We get it. Sometimes it’s awkward asking for someone’s home
					address to send a gift.
				</p>
			</div>

			<div className="flex flex-col w-full">
				<Progress
					classNames={{
						base: "px-0.5 mb-5",
						label: "text-small",
						value: "text-small text-default-400",
					}}
					label="Steps"
					maxValue={steps.length - 1}
					minValue={0}
					showValueLabel={true}
					size="md"
					value={currentStep}
					valueLabel={`${currentStep + 1} of ${steps.length}`}
				/>
				<VerticalCollapsibleSteps
					currentStep={currentStep}
					steps={steps}
					onStepChange={setCurrentStep}
				/>
			</div>

			{/* <SupportCard className="!m-0 border border-default-200 !bg-default-50 px-2 shadow-none dark:border-default-100 dark:!bg-default-50/50" /> */}
		</section>
	);
}
