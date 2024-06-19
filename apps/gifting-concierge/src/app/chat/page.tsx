import { Chat } from "~/components/ai/chat";
import { AI } from "~/components/ai/chat/actions";
import { createClient } from "~/supabase/server";
import { nanoid } from "~/utils";
import type { Session } from "~/utils/types";

export const metadata = {
	title: "The Liaison AI",
};

export default async function AIPage() {
	const id = nanoid();
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();

	const session: Session | undefined = data?.user?.email
		? {
				user: {
					id: data.user.id,
					email: data.user.email,
				},
			}
		: undefined;

	return (
		<AI initialAIState={{ chatId: id, messages: [] }}>
			<Chat id={id} session={session} missingKeys={[]} />
		</AI>
	);
}
