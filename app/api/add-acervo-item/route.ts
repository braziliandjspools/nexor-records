import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Log para confirmar que o arquivo está sendo carregado no ambiente do Netlify
console.log("API route 'add-acervo-item' está sendo inicializada.");

let prisma: PrismaClient;

try {
    // Tenta inicializar o Prisma. Se as variáveis de ambiente estiverem erradas, ele falhará aqui.
    prisma = new PrismaClient();
    console.log("Prisma Client inicializado com sucesso.");
} catch (e) {
    console.error("ERRO CRÍTICO: Falha ao inicializar o Prisma Client.", e);
}

export async function POST(request: Request) {
  console.log("Requisição POST para /api/add-acervo-item recebida.");

  // Verifica se o Prisma foi inicializado corretamente
  if (!prisma) {
      console.error("Erro na API: O Prisma Client não está disponível.");
      return NextResponse.json({ error: 'Falha na conexão com o banco de dados na inicialização.' }, { status: 500 });
  }

  try {
    console.log("Tentando analisar o corpo da requisição (JSON)...");
    const body = await request.json();
    console.log("Corpo da requisição analisado com sucesso:", body);

    const { name, link, category, acervoSlug } = body;

    if (!name || !link || !category || !acervoSlug) {
      console.log("Falha na validação: Campos obrigatórios ausentes.");
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }
    
    console.log(`Tentando criar AcervoItem com o slug: ${acervoSlug}`);
    const newAcervoItem = await prisma.acervoItem.create({
      data: {
        name,
        link,
        category,
        acervoSlug,
      },
    });
    console.log("Item de Acervo criado com sucesso no banco:", newAcervoItem);

    return NextResponse.json(newAcervoItem, { status: 201 });

  } catch (error: any) {
    console.error("!!! ERRO CAPTURADO DENTRO DA ROTA DA API !!!");
    console.error("Detalhes do erro:", error);
    
    if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Este link de item de acervo já foi adicionado.' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Erro interno no servidor ao salvar no banco de dados.', details: error.message }, { status: 500 });
  }
}
