import { ImageResponse } from "next/og";

export async function GET() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				height: "100%",
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				backgroundColor: "black",
				fontSize: 60,
				letterSpacing: -2,
				fontWeight: 700,
				textAlign: "center",
			}}
		>
			<div
				style={{
					color: "white",
					textAlign: "center",
				}}
			>
				Someone special
			</div>
			<div
				style={{
					// backgroundImage:
					// "linear-gradient(to bottom right,#f1f1f1 45%, #DBD0C5)",
					// backgroundClip: "text",
					// @ts-expect-error
					// "-webkit-background-clip": "text",
					// color: "transparent",
					color: "#DBD0C5",
					textAlign: "center",
				}}
			>
				wants to send you a gift!
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
