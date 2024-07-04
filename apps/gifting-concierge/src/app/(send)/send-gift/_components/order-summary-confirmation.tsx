"use client";

import {
	InstagramIcon,
	MailIcon,
	PhoneIcon,
	UserRoundIcon,
} from "lucide-react";
import { useCartStore } from "~/store/cart";
import { useRecipientStore } from "~/store/recipient";
import OrderSummaryItem from "./order-summary-item";

export function OrderSummaryConfirmation() {
	const { shoppingCart } = useCartStore();
	const { recipientName, recipientSocial, recipientEmail, recipientPhone } =
		useRecipientStore();

	console.log({
		recipientName,
		recipientSocial,
		recipientEmail,
		recipientPhone,
	});

	return (
		<div className="flex flex-col gap-6 mb-2">
			<h4 className="font-medium text-default-500">Confirm gift details</h4>
			<ul>
				{shoppingCart.map((item) => (
					<OrderSummaryItem key={item.id} {...item} />
				))}
			</ul>

			<h4 className="font-medium text-default-500">
				Confirm recipient details
			</h4>

			<ul className="flex flex-col gap-2 [&>li]:text-lg [&>li>strong]:flex [&>li>strong]:gap-2 [&>li>strong]:items-center [&>li>strong]:font-semibold">
				<li>
					<strong>
						<UserRoundIcon />
						Name:
					</strong>{" "}
					{recipientName}
				</li>
				<li>
					<strong>
						<InstagramIcon /> Social:
					</strong>{" "}
					{recipientSocial}
				</li>
				<li>
					<strong>
						<MailIcon /> Email:
					</strong>{" "}
					{recipientEmail?.trim() === "" || recipientEmail == null
						? "- No email provided"
						: recipientEmail}
				</li>
				<li>
					<strong>
						<PhoneIcon /> Phone:
					</strong>{" "}
					{recipientPhone?.trim() === "" || recipientPhone == null
						? "- No phone provided"
						: recipientPhone}
				</li>
			</ul>
		</div>
	);
}
