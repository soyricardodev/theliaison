export function Hero() {
	return (
		<div className="relative flex w-full flex-col items-center justify-center gap-6 px-6 py-16 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="bg-gradient-to-br bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter text-transparent from-black from-40% to-black/40 sm:text-6xl md:text-7xl lg:text-7xl text-balance">
					Your Gifting Concierge
				</h1>
				<p className="max-w-[60rem] text-pretty text-lg tracking-tight text-gray-500 md:text-xl">
					<strong>Send surprises</strong> without the address hassle.
				</p>
			</div>
		</div>
	);
}
