import {
	TreePalmIcon,
	HeartIcon,
	HandHeartIcon,
	VideoIcon,
	CircleUserRoundIcon,
	RabbitIcon,
} from "lucide-react";

export interface Category {
	id: number;
	name: string;
	href: string;
	icon: JSX.Element;
	color: "default" | "primary" | "danger" | "success" | "secondary" | "warning";
}

export const categories: Array<Category> = [
	{
		id: 1,
		name: "Trending",
		href: "/c/trending",
		icon: <TreePalmIcon className="size-5" />,
		color: "default",
	},
	{
		id: 2,
		name: "Relationship",
		href: "/c/relationship",
		icon: <HeartIcon className="size-5" />,
		color: "secondary",
	},
	{
		id: 3,
		name: "Dating",
		href: "/c/dating",
		icon: <HandHeartIcon className="size-5" />,
		color: "primary",
	},
	{
		id: 6,
		name: "Entertainment",
		href: "/c/entertainment",
		icon: <VideoIcon className="size-5" />,
		color: "warning",
	},
	{
		id: 4,
		name: "Sex",
		href: "/c/sex",
		icon: <RabbitIcon className="size-5" />,
		color: "danger",
	},
	{
		id: 5,
		name: "Self Care",
		href: "/c/selfcare",
		icon: <CircleUserRoundIcon className="size-5" />,
		color: "success",
	},
];
