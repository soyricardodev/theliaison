import { Header } from "~/components/header";
import { Bento } from "../components/bento/index";
import { CallToAction } from "../components/call-to-action";
import { Companies } from "../components/companies";
import { FAQs } from "../components/faq";
import { Features } from "../components/features";
import { Footer } from "../components/footer";
import { Hero } from "../components/hero";
import { SocialProofTestimonials } from "../components/testimonials";

export default function HowItWorks() {
	return (
		<>
			<Header />
			<main className="antialiased overflow-x-hidden">
				<div className="max-w-7xl mx-auto px-4 flex min-h-screen flex-col items-center justify-between">
					<Bento />
					<Features />
					<SocialProofTestimonials />
					<FAQs />
					<CallToAction
						title="Send a gift for your loved one"
						description="Get started with the Gifting Concierge AI to send a gift for your loved one."
						ctaText="Get Started"
						ctaHref="/giftshop"
					/>
				</div>
			</main>
			<Footer />
		</>
	);
}
