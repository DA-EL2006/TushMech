import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role as string;

    // Helper to get the correct dashboard URL for a role
    const getDashboardUrl = (userRole: string) => {
      switch (userRole) {
        case "ADMIN": return new URL("/admin/control-room", req.url);
        case "MECHANIC": return new URL("/mechanic/dispatch", req.url);
        case "VENDOR": return new URL("/vendor/inventory", req.url);
        case "CUSTOMER":
        default: return new URL("/customer/dashboard", req.url);
      }
    };

    // Role-based route protection: bounce unauthorized users to their correct dashboard
    if (path.startsWith("/customer") && role !== "CUSTOMER" && role !== "ADMIN") {
      return NextResponse.redirect(getDashboardUrl(role));
    }
    if (path.startsWith("/mechanic") && role !== "MECHANIC" && role !== "ADMIN") {
      return NextResponse.redirect(getDashboardUrl(role));
    }
    if (path.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(getDashboardUrl(role));
    }
    if (path.startsWith("/vendor") && role !== "VENDOR" && role !== "ADMIN") {
      return NextResponse.redirect(getDashboardUrl(role));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/customer/:path*",
    "/mechanic/:path*",
    "/admin/:path*",
    "/vendor/:path*",
  ],
};
