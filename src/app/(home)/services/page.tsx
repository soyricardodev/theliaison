import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { About } from "../_components/about";
import CallToAction from "../_components/cta";
import FAQ from "../_components/faq";
import { HeroYoutube } from "../_components/hero-youtube";
import { Services } from "../_components/services";
import { Testimonial } from "../_components/testimonial";
import { Work } from "../_components/work";
import PricingPage from "../pricing/page";

export default function Home() {
	return (
		<>
			<section className="py-20 overflow-hidden px-2">
				<div className="max-w-[84rem] w-full mx-auto relative z-20">
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pb-40">
						<div className="flex flex-col items-start xl:px-0 px-8">
							<h1 className="text-5xl font-heading md:text-7xl font-black mb-6 relative text-left text-balance max-w-4xl !leading-none xl:pt-20">
								<span className="[max-width:455px]">
									Make your
									<br /> personal branding
									<br /> 10x beautiful
								</span>
							</h1>
							<h2 className="relative text-lg sm:text-xl text-pretty tracking-wide mb-8 text-left max-w-2xl antialiased font-normal ">
								Let me help you rebrand your digital presence to elevate and
								expand your opportunities in life and love ❤️.
							</h2>
							<div className="flex sm:flex-row flex-col space-y-2 justify-center sm:space-y-0 sm:space-x-4 sm:justify-start mb-4 w-full">
								<Link
									className={cn(
										buttonVariants({ size: "lg" }),
										"rounded-full hover:shadow-2xl transition-shadow",
									)}
									href="/pricing"
								>
									Get Started
								</Link>
								<Link
									className={cn(
										buttonVariants({ variant: "outline", size: "lg" }),
										"rounded-full",
									)}
									href="/#features"
								>
									Learn More
								</Link>
							</div>
						</div>
						<div className="hidden xl:block w-full h-full relative xl:mt-14">
							<HeroYoutube />
							{/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 mt-4">
								<div className="w-80 overflow-hidden h-60">
									<div className="overflow-hidden rounded-xl w-full h-full z-50 relative border bg-background p-2 flex flex-col">
										<HeroMarquee />
									</div>
								</div>
								<div className="flex h-full w-full items-center justify-center antialiased">
									<AnimatedListHero />
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</section>
			<About />
			<Services />
			<Work />
			<PricingPage />
			<Testimonial />
			<FAQ />
			<CallToAction />
		</>
	);
}
