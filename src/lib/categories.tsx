import {
	CircleUserRoundIcon,
	HandHeartIcon,
	HeartIcon,
	RabbitIcon,
	TreePalmIcon,
	VideoIcon,
} from "lucide-react";

export interface Category {
	id: number;
	name: string;
	href: string;
	icon: JSX.Element;
	color: "default" | "primary" | "danger" | "success" | "secondary" | "warning";
	hex: string;
}

export const categories: Array<Category> = [
	{
		id: 1,
		name: "Trending",
		href: "/explore?category=trending",
		icon: <TreePalmIcon className="size-5" />,
		color: "default",
		hex: "#d4d4d8",
	},
	{
		id: 2,
		name: "Relationship",
		href: "/explore?category=relationship",
		icon: <HeartIcon className="size-5" />,
		color: "secondary",
		hex: "#7828c8",
	},
	{
		id: 3,
		name: "Dating",
		href: "/explore?category=dating",
		icon: <HandHeartIcon className="size-5" />,
		color: "primary",
		hex: "#006fee",
	},
	{
		id: 6,
		name: "Entertainment",
		href: "/explore?category=entertainment",
		icon: <VideoIcon className="size-5" />,
		color: "warning",
		hex: "#f5a524",
	},
	{
		id: 4,
		name: "Sex",
		href: "/explore?category=sex",
		icon: <RabbitIcon className="size-5" />,
		color: "danger",
		hex: "#f31260",
	},
	{
		id: 5,
		name: "Self Care",
		href: "/explore?category=self care",
		icon: <CircleUserRoundIcon className="size-5" />,
		color: "success",
		hex: "#17c964",
	},
];
