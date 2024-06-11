import Image from "next/image";

export function About() {
	return (
		<>
			<AboutHeader />
			<section className="mx-auto max-w-screen-2xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<div className="mt-16 grid w-full grid-cols-1 place-items-center items-center justify-center gap-8 lg:grid-cols-2">
						<figure className="w-full max-w-[600px] flex-none lg:w-[45rem]">
							<Image
								src="/stepahnie.webp"
								alt="sthepanie"
								width={400}
								height={400}
								className="w-full rounded-2xl object-cover"
							/>
						</figure>

						<div className="flex flex-col gap-2 text-pretty">
							<p className="text-xl text-neutral-800">
								From taboo topics to deep vulnerability, I’ve made it my mission
								to share the collective's insight to better understand our
								relationships and experiences.
							</p>
							<p className="text-xl text-neutral-800 ">
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
		<div className="mx-auto mt-6 max-w-screen-2xl px-6 lg:px-8">
			<div className="mx-auto max-w-2xl lg:max-w-none">
				<div className="max-w-2xl">
					<h2>
						<span className="font-display mb-6 block text-base font-semibold">
							About me
						</span>
						<span className="sr-only"> - </span>
						<span className="font-heading block text-4xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl">
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
