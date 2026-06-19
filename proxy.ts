import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedPageRoute = createRouteMatcher(["/dashboard(.*)"]);

const isProtectedApiRoute = createRouteMatcher([
  "/api/ai(.*)",
  "/api/tasks(.*)",
  "/api/trpc(.*)",
  "/api/uploads(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isProtectedPageRoute(req) && !isProtectedApiRoute(req)) {
      return;
    }

    const { isAuthenticated, redirectToSignIn } = await auth();

    if (isAuthenticated) {
      return;
    }

    if (isProtectedPageRoute(req)) {
      return redirectToSignIn();
    }

    return new Response("Unauthorized", { status: 401 });
  },
  {
    frontendApiProxy: {
      enabled: true,
    },
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
