import OpenAI from "openai";
import { env } from "~/env";
import { createClient } from "~/utils/supabase/server";
import { createIdFromString } from "~/lib/utils";
import { z } from "zod";

const pollFormSchema = z.object({
	question: z.string({ required_error: "Please enter a question" }).min(3, {
		message: "Question must be at least 10 characters.",
	}),
	categories: z.array(z.string()),
	options: z.array(z.string()).min(2).max(6).nonempty(),
	image: z.string(),
});

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return new Response("Unauthorized", {
			status: 401,
		});
	}

	const json = await req.json();
	console.log({ json });
	const { data, success, error: parseError } = pollFormSchema.safeParse(json);

	if (!success) {
		console.log({
			success,
			parseError,
			data,
			detailederror: parseError.errors,
			issues: parseError.issues,
		});
		return new Response("Invalid request", {
			status: 400,
		});
	}

	const pollId = createIdFromString(data.question);

	const embeddingResponse = await openai.embeddings.create({
		model: "text-embedding-ada-002",
		input: data.question,
	});

	const embedding = embeddingResponse.data[0]?.embedding;

	console.log(embedding);

	const { data: poll, error: createPollError } = await supabase
		.from("polls")
		// @ts-expect-error - TODO: Fix this, embedding is not a string
		.insert({
			id: pollId,
			question: data.question,
			user_id: user.id,
			image: data.image,
			embedding,
		});

	if (createPollError) {
		console.log(createPollError);
		return new Response("Error creating poll", {
			status: 500,
		});
	}

	const optionsToInsert = [];

	for (const option of data.options) {
		const optionToInsert = {
			text: option,
			poll_id: pollId,
		};

		optionsToInsert.push(optionToInsert);
	}

	const { error: createPollOptionsError } = await supabase
		.from("options")
		.insert(optionsToInsert);

	if (createPollOptionsError) {
		console.log(createPollOptionsError, "createPollOptionsError");
		throw new Error("Unable to create poll options");
	}

	const categoriesToInsert = [];

	for (const category of data.categories) {
		const categoryToInsert = {
			categorie_id: Number(category),
			poll_id: pollId,
		};

		categoriesToInsert.push(categoryToInsert);
	}

	const { error: createPollCategoriesError } = await supabase
		.from("polls_categories")
		.insert(categoriesToInsert);

	if (createPollCategoriesError) {
		return new Response("Error creating poll categories", {
			status: 500,
		});
	}

	return Response.json({
		id: pollId,
		status: 200,
	});
}
