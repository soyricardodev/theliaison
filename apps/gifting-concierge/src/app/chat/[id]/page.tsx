import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Chat } from "~/components/ai/chat";
import { AI, getChat } from "~/components/ai/chat/actions";
import type { Session } from "~/utils/types";
import { createClient } from "~/supabase/server";

export interface ChatPageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata({
	params,
}: ChatPageProps): Promise<Metadata> {
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

	if (!session?.user) {
		return {};
	}

	const chat = await getChat(params.id, session.user.id);
	return {
		title: chat?.title.toString().slice(0, 50) ?? "Chat",
	};
}

export default async function ChatPage({ params }: ChatPageProps) {
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
	const missingKeys: string[] = [];

	if (!session?.user) {
		redirect(`/login?next=/chat/${params.id}`);
	}

	const userId = session.user.id as string;
	const chat = await getChat(params.id, userId);

	if (!chat) {
		redirect("/");
	}

	if (chat?.userId !== session?.user?.id) {
		notFound();
	}

	return (
		<AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
			<Chat
				id={chat.id}
				session={session}
				initialMessages={chat.messages}
				missingKeys={missingKeys}
			/>
		</AI>
	);
}
