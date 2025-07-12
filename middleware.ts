import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define as rotas que são acessíveis a todos (públicas)
const isPublicRoute = createRouteMatcher([
  '/',
  '/atualizacoes/(.*)',
  '/pesquisardrive',
  '/terms-of-service',
  '/privacy-policy',
  '/sign-in(.*)', // A própria página de login precisa ser pública
  '/sign-up(.*)', // A própria página de cadastro precisa ser pública
  '/api/folders(.*)', // A API para buscar as pastas precisa ser pública
]);

export default clerkMiddleware((auth, request) => {
  // Se a rota acessada NÃO for pública, protege-a.
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  // Este matcher garante que o middleware rode em todas as rotas relevantes.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
