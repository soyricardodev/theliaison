import Image from "next/image";
import { logoBlack } from "~/assets/images";

export default function Home() {
	return (
		<main className="flex grow">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<h1 className="text-3xl font-bold">Social Polling in progress</h1>
				<Image src={logoBlack} alt="logo" width={200} height={200} />
			</div>
		</main>
	);
}
