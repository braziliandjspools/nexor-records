import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Esta função será chamada quando o formulário de adicionar ao acervo for enviado
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Agora também esperamos o campo 'date'
    const { name, link, category, acervoSlug, date } = body;

    // Validação para garantir que todos os dados foram enviados
    if (!name || !link || !category || !acervoSlug || !date) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // Usa o Prisma para criar um novo registro na tabela "AcervoItem"
    const newAcervoItem = await prisma.acervoItem.create({
      data: {
        name,
        link,
        category,
        acervoSlug,
        date, // Salva a data de agrupamento
      },
    });

    // Retorna o registro do item criado com um status de sucesso
    return NextResponse.json(newAcervoItem, { status: 201 });

  } catch (error: any) {
    // Se o link do item já existir (por ser um campo @unique), retorna um erro
    if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Este link de item de acervo já foi adicionado.' }, { status: 409 });
    }
    console.error("Erro ao adicionar novo item ao acervo:", error);
    return NextResponse.json({ error: 'Erro ao salvar o novo item no banco de dados.' }, { status: 500 });
  }
}
