import { Header } from "./[giftId]/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Someone special wants to send you a gift!",
	description:
		"Enter your address securely to receive your gift! The Liaison will handle the rest.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex min-h-dvh flex-col dark bg-black">
			{/* <div className="fixed left-0 top-0 z-10 h-full w-full">
        <div className="relative h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
        </div>
      </div> */}

			<div className="relative z-20 mx-auto min-h-screen h-full w-full max-w-7xl px-6 md:px-8 lg:px-12 bg-black">
				<Header />
				{children}
			</div>
		</main>
	);
}
