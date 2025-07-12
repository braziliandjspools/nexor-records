import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // As rotas nesta lista serão públicas e acessíveis por todos.
  // TODAS as outras rotas, incluindo /admin, exigirão login.
  publicRoutes: [
    '/',
    '/atualizacoes/(.*)', // A mágica está aqui: (.*) significa "e qualquer coisa depois da barra"
    '/api/folders(.*)',
    '/pesquisardrive',
    '/terms-of-service',
    '/privacy-policy',
  ],
});

export const config = {
  // Este matcher garante que o middleware rode em todas as rotas relevantes.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
