import { NextResponse, NextRequest } from "next/server";
import { ROUTES } from "./utils/route.utils";

// Define accessible routes
const sharedRoutes = ["/"];
const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/otp-verification",
];

// Regex for static/public files
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("ACCESS_TOKEN")?.value;
  const { pathname } = request.nextUrl;

  let response;

  // Skip middleware for public/static files
  if (PUBLIC_FILE.test(pathname)) {
    response = NextResponse.next();
  }
  // Allow shared routes
  else if (sharedRoutes.includes(pathname)) {
    response = NextResponse.next();
  }
  // Redirect unauthorized users accessing private routes to login
  else if (!accessToken && !publicRoutes.includes(pathname)) {
    response = NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }
  // Redirect authenticated users accessing public routes to dashboard
  else if (accessToken && publicRoutes.includes(pathname)) {
    response = NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }
  // (Optional) Rewrite logic if needed
  else if (pathname.startsWith("/some-path")) {
    const url = request.nextUrl.clone();
    url.pathname = "/redirected-path";
    response = NextResponse.rewrite(url);
  }
  // Default case: continue request
  else {
    response = NextResponse.next();
  }

  // Apply the no-cache header to all responses
  response.headers.set("x-middleware-cache", "no-cache");
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
