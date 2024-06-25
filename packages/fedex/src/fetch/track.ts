import createClient from "openapi-fetch";
import type { paths } from "../types/track";

export const sandboxURL = "https://apis-sandbox.fedex.com";
const productionURL = "https://apis.fedex.com";

export const client = createClient<paths>({
	baseUrl: sandboxURL,
});
