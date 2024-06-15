import { Button, Image } from "@nextui-org/react";

export function Hero() {
	return (
		<div className="relative flex w-full flex-col items-center justify-center gap-6 px-6 py-12 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
			<div className="flex w-full flex-col gap-11 md:flex-row">
				<div className="flex flex-col items-start gap-4 text-left">
					<h1 className="text-balance bg-gradient-to-br from-black from-40% to-black/40 bg-clip-text py-2 text-5xl font-semibold leading-none tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-7xl">
						Your Gifting Concierge
					</h1>
					<p className="max-w-[60rem] text-pretty text-lg tracking-tight text-gray-500 md:text-xl">
						<strong>Send surprises</strong> without the address hassle.
					</p>
					<Button color="default" variant="shadow">
						Get Started
					</Button>
				</div>
				<div className="flex w-full items-center justify-center">
					<Image
						src="/gc-hero.webp"
						alt="Gifting Concierge"
						width={300}
						height={600}
						className="w-full rounded-2xl object-cover"
					/>
				</div>
			</div>
		</div>
	);
}
