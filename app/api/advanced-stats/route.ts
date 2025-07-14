import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const activeSessions = await clerkClient.sessions.getCount({ status: 'active' });
    const totalUsers = await clerkClient.users.getCount();

    const folderStatsByMonth = await prisma.folder.groupBy({
      by: ['monthSlug'],
      _count: { monthSlug: true },
      orderBy: { monthSlug: 'asc' },
    });

    const formattedFolderStats = folderStatsByMonth.map(item => ({
      month: item.monthSlug,
      count: item._count.monthSlug,
    }));

    const totalFolders = formattedFolderStats.reduce((acc, stat) => acc + stat.count, 0);

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