import { stripe } from "~/utils/stripe/config";
import { NextResponse } from "next/server";
import { env } from "~/env";

export async function POST(request: Request) {
	try {
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			line_items: [
				{
					price: env.STRIPE_GIFTING_CONCIERGE_PRODUCT_ID,
					quantity: 1,
				},
			],
			payment_method_types: ["card"],
			mode: "payment",
			return_url: `${request.headers.get(
				"origin",
			)}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}&type=link`,
		});
		return NextResponse.json({
			id: session.id,
			client_secret: session.client_secret,
		});
	} catch (err) {
		console.log(err);
		return Response.json(err, {
			status: 400,
		});
	}
}
