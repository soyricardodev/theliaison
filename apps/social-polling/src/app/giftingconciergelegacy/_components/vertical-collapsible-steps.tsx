"use client";

import type { ButtonProps } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { useControlledState } from "@react-stately/utils";
import { LazyMotion, domAnimation, m } from "framer-motion";
import type { ComponentProps } from "react";
import React from "react";

import { cn } from "@theliaison/ui";

export type VerticalCollapsibleStepProps = {
	className?: string;
	description?: React.ReactNode;
	title?: React.ReactNode;
	details?: string[];
};

export interface VerticalCollapsibleStepsProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	/**
	 * An array of steps.
	 *
	 * @default []
	 */
	steps?: VerticalCollapsibleStepProps[];
	/**
	 * The color of the steps.
	 *
	 * @default "primary"
	 */
	color?: ButtonProps["color"];
	/**
	 * The current step index.
	 */
	currentStep?: number;
	/**
	 * The default step index.
	 *
	 * @default 0
	 */
	defaultStep?: number;
	/**
	 * The custom class for the steps wrapper.
	 */
	className?: string;
	/**
	 * The custom class for the step.
	 */
	stepClassName?: string;
	/**
	 * Callback function when the step index changes.
	 */
	onStepChange?: (stepIndex: number) => void;
}

function CheckIcon(props: ComponentProps<"svg">) {
	return (
		<svg
			aria-hidden="true"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			{...props}
			viewBox="0 0 24 24"
		>
			<m.path
				animate={{ pathLength: 1 }}
				d="M5 13l4 4L19 7"
				initial={{ pathLength: 0 }}
				strokeLinecap="round"
				strokeLinejoin="round"
				transition={{
					delay: 0.2,
					type: "tween",
					ease: "easeOut",
					duration: 0.3,
				}}
			/>
		</svg>
	);
}

const VerticalCollapsibleSteps = React.forwardRef<
	HTMLButtonElement,
	VerticalCollapsibleStepsProps
>(
	(
		{
			color = "primary",
			steps = [],
			defaultStep = 0,
			onStepChange,
			currentStep: currentStepProp,
			stepClassName,
			className,
			...props
		},
		ref,
	) => {
		const [currentStep, setCurrentStep] = useControlledState(
			currentStepProp,
			defaultStep,
			onStepChange,
		);

		const colors = React.useMemo(() => {
			let userColor: string;
			let fgColor: string;

			const colorsVars = [
				"[--active-fg-color:hsl(var(--step-fg-color))]",
				"[--active-border-color:hsl(var(--step-color))]",
				"[--active-color:hsl(var(--step-color))]",
				"[--complete-background-color:hsl(var(--step-color))]",
				"[--complete-border-color:hsl(var(--step-color))]",
				"[--inactive-border-color:hsl(var(--nextui-default-300))]",
				"[--inactive-color:hsl(var(--nextui-default-300))]",
			];

			switch (color) {
				case "primary":
					userColor = "[--step-color:var(--nextui-primary)]";
					fgColor = "[--step-fg-color:var(--nextui-primary-foreground)]";
					break;
				case "secondary":
					userColor = "[--step-color:var(--nextui-secondary)]";
					fgColor = "[--step-fg-color:var(--nextui-secondary-foreground)]";
					break;
				case "success":
					userColor = "[--step-color:var(--nextui-success)]";
					fgColor = "[--step-fg-color:var(--nextui-success-foreground)]";
					break;
				case "warning":
					userColor = "[--step-color:var(--nextui-warning)]";
					fgColor = "[--step-fg-color:var(--nextui-warning-foreground)]";
					break;
				case "danger":
					userColor = "[--step-color:var(--nextui-error)]";
					fgColor = "[--step-fg-color:var(--nextui-error-foreground)]";
					break;
				case "default":
					userColor = "[--step-color:var(--nextui-default)]";
					fgColor = "[--step-fg-color:var(--nextui-default-foreground)]";
					break;
				default:
					userColor = "[--step-color:var(--nextui-primary)]";
					fgColor = "[--step-fg-color:var(--nextui-primary-foreground)]";
					break;
			}

			colorsVars.unshift(fgColor);
			colorsVars.unshift(userColor);

			return colorsVars;
		}, [color]);

		return (
			<nav aria-label="Progress">
				<ol className={cn("flex flex-col gap-y-3", colors, className)}>
					{steps?.map((step, stepIdx) => {
						const status =
							currentStep === stepIdx
								? "active"
								: currentStep < stepIdx
									? "inactive"
									: "complete";

						return (
							<li
								key={`${stepIdx}-${step.title}`}
								className={cn(
									"rounded-large border-default-200 data-[status=active]:bg-default-100 dark:border-default-50 dark:data-[status=active]:bg-default-50 group relative gap-4 border",
									stepClassName,
								)}
								data-status={status}
							>
								<div className="flex w-full max-w-full items-center">
									<button
										key={`${stepIdx}-${step.title}`}
										ref={ref}
										aria-current={status === "active" ? "step" : undefined}
										className={cn(
											"rounded-large flex w-full cursor-pointer items-center justify-center gap-x-4 px-3 py-2.5",
										)}
										onClick={() => setCurrentStep(stepIdx)}
										{...props}
									>
										<div className="flex h-full items-center">
											<LazyMotion features={domAnimation}>
												<m.div animate={status} className="relative">
													<m.div
														className={cn(
															"border-medium text-large text-default-foreground relative flex h-[34px] w-[34px] items-center justify-center rounded-full font-semibold",
															{
																"shadow-lg": status === "complete",
															},
														)}
														initial={false}
														transition={{ duration: 0.25 }}
														variants={{
															inactive: {
																backgroundColor: "transparent",
																borderColor: "var(--inactive-border-color)",
																color: "var(--inactive-color)",
															},
															active: {
																backgroundColor: "transparent",
																borderColor: "var(--active-border-color)",
																color: "var(--active-color)",
															},
															complete: {
																backgroundColor:
																	"var(--complete-background-color)",
																borderColor: "var(--complete-border-color)",
															},
														}}
													>
														<div className="flex items-center justify-center">
															{status === "complete" ? (
																<CheckIcon className="h-6 w-6 text-[var(--active-fg-color)]" />
															) : (
																<span>{stepIdx + 1}</span>
															)}
														</div>
													</m.div>
												</m.div>
											</LazyMotion>
										</div>
										<div className="flex-1 text-left">
											<div>
												<div
													className={cn(
														"text-medium text-default-foreground font-medium transition-[color,opacity] duration-300 group-active:opacity-80",
														{
															"text-default-500": status === "inactive",
														},
													)}
												>
													{step.title}
												</div>
												<div
													className={cn(
														"text-tiny text-default-600 lg:text-small transition-[color,opacity] duration-300 group-active:opacity-80",
														{
															"text-default-500": status === "inactive",
														},
													)}
												>
													{step.description}
												</div>
											</div>
										</div>
									</button>
								</div>
								{step.details && step.details?.length > 0 && (
									<LazyMotion features={domAnimation}>
										<m.div
											animate={status}
											className="flex"
											exit="complete"
											initial={false}
											transition={{
												opacity: {
													duration: 0.25,
												},
												height: {
													type: "spring",
													stiffness: 300,
													damping: 30,
												},
											}}
											variants={{
												active: { opacity: 1, height: "auto" },
												inactive: { opacity: 0, height: 0 },
												complete: { opacity: 0, height: 0 },
											}}
										>
											<Spacer x={14} />
											<ul className="text-default-400 list-disc pb-4 pl-1 pr-12">
												{step.details.map((detail) => (
													<li key={detail} className="text-tiny mb-1">
														{detail}
													</li>
												))}
											</ul>
										</m.div>
									</LazyMotion>
								)}
							</li>
						);
					})}
				</ol>
			</nav>
		);
	},
);

VerticalCollapsibleSteps.displayName = "VerticalCollapsibleSteps";

export default VerticalCollapsibleSteps;
