export interface PollWithOptionsAndVotes {
	id: number;
	question: string;
	image: string | undefined;
	options: {
		votes: number | undefined;
		percentage: number | undefined;
		id: number;
		text: string;
	}[];
	user: {
		id: string;
		username: string;
		avatar_url: string | null;
	};
}
