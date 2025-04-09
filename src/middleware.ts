import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { isAuthenticated } from "./auth/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const storedCookies = await isAuthenticated();

  if (storedCookies.get("token")?.value) {
    if (["/entrar", "/cadastrar"].includes(path)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!storedCookies.get("token")?.value) {
    if (
      [
        "/entrar",
        "/cadastrar",
        "/confirmar-conta",
        "/recuperar-senha",
        "/nova-senha",
      ].includes(path)
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
