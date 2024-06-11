import { NextResponse } from "next/server";
import { stripe } from "~/utils/stripe/config";
import { z } from "zod";
import { createClient } from "~/supabase/server";

const createInvoice = z.object({
  giftId: z.string(),
});

export async function POST(request: Request) {
  const json = (await request.json()) as Record<string, unknown>;
  const parsed = createInvoice.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.format());
  }

  const { giftId } = parsed.data;

  const email = "ricardo@mail.com";

  const supabase = createClient();

  const { data, error } = await supabase
    .from("gifts")
    .select("gifts_products(quantity, products(prices(id)))")
    .eq("id", giftId)
    .single();

  if (error) {
    return NextResponse.json(error);
  }

  const products: {
    price_id: string;
    quantity: number;
  }[] = [];

  for (const giftItem of data.gifts_products) {
    if (giftItem.products == null) continue;

    const priceId = giftItem.products?.prices[0]?.id;

    if (priceId == null) continue;

    products.push({
      price_id: priceId,
      quantity: giftItem.quantity,
    });
  }

  const newCustomer = await stripe.customers.create({
    email,
    description: "Customer to invoice the gifting concierge",
  });
  const customerId = newCustomer.id;

  const invoice = await stripe.invoices.create({
    customer: customerId,
    collection_method: "send_invoice",
    days_until_due: 14,
  });

  for await (const product of products) {
    await stripe.invoiceItems.create({
      customer: customerId,
      price: product.price_id,
      quantity: product.quantity,
      invoice: invoice.id,
    });
  }

  const invoiceSend = await stripe.invoices.sendInvoice(invoice.id);

  return NextResponse.json({ invoiceSend });
}
