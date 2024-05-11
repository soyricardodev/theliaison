import { HandHeart, Handshake, type LucideIcon, Sparkles } from "lucide-react";
import Image from "next/image";

export function ServicesHeader() {
	return (
		<div
			className="mx-auto max-w-screen-2xl px-6 lg:px-8 mt-24 sm:mt-32 lg:mt-40"
			id="features"
		>
			<div className="mx-auto max-w-2xl lg:max-w-none">
				<div className="max-w-2xl">
					<h2>
						<span className="mb-6 block font-display text-base font-semibold">
							Services
						</span>
						<span className="sr-only"> - </span>
						<span className="block tracking-tight [text-wrap:balance] text-4xl font-bold font-heading sm:text-5xl">
							It's not luck, it's positioning.
						</span>
					</h2>
					<div className="mt-6 text-xl text-neutral-600">
						<p>
							Think of me as your online personal branding consultant. <br />
							Here's what you can expect after implementing my suggestions:
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export function ServiceItem({
	title,
	description,
	Icon,
}: { title: string; description: string; Icon: LucideIcon }) {
	return (
		<li className="group mt-10 first:mt-0">
			<div>
				<div className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
					<Icon className="size-6 mb-2" />
					<strong className="font-semibold text-neutral-950 mr-2">
						{title}:
					</strong>
					{description}
				</div>
			</div>
		</li>
	);
}

export function Services() {
	return (
		<>
			<ServicesHeader />
			<div className="mx-auto max-w-screen-2xl px-6 lg:px-8 mt-16">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<div className="lg:flex lg:items-center lg:justify-end">
						<div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
							<div className="w-[33.75rem] flex-none lg:w-[45rem]">
								<div className="justify-center lg:justify-end relative flex aspect-[719/680] w-full">
									<svg viewBox="0 0 655 680" fill="none" className="h-full">
										<g clipPath="url(#:S1:-clip)" className="group">
											<g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105">
												<foreignObject width={655} height={680}>
													<Image
														src="/stepahnie.webp"
														alt="sthepanie"
														width={2400}
														height={3000}
														className="w-full bg-neutral-100 object-cover"
														style={{
															aspectRatio: "655/680",
															color: "transparent",
														}}
													/>
												</foreignObject>
											</g>
											<use
												href="#:S1:-shape"
												strokeWidth="2"
												className="stroke-neutral-950/10"
											/>
										</g>
										<defs>
											<clipPath id=":S1:-clip">
												<path
													id=":S1:-shape"
													d="M537.827 9.245A11.5 11.5 0 0 1 549.104 0h63.366c7.257 0 12.7 6.64 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 586.87 151h-28.275a15.999 15.999 0 0 0-15.689 12.862l-59.4 297c-1.98 9.901 5.592 19.138 15.689 19.138h17.275l.127.001c.85.009 1.701.074 2.549.009 11.329-.874 21.411-7.529 24.88-25.981.002-.012.016-.016.023-.007.008.009.022.005.024-.006l24.754-123.771A11.5 11.5 0 0 1 580.104 321h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 617.87 472H559c-22.866 0-28.984 7.98-31.989 25.931-.004.026-.037.035-.052.014-.015-.02-.048-.013-.053.012l-24.759 123.798A11.5 11.5 0 0 1 490.87 631h-29.132a14.953 14.953 0 0 0-14.664 12.021c-4.3 21.502-23.18 36.979-45.107 36.979H83.502c-29.028 0-50.8-26.557-45.107-55.021l102.4-512C145.096 91.477 163.975 76 185.902 76h318.465c10.136 0 21.179-5.35 23.167-15.288l10.293-51.467Zm-512 160A11.5 11.5 0 0 1 37.104 160h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 74.87 311H11.504c-7.257 0-12.7-6.639-11.277-13.755l25.6-128Z"
													fillRule="evenodd"
													clipRule="evenodd"
												/>
											</clipPath>
										</defs>
									</svg>
								</div>
							</div>
						</div>
						<div>
							<ul className="text-base text-neutral-600 mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
								<ServiceItem
									Icon={Handshake}
									title="
Increased opportunities"
									description="
Whether you're here for your business, and or dating, my goal is to attractively position yourself so that you will naturally align with higher quality opportunities."
								/>
								<ServiceItem
									Icon={Sparkles}
									title="Higher quality experiences"
									description="I share insights  from thousands of women that will help you understand what they find attractive, what makes them swipe left/ right, and what makes them want to message you first. These insights will help you craft a dating profile that will attract your ideal match."
								/>
								<ServiceItem
									Icon={HandHeart}
									title="More confidence"
									description="Gain the insight and support needed to navigate the world of social media/ online dating seamlessly—matching, messaging, and meeting up with women!"
								/>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
