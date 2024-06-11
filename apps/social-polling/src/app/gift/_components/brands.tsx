import React from "react";

import {
	Logo1,
	Logo2,
	Logo3,
	Logo4,
	Logo5,
	Logo6,
	Logo7,
	Logo8,
	Logo9,
	Logo10,
} from "./logos";
import { ScrollingBanner } from "./scrolling-banner-brands";

const logos = [
	{
		key: "logo-1",
		logo: Logo1,
	},
	{
		key: "logo-2",
		logo: Logo2,
	},
	{
		key: "logo-3",
		logo: Logo3,
	},
	{
		key: "logo-4",
		logo: Logo4,
	},
	{
		key: "logo-5",
		logo: Logo5,
	},
	{
		key: "logo-6",
		logo: Logo6,
	},
	{
		key: "logo-7",
		logo: Logo7,
	},
	{
		key: "logo-8",
		logo: Logo8,
	},
	{
		key: "logo-9",
		logo: Logo9,
	},
	{
		key: "logo-10",
		logo: Logo10,
	},
];

export function Brands() {
	return (
		<section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 sm:py-32 lg:px-8 lg:py-40">
			<h3 className="bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 bg-clip-text text-center text-2xl font-bold text-transparent">
				Trusted by millions of people around the world.
			</h3>
			<ScrollingBanner shouldPauseOnHover gap="40px">
				{logos.map(({ key, logo }) => (
					<div
						key={key}
						className="flex items-center justify-center text-foreground"
					>
						{logo}
					</div>
				))}
			</ScrollingBanner>
		</section>
	);
}
