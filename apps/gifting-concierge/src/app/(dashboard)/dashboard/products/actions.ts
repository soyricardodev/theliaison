"use server";
import "server-only";

import { createClient } from "~/supabase/server";

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
