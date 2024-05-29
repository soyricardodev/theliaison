import { Container } from "~/components/container";
import { createClient } from "~/utils/supabase/server";

export default async function ExplorePage() {
	const supabase = createClient();

	return (
		<Container>
			<h1>Explore</h1>
		</Container>
	);
}
