import createClient from "openapi-fetch";
import type { paths } from "../types/ship";

export const sandboxURL = "https://apis-sandbox.fedex.com";
const _productionURL = "https://apis.fedex.com";

export const client = createClient<paths>({
	baseUrl: sandboxURL,
});
