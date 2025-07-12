import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // As rotas nesta lista serão públicas e acessíveis por todos.
  // TODAS as outras rotas, incluindo /admin, exigirão login.
  publicRoutes: [
    '/',
    '/atualizacoes', // CORREÇÃO: Adicionada a rota base explicitamente
    '/atualizacoes/(.*)', // Mantém as sub-rotas públicas (ex: /julho-2025)
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
