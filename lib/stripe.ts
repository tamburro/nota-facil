import Stripe from "stripe";

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    const client = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-04-22.dahlia",
    });
    return Reflect.get(client, prop);
  },
});
