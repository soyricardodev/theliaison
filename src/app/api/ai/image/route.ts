import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { env } from "~/env";
import { categories } from "~/lib/categories";
import { createClient } from "~/utils/supabase/server";

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
});

const generateImageSchema = z.object({
	pollId: z.string(),
	question: z.string(),
	categories: z.array(z.string()),
});

const createPrompt = (question: string, categoryIds: string[]) => {
	const categoryValues = categoryIds
		.map((id) => {
			const category = categories.find(
				(cat) => cat.id === Number.parseInt(id, 10),
			);
			return category ? category.value : null;
		})
		.filter((value) => value !== null);

	const contextDescription = categoryValues
		.map((category) => {
			switch (category) {
				case "relationships":
					return "showing two real people in loving, happy relationships, expressing emotions like love, care, and respect";
				case "self care":
					return "depicting one person engaging in self-care activities, such as relaxation, exercise, and self-reflection";
				case "entertainment":
					return "illustrating one or two people enjoying entertainment, such as watching movies, playing games, or socializing";
				case "dating":
					return "depicting two people on a date, showing romantic gestures, conversations, and enjoyment.";
				case "sex":
					return "illustrating intimacy and connection between two people in a respectful and tasteful manner.";
				case "trending":
					return "showing one or two people engaging in popular and current trends in lifestyle, fashion, or technology";
				default:
					return "showing one or two real people engaging in everyday activities";
			}
		})
		.join(", ");

	return `Create a single, cohesive, and realistic image that visually represents the following poll question: "${question}". The image should be ${contextDescription}. Do not include any text or create separate sections. The image should capture the essence of the question in a unified scene.`;
};

const generateImage = async (prompt: string) => {
	try {
		const response = await openai.images.generate({
			model: "dall-e-3",
			prompt: prompt,
			n: 1,
		});
		// @ts-expect-error missing types
		return response.data[0].url as string;
	} catch (error) {
		if (
			// @ts-expect-error missing types
			error.message.includes(
				"Your request was rejected as a result of our safety system",
			)
		) {
			throw new Error("Safety system rejection");
		}
		throw error;
	}
};

const downloadImage = async (url: string) => {
	try {
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();
		return buffer;
	} catch (error) {
		console.log("Error downloading image: ", error);
	}
};

const uploadToSupabase = async (buffer: ArrayBuffer, fileName: string) => {
	const supabase = createClient();
	const { data, error } = await supabase.storage
		.from("polls")
		.upload(fileName, buffer, {
			contentType: "image/png",
			upsert: true,
		});

	if (error) {
		console.log("Error uploading image: ", error);
		throw new Error("Error uploading image");
	}

	return data.path;
};

const updatePollImage = async (pollId: string, imagePath: string) => {
	const supabase = createClient();
	const { error } = await supabase
		.from("polls")
		.update({
			image: imagePath,
		})
		.eq("id", pollId);

	if (error) {
		console.log("Error updating poll image: ", error);
		throw new Error("Error updating poll image");
	}
};

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const parsed = generateImageSchema.safeParse(body);

		if (parsed.error || !parsed.success) {
			console.log(parsed.error);
			throw new Error("Invalid data");
		}

		const prompt = createPrompt(parsed.data.question, parsed.data.categories);
		const imageUrl = await generateImage(prompt);

		// const imageBuffer = await downloadImage(imageUrl);
		// const fileName = `${Math.random()}.png`;

		// if (!imageBuffer) {
		// 	console.log("Error downloading image", imageBuffer);
		// 	throw new Error("Error downloading image");
		// }

		// const supabaseImagePath = await uploadToSupabase(imageBuffer, fileName);
		// await updatePollImage(parsed.data.pollId, supabaseImagePath);

		return NextResponse.json({ image_url: imageUrl });
	} catch (error) {
		console.log(error);
		return new NextResponse("Error generating image", {
			status: 500,
			statusText: String(error),
		});
	}
}
