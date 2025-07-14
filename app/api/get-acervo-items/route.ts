import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Esta função será chamada para buscar os itens de um acervo específico
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // Validação para garantir que o slug do acervo foi enviado
    if (!slug) {
      return NextResponse.json({ error: 'O slug do acervo é obrigatório.' }, { status: 400 });
    }

    // Usa o Prisma para encontrar todos os itens que correspondem ao slug do acervo
    const acervoItems = await prisma.acervoItem.findMany({
      where: {
        acervoSlug: slug,
      },
      orderBy: {
        createdAt: 'desc', // Ordena os mais novos primeiro
      },
    });

    // Retorna a lista de itens encontrados
    return NextResponse.json(acervoItems);

  } catch (error) {
    console.error("Erro ao buscar itens do acervo:", error);
    return NextResponse.json({ error: 'Erro ao buscar dados do banco.' }, { status: 500 });
  }
}
