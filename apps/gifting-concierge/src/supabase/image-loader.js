import { env } from "~/env";

const projectId = env.NEXT_PUBLIC_PROJECT_ID;

/**
 * @param {Object} param0
 * @param {string} param0.src
 * @param {number} param0.width
 * @param {number} param0.quality
 *
 */
export default function supabaseLoader({ src, width, quality }) {
	return `https://${projectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${
		quality || 75
	}`;
}
