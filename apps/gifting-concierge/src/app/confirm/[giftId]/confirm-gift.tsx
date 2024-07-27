"use client";

import { useMediaQuery } from "@theliaison/hooks";
import { cn } from "@theliaison/ui";
import { Button } from "@theliaison/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@theliaison/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@theliaison/ui/drawer";
import { Step, Stepper, useStepper } from "@theliaison/ui/stepper";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useConfirmDialogStore } from "~/store/confirm-dialog";
import { createClient } from '@supabase/supabase-js'; 
import { LoginForm } from "~/app/(auth)/login/login-form";


const steps: { label: string; description: string }[] = [
	{
		label: "Our terms",
		description:
			"Read our terms and conditions to ensure you understand what we're doing.",
	},
	{
		label: "Create an account",
		description: "Create an account to receive your gift.",
	},
	{
		label: "Enter your address",
		description: "Enter your delivery address securely through our platform.",
	},
];

export function ConfirmGift({ children }: { children: React.ReactNode }) {
	const { isOpen, setIsOpen } = useConfirmDialogStore();
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<div className="relative group">
						<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
						<Button className="bg-white hover:bg-white text-black px-6 w-full rounded-full font-semibold h-12 pl-5 pr-2 text-base relative">
							Receive gift
							<span className="text-[#70757E]">
								<ChevronRightIcon />
							</span>
						</Button>
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[525px] dark">
					{/* <DialogHeader>
						<DialogTitle className="text-foreground">
							Shipping Details
						</DialogTitle>
						<DialogDescription>
							Please provide your shipping details.
						</DialogDescription>
					</DialogHeader> */}
					<StepperConfirmGift>{children}</StepperConfirmGift>
					{/* {children} */}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<div className="relative group">
					<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
					<Button className="bg-white hover:bg-white text-black px-6 w-full rounded-full font-semibold h-12 pl-5 pr-2 text-base relative">
						Receive gift
						<span className="text-[#70757E]">
							<ChevronRightIcon />
						</span>
					</Button>
				</div>
			</DrawerTrigger>
			<DrawerContent className="min-h-full max-h-[80%] dark">
				<StepperConfirmGift>{children}</StepperConfirmGift>
				{/* <DrawerHeader className="text-left">
					<DrawerTitle className="text-foreground">
						Shipping Details
					</DrawerTitle>
					<DrawerDescription>
						Please provide your shipping details.
					</DrawerDescription>
				</DrawerHeader>
				<ScrollArea className="min-h-[600px] h-[700px] w-full px-4 py-6">
					{children}
				</ScrollArea> */}
				{/* <DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button
							variant="outline"
							className="dark text-foreground border-foreground/90"
						>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter> */}
			</DrawerContent>
		</Drawer>
	);
}

function StepperConfirmGift({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex w-full flex-col gap-4">
			<Stepper initialStep={0} steps={steps}>
				{steps.map((stepProps, index) => {
					return (
						<Step key={stepProps.label}>
							<div
								className={cn(
									"min-h-40 h-auto flex items-center justify-center my-2 border bg-white text-primary rounded-md p-4",
									{
										"bg-transparent": index === 2,
									},
								)}
							>
								{index === 0 ? <FirstStepConfirmGift /> : null}
								{index === 1 ? <LoginForm/> : null}
								{index === 2 ? children : null}
							</div>
						</Step>
					);
				})}
				<Footer />
			</Stepper>
		</div>
	);
}

const Footer = () => {
	const {
		nextStep,
		prevStep,
		resetSteps,
		hasCompletedAllSteps,
		isLastStep,
		isOptionalStep,
		isDisabledStep,
	} = useStepper();
	return (
		<>
			{hasCompletedAllSteps && (
				<div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
					<h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
				</div>
			)}
			<div className="w-full flex justify-end gap-2">
				{hasCompletedAllSteps ? (
					<Button size="sm" onClick={resetSteps}>
						Reset
					</Button>
				) : (
					<>
						<Button
							disabled={isDisabledStep}
							onClick={prevStep}
							size="sm"
							variant="secondary"
							className="bg-white hover:bg-slate-300"
						>
							Prev
						</Button>
						<Button size="sm" className="bg-gray-800 hover:bg-slate-900" onClick={nextStep}>
							{isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
						</Button>
					</>
				)}
			</div>
		</>
	);
};

function FirstStepConfirmGift() {
	return (
		<div className="flex flex-col gap-4 [&>p]:text-black">
			<p>
				The Liaison is designed to make the process secure, efficient and
				exciting! 🎁
			</p>
			<p>
				To receive your gift, simply{" "}
				<a href="https://theliaison.vercel.app/login">create an account here</a>
				.
			</p>

			<p>Here's how it works:</p>
			<ol className="list-decimal list-inside text-black">
				<li>Make an account.</li>
				<li>
					Enter your delivery address securely through our platform.{" "}
					<strong>Never</strong> shared with the sender.
				</li>
				<li>
					We’ll keep you updated on when your package is ready and shipped!
				</li>
			</ol>

			<p className="font-semibold">Let's get started! 🤠</p>

			<p className="italic">
				Ps. We value your privacy and security, so you can check out our{" "}
				<Link
					href="/privacy-policy"
					className="font-semibold underline hover:no-underline"
				>
					Privacy Policy
				</Link>{" "}
				and{" "}
				<Link
					href="/terms-of-service"
					className="font-semibold underline hover:no-underline"
				>
					Terms of Use
				</Link>{" "}
				if you’d like to see how we protect your information.
			</p>
		</div>
	);
}

function LoginButton() {
	// const origin = window.location.origin
	// return (
	// 	<div className="flex flex-col gap-2">
	// 		<p>You need to log in</p>
	// 		<Button onClick={() => window.open(`${origin}/login`, '_blank')}>
	// 			Login
	// 		</Button>
	// 	</div>
	// )
}
