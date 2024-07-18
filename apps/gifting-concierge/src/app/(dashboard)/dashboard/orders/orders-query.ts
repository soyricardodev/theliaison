import { createClient, type QueryData } from "@supabase/supabase-js";
import { env } from "~/env";

const supabase = createClient(
	env.NEXT_PUBLIC_SUPABASE_URL,
	env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const getAllOrdersQuery = supabase.from("gifts").select(`
  id,
  users(id, email, full_name, avatar_url),
  recipient_id,
  gift_recipients(id, name),
  status,
  type
`);

export type Orders = QueryData<typeof getAllOrdersQuery>;

export const getLinkOrdersQuery = supabase
	.from("gifts")
	.select(`
    id,
    users(id, email, full_name, avatar_url),
    recipient_id,
    gift_recipients(id, name),
    status,
    type
  `)
	.eq("type", "link");

export const getCustomOrdersQuery = supabase
	.from("gifts")
	.select(`
    id,
    users(id, email, full_name, avatar_url),
    recipient_id,
    gift_recipients(id, name),
    status,
    type
  `)
	.eq("type", "custom");

export const getStoreOrdersQuery = supabase
	.from("gifts")
	.select(`
    id,
    users(id, email, full_name, avatar_url),
    recipient_id,
    gift_recipients(id, name),
    status,
    type
  `)
	.eq("type", "store");
