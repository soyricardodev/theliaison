import { Toaster } from "@theliaison/ui/sonner";
import { Gradient } from "~/components/gradient";
import { Header } from "~/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="min-h-dvh antialiased overflow-x-hidden absolute top-0 left-0 w-full h-full z-30">
				<Header />
				{children}
			</div>

			<Gradient url="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=3.3&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23ff9875&color2=%23c2f8ff&color3=%23fff0e0&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1.1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=0.5&uFrequency=5.5&uSpeed=0.2&uStrength=2.5&uTime=0&wireframe=false" />

			<Toaster />
		</>
	);
}
