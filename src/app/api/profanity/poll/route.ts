import { type NextRequest, NextResponse } from "next/server";
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

		const questionAndOptionInAWordWithSpaces = `${question} ${options.join(
			" ",
		)}`;

		const res = await fetch("https://vector.profanity.dev", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message: questionAndOptionInAWordWithSpaces }),
		});

		const data = (await res.json()) as ProfanityResponse;
		const message = data.isProfanity ? "This poll contains profanity" : "";

		return NextResponse.json({
			isProfanity: data.isProfanity,
			message,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			isProfanity: true,
			score: 1,
			flaggedFor: "",
			message: "We couldn't check the poll for profanity",
		});
	}
}
