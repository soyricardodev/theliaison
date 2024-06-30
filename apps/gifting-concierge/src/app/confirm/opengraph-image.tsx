import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Someone special wants to send you a gift!";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function Image() {
	const geistSansVariable = fetch(
		new URL("./GeistVF.ttf", import.meta.url),
	).then((res) => res.arrayBuffer());

	return new ImageResponse(
		<div
			style={{
				fontSize: 128,
				background: "white",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			Someone special wants to send you a gift!
		</div>,
		{
			...size,
			fonts: [
				{
					name: "Geist",
					data: await geistSansVariable,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
