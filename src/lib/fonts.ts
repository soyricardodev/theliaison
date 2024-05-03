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

export { minervaRegularFont, minervaBoldFont };
