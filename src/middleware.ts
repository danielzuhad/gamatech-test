import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = request.nextUrl;
  const role = token?.role;

  if (!token && !url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (token && url.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // role based
  if (role === "admin" && url.pathname === "/profile") {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  if (role === "owner" && url.pathname === "/users") {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
