import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, link, category, acervoSlug } = body;

    if (!name || !link || !category || !acervoSlug) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const newAcervoItem = await prisma.acervoItem.create({
      data: { name, link, category, acervoSlug },
    });

    return NextResponse.json(newAcervoItem, { status: 201 });

  } catch (error: any) {
    if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Este link de item de acervo já foi adicionado.' }, { status: 409 });
    }
    console.error("Erro ao adicionar novo item ao acervo:", error);
    return NextResponse.json({ error: 'Erro ao salvar o novo item no banco de dados.' }, { status: 500 });
  }
}