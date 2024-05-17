import { useEffect, useState } from "react";
import { createClient } from "~/utils/supabase/client";

export function useDownloadImage({ url }: { url: string | undefined }) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const supabase = createClient();

	useEffect(() => {
		async function downloadImage(path: string) {
			try {
				const { data, error } = await supabase.storage
					.from("polls")
					.download(path);
				if (error) throw error;

				const url = URL.createObjectURL(data);
				setImageUrl(url);
			} catch (error) {
				console.log("Error downloading image: ", error);
			}
		}

		if (url != null) downloadImage(url);
	}, [url, supabase]);

	return imageUrl;
}
