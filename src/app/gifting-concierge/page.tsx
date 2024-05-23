import { FAQs } from "./_components/faqs";
import { Hero } from "./_components/hero";
import { Testimonials } from "./_components/testimonials";

export default function GiftingConciergePage() {
	return (
		<main className="flex-1 overflow-auto max-w-screen-2xl mx-auto flex flex-col">
			<Hero />
			<Testimonials />
			<FAQs />
		</main>
	);
}
