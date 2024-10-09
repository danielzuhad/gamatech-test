import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const rolePages = {
  admin: ["/users", "/"],
  owner: ["/profile", "/"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = request.nextUrl;
  const role = token?.role;

  if (!token && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (token && request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // // role based
  if (role && rolePages[role]) {
    const allowedPages = rolePages[role];

    if (!allowedPages.some((page) => url.pathname.startsWith(page))) {
      return NextResponse.redirect(new URL("/access-denied", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
