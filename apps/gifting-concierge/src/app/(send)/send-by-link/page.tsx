import { Toaster } from "@theliaison/ui/sonner";
import { SendByLinkForm } from "./send-by-link-form";

export default function SendByLink() {
	return (
		<div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 w-full">
			<SendByLinkForm />
			<Toaster />
		</div>
	);
}
