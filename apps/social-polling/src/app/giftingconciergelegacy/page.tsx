import { Button, Image } from "@nextui-org/react";

import { WavyText } from "~/components/magicui/wavy-text";
import { Brands } from "./_components/brands";
import { CardIDK } from "./_components/card-idk";
import { FAQs } from "./_components/faqs";
import { Hero } from "./_components/hero";
import { HeroAnimation } from "./_components/hero-animation";
import { Robot3D } from "./_components/robot3d";
import { Steps } from "./_components/steps";
import { Testimonials } from "./_components/testimonials";

export default function GiftingConciergePage() {
	return (
		<>
			<HeroAnimation />
			<main className="mx-auto flex flex-1 flex-col items-center justify-center overflow-auto">
				<Brands />
				<div className="bg-content2 mx-auto flex w-full flex-col items-center justify-center gap-8 py-36">
					<div className="flex flex-col gap-4">
						<div className="mx-auto my-4 flex flex-col gap-4 py-6 text-center">
							<WavyText word="A marketplace of magical gifts." />
							<p className="mx-auto max-w-xl text-pretty text-lg">
								The Liaison is a platform that connects you with the best
								gifting concierges in your area. With our platform, you can
								easily find the perfect gifting concierge for your needs.
							</p>
						</div>

						<div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
							<CardIDK title="For Him" description="For Him">
								<Robot3D />
							</CardIDK>
							<CardIDK title="For She" description="For She">
								<Robot3D />
							</CardIDK>
							<CardIDK title="With AI" description="Very cool AI">
								<Robot3D />
							</CardIDK>
						</div>
					</div>
				</div>

				<Steps />

				<div className="bg-content2 mx-auto flex w-full flex-col items-center justify-center gap-8 py-36">
					<div className="mx-auto my-4 flex max-w-xl flex-col gap-4 py-6 text-center">
						<h3 className="text-4xl font-bold">
							Your personal AI Gifting Assistant is here!.
						</h3>
						<p className="text-pretty text-lg">
							Just lean back and let the AI do the heaviest part for you.
						</p>
					</div>

					<div className="mx-auto flex max-w-screen-xl flex-col items-start justify-between gap-4 px-24 lg:flex-row">
						<div className="grid gap-2 text-base">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim id
								totam sit dignissimos? Ratione, fugiat? Cumque quis laudantium
								in velit!
							</p>

							<ul className="ml-8 grid list-disc gap-2">
								<li>Lorem ipsum dolor sit amet consectetur.</li>
								<li>Lorem ipsum dolor sit amet.</li>
								<li>Lorem ipsum dolor sit amet.</li>
							</ul>

							<Button color="primary" className="mt-4 max-w-fit">
								Get Started with the AI
							</Button>
						</div>

						<div>
							<Image src="/ai-temp.webp" />
						</div>
					</div>
				</div>

				{/* <Hero /> */}
				<Testimonials />
				<FAQs />
			</main>
		</>
	);
}
