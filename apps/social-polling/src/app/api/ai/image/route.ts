import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import OpenAI from "openai";
import sharp from "sharp";
import { z } from "zod";

import { env } from "~/env";
import { categories } from "~/lib/categories";
import { createClient } from "~/utils/supabase/server";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const generateImageSchema = z.object({
  question: z.string(),
  categories: z.array(z.string()),
});

const createPrompt = (question: string, categoryIds: string[]) => {
  const categoryValues = categoryIds
    .map((id) => {
      const category = categories.find(
        (cat) => cat.id === Number.parseInt(id, 10),
      );
      return category ? category.name : null;
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
      response_format: "b64_json",
    });

    return response.data[0]?.b64_json;
  } catch (error) {
    return null;
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = generateImageSchema.safeParse(body);

    if (parsed.error || !parsed.success) {
      throw new Error("Invalid data");
    }

    const prompt = createPrompt(parsed.data.question, parsed.data.categories);
    const imageBase64 = await generateImage(prompt);

    if (imageBase64 == null) {
      throw new Error("Error generating image");
    }

    const imageBuffer = Buffer.from(imageBase64, "base64");

    const imageResized = await sharp(imageBuffer)
      .resize(612, 612)
      .toFormat("webp")
      .toBuffer();

    const supabase = createClient();

    const pollQuestionFormatted = parsed.data.question
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    const randomImageOf6Characters = nanoid().substring(0, 6);
    const imageName = `${pollQuestionFormatted}-${randomImageOf6Characters}`;

    const { data: pollImageUploaded, error } = await supabase.storage
      .from("polls")
      .upload(imageName, imageResized, {
        contentType: "image/webp",
      });

    if (!pollImageUploaded || error) {
      return NextResponse.json({ data: "Error uploading image", error });
    }

    return NextResponse.json({ data: pollImageUploaded.path, error: null });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error generating image", {
      status: 500,
      statusText: String(error),
    });
  }
}
