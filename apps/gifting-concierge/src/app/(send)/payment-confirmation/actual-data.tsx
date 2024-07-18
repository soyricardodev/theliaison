"use client";
import { useFormStore } from "../send-by-link/form-store";
import { createGiftOrder } from "./actions";

export function ActualData({
	sessionId,
	type,
}: { sessionId: string; type: "link" | "custom" }) {
	const { ...formStore } = useFormStore();

	createGiftOrder(
		formStore.giftLink,
		formStore.giftSpecifications,
		type,
		formStore.recipientName,
		sessionId,
		formStore.recipientPhoneNumber,
		formStore.recipientEmail,
		formStore.recipientSocialPlatform,
		formStore.recipientSocialHandle,
	).then(console.log);

	return (
		<div>
			The data you provided is:
			<pre>{JSON.stringify(formStore, null, 2)}</pre>
		</div>
	);
}
