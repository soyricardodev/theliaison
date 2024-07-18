import { createClient } from "~/supabase/server";
import { stripe } from "~/utils/stripe/config";
import { ActualData } from "./actual-data";
import { redirect } from "next/navigation";

async function getSession(sessionId: string) {
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		return session;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export default async function CheckoutReturnPage({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const sessionId = searchParams?.session_id;
	const type = (searchParams?.type as "link" | "custom" | undefined) ?? "link";
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	console.log({ sessionId, type });

	if (!sessionId || typeof sessionId !== "string") {
		return <p>Error: Something wrong!</p>;
	}
	const session = await getSession(sessionId);

	if (!session) {
		console.log("session is null", { session });
		return <p>Error: Something wrong!</p>;
	}

	if (session.status === "open") {
		return <p>Payment did not work.</p>;
	}

	if (session.status === "complete") {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4 bg-background py-32">
				<ActualData sessionId={sessionId} type={type} />
				<h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
				<h3 className="text-xl font-semibold">!</h3>
			</div>
		);
	}

	return null;
}
