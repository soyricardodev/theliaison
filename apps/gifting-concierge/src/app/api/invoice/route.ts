import { NextResponse } from "next/server";
import { stripe } from "~/utils/stripe/config";
import { z } from "zod";

const createInvoice = z.object({
  email: z.string().email(),
  products: z.array(
    z.object({
      product_id: z.string(),
      price_id: z.string(),
      quantity: z.number(),
    }),
  ),
});

export async function POST(request: Request) {
  const json = (await request.json()) as Record<string, unknown>;
  const parsed = createInvoice.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.format());
  }

  const { email, products } = parsed.data;

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
