import { Button } from "@theliaison/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@theliaison/ui/dialog";
import { AI } from "./chat/actions";
import { Chat } from "./chat";
import { nanoid } from "~/utils";
import { createClient } from "~/supabase/server";
import type { Session } from "~/utils/types";

export async function FloatingAICta() {
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
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="sm"
					variant="secondary"
					className="font-medium md:h-9 md:px-4 md:py-2"
				>
					<span className="lg:hidden">AI</span>
					<span className="hidden lg:inline">Ask AI</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-full w-full md:min-w-[800px] h-full min-h-[600px]">
				<AI initialAIState={{ chatId: id, messages: [] }}>
					<Chat id={id} session={session} missingKeys={[]} />
				</AI>
			</DialogContent>
		</Dialog>
	);
}
