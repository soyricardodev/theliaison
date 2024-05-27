"use server";

export async function searchPolls(query: string) {
	console.log(query);
	const res = await fetch(new URL("/api/polls/search"), {
		method: "POST",
		body: JSON.stringify({
			query,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = (await res.json()) as Array<{
		id: string;
		question: string;
		image: string;
		similarity: number;
	}>;

	console.log(data);
	console.log("from action");

	return data;
}
