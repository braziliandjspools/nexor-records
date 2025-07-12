import { clerkMiddleware } from '@clerk/nextjs/server';

// Por padrão, o Clerk protege todas as rotas.
// A lista 'publicRoutes' define as exceções que todos podem acessar.
// Como '/admin' não está nesta lista, ele é automaticamente protegido.
export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/atualizacoes/(.*)',
    '/api/folders(.*)',
    '/pesquisardrive',
    '/terms-of-service',
    '/privacy-policy'
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
