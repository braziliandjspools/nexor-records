import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // <-- MUDANÇA IMPORTANTE

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'O slug do acervo é obrigatório.' }, { status: 400 });
    }
    const acervoItems = await prisma.acervoItem.findMany({
      where: { acervoSlug: slug },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(acervoItems);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar dados do banco.' }, { status: 500 });
  }
}