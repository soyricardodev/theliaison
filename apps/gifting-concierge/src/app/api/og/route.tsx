import { ImageResponse } from "next/og";

export const runtime = "edge";

const geistSansSemibold = fetch(
	new URL("./Geist-SemiBold.ttf", import.meta.url),
).then((res) => {
	return res.arrayBuffer();
});

export async function GET() {
	const geistSansSemiboldFont = await geistSansSemibold;

	return new ImageResponse(
		<div tw="h-full w-full flex flex-col items-center justify-center text-center text-7xl bg-black">
			<div tw="absolute top-3 left-3 flex gap-2 items-center">
				<img
					tw="w-[65px] h-[65px]"
					src="https://giftingconcierge.theliaison.vercel.app/logo-black.png"
					alt="The Liaison Logo"
				/>

				<div
					tw="text-white font-semibold text-2xl"
					style={{ letterSpacing: "-1.5px" }}
				>
					The Liaison
				</div>
			</div>

			<img
				src="https://i.ibb.co/KrGMxHx/giftbox.gif"
				width={300}
				tw="-mt-16"
				alt="Giftbox"
			/>

			<div
				tw="text-white text-center font-semibold"
				style={{ letterSpacing: "-4.5px" }}
			>
				Someone special
			</div>
			<div
				tw="text-[#DBD0C5] text-center font-semibold"
				style={{ letterSpacing: "-4.5px" }}
			>
				wants to send you a gift!
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Geist",
					data: geistSansSemiboldFont,
					style: "normal",
				},
			],
		},
	);
}
