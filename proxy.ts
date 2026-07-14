import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// DEMO AUTH — no NextAuth required.
// Role is stored in the "tushmech_role" cookie when the user clicks a role on
// the /login or homepage. Clicking a role IS the authentication for this demo.
// ─────────────────────────────────────────────────────────────────────────────

const ROLE_COOKIE = "tushmech_role";

function notFound(req: NextRequest) {
  return NextResponse.rewrite(new URL("/not-found", req.url));
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow onboarding entry pages — they are the login for each role
  if (pathname.endsWith("/onboarding")) return NextResponse.next();

  const role = req.cookies.get(ROLE_COOKIE)?.value?.toUpperCase();

  // No cookie = user hasn't selected a role yet → go to login
  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based 404 — wrong role trying to access another role's section
  if (pathname.startsWith("/customer") && role !== "CUSTOMER") return notFound(req);
  if (pathname.startsWith("/mechanic") && role !== "MECHANIC") return notFound(req);
  if (pathname.startsWith("/admin")    && role !== "ADMIN")    return notFound(req);
  if (pathname.startsWith("/vendor")   && role !== "VENDOR")   return notFound(req);

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all role-specific routes, but skip their /onboarding entry pages
    "/customer/((?!onboarding).*)",
    "/mechanic/((?!onboarding).*)",
    "/admin/((?!onboarding).*)",
    "/vendor/((?!onboarding).*)",
  ],
};
