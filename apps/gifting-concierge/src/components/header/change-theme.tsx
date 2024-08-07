"use client";

import { cn } from "@theliaison/ui";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ChangeTheme() {
	const { theme, setTheme } = useTheme();
	return (
		<div className="flex items-center justify-between text-foreground">
			<p className="ml-4">Theme</p>
			<fieldset className="flex items-center w-fit h-8 rounded-full border ">
				<legend className="sr-only">Select a display theme:</legend>
				<span>
					<label
						htmlFor=""
						onClick={() => setTheme("system")}
						className={cn(
							"rounded-full flex items-center justify-center bg-none size-8 m-0 cursor-pointer relative transition-colors text-foreground",
							{
								"bg-backdground border text-gray-900": theme === "system",
							},
						)}
					>
						<SystemThemeIcon />
					</label>
				</span>
				<span>
					<label
						htmlFor=""
						onClick={() => setTheme("light")}
						className={cn(
							"rounded-full flex items-center justify-center bg-none size-8 m-0 cursor-pointer relative transition-colors text-foreground",
							{
								"bg-backdground border text-gray-900": theme === "light",
							},
						)}
					>
						<SunIcon className="h-full size-5" />
					</label>
				</span>
				<span>
					<label
						htmlFor=""
						onClick={() => setTheme("dark")}
						className={cn(
							"rounded-full flex items-center justify-center bg-none size-8 m-0 cursor-pointer relative transition-colors text-gray-900",
							{
								"bg-backdground border text-gray-100": theme === "dark",
							},
						)}
					>
						<MoonIcon className="h-full size-5" />
					</label>
				</span>
			</fieldset>
		</div>
	);
}

function SystemThemeIcon() {
	return (
		<svg
			height="16"
			strokeLinejoin="round"
			viewBox="0 0 16 16"
			width="16"
			style={{ color: "currentcolor" }}
		>
			<title>System Icon</title>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M1 3.25C1 1.45507 2.45507 0 4.25 0H11.75C13.5449 0 15 1.45507 15 3.25V15.25V16H14.25H1.75H1V15.25V3.25ZM4.25 1.5C3.2835 1.5 2.5 2.2835 2.5 3.25V14.5H13.5V3.25C13.5 2.2835 12.7165 1.5 11.75 1.5H4.25ZM4 4C4 3.44772 4.44772 3 5 3H11C11.5523 3 12 3.44772 12 4V10H4V4ZM9 13H12V11.5H9V13Z"
				fill="currentColor"
			/>
		</svg>
	);
}
