import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Optionally configure your middleware
  publicRoutes: ["/", "/api/public"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
