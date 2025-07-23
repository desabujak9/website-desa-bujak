// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Halaman yang perlu proteksi login
const protectedRoutes = [
  "/admin",
  "/admin/halaman-desa",
  "/admin/kependudukan",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (
    protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
