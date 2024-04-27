import Marquee from "~/components/magicui/marquee";
import { cn } from "~/lib/utils";

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

export function HeroMarquee() {
	return (
		<Marquee
			pauseOnHover
			className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
		>
			{files.map((f, idx) => (
				<figure
					key={idx}
					className={cn(
						"relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
						"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
						"transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
					)}
				>
					<div className="flex flex-row items-center gap-2">
						<div className="flex flex-col">
							<figcaption className="text-sm font-medium dark:text-white ">
								{f.name}
							</figcaption>
						</div>
					</div>
					<blockquote className="mt-2 text-xs">{f.body}</blockquote>
				</figure>
			))}
		</Marquee>
	);
}
