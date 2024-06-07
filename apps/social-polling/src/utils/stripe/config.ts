import Stripe from "stripe";

import { env } from "~/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  // https://stripe.com/docs/api/versioning
  // @ts-ignore
  apiVersion: null,
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: "The Liaison",
    version: "0.0.0",
    url: "https://github.com/soyricardodev/polling-liaison",
  },
});
