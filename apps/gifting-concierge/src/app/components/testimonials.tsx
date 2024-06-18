import { cn } from "@theliaison/ui";
import Marquee from "@theliaison/ui/magicui/marquee";

function StarFilledIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={15}
			height={15}
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Star Filled</title>
			<path
				d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export const Highlight = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<span
			className={cn(
				"bg-[var(--color-one)]/40] p-1 py-0.5 font-bold text-[var(--color-one)]",
				className,
			)}
		>
			{children}
		</span>
	);
};

export interface TestimonialCardProps {
	name: string;
	role: string;
	img?: string;
	description: React.ReactNode;
	className?: string;
	[key: string]: any;
}

export const TestimonialCard = ({
	description,
	name,
	img,
	role,
	className,
	...props // Capture the rest of the props
}: TestimonialCardProps) => (
	<div
		className={cn(
			"mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
			// light styles
			"border border-neutral-200 bg-white",
			className,
		)}
		{...props} // Spread the rest of the props here
	>
		<div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
			{description}
			<div className="flex flex-row py-1">
				<StarFilledIcon className="size-4 text-yellow-500" />
				<StarFilledIcon className="size-4 text-yellow-500" />
				<StarFilledIcon className="size-4 text-yellow-500" />
				<StarFilledIcon className="size-4 text-yellow-500" />
				<StarFilledIcon className="size-4 text-yellow-500" />
			</div>
		</div>

		<div className="flex w-full select-none items-center justify-start gap-5">
			<img
				src={img}
				className="h-10 w-10 rounded-full  ring-1 ring-border ring-offset-4"
				alt={`${name}'s avatar`}
			/>

			<div>
				<p className="font-medium text-neutral-500">{name}</p>
				<p className="text-xs font-normal text-neutral-400">{role}</p>
			</div>
		</div>
	</div>
);

const testimonials = [
	{
		name: "Alex Rivera",
		role: "New York",
		img: "https://randomuser.me/api/portraits/men/91.jpg",
		description: (
			<p>
				I FEEL SAFE SHOPPING AT THE LIAISON GIFTING.{" "}
				<Highlight>
					WITH THEIR SECURITY CERTIFICATES AND FRIENDLY USER EXPERIENCE
				</Highlight>
				, THEY HAVE TRULY BECOME MY GO-TO PLACE FOR SPECIAL GIFTS.
			</p>
		),
	},
	{
		name: "Samantha Lee",
		role: "San Francisco",
		img: "https://randomuser.me/api/portraits/women/12.jpg",
		description: (
			<p>
				I ALWAYS GET GREAT VALUE WHEN SHOPPING AT THE LIAISON GIFTING. THEIR
				EXCLUSIVE PRODUCTS NOT ONLY LOOK EXPENSIVE, BUT ALSO PROVIDE{" "}
				<Highlight>THE BEST VALUE FOR MY MONEY</Highlight>
			</p>
		),
	},
	{
		name: "Raj Patel",
		role: "San Diego",
		img: "https://randomuser.me/api/portraits/men/45.jpg",
		description: (
			<p>
				THE LIAISON GIFTING NOT ONLY OFFERS EXCLUSIVE PRODUCTS, BUT ALSO THE
				BEST SHOPPING EXPERIENCE. <Highlight>THE PROCESS IS SIMPLE</Highlight>,
				AND THE PRODUCTS ARE ALWAYS OF HIGH QUALITY.
			</p>
		),
	},
	{
		name: "Alex Rivera",
		role: "New York",
		img: "https://randomuser.me/api/portraits/men/91.jpg",
		description: (
			<p>
				I FEEL SAFE SHOPPING AT THE LIAISON GIFTING.{" "}
				<Highlight>
					WITH THEIR SECURITY CERTIFICATES AND FRIENDLY USER EXPERIENCE
				</Highlight>
				, THEY HAVE TRULY BECOME MY GO-TO PLACE FOR SPECIAL GIFTS.
			</p>
		),
	},
	{
		name: "Samantha Lee",
		role: "San Francisco",
		img: "https://randomuser.me/api/portraits/women/12.jpg",
		description: (
			<p>
				I ALWAYS GET GREAT VALUE WHEN SHOPPING AT THE LIAISON GIFTING. THEIR
				EXCLUSIVE PRODUCTS NOT ONLY LOOK EXPENSIVE, BUT ALSO PROVIDE{" "}
				<Highlight>THE BEST VALUE FOR MY MONEY</Highlight>
			</p>
		),
	},
	{
		name: "Raj Patel",
		role: "San Diego",
		img: "https://randomuser.me/api/portraits/men/45.jpg",
		description: (
			<p>
				THE LIAISON GIFTING NOT ONLY OFFERS EXCLUSIVE PRODUCTS, BUT ALSO THE
				BEST SHOPPING EXPERIENCE. <Highlight>THE PROCESS IS SIMPLE</Highlight>,
				AND THE PRODUCTS ARE ALWAYS OF HIGH QUALITY.
			</p>
		),
	},
	{
		name: "Alex Rivera",
		role: "New York",
		img: "https://randomuser.me/api/portraits/men/91.jpg",
		description: (
			<p>
				I FEEL SAFE SHOPPING AT THE LIAISON GIFTING.{" "}
				<Highlight>
					WITH THEIR SECURITY CERTIFICATES AND FRIENDLY USER EXPERIENCE
				</Highlight>
				, THEY HAVE TRULY BECOME MY GO-TO PLACE FOR SPECIAL GIFTS.
			</p>
		),
	},
	{
		name: "Samantha Lee",
		role: "San Francisco",
		img: "https://randomuser.me/api/portraits/women/12.jpg",
		description: (
			<p>
				I ALWAYS GET GREAT VALUE WHEN SHOPPING AT THE LIAISON GIFTING. THEIR
				EXCLUSIVE PRODUCTS NOT ONLY LOOK EXPENSIVE, BUT ALSO PROVIDE{" "}
				<Highlight>THE BEST VALUE FOR MY MONEY</Highlight>
			</p>
		),
	},
	{
		name: "Raj Patel",
		role: "San Diego",
		img: "https://randomuser.me/api/portraits/men/45.jpg",
		description: (
			<p>
				THE LIAISON GIFTING NOT ONLY OFFERS EXCLUSIVE PRODUCTS, BUT ALSO THE
				BEST SHOPPING EXPERIENCE. <Highlight>THE PROCESS IS SIMPLE</Highlight>,
				AND THE PRODUCTS ARE ALWAYS OF HIGH QUALITY.
			</p>
		),
	},
	{
		name: "Alex Rivera",
		role: "New York",
		img: "https://randomuser.me/api/portraits/men/91.jpg",
		description: (
			<p>
				I FEEL SAFE SHOPPING AT THE LIAISON GIFTING.{" "}
				<Highlight>
					WITH THEIR SECURITY CERTIFICATES AND FRIENDLY USER EXPERIENCE
				</Highlight>
				, THEY HAVE TRULY BECOME MY GO-TO PLACE FOR SPECIAL GIFTS.
			</p>
		),
	},
	{
		name: "Samantha Lee",
		role: "San Francisco",
		img: "https://randomuser.me/api/portraits/women/12.jpg",
		description: (
			<p>
				I ALWAYS GET GREAT VALUE WHEN SHOPPING AT THE LIAISON GIFTING. THEIR
				EXCLUSIVE PRODUCTS NOT ONLY LOOK EXPENSIVE, BUT ALSO PROVIDE{" "}
				<Highlight>THE BEST VALUE FOR MY MONEY</Highlight>
			</p>
		),
	},
	{
		name: "Raj Patel",
		role: "San Diego",
		img: "https://randomuser.me/api/portraits/men/45.jpg",
		description: (
			<p>
				THE LIAISON GIFTING NOT ONLY OFFERS EXCLUSIVE PRODUCTS, BUT ALSO THE
				BEST SHOPPING EXPERIENCE. <Highlight>THE PROCESS IS SIMPLE</Highlight>,
				AND THE PRODUCTS ARE ALWAYS OF HIGH QUALITY.
			</p>
		),
	},
	{
		name: "Alex Rivera",
		role: "New York",
		img: "https://randomuser.me/api/portraits/men/91.jpg",
		description: (
			<p>
				I FEEL SAFE SHOPPING AT THE LIAISON GIFTING.{" "}
				<Highlight>
					WITH THEIR SECURITY CERTIFICATES AND FRIENDLY USER EXPERIENCE
				</Highlight>
				, THEY HAVE TRULY BECOME MY GO-TO PLACE FOR SPECIAL GIFTS.
			</p>
		),
	},
	{
		name: "Samantha Lee",
		role: "San Francisco",
		img: "https://randomuser.me/api/portraits/women/12.jpg",
		description: (
			<p>
				I ALWAYS GET GREAT VALUE WHEN SHOPPING AT THE LIAISON GIFTING. THEIR
				EXCLUSIVE PRODUCTS NOT ONLY LOOK EXPENSIVE, BUT ALSO PROVIDE{" "}
				<Highlight>THE BEST VALUE FOR MY MONEY</Highlight>
			</p>
		),
	},
	{
		name: "Raj Patel",
		role: "San Diego",
		img: "https://randomuser.me/api/portraits/men/45.jpg",
		description: (
			<p>
				THE LIAISON GIFTING NOT ONLY OFFERS EXCLUSIVE PRODUCTS, BUT ALSO THE
				BEST SHOPPING EXPERIENCE. <Highlight>THE PROCESS IS SIMPLE</Highlight>,
				AND THE PRODUCTS ARE ALWAYS OF HIGH QUALITY.
			</p>
		),
	},
	{
		name: "Alex Rivera",
		role: "New York",
		img: "https://randomuser.me/api/portraits/men/91.jpg",
		description: (
			<p>
				I FEEL SAFE SHOPPING AT THE LIAISON GIFTING.{" "}
				<Highlight>
					WITH THEIR SECURITY CERTIFICATES AND FRIENDLY USER EXPERIENCE
				</Highlight>
				, THEY HAVE TRULY BECOME MY GO-TO PLACE FOR SPECIAL GIFTS.
			</p>
		),
	},
	{
		name: "Samantha Lee",
		role: "San Francisco",
		img: "https://randomuser.me/api/portraits/women/12.jpg",
		description: (
			<p>
				I ALWAYS GET GREAT VALUE WHEN SHOPPING AT THE LIAISON GIFTING. THEIR
				EXCLUSIVE PRODUCTS NOT ONLY LOOK EXPENSIVE, BUT ALSO PROVIDE{" "}
				<Highlight>THE BEST VALUE FOR MY MONEY</Highlight>
			</p>
		),
	},
	{
		name: "Raj Patel",
		role: "San Diego",
		img: "https://randomuser.me/api/portraits/men/45.jpg",
		description: (
			<p>
				THE LIAISON GIFTING NOT ONLY OFFERS EXCLUSIVE PRODUCTS, BUT ALSO THE
				BEST SHOPPING EXPERIENCE. <Highlight>THE PROCESS IS SIMPLE</Highlight>,
				AND THE PRODUCTS ARE ALWAYS OF HIGH QUALITY.
			</p>
		),
	},
	{
		name: "Samantha Lee",
		role: "San Francisco",
		img: "https://randomuser.me/api/portraits/women/12.jpg",
		description: (
			<p>
				I ALWAYS GET GREAT VALUE WHEN SHOPPING AT THE LIAISON GIFTING. THEIR
				EXCLUSIVE PRODUCTS NOT ONLY LOOK EXPENSIVE, BUT ALSO PROVIDE{" "}
				<Highlight>THE BEST VALUE FOR MY MONEY</Highlight>
			</p>
		),
	},
	{
		name: "Raj Patel",
		role: "San Diego",
		img: "https://randomuser.me/api/portraits/men/45.jpg",
		description: (
			<p>
				THE LIAISON GIFTING NOT ONLY OFFERS EXCLUSIVE PRODUCTS, BUT ALSO THE
				BEST SHOPPING EXPERIENCE. <Highlight>THE PROCESS IS SIMPLE</Highlight>,
				AND THE PRODUCTS ARE ALWAYS OF HIGH QUALITY.
			</p>
		),
	},
];

export function SocialProofTestimonials() {
	return (
		<section id="testimonials">
			<div className="py-14">
				<div className="container mx-auto px-4 md:px-8">
					<h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
						What people are saying
					</h2>
					<h3 className="mx-auto mb-8 max-w-lg text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
						Don't just take our word for it. Here's what real people are saying
						about The Gifting Concierge on Twitter.
					</h3>
					<div className="relative mt-6 max-h-[650px] overflow-hidden">
						<div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
							{Array(Math.ceil(testimonials.length / 3))
								.fill(0)
								.map((_, i) => (
									<Marquee
										vertical
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={i}
										className={cn({
											"[--duration:60s]": i === 1,
											"[--duration:30s]": i === 2,
											"[--duration:70s]": i === 3,
										})}
									>
										{testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
											<TestimonialCard {...card} key={`${card.name}-${idx}`} />
										))}
									</Marquee>
								))}
						</div>
						<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-white from-20% dark:from-black" />
						<div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-white from-20% dark:from-black" />
					</div>
				</div>
			</div>
		</section>
	);
}
