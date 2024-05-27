export async function searchPolls(query: string) {
	console.log(query);
	const res = await fetch("/api/polls/search", {
		method: "POST",
		body: JSON.stringify({
			query,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = (await res.json()) as {
		data: Array<{
			id: string;
			question: string;
			image: string;
			similarity: number;
		}>;
	};

	console.log(data);
	console.log("from action");

	return data;
}
