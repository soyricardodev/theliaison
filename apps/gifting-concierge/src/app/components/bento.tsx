import { CalendarIcon, FileTextIcon, InputIcon } from "@radix-ui/react-icons";
import { cn } from "@theliaison/ui";
import { Calendar } from "@theliaison/ui/calendar";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@theliaison/ui/command";
import { BentoCard, BentoGrid } from "@theliaison/ui/magicui/bento-grid";
import Marquee from "@theliaison/ui/magicui/marquee";
import { GiftIcon, Share2Icon } from "lucide-react";
import { AnimatedBeamMultipleOutputDemo } from "./beam-multiple";
import { GiftsMarquee } from "./bento/gifts-marquee";

const files = [
	{
		name: "bitcoin.pdf",
		body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
	},
	{
		name: "finances.xlsx",
		body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
	},
	{
		name: "logo.svg",
		body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
	},
	{
		name: "keys.gpg",
		body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
	},
	{
		name: "seed.txt",
		body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
	},
];

interface Item {
	name: string;
	description: string;
	icon: string;
	color: string;
	time: string;
}

let notifications = [
	{
		name: "Payment received",
		description: "Magic UI",
		time: "15m ago",

		icon: "💸",
		color: "#00C9A7",
	},
	{
		name: "User signed up",
		description: "Magic UI",
		time: "10m ago",
		icon: "👤",
		color: "#FFB800",
	},
	{
		name: "New message",
		description: "Magic UI",
		time: "5m ago",
		icon: "💬",
		color: "#FF3D71",
	},
	{
		name: "New event",
		description: "Magic UI",
		time: "2m ago",
		icon: "🗞️",
		color: "#1E86FF",
	},
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
	return (
		<figure
			className={cn(
				"relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
				// animation styles
				"transition-all duration-200 ease-in-out hover:scale-[103%]",
				// light styles
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				// dark styles
				"transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			)}
		>
			<div className="flex flex-row items-center gap-3">
				<div
					className="flex h-10 w-10 items-center justify-center rounded-2xl"
					style={{
						backgroundColor: color,
					}}
				>
					<span className="text-lg">{icon}</span>
				</div>
				<div className="flex flex-col overflow-hidden">
					<figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
						<span className="text-sm sm:text-lg">{name}</span>
						<span className="mx-1">·</span>
						<span className="text-xs text-gray-500">{time}</span>
					</figcaption>
					<p className="text-sm font-normal dark:text-white/60">
						{description}
					</p>
				</div>
			</div>
		</figure>
	);
};

const features = [
	{
		Icon: GiftIcon,
		name: "Find your perfect gift",
		description: "We automatically save your files as you type.",
		href: "/",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-1",
		background: <GiftsMarquee />,
	},
	{
		Icon: InputIcon,
		name: "Full text search",
		description: "Search through all your files in one place.",
		href: "/",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-2",
		background: (
			<Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>screenshot.png</CommandItem>
						<CommandItem>bitcoin.pdf</CommandItem>
						<CommandItem>finances.xlsx</CommandItem>
						<CommandItem>logo.svg</CommandItem>
						<CommandItem>keys.gpg</CommandItem>
						<CommandItem>seed.txt</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		),
	},
	{
		Icon: Share2Icon,
		name: "Integrations",
		description: "Supports 100+ integrations and counting.",
		href: "/",
		cta: "Learn more",
		className: "col-span-3 lg:col-span-2",
		background: (
			<AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
		),
	},
	{
		Icon: CalendarIcon,
		name: "Calendar",
		description: "Use the calendar to filter your files by date.",
		className: "col-span-3 lg:col-span-1",
		href: "/",
		cta: "Learn more",
		background: (
			<Calendar
				mode="single"
				selected={new Date(2022, 4, 11, 0, 0, 0)}
				className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
			/>
		),
	},
];

export function BentoDemo() {
	return (
		<BentoGrid className="md:py-40">
			{features.map((feature, idx) => (
				<BentoCard key={`${idx}-${feature.name}`} {...feature} />
			))}
		</BentoGrid>
	);
}
