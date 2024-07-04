import { Header } from "~/components/header";
import { SimpleSendGift } from "../../components/gift/simple-send-gift";

export default function SendPage() {
	return (
		<div className="w-full mx-auto max-w-screen-2xl px-12">
			<Header />

			<main className="py-20">
				<SimpleSendGift />
			</main>
		</div>
	);
}
