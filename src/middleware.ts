import {
  auth,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/login", "/register", "/", "/home"]);

const isPublicApiRoute = createRouteMatcher(["/api/v1/videos"]);

export default clerkMiddleware(async (auth, req) => {
  //   getting the user id of logged in user :
  const { userId } = await auth();

  const currentURL = new URL(req.url);

  const isDashboardRoute = currentURL.pathname === "/home";

  const isApiRoute = currentURL.pathname.startsWith("/api");

  // checking if the authenticated user is trying to access the login and register routes
  if (isPublicRoute(req) && !isDashboardRoute && userId) {
    NextResponse.redirect(new URL("/home", req.url));
  }

  // checking if the non authenticated user is trying to access the private route
  if (!isPublicRoute(req) && !userId) {
    NextResponse.redirect(new URL("/login", req.url));
  }

  // checking if the non authenticated user is trying to access the private api route
  if (isApiRoute && !isPublicApiRoute(req) && !userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
});
