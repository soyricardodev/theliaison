import type Stripe from "stripe";

import { env } from "~/env";
import { stripe } from "~/utils/stripe/config";
import {
  deletePriceRecord,
  deleteProductRecord,
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord,
} from "~/utils/supabase/admin";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(`❌ Error message: ${err.message}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProductRecord(event.data.object);
          break;
        case "price.created":
        case "price.updated":
          await upsertPriceRecord(event.data.object);
          break;
        case "price.deleted":
          await deletePriceRecord(event.data.object);
          break;
        case "product.deleted":
          await deleteProductRecord(event.data.object);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === "customer.subscription.created",
          );
          break;
        }
        case "checkout.session.completed": {
          const checkoutSession = event.data.object;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true,
            );
          }
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
