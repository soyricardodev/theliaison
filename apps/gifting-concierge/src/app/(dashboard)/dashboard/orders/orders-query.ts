import type { QueryData } from "@supabase/supabase-js";
import { createClient } from "~/supabase/server";

const supabase = createClient();

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
