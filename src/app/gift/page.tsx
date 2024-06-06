import { Button, Image } from "@nextui-org/react";
import { Brands } from "./_components/brands";
import { CardIDK } from "./_components/card-idk";
import { FAQs } from "./_components/faqs";
import { Hero } from "./_components/hero";
import { HeroAnimation } from "./_components/hero-animation";
import { Testimonials } from "./_components/testimonials";

export default function GiftingConciergePage() {
	return (
		<>
			<HeroAnimation />
			<main className="flex-1 overflow-auto mx-auto flex flex-col items-center justify-center">
				<Brands />
				<div className="bg-content2 py-36 w-full items-center justify-center mx-auto flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col my-4 py-6 max-w-xl mx-auto text-center gap-4">
							<h3 className="text-4xl font-bold">
								A marketplace of magical gifts.
							</h3>
							<p className="text-lg text-pretty">
								The Liaison is a platform that connects you with the best
								gifting concierges in your area. With our platform, you can
								easily find the perfect gifting concierge for your needs.
							</p>
						</div>

						<div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
							<CardIDK />
							<CardIDK />
							<CardIDK />
						</div>
					</div>
				</div>

				<div className="bg-content2 py-36 w-full items-center justify-center mx-auto flex flex-col gap-8">
					<div className="flex flex-col my-4 py-6 max-w-xl mx-auto text-center gap-4">
						<h3 className="text-4xl font-bold">
							Your personal AI Gifting Assistant is here!.
						</h3>
						<p className="text-lg text-pretty">
							Just lean back and let the AI do the heaviest part for you.
						</p>
					</div>

					<div className="flex flex-col items-start justify-between gap-4 lg:flex-row px-24 mx-auto max-w-screen-xl">
						<div className="text-base grid gap-2">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim id
								totam sit dignissimos? Ratione, fugiat? Cumque quis laudantium
								in velit!
							</p>

							<ul className="list-disc grid gap-2 ml-8">
								<li>Lorem ipsum dolor sit amet consectetur.</li>
								<li>Lorem ipsum dolor sit amet.</li>
								<li>Lorem ipsum dolor sit amet.</li>
							</ul>

							<Button color="primary" className="max-w-fit mt-4">
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
