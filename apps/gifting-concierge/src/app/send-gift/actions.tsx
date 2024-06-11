"use server";

import { createClient } from "~/supabase/server";

interface InsertGift {
  total_price: number;
  sender_name?: string;
  recipient_name: string;
  recipient_social: string;
  recipient_email?: string;
  recipient_phone?: string;
  gifts: {
    id: string;
    quantity: number;
  }[];
}

export async function createGift({
  total_price,
  sender_name,
  recipient_name,
  recipient_social,
  recipient_email,
  gifts,
}: InsertGift) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("gifts")
    .insert({
      total_price,
      sender_name,
      recipient_name,
      recipient_social,
      recipient_email,
    })
    .select("id");

  if (error) {
    return console.log(error);
  }

  const gift_id = data[0]?.id as number;

  for await (const gift of gifts) {
    await supabase.from("gifts_products").insert({
      gift_id,
      product_id: gift.id,
      quantity: gift.quantity,
    });
  }

  return gift_id;
}
