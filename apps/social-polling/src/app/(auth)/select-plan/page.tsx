"use client";

import { Radio, RadioGroup } from "@nextui-org/react";
import type React from "react";
import { useState } from "react";

import { cn } from "@theliaison/ui";

import { CommunityMember } from "./_components/community-member";
import { ModalUserData } from "./_components/modal-user-data";

function CustomRadio({
	children,
	...props
}: React.ComponentProps<typeof Radio>) {
	return (
		<Radio
			{...props}
			classNames={{
				base: cn(
					"tap-highlight-transparent 3 border-medium border-default-100 data-[selected=true]:bg-secondary-50 group relative m-0 inline-flex w-full max-w-[100%] cursor-pointer flex-row-reverse items-center justify-between rounded-lg p-2 px-3 py-4 data-[selected=true]:border-secondary",
				),
				label: cn("text-white"),
				control: cn(
					"border-medium group-data-[hover-unselected=true]:bg-default-100 transition-transform-colors relative box-border inline-flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-solid border-gray-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[pressed=true]:scale-95 group-data-[focus-visible=true]:border-gray-50 group-data-[selected=true]:border-gray-300 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-gray-50 group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background motion-reduce:transition-none",
				),
			}}
		>
			{children}
		</Radio>
	);
}

export default function SelectPlanPage() {
	const [selectedPlan, setSelectedPlan] = useState("community-member");

	return (
		<div className="dark mx-auto flex items-center justify-center p-4">
			<div className="height-auto data-[focus-visible=true]:outline-focus shadow-medium rounded-large transition-transform-background dark relative mx-auto box-border flex w-[400px] flex-col justify-center overflow-hidden bg-[hsl(240_5.88%_10%)] text-foreground outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none">
				<div className="overflow-inherit color-inherit rounded-t-large z-10 flex w-full shrink-0 flex-col items-start justify-start p-3 px-6 pb-0 pt-5 subpixel-antialiased">
					<h4 className="text-large font-medium text-white">
						Select your plan
					</h4>
					<p className="text-tiny text-default-400">
						Find a plan that's right for you and your team.
					</p>
				</div>

				<div className="relative flex h-auto w-full flex-auto flex-col overflow-y-auto break-words p-3 text-left subpixel-antialiased [align-items:inherit] [place-content:inherit]">
					<RadioGroup
						className="relative flex flex-col gap-2"
						onChange={(e) => setSelectedPlan(e.target.value)}
						defaultValue={selectedPlan}
					>
						<CustomRadio value="community-member">
							<div className="flex w-full items-center gap-3">
								<div className="item-center bg-secondary-50 group-data-[selected=true]:bg-secondary-100 flex rounded-full p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="img"
										className="text-secondary"
										width="18"
										height="18"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.942v.117c0 2.524 0 3.787-.597 4.801c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382ZM21 7.5L12 12m0 0L3 7.5m9 4.5v9.5"
										/>
									</svg>
								</div>
								<div className="flex w-full flex-col gap-1">
									<div className="flex items-center gap-1">
										<p className="text-small">Community Member</p>
										<span className="text-tiny text-default-500 mt-0.5">
											0$
										</span>
									</div>
									<p className="text-tiny text-default-400">
										Description of the plan
									</p>
								</div>
							</div>
						</CustomRadio>
						<CustomRadio value="community-insider">
							<div className="flex w-full items-center gap-3">
								<div className="item-center bg-secondary-50 group-data-[selected=true]:bg-secondary-100 flex rounded-full p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="img"
										className="text-secondary"
										width="18"
										height="18"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.942v.117c0 2.524 0 3.787-.597 4.801c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382ZM21 7.5L12 12m0 0L3 7.5m9 4.5v9.5"
										/>
									</svg>
								</div>
								<div className="flex w-full flex-col gap-1">
									<div className="flex items-center gap-1">
										<p className="text-small">Community Insider</p>
										<span className="text-tiny text-default-500 mt-0.5">
											10$
										</span>
									</div>
									<p className="text-tiny text-default-400">
										Description of the plan
									</p>
								</div>
							</div>
						</CustomRadio>
						<CustomRadio value="poll-creator" className="relative inline-flex ">
							<div className="relative flex w-full shrink-0 items-center gap-3">
								<div className="item-center bg-secondary-50 group-data-[selected=true]:bg-secondary-100 flex rounded-full p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="img"
										className="text-secondary"
										width="18"
										height="18"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.942v.117c0 2.524 0 3.787-.597 4.801c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382ZM21 7.5L12 12m0 0L3 7.5m9 4.5v9.5"
										/>
									</svg>
								</div>
								<div className="flex w-full flex-col gap-1">
									<div className="flex items-center gap-1">
										<p className="text-small">Poll Creator</p>
										<span className="text-tiny text-default-500 mt-0.5">
											30$
										</span>
									</div>
									<p className="text-tiny text-default-400">
										Description of the plan
									</p>
								</div>
							</div>
						</CustomRadio>
					</RadioGroup>

					{selectedPlan === "community-member" && (
						<div>
							<p className="text-small text-default-400">
								Description of the plan
							</p>
						</div>
					)}

					{selectedPlan === "community-insider" && (
						<div>
							<p className="text-small text-default-400">
								Description of the plan
							</p>
						</div>
					)}

					{selectedPlan === "poll-creator" && (
						<div>
							<p className="text-small text-default-400">
								Description of the plan
							</p>
						</div>
					)}
				</div>
				{selectedPlan === "community-member" && (
					<CommunityMember priceId="price_1PCRYLKFcaaOd2Qe0LZs10rz" />
				)}
				{selectedPlan === "community-insider" && (
					<ModalUserData
						buttonText="Continue with Community Insider"
						priceId="price_1PCRZqKFcaaOd2QewakOrAes"
					/>
				)}
				{selectedPlan === "poll-creator" && (
					<ModalUserData
						buttonText="Continue with Poll Creator"
						priceId="price_1PCRaXKFcaaOd2QeOMzLBP2S"
					/>
				)}
			</div>
		</div>
	);
}

/*
<div className="flex items-center justify-center p-4 dark mx-auto">
			<div className="mx-auto flex flex-col justify-center relative overflow-hidden height-auto text-foreground box-border bg-[hsl(240_5.88%_10%)] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none w-[400px] dark">
				<div className="p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col items-start px-6 pb-0 pt-5">
					<h4 className="text-large font-medium text-white">
						Select your plan
					</h4>
					<p className="text-tiny text-default-400">
						Find a plan that's right for you and your team.
					</p>
				</div>

				<div className="relative flex w-full p-3 flex-auto flex-col [place-content:inherit] [align-items:inherit] h-auto break-words text-left overflow-y-auto subpixel-antialiased">
					<RadioGroup
						className="relative flex flex-col gap-2"
						onChange={(e) => setSelectedPlan(e.target.value)}
						defaultValue={selectedPlan}
					>
						<CustomRadio value="community-member">
							<div className="flex w-full items-center gap-3">
								<div className="item-center flex rounded-full bg-secondary-50 p-2 group-data-[selected=true]:bg-secondary-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="img"
										className="text-secondary"
										width="18"
										height="18"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.942v.117c0 2.524 0 3.787-.597 4.801c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382ZM21 7.5L12 12m0 0L3 7.5m9 4.5v9.5"
										/>
									</svg>
								</div>
								<div className="flex w-full flex-col gap-1">
									<div className="flex items-center gap-1">
										<p className="text-small">Community Member</p>
										<span className="mt-0.5 text-tiny text-default-500">
											0$
										</span>
									</div>
									<p className="text-tiny text-default-400">
										Description of the plan
									</p>
								</div>
							</div>
						</CustomRadio>
						<CustomRadio value="community-insider">
							<div className="flex w-full items-center gap-3">
								<div className="item-center flex rounded-full bg-secondary-50 p-2 group-data-[selected=true]:bg-secondary-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="img"
										className="text-secondary"
										width="18"
										height="18"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.942v.117c0 2.524 0 3.787-.597 4.801c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382ZM21 7.5L12 12m0 0L3 7.5m9 4.5v9.5"
										/>
									</svg>
								</div>
								<div className="flex w-full flex-col gap-1">
									<div className="flex items-center gap-1">
										<p className="text-small">Community Insider</p>
										<span className="mt-0.5 text-tiny text-default-500">
											10$
										</span>
									</div>
									<p className="text-tiny text-default-400">
										Description of the plan
									</p>
								</div>
							</div>
						</CustomRadio>
						<CustomRadio value="poll-creator" className="relative inline-flex ">
							<div className="flex w-full shrink-0 items-center gap-3 relative">
								<div className="item-center flex rounded-full bg-secondary-50 p-2 group-data-[selected=true]:bg-secondary-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										role="img"
										className="text-secondary"
										width="18"
										height="18"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeWidth="1.5"
											d="m15.578 3.382l2 1.05c2.151 1.129 3.227 1.693 3.825 2.708C22 8.154 22 9.417 22 11.942v.117c0 2.524 0 3.787-.597 4.801c-.598 1.015-1.674 1.58-3.825 2.709l-2 1.049C13.822 21.539 12.944 22 12 22s-1.822-.46-3.578-1.382l-2-1.05c-2.151-1.129-3.227-1.693-3.825-2.708C2 15.846 2 14.583 2 12.06v-.117c0-2.525 0-3.788.597-4.802c.598-1.015 1.674-1.58 3.825-2.708l2-1.05C10.178 2.461 11.056 2 12 2s1.822.46 3.578 1.382ZM21 7.5L12 12m0 0L3 7.5m9 4.5v9.5"
										/>
									</svg>
								</div>
								<div className="flex w-full flex-col gap-1">
									<div className="flex items-center gap-1">
										<p className="text-small">Poll Creator</p>
										<span className="mt-0.5 text-tiny text-default-500">
											30$
										</span>
									</div>
									<p className="text-tiny text-default-400">
										Description of the plan
									</p>
								</div>
							</div>
						</CustomRadio>
					</RadioGroup>

					{selectedPlan === "community-member" && (
						<div>
							<p className="text-small text-default-400">
								Description of the plan
							</p>
						</div>
					)}

					{selectedPlan === "community-insider" && (
						<div>
							<p className="text-small text-default-400">
								Description of the plan
							</p>
						</div>
					)}

					{selectedPlan === "poll-creator" && (
						<div>
							<p className="text-small text-default-400">
								Description of the plan
							</p>
						</div>
					)}
				</div>
				{selectedPlan === "community-member" && (
					<CommunityMember priceId="price_1PCRYLKFcaaOd2Qe0LZs10rz" />
				)}
				{selectedPlan === "community-insider" && (
					<ModalUserData
						buttonText="Continue with Community Insider"
						priceId="price_1PCRZqKFcaaOd2QewakOrAes"
					/>
				)}
				{selectedPlan === "poll-creator" && (
					<ModalUserData
						buttonText="Continue with Poll Creator"
						priceId="price_1PCRaXKFcaaOd2QeOMzLBP2S"
					/>
				)}
			</div>
		</div>
*/
