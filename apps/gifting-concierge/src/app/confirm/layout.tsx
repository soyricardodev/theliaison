import type { Metadata } from "next";
import { QuotesRotate } from "~/components/quotes-rotate";
import { Footer } from "../components/footer";
import { Header } from "./[giftId]/header";
import { Gradient } from "~/components/gradient";

export const metadata: Metadata = {
	title: "Someone special wants to send you a gift! - The Liaison",
	description:
		"Enter your address securely to receive your gift! The Liaison will handle the rest.",
	openGraph: {
		title: "Someone special wants to send you a gift!",
		description:
			"Enter your address securely to receive your gift! The Liaison will handle the rest.!",
		url: "https://giftingconcierge.theliaison.vercel.app/",
		siteName: "Gifting Concierge - The Liaison",
		images: [
			{
				url: "https://giftingconcierge.theliaison.vercel.app/api/og",
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className="flex min-h-dvh h-full flex-col bg-black">
				<div className="relative z-20 mx-auto min-h-screen h-full w-full max-w-7xl px-6 md:px-8 lg:px-12">
					<Header />
					{children}

					<QuotesRotate />
					<Footer />
				</div>
			</main>
			<Gradient url="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=3.7&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23ff9875&color2=%23c2f8ff&color3=%23fff0e0&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1.1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=0.5&uFrequency=5.5&uSpeed=0.2&uStrength=2.5&uTime=0&wireframe=false" />
		</>
	);
}
