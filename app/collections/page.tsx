"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, LayoutGrid, Calendar } from "lucide-react"
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
// As imagens são placeholders temáticos. Você pode substituí-las pelas suas.
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
      {/* Imagem de Fundo e Overlay */}
      <Image
        src={collection.imageUrl}
        alt={`Background for ${collection.title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>

      {/* Conteúdo do Card */}
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
    <div className="space-y-8 pb-24">
      {/* Navegação e Título */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar para Home</span>
          </Link>
        </Button>
        <h1 className="flex items-center gap-3 font-bold text-3xl tracking-tight uppercase">
          <LayoutGrid className="h-7 w-7 text-green-500" />
          Collections
        </h1>
      </div>

      {/* Grid de Coleções */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {collectionsData.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* Aviso de mais conteúdo */}
      <div className="text-center mt-16 text-gray-400">
        <p>Mais coleções serão adicionadas em breve. Fique de olho!</p>
      </div>
    </div>
  );
}