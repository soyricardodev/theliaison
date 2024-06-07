export interface PollWithOptionsAndVotes {
  id: string;
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
  categories?: Array<{
    id: number;
    name: string;
  }>;
}
