import { Inter } from "next/font/google";
import localFont from "next/font/local";

const minervaRegularFont = localFont({
	src: "../assets/fonts/MINERVAMODERNRegular.otf",
	variable: "--font-heading",
	display: "swap",
});

const minervaBoldFont = localFont({
	src: "../assets/fonts/MINERVAMODERNBold.otf",
	variable: "--font-heading",
	display: "swap",
});

const interFont = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

export { minervaRegularFont, minervaBoldFont, interFont };
