import Link from "next/link";

import { cn } from "@theliaison/ui";
import { buttonVariants } from "@theliaison/ui/button";

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
      <section className="overflow-hidden px-2 py-20">
        <div className="relative z-20 mx-auto w-full max-w-[84rem]">
          <div className="grid grid-cols-1 gap-10 pb-40 xl:grid-cols-2">
            <div className="flex flex-col items-start px-8 xl:px-0">
              <h1 className="font-heading relative mb-6 max-w-4xl text-balance text-left text-5xl font-black !leading-none md:text-7xl xl:pt-20">
                <span className="[max-width:455px]">
                  Make your
                  <br /> personal branding
                  <br /> 10x beautiful
                </span>
              </h1>
              <h2 className="relative mb-8 max-w-2xl text-pretty text-left text-lg font-normal tracking-wide antialiased sm:text-xl ">
                Let me help you rebrand your digital presence to elevate and
                expand your opportunities in life and love ❤️.
              </h2>
              <div className="mb-4 flex w-full flex-col justify-center space-y-2 sm:flex-row sm:justify-start sm:space-x-4 sm:space-y-0">
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full transition-shadow hover:shadow-2xl",
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
            <div className="relative hidden h-full w-full xl:mt-14 xl:block">
              <HeroYoutube />
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
