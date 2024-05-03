"use client";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { PersonIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export function ProfileData({
	fullName,
	instagram,
}: { fullName: string; instagram?: string }) {
	const [isEditing, setIsEditing] = useState(false);

	if (isEditing) {
		return (
			<form className="flex flex-col space-y-4">
				<div className="flex flex-col space-y-1">
					<div className="flex items-center space-x-2">
						<PersonIcon className="size-4 text-gray-700" />
						<Input placeholder="Name" value={fullName} />
					</div>
				</div>
				<div className="flex space-x-2">
					<Button
						variant={"outline"}
						className="w-full rounded-md text-sm"
						size="sm"
						onClick={() => setIsEditing(false)}
					>
						Cancel
					</Button>
					<Button className="w-full rounded-md text-sm" size="sm">
						Save
					</Button>
				</div>
			</form>
		);
	}

	return (
		<div className="relative flex flex-col gap-4">
			<div className="flex flex-col space-y-1">
				<div className="flex items-center space-x-2 py-1 text-sm transition-colors">
					<PersonIcon className="size-4" />
					<p className="line-clamp-3 text-gray-700">{fullName}</p>
				</div>
				{instagram != null ? (
					<a
						className="flex items-center space-x-2 py-1 text-sm transition-colors underline-offset-4 hover:underline"
						href={`https://www.instagram.com/${instagram}`}
						target="_blank"
						rel="noopener noreferrer ugc me"
					>
						<InstagramLogoIcon className="size-4" />
						<p className="line-clamp-3 text-gray-700">@{instagram}</p>
					</a>
				) : null}
			</div>
			<button
				className="inline-flex shrink-0 items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background font-medium shadow-sm hover:bg-accent hover:text-accent-foreground h-8 py-2 absolute right-0 top-0 w-8 rounded-full px-0 md:static md:w-auto md:rounded-lg md:px-3"
				onClick={() => setIsEditing(true)}
			>
				<PencilIcon className="size-4 flex-none md:hidden" />
				<span className="sr-only md:not-sr-only">Edit Profile</span>
			</button>
		</div>
	);
}
