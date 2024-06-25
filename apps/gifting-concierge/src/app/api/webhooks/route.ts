import type Stripe from "stripe";
import { env } from "~/env";
import { stripe } from "~/utils/stripe/config";

const relevantEvents = new Set([
	"invoice.paid",
	"invoice.payment_failed",
	"invoice.payment_succeeded",
]);

export async function POST(request: Request) {
	const body = await request.text();
	const signature = request.headers.get("stripe-signature");
	const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

	let event: Stripe.Event;

	try {
		if (!signature || !webhookSecret) {
			return new Response("Webhook secret not found.", { status: 400 });
		}

		event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
		console.log(`🔔  Webhook received: ${event.type}`);
	} catch (err: any) {
		console.log(`❌ Error message: ${err.message}`);
		return new Response(`Webhook Error: ${err.message}`, { status: 400 });
	}

	if (relevantEvents.has(event.type)) {
		try {
			switch (event.type) {
				case "invoice.paid": {
					const data = event.data.object;
					console.log({ data });
					break;
				}
				case "invoice.payment_failed": {
					const data = event.data.object;
					console.log({ data });
					break;
				}
				case "invoice.payment_succeeded": {
					const data = event.data.object;
					console.log({ data });
					break;
				}
				default:
					throw new Error("Unhandled relevant event!");
			}
		} catch (error) {
			console.log(error);
			return new Response(
				"Webhook handler failed. View your Next.js function logs.",
				{
					status: 400,
				},
			);
		}
	} else {
		return new Response(`Unsupported event type: ${event.type}`, {
			status: 400,
		});
	}
	return new Response(JSON.stringify({ received: true }));
}
