import {
	DollarSignIcon,
	ListTodoIcon,
	LockKeyholeIcon,
	MessageSquareHeartIcon,
	PartyPopperIcon,
	PhoneOutgoingIcon,
	ShoppingCartIcon,
	SparklesIcon,
	TruckIcon,
	UndoDotIcon,
} from "lucide-react";

const features = [
	{
		icon: <ListTodoIcon className="size-6" />,
		title: "Tailored Gift Suggestions",
		description:
			"Receive personalized gift recommendations based on the recipient's interests, hobbies, and preferences.",
	},
	{
		icon: <ShoppingCartIcon className="size-6" />,
		title: "Easy Checkout Process",
		description:
			"Enjoy a hassle-free purchase experience with a streamlined checkout process.",
	},
	{
		icon: <PhoneOutgoingIcon className="size-6" />,
		title: "Contactless Gift Delivery",
		description:
			"Send gifts without needing the recipient's address; we’ll handle the contact and delivery arrangements.",
	},
	{
		icon: <TruckIcon className="size-6" />,
		title: "Delivery Tracking",
		description:
			"Track your gift delivery in real-time and stay updated on its status from dispatch to delivery.",
	},
	{
		icon: <LockKeyholeIcon className="size-6" />,
		title: "Secure Payments",
		description:
			"Make payments securely with multiple payment options, including credit card and online wallets.",
	},
	{
		icon: <MessageSquareHeartIcon className="size-6" />,
		title: "Custom Gift Messages",
		description:
			"Add a personal touch with custom messages included with your gift.",
	},
	{
		icon: <PartyPopperIcon className="size-6" />,
		title: "Event-Specific Ideas",
		description:
			"Get gift ideas tailored for specific occasions such as birthdays, anniversaries, and holidays.",
	},
	{
		icon: <UndoDotIcon className="size-6" />,
		title: "Easy Returns",
		description:
			"Enjoy peace of mind with our simple and hassle-free refund and return policy in case something goes wrong.",
	},
];

export function Features() {
	return (
		<div className="max-w-7xl mx-auto px-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10">
				{features.map((feature, i) => (
					<div
						className="flex flex-col lg:border-r py-10 relative group lg:border-l lg:border-b"
						key={`${i}-${feature.title}`}
					>
						<div className="opacity-0 group-hover:opacity-100 transition duration-200 group absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />

						<div className="mb-4 relative z-10 px-10">{feature.icon}</div>

						<div className="text-lg font-bold mb-2 relative z-10 px-10">
							<div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover:bg-primary transition duration-200" />

							<span className="group-hover:translate-x-2 transition duration-200 inline-block">
								{feature.title}
							</span>
						</div>

						<p className="text-sm text-[#525252] max-w-xs mx-auto relative z-10 px-10">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
