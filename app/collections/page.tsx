"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Computer, HelpCircle, Folder, DollarSign, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- ESTRUTURA DE DADOS PARA AS COLEÇÕES ---
interface CollectionItem {
  id: string;
  title: string;
  description: string;
  lastUpdate: string;
  imageUrl: string;
  href: string;
}

// --- DADOS DAS COLEÇÕES ---
const collectionsData: CollectionItem[] = [
  {
    id: "funkymix",
    title: "FUNKYMIX",
    description: "Coleções exclusivas de Funk, incluindo remixes, acapellas e instrumentais para DJs.",
    lastUpdate: "Julho 2025",
    imageUrl: "https://i.ibb.co/VMyPz3k/funkymix.jpg",
    href: "/collections/funkymix" 
  },
  {
    id: "ultimix",
    title: "ULTIMIX",
    description: "Os maiores hits do Mainstream e Dance em versões estendidas e com batidas marcadas.",
    lastUpdate: "Julho 2025",
    imageUrl: "https://i.ibb.co/L5gBwLM/ultimix.jpg",
    href: "/collections/ultimix"
  },
  {
    id: "select-mix",
    title: "SELECT MIX",
    description: "Essenciais para todo tipo de evento, com mixagens limpas e prontas para tocar.",
    lastUpdate: "Junho 2025",
    imageUrl: "https://i.ibb.co/L6V2M9b/selectmix.jpg",
    href: "/collections/select-mix"
  },
  {
    id: "x-mix",
    title: "X-MIX",
    description: "Compilações de gêneros como Urban, Dance e Pop, curadas por DJs renomados.",
    lastUpdate: "Junho 2025",
    imageUrl: "https://i.ibb.co/K2nJv11/xmix.jpg",
    href: "/collections/x-mix"
  },
  {
    id: "full-tilt-remix",
    title: "FULL TILT REMIX",
    description: "Remixes energéticos e focados na pista de dança, abrangendo diversos estilos.",
    lastUpdate: "Maio 2025",
    imageUrl: "https://i.ibb.co/C03vR5j/fulltilt.jpg",
    href: "/collections/full-tilt-remix"
  },
  {
    id: "dmc",
    title: "DMC",
    description: "Pioneiros em remixes para DJs, oferecendo megamixes e bootlegs clássicos.",
    lastUpdate: "Julho 2025",
    imageUrl: "https://i.ibb.co/TmgwK9p/dmc.jpg",
    href: "/collections/dmc"
  },
  {
    id: "mastermix",
    title: "MASTERMIX",
    description: "A coleção definitiva para DJs de eventos, com décadas de música e edições especiais.",
    lastUpdate: "Julho 2025",
    imageUrl: "https://i.ibb.co/XDY5GZt/mastermix.jpg",
    href: "/collections/mastermix"
  },
];

// --- COMPONENTE DO CARD DA COLEÇÃO ---
function CollectionCard({ collection }: { collection: CollectionItem }) {
  return (
    <Link href={collection.href} className="group relative block w-full h-80 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-green-500/30">
      <Image
        src={collection.imageUrl}
        alt={`Background for ${collection.title}`}
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
      <div className="relative flex flex-col justify-end h-full p-6 z-20 text-white">
        <h3 className="text-3xl font-extrabold uppercase tracking-wider">{collection.title}</h3>
        <p className="mt-2 text-gray-300 text-sm leading-relaxed">{collection.description}</p>
        <div className="mt-4 pt-4 border-t border-green-600/30 flex items-center gap-2 text-xs text-green-400 font-semibold">
          <Calendar className="h-4 w-4" />
          <span>ÚLTIMA ATUALIZAÇÃO: {collection.lastUpdate.toUpperCase()}</span>
        </div>
      </div>
    </Link>
  );
}


// --- PÁGINA PRINCIPAL ---
export default function CollectionsPage() {
  return (
    <div className="space-y-8 pb-40"> {/* Aumentado o padding-bottom para não sobrepor o footer fixo */}
      {/* Navegação e Título */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar para Home</span>
          </Link>
        </Button>
        {/* Ícone do título removido */}
        <h1 className="font-bold text-3xl tracking-tight uppercase">
          Collections
        </h1>
      </div>
      
      {/* --- MENSAGENS DE AVISO --- */}
      <div className="bg-pink-600/80 border border-pink-500/50 text-white p-4 rounded-lg flex items-center justify-center text-center space-x-3 text-sm">
        <Computer className="h-6 w-6 flex-shrink-0" />
        <p>
          Para uma melhor experiência, recomendamos usar o site em um
          <strong> computador</strong> ou com seu dispositivo na
          <strong> posição horizontal</strong>.
        </p>
      </div>
      
      <div className="bg-red-900/30 border border-red-600/30 text-red-200 p-4 rounded-lg text-center mb-6 space-y-3">
        <p className="text-sm text-justify">
          A pesquisa em nosso site permite encontrar <strong>estilos musicais (pastas)</strong> de forma rápida. Para uma busca detalhada por <strong>músicas ou artistas específicos</strong>, recomendamos utilizar a pesquisa avançada diretamente no Google Drive, que oferece mais filtros e precisão.
        </p>
        <Button asChild className="bg-blue-600/80 hover:bg-blue-700/80 text-white">
          <Link href="/pesquisardrive">
            <HelpCircle className="mr-2 h-4 w-4" />
            COMO PESQUISAR NO GOOGLE DRIVE
          </Link>
        </Button>
      </div>

      {/* Grid de Coleções (1 item por linha) */}
      <section>
        <div className="grid grid-cols-1 gap-8">
          {collectionsData.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* --- BOTÕES DE AÇÃO --- */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/atualizacoes" rel="noopener noreferrer">
              <Button className="bg-green-600 hover:bg-green-700 w-full">
                  <Folder className="mr-2 h-4 w-4" />
                  VER TODAS AS ATUALIZAÇÕES
              </Button>
          </Link>
          <Link href="https://djjessica.vercel.app/servicos/musicas-eletronicas" target="_blank" rel="noopener noreferrer">
              <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  SEM ACESSO? ASSINE
              </Button>
          </Link>
      </div>

      {/* --- FOOTER DE NAVEGAÇÃO FIXO --- */}
      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-green-600/30 p-4 z-20">
        <div className="container mx-auto flex justify-center items-center">
            {/* Botões de mês anterior/próximo removidos, centralizando o Home */}
            <Link href="/atualizacoes" passHref>
                <Button variant="secondary" className="bg-green-600 hover:bg-green-700">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </div>
  );
}