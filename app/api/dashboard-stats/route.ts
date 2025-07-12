import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Esta função será chamada quando acessarmos /api/dashboard-stats
export async function GET() {
  try {
    // Usa a função 'groupBy' do Prisma para agrupar por 'monthSlug' e contar os itens
    const stats = await prisma.folder.groupBy({
      by: ['monthSlug'],
      _count: {
        monthSlug: true, // Conta as ocorrências de cada monthSlug
      },
      orderBy: {
        monthSlug: 'asc', // Ordena por nome do mês
      },
    });

    // Transforma os dados para um formato mais amigável para o frontend
    // Ex: de [{ monthSlug: 'julho-2025', _count: { monthSlug: 90 } }]
    // para [{ month: 'julho-2025', count: 90 }]
    const formattedStats = stats.map(item => ({
      month: item.monthSlug,
      count: item._count.monthSlug,
    }));

    return NextResponse.json(formattedStats);
    
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json({ error: 'Erro ao buscar dados para o dashboard.' }, { status: 500 });
  }
}