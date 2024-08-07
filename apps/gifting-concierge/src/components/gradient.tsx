"use client";
import { ShaderGradient, ShaderGradientCanvas } from "shadergradient";

export function Gradient({
	color1 = "#ff5005",
	color2 = "#dbba95",
	color3 = "#d0bce1",
	url,
}: {
	color1?: string;
	color2?: string;
	color3?: string;
	url?: string;
}) {
	return (
		<div className="fixed top-0 left-0 z-10 w-screen h-screen overflow-hidden">
			<ShaderGradientCanvas
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
					overflow: "hidden",
				}}
			>
				{url != null ? (
					<ShaderGradient control="query" urlString={url} />
				) : (
					<ShaderGradient
						control="props"
						color1={color1}
						color2={color2}
						color3={color3}
						zoomOut={false}
						brightness={3.7}
						grain="off"
						animate="on"
						uSpeed={0.4}
						cDistance={3.6}
					/>
				)}
			</ShaderGradientCanvas>
		</div>
	);
}
