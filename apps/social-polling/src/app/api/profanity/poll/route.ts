import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const profanitySchema = z.object({
	question: z.string(),
	options: z.array(z.string()),
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

		const { question, options } = parsed.data;

		const questionResponse = await fetch("https://vector.profanity.dev", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message: question }),
		});

		const questionData = (await questionResponse.json()) as ProfanityResponse;

		if (questionData.isProfanity) {
			return NextResponse.json({
				isProfanity: true,
				score: questionData.score,
				flaggedFor: questionData.flaggedFor,
				message: "Your poll question contains profanity",
			});
		}

		for (const option of options) {
			const optionResponse = await fetch("https://vector.profanity.dev", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: option }),
			});

			const optionData = (await optionResponse.json()) as ProfanityResponse;

			if (optionData.isProfanity) {
				return NextResponse.json({
					isProfanity: optionData.isProfanity,
					score: optionData.score,
					flaggedFor: optionData.flaggedFor,
					message: "Your poll contains profanity",
				});
			}
		}

		return NextResponse.json({
			isProfanity: false,
			score: 0,
			flaggedFor: "",
			message: "Your poll does not contain profanity",
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			isProfanity: true,
			score: 0,
			flaggedFor: "",
			message: "We couldn't check the poll for profanity",
		});
	}
}
