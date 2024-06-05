import { FAQs } from "./_components/faqs";
import { Hero } from "./_components/hero";
import { HeroAnimation } from "./_components/hero-animation";
import { Testimonials } from "./_components/testimonials";

export default function GiftingConciergePage() {
	return (
		<>
			<HeroAnimation />
			<main className="flex-1 overflow-auto max-w-screen-2xl mx-auto flex flex-col">
				<Hero />
				<Testimonials />
				<FAQs />
			</main>
		</>
	);
}
