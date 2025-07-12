import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

// Esta função será chamada quando acessarmos /api/user-stats
export async function GET() {
  try {
    // Usa o SDK de servidor do Clerk para pegar a contagem total de usuários
    const totalUsers = await clerkClient.users.getCount();

    // Retorna o número em um objeto JSON
    return NextResponse.json({ totalUsers });
    
  } catch (error) {
    console.error("Erro ao buscar contagem de usuários:", error);
    return NextResponse.json({ error: 'Erro ao buscar dados do Clerk.' }, { status: 500 });
  }
}