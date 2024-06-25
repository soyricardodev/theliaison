import createClient from "openapi-fetch";
import type { paths } from "../types/authorization";

export const sandboxURL = "https://apis-sandbox.fedex.com";
const productionURL = "https://apis.fedex.com";

export const client = createClient<paths>({
	baseUrl: sandboxURL,
});

/**
 *
 * @param clientId The client ID received during FedEx Developer portal registration.
 * @param clientSecret The client secret received during FedEx Developer portal registration.
 * @param withBearer If true, the access token will be returned with the Bearer prepend `Bearer Token`. If false, the access token will be returned as a plain text string.
 * @example getAccessToken(env.FEDEX_API_KEY, env.FEDEX_SECRET_KEY);
 * @returns The access token.
 */
export async function getAccessToken(
	clientId: string,
	clientSecret: string,
	withBearer = true,
) {
	const request = await client.POST("/oauth/token", {
		params: {
			header: {
				"content-type": "application/x-www-form-urlencoded",
			},
		},
		body: {
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: "client_credentials",
		},
		bodySerializer: (body) => new URLSearchParams(body),
	});

	if (withBearer) {
		return `Bearer ${request.data.access_token}`;
	}

	return request.data.access_token;
}
