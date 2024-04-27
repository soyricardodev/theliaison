import Image from "next/image";

export function About() {
	return (
		<>
			<AboutHeader />
			<section className="max-w-screen-2xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<div className="grid grid-cols-1 items-center place-items-center justify-center lg:grid-cols-2 w-full gap-8 mt-16">
						<figure className="w-full max-w-[600px] flex-none lg:w-[45rem]">
							<Image
								src="/stepahnie.webp"
								alt="sthepanie"
								width={400}
								height={400}
								className="w-full object-cover rounded-2xl"
							/>
						</figure>

						<div className="flex flex-col gap-2 text-pretty">
							<p className="text-lg text-neutral-800">
								From taboo topics to deep vulnerability, I’ve made it my mission
								to share the collective's insight to better understand our
								relationships and experiences.
							</p>
							<p className="text-lg text-neutral-800 ">
								The wealth of honest feedback, insights, and experiences shared
								by my female audience has helped me relay real and data-driven
								advice to men. In turn, this insight has helped thousands of men
								build their confidence, match with higher quality women, go on
								dates and even get into relationships with their ideal partner!
								🥰
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export function AboutHeader() {
	return (
		<div className="mx-auto max-w-screen-2xl px-6 lg:px-8 mt-6">
			<div className="mx-auto max-w-2xl lg:max-w-none">
				<div className="max-w-2xl">
					<h2>
						<span className="mb-6 block font-display text-base font-semibold">
							About me
						</span>
						<span className="sr-only"> - </span>
						<span className="block tracking-tight [text-wrap:balance] text-4xl font-bold font-heading sm:text-5xl">
							Hey, I’m Stephanie!
							<br /> Also known as, The Liaison.
						</span>
					</h2>
					<div className="mt-6 text-xl">
						<p>
							[Liaison]: A person who acts as a link to assist communication
							between groups of people.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
