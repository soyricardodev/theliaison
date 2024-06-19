import { Bento } from "./components/bento/index";
import { BentoDemo } from "./components/bento";
import { CallToAction } from "./components/call-to-action";
import { Companies } from "./components/companies";
import { FAQs } from "./components/faq";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { SocialProofTestimonials } from "./components/testimonials";

export default function Home() {
	return (
		<>
			<main className="antialiased overflow-x-hidden">
				<div className="max-w-7xl mx-auto px-4 flex min-h-screen flex-col items-center justify-between">
					<Hero />
					<Companies />
					<div className="[--color:var(--color-one)] pointer-events-none relative z-10 mx-auto h-[50rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] my-[-18.8rem] before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))] after:bg-background after:z-50 before:z-50" />
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
