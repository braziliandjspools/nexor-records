import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const monthSlug = searchParams.get('month');

  if (!monthSlug) {
    return NextResponse.json({ error: 'O slug do mês é obrigatório na URL.' }, { status: 400 });
  }

  try {
    const folders = await prisma.folder.findMany({
      where: {
        monthSlug: monthSlug,
      },
      orderBy: {
        createdAt: 'desc', // Ordena as mais novas primeiro
      },
    });
    return NextResponse.json(folders);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar as pastas do banco de dados.' }, { status: 500 });
  }
}