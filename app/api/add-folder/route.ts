import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // <-- MUDANÇA IMPORTANTE

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, link, category, date, monthSlug } = body;
    if (!name || !link || !category || !date || !monthSlug) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }
    const newFolder = await prisma.folder.create({
      data: { name, link, category, date, monthSlug },
    });
    return NextResponse.json(newFolder, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Este link de pasta já foi adicionado.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro ao salvar a pasta no banco de dados.' }, { status: 500 });
  }
}