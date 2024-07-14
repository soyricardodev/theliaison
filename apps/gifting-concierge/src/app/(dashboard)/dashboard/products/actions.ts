"use server";
import "server-only";
import { createClient as createClientAdmin } from "@supabase/supabase-js";
import { createClient } from "~/supabase/server";
import type Stripe from "stripe";
import type {
	Database,
	Tables,
	TablesInsert,
} from "@theliaison/supabase/database-types";

import OpenAI from "openai";
import { env } from "~/env";
import { stripe } from "~/utils/stripe/config";

type Product = Tables<"products">;
type Price = Tables<"prices">;
const TRIAL_PERIOD_DAYS = 0;
const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
});
const supabaseAdmin = createClientAdmin<Database>(
	env.NEXT_PUBLIC_SUPABASE_URL,
	env.SUPABASE_SERVICE_ROLE_KEY,
);
export async function getProducts(search: string, offset: number) {
	const supabase = createClient();

	if (search) {
		const { data } = await supabase
			.from("products")
			.select("*")
			.textSearch("name", search, {
				type: "websearch",
				config: "english",
			});

		return {
			products: data,
			newOffset: null,
			totalProducts: 0,
		};
	}

	if (offset === null) {
		return {
			products: [],
			newOffset: null,
			totalProducts: 0,
		};
	}

	const totalProducts = await supabase
		.from("products")
		.select("*")
		.eq("type", "gift");
	const moreProducts = await supabase
		.from("products")
		.select("*")
		.eq("type", "gift")
		.range(offset, offset + 5);
	const newOffset =
		moreProducts.data && moreProducts.data.length >= 5 ? offset + 5 : null;

	return {
		products: moreProducts.data,
		newOffset,
		totalProducts: totalProducts.data?.length ?? 0,
	};
}

export async function deleteProductById(id: string) {
	const supabase = createClient();

	await supabase.from("products").delete().eq("id", id);
}

// const upsertProductRecord = async (product: {
// 	name : string;
// 	description : string;
// 	images : string[];
// }) => {
// 	// lets create the product stripe here
// 	const productStripe = await stripe.products.create({
// 		name: product.name,
// 		description: product.description,
// 		images: ,
// 	});

// 	const id = productStripe.id;

// 	const embeddingResponse = await openai.embeddings.create({
// 		model: "text-embedding-ada-002",
// 		input: `${product.name} ${product.description ?? ""}`,
// 	});

// 	const embedding = embeddingResponse.data[0]?.embedding;

// 	const productData: Product = {
// 		id: id,
// 		active: true,
// 		name: product.name,
// 		description: product.description ?? null,
// 		image: product.images[0] ?? null,
// 		type: "gift",
// 		// @ts-expect-error - TODO: Fix this type error
// 		embedding,
// 	};

// 	const { error: upsertError } = await supabaseAdmin
// 		.from("products")
// 		.upsert([productData]);
// 	if (upsertError)
// 		throw new Error(`Product insert/update failed: ${upsertError.message}`);
// 	console.log(`Product inserted/updated: ${id}`);
// };

// const upsertPriceRecord = async (
// 	price: Stripe.Price,
// 	retryCount = 0,
// 	maxRetries = 3,
// ) => {
// 	const priceData: Price = {
// 		id: price.id,
// 		product_id: typeof price.product === "string" ? price.product : "",
// 		active: price.active,
// 		currency: price.currency,
// 		type: price.type,
// 		unit_amount: price.unit_amount ?? null,
// 		interval: price.recurring?.interval ?? null,
// 		interval_count: price.recurring?.interval_count ?? null,
// 		trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
// 		description: null,
// 		metadata: null,
// 	};

// 	const { error: upsertError } = await supabaseAdmin
// 		.from("prices")
// 		.upsert([priceData]);

// 	if (upsertError?.message.includes("foreign key constraint")) {
// 		if (retryCount < maxRetries) {
// 			console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`);
// 			await new Promise((resolve) => setTimeout(resolve, 2000));
// 			await upsertPriceRecord(price, retryCount + 1, maxRetries);
// 		} else {
// 			throw new Error(
// 				`Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`,
// 			);
// 		}
// 	} else if (upsertError) {
// 		throw new Error(`Price insert/update failed: ${upsertError.message}`);
// 	} else {
// 		console.log(`Price inserted/updated: ${price.id}`);
// 	}
// };
