import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // <-- MUDANÇA IMPORTANTE

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, link, category, acervoSlug, date } = body;
    if (!name || !link || !category || !acervoSlug || !date) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }
    const newAcervoItem = await prisma.acervoItem.create({
      data: { name, link, category, acervoSlug, date },
    });
    return NextResponse.json(newAcervoItem, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Este link de item de acervo já foi adicionado.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro ao salvar o novo item no banco de dados.' }, { status: 500 });
  }
}