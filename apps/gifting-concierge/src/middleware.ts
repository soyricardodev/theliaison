import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./supabase/middleware";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import { createClient } from "./supabase/server";

const adminPaths = ["/dashboard"];
const authPaths = ["/register", "/login"];

export async function middleware(request: NextRequest) {
	await updateSession(request);

	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	const url = request.nextUrl.clone();
	const pathname = url.pathname;
	const nextPath = url.searchParams.get("next");

	if (adminPaths.includes(pathname)) {
		if (!user || error) {
			url.pathname = "/login";
			url.searchParams.set("next", nextPath ?? pathname);

			return NextResponse.redirect(url);
		}

		// * Check if user is admin
		supabase.auth.onAuthStateChange(async (_, session) => {
			if (session) {
				const jwt = jwtDecode(session.access_token) as JwtPayload & {
					user_role: string;
				};
				const userRole = jwt.user_role as string | null;
				const isAdmin = userRole === "admin";

				if (!isAdmin) {
					url.pathname = "/unauthorized";
					NextResponse.redirect(url);
					return;
				}

				NextResponse.next();
				return;
			}
			url.pathname = "/login";
			url.searchParams.set("next", nextPath ?? pathname);
			NextResponse.redirect(url);
			return;
		});
	}

	if (authPaths.includes(pathname)) {
		if (user != null || !error) {
			url.pathname = "/";
			return NextResponse.redirect(url);
		}
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
		"/dashboard/:path*",
	],
};
