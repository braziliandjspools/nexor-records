import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/", 
    "/atualizacoes/(.*)", 
    "/api/folders(.*)",
    "/pesquisardrive"
  ]
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};