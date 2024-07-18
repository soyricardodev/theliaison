import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createClient } from "~/utils/supabase/server";

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
		.upload(fileName, Buffer.from(buffer), {
			contentType: "image/png",
			upsert: true,
		});

	if (error) {
		console.log("Error uploading image: ", error);
		throw new Error("Error uploading image");
	}

	return data.path;
};

const _updatePollImage = async (pollId: string, imagePath: string) => {
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

const imageSchema = z.object({
	url: z.string().url(),
	pollId: z.string(),
});

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const parsed = imageSchema.safeParse(body);
		if (!parsed.success || parsed.error) {
			return new NextResponse("Invalid request", {
				status: 400,
				// @ts-expect-error missing types
				statusText: parsed.error.issues[0].message,
			});
		}

		const { url } = parsed.data;

		const imageBuffer = await downloadImage(url);
		console.log("imageBuffer", imageBuffer);

		if (imageBuffer != null) {
			const fileName = `${Math.random()}.png`;
			const imagePath = await uploadToSupabase(imageBuffer, fileName);
			console.log(imagePath);
			return NextResponse.json({ path: imagePath });
		}

		return NextResponse.json({ imageBuffer });

		// const fileName = `${Math.random()}.png`;
		// await updatePollImage(pollId, imagePath);

		// return NextResponse.json({ image_url: imagePath });
	} catch (error) {
		console.log(error);
		return new NextResponse("Error uploading image", {
			status: 500,
			statusText: String(error),
		});
	}
}
