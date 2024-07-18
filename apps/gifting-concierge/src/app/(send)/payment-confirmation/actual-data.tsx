"use client";
import { Input } from "@nextui-org/react";
import { useFormStore } from "../send-by-link/form-store";
import { createGiftOrder } from "./actions";
import { ButtonCopyLink } from "./button-copy-link";

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
	);

	return (
		<div className="p-4 bg-background flex flex-col gap-4">
			<p>The data you provided is:</p>
			<div className="flex flex-col gap-1 bg-neutral-300 p-4 rounded-md">
				<p>
					<strong>Gift Link</strong>: {formStore.giftLink}
				</p>
				<p>
					<strong>Gift Specifications</strong>: {formStore.giftSpecifications}
				</p>
				<p>
					<strong>Recipient Name</strong>: {formStore.recipientName}
				</p>
				<p>
					<strong>Recipient Phone Number</strong>:{" "}
					{formStore.recipientPhoneNumber}
				</p>
				<p>
					<strong>Recipient Email</strong>: {formStore.recipientEmail}
				</p>
				<p>
					<strong>Recipient Social Platform</strong>:{" "}
					{formStore.recipientSocialPlatform}
				</p>
				<p>
					<strong>Recipient Social Handle</strong>:{" "}
					{formStore.recipientSocialHandle}
				</p>
			</div>

			<div>
				<p>Your order link is:</p>

				<div>
					<Input value={formStore.giftLink} endContent={<ButtonCopyLink />} />
				</div>
			</div>
		</div>
	);
}
