import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const profanitySchema = z.object({
	text: z.string().min(1, { message: "Text must be at least 1 character." }),
});

interface ProfanityResponse {
	isProfanity: boolean;
	score: number;
	flaggedFor: string | never;
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const parsed = profanitySchema.safeParse(body);

		if (!parsed.success) {
			return new NextResponse("Invalid request", {
				status: 400,
				// @ts-expect-error missing types
				statusText: parsed.error.issues[0].message,
			});
		}

		const { text } = parsed.data;

		const res = await fetch("https://vector.profanity.dev", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message: text }),
		});

		const data = (await res.json()) as ProfanityResponse;

		return NextResponse.json({
			isProfanity: data.isProfanity,
			score: data.score,
			flaggedFor: data.flaggedFor,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			isProfanity: false,
			score: 1,
			flaggedFor: "",
		});
	}
}
