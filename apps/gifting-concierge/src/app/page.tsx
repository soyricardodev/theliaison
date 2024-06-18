import { Hero } from "./components/hero";
import { Companies } from "./components/companies";

export default function Home() {
	return (
		<main className="min-h-screen antialiased">
			<Hero />
			<Companies />
			<div className="[--color:var(--color-one)] pointer-events-none relative -z-[2] mx-auto h-[50rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] my-[-18.8rem] before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))] after:bg-background after:z-50 before:z-50" />
			<section id="something">
				<div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
					<div className="mx-auto max-w-5xl text-center">
						<h4 className="text-xl font-bold tracking-tight text-black">
							Something
						</h4>
						<h2 className="text-5xl font-bold tracking-tight text-black sm:text-6xl">
							Something too
						</h2>
						<p className="mt-6 text-xl leading-8 text-black/80">
							Choose an <strong>affordable plan</strong> that's packed with the
							best features for engaging your audience, creating customer
							loyalty, and driving sales.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
