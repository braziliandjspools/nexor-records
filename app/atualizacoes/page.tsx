"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, DollarSign } from "lucide-react"

// Lista de meses para gerar os botões dinamicamente
const months = [
  { name: "JANEIRO 2025", status: "[COMPLETO]", href: "/atualizacoes/janeiro-2025", disabled: false },
  { name: "FEVEREIRO 2025", status: "[COMPLETO]", href: "/atualizacoes/fevereiro-2025", disabled: false },
  { name: "MARÇO 2025", status: "[COMPLETO]", href: "/atualizacoes/marco-2025", disabled: false },
  { name: "ABRIL 2025", status: "[COMPLETO]", href: "/atualizacoes/abril-2025", disabled: false },
  { name: "MAIO 2025", status: "[COMPLETO]", href: "/atualizacoes/maio-2025", disabled: false },
  { name: "JUNHO 2025", status: "[COMPLETO]", href: "/atualizacoes/junho-2025", disabled: false },
  { name: "JULHO 2025", status: "[EM ATUALIZAÇÃO]", href: "/atualizacoes/julho-2025", disabled: false },
  { name: "AGOSTO 2025", status: "[EM BREVE]", href: "#", disabled: true },
  { name: "SETEMBRO 2025", status: "[EM BREVE]", href: "#", disabled: true },
  { name: "OUTUBRO 2025", status: "[EM BREVE]", href: "#", disabled: true },
  { name: "NOVEMBRO 2025", status: "[EM BREVE]", href: "#", disabled: true },
  { name: "DEZEMBRO 2025", status: "[EM BREVE]", href: "#", disabled: true },
]

export default function AtualizacoesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Atualizações</h1>
      </div>

      <div className="bg-green-700/90 border border-green-500 text-white p-6 rounded-lg shadow-lg mb-8">
        <p className="text-justify mb-6">
          🎉 Bem-vindo ao nosso acervo exclusivo! 🚀 Usuários <strong>VIP</strong> têm acesso a downloads ilimitados de todo o nosso conteúdo. Se você é um visitante, para baixar os arquivos e ter acesso completo, é necessário assinar um de nossos planos. Torne-se VIP e aproveite o melhor da música sem limites! ✨
        </p>
        <div className="flex justify-center">
            <Link href="https://djjessica.vercel.app/servicos/musicas-eletronicas" target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 text-lg rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <DollarSign className="mr-2 h-5 w-5" />
                    ASSINAR PLANO VIP
                </Button>
            </Link>
        </div>
      </div>

      <>
        <div className="text-center mb-8">
          <h2 className="font-bold text-3xl tracking-tight uppercase">Packs 2025</h2>
          <div className="flex justify-center mt-4">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {months.map((month) => (
            <Link key={month.name} href={month.href} passHref>
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-lg h-16 w-full justify-between shadow-md uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={month.disabled}
              >
                <span className="flex items-center">
                  <Download className="mr-3" size={20} />
                  {month.name}
                </span>
                <span className="text-sm font-normal normal-case">{month.status}</span>
              </Button>
            </Link>
          ))}
        </div>
      </>
    </div>
  )
}
