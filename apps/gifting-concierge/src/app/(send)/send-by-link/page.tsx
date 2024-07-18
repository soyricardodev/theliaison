import { Toaster } from "@theliaison/ui/sonner";
import { StepperForm } from "./stepper-form";

export const metadata = {
	title: "Send a Gift by Link",
	description: "Provide gift links and we'll take care of the rest.",
};

export default function SendByLink() {
	return (
		<div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 w-full">
			<StepperForm />
			{/* <SendByLinkForm /> */}
			<Toaster />
		</div>
	);
}
