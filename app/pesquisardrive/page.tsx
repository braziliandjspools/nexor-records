"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PesquisarDrive() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/atualizacoes">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar para Atualizações</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Como Pesquisar no Drive</h1>
      </div>

      {/* Card removido para usar o fundo principal */}
      <div className="space-y-8 text-gray-300">
        <div className="text-center">
            <h2 className="text-center text-2xl text-green-400 font-semibold">
                Encontrando Músicas no Google Drive
            </h2>
        </div>
        
        <p className="text-center">
            Todo o nosso acervo é compartilhado com você através do Google Drive. Siga os passos abaixo para pesquisar e encontrar qualquer música ou pasta específica de forma rápida e eficiente.
        </p>

        {/* PASSO 1 */}
        <div className="space-y-4">
            <h3 className="font-semibold text-xl text-green-400 border-b border-green-600/30 pb-2">Passo 1: Acesse "Compartilhados comigo"</h3>
            <p>
            Abra o seu Google Drive. No menu lateral esquerdo, clique na opção <strong>"Compartilhados comigo"</strong>. É aqui que você encontrará todas as pastas de atualizações mensais que compartilhamos.
            </p>
            <div className="flex justify-center p-4 rounded-lg">
            <Image
                src="https://i.ibb.co/R4JdjBrS/compartilhadoscomigo.png"
                alt="Passo 1 - Acessar Compartilhados comigo"
                width={700}
                height={210}
                className="rounded-md border border-gray-600"
            />
            </div>
        </div>

        {/* PASSO 2 */}
        <div className="space-y-6">
            <h3 className="font-semibold text-xl text-green-400 border-b border-green-600/30 pb-2">Passo 2: Utilize os Filtros de Pesquisa</h3>
            <p>
            No topo da página, clique na barra de pesquisa e depois no ícone de filtros à direita para abrir as opções de pesquisa avançada. Esta é a forma mais precisa de encontrar o que precisa.
            </p>
            <div className="flex justify-center p-4 rounded-lg">
                <Image
                    src="https://i.ibb.co/pjhr0pn4/pesquisa.png"
                    alt="Passo 2 - Usando os filtros de pesquisa"
                    width={700}
                    height={350}
                    className="rounded-md border border-gray-600"
                />
            </div>
            
            <div className="space-y-4 pt-4">
                <h4 className="font-semibold text-lg text-gray-100">Filtro de "Tipo":</h4>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>Para procurar por um <strong>estilo musical</strong> (ex: Sertanejo, House, Funk), selecione a opção <strong className="text-yellow-400">"Pasta"</strong>.</li>
                    <li>Para procurar por uma <strong>música específica</strong>, não precisa aplicar este filtro, pode deixar como <strong className="text-yellow-400">"Qualquer tipo"</strong>.</li>
                </ul>

                <h4 className="font-semibold text-lg text-gray-100 pt-4">Filtro de "Pessoas":</h4>
                <p>
                    Este é o filtro mais importante. Ele garante que a busca seja feita apenas no nosso acervo.
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>No campo "Proprietário", selecione o e-mail <strong className="text-yellow-400">pix.fabricadosdjs@gmail.com</strong>.</li>
                    <li>Se o e-mail não aparecer na lista, basta digitá-lo no campo e selecioná-lo.</li>
                </ul>

                <h4 className="font-semibold text-lg text-gray-100 pt-4">Filtro de "Modificado":</h4>
                <ul className="list-disc list-inside pl-4">
                    <li><strong className="text-red-400">Não utilize este filtro.</strong> Deixe-o como "A qualquer momento" para garantir que todos os arquivos sejam incluídos na busca.</li>
                </ul>
            </div>
        </div>

        {/* PASSO 3 */}
        <div className="space-y-4">
            <h3 className="font-semibold text-xl text-green-400 border-b border-green-600/30 pb-2">Passo 3: Pesquise!</h3>
            <p>
                Após configurar os filtros, digite o nome do artista, música ou estilo na barra de pesquisa principal e pressione Enter.
            </p>
            <Alert className="bg-green-900/20 border-green-600/30 text-green-200 mt-2">
                <AlertDescription>
                <strong>Exemplo prático:</strong> Para achar a pasta de "Sertanejo", configure os filtros (Tipo: Pasta, Proprietário: pix.fabricadosdjs@gmail.com) e depois digite "Sertanejo" na barra de pesquisa principal.
                </AlertDescription>
            </Alert>
        </div>

        <div className="text-center pt-6">
            <Button asChild>
                <Link href="/atualizacoes">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para Atualizações
                </Link>
            </Button>
        </div>

      </div>
    </div>
  )
}
