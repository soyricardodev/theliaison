"use server";

import { nanoid } from "nanoid";
import { kv } from "@vercel/kv";
import { createClient } from "~/supabase/server";

interface Cart {
  items: CartItem[];
}

interface CartItem {
  id: string;
  quantity: number;
}

export async function createCartKV() {
  const cartId = nanoid();
  await kv.set(`cart:${cartId}`, { items: [] });
  return cartId;
}

export async function addItemToCartKV(cartId: string, items: CartItem[]) {
  const cart = await kv.get<Cart>(`cart:${cartId}`);

  if (!cart) {
    const newCart = await createCartKV();
    await kv.set(`cart:${newCart}`, { items });
    return;
  }

  await kv.set(`cart:${cartId}`, { items });
  return;
}

export async function getProduct(productId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, image, prices(id, currency, unit_amount)")
    .eq("id", productId)
    .eq("active", true)
    .single();

  if (error ?? !data) {
    return null;
  }

  return data;
}
