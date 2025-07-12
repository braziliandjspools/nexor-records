import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Esta função será chamada quando acessarmos /api/advanced-stats
export async function GET() {
  try {
    // 1. Busca o número de sessões ativas (usuários online) do Clerk
    const activeSessions = await clerkClient.sessions.getCount({
      status: 'active',
    });

    // 2. Busca a contagem total de usuários do Clerk
    const totalUsers = await clerkClient.users.getCount();

    // 3. Busca as estatísticas de pastas do nosso banco de dados
    const folderStatsByMonth = await prisma.folder.groupBy({
      by: ['monthSlug'],
      _count: {
        monthSlug: true,
      },
      orderBy: {
        monthSlug: 'asc',
      },
    });

    // Formata os dados das pastas
    const formattedFolderStats = folderStatsByMonth.map(item => ({
      month: item.monthSlug,
      count: item._count.monthSlug,
    }));

    // Calcula o total de pastas
    const totalFolders = formattedFolderStats.reduce((acc, stat) => acc + stat.count, 0);

    // Monta o objeto final com todos os dados
    const responseData = {
      serverStatus: 'Online',
      onlineUsers: activeSessions,
      totalUsers: totalUsers,
      totalFolders: totalFolders,
      foldersByMonth: formattedFolderStats,
    };

    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error("Erro ao buscar estatísticas avançadas:", error);
    return NextResponse.json({ 
      serverStatus: 'Error',
      error: 'Erro ao buscar dados para o dashboard.' 
    }, { status: 500 });
  }
}
