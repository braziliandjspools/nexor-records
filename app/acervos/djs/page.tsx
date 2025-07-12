"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Home, Search, Filter, ChevronDown, Music, Copy, Check, AlertTriangle, Computer, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// --- ESTRUTURA DE DADOS PARA OS DJS ---
interface DjPack {
  id: string
  name: string
  avatarUrl: string
  description: string
  driveLink: string
  tags: string[]
}

// --- DADOS DOS DJS (ATUALIZADO) ---
const djsData: DjPack[] = [
  {
    id: "david-guetta",
    name: "David Guetta",
    avatarUrl: "https://i.ibb.co/Qv0Wr0w/davidguetta.jpg",
    description: "Um dos maiores nomes da música eletrónica mundial.",
    driveLink: "https://drive.google.com/drive/folders/1tlgs7IQwSK1HbJje4RJb2mRmP6MBrkzf?usp=drive_link",
    tags: ["HOUSE", "POP", "ELECTRONIC"]
  },
  {
    id: "martin-garrix",
    name: "Martin Garrix",
    avatarUrl: "https://i.ibb.co/NnpjWzz/MARTIN-GARRIX.jpg",
    description: "DJ e produtor holandês, destaque na cena EDM.",
    driveLink: "https://drive.google.com/drive/folders/1A1rP-8_S5DMbUiqOa1SVjgYl3d9QF0iC?usp=drive_link",
    tags: ["EDM", "PROGRESSIVE HOUSE", "BIG ROOM"]
  },
  {
    id: "dj-allan",
    name: "DJ Allan",
    avatarUrl: "https://i.ibb.co/L8y2zLg/dj-allan.png",
    description: "Especialista em remixes de Flashback e clássicos.",
    driveLink: "https://drive.google.com/drive/folders/1TKTOWilEU5mynl_PBpgmXyHyChE_scy3",
    tags: ["FLASHBACK", "POP", "80S", "90S"]
  },
  {
    id: "dj-jeff",
    name: "DJ Jeff",
    avatarUrl: "https://i.ibb.co/d2xFRM7/dj-jeff.png",
    description: "Foco em Mashups, Bootlegs e remixes para open format.",
    driveLink: "https://drive.google.com/drive/folders/1vDMoixpnFWvQ6iYjUOLvcp_KpiDfu0py",
    tags: ["OPEN FORMAT", "MASHUP", "HIP-HOP"]
  },
  {
    id: "dj-mhark",
    name: "DJ Mhark",
    avatarUrl: "https://i.ibb.co/PNYJcK3/dj-mhark.png",
    description: "Os melhores remixes de Funk, Reggaeton e ritmos latinos.",
    driveLink: "https://drive.google.com/drive/folders/1ngRemU3g3idl76hTz2SmZlUyHeBCEZEW",
    tags: ["FUNK", "REGGAETON", "LATIN"]
  },
  {
    id: "james-hype",
    name: "James Hype",
    avatarUrl: "https://i.ibb.co/yQ3qFBH/james-hype.png",
    description: "Remixes energéticos de Tech House, Bass House e House.",
    driveLink: "https://drive.google.com/drive/folders/1K5NyfQWI5Aj1kGZJF1CGfPA-jAuLrg4-",
    tags: ["TECH HOUSE", "HOUSE", "BASS HOUSE"]
  },
  {
    id: "starjack",
    name: "Starjack",
    avatarUrl: "https://i.ibb.co/N2zSkGN/starjack.png",
    description: "Megapacks versáteis para casamentos e eventos.",
    driveLink: "https://drive.google.com/drive/folders/1Hi7ArIM1et3y3vyOO4bm2HkLyrFNWkCD",
    tags: ["WEDDING", "OPEN FORMAT", "HITS"]
  },
];

export default function DjsAcervoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const uniqueTags = useMemo(() => {
    const allTags = new Set(djsData.flatMap(dj => dj.tags));
    return Array.from(allTags).sort();
  }, []);

  const filteredDjs = useMemo(() => {
    let djs = djsData;
    if (selectedTag !== "all") {
      djs = djs.filter(dj => dj.tags.includes(selectedTag));
    }
    if (searchQuery.trim() !== "") {
      djs = djs.filter(dj => dj.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return djs;
  }, [searchQuery, selectedTag]);

  // CORREÇÃO 1: Usar um método de cópia mais compatível
  const handleCopyLink = (linkToCopy: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = linkToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        setCopiedLink(linkToCopy);
        setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
        console.error('Falha ao copiar texto: ', err);
    }
    document.body.removeChild(textArea);
  };

  const handleReportLink = (djName: string) => {
    const message = `Olá! O link para a pasta do DJ "${djName}" no Acervo de DJs parece estar quebrado.`;
    const whatsappUrl = `https://wa.me/5551935052274?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
            <Link href="/atualizacoes">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
            </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Acervo de DJs</h1>
      </div>

      {/* Banner da Página */}
      <div className="flex justify-center mb-6">
          <Image
              src="https://i.ibb.co/VvzKfrj/acervo-djs-banner.png"
              alt="Acervo de DJs"
              width={800}
              height={400}
              className="max-w-full h-auto rounded-lg"
          />
      </div>

      {/* Alerta de Experiência */}
      <div className="bg-pink-600/80 border border-pink-500/50 text-white p-4 rounded-lg flex items-center justify-center text-center space-x-3 text-sm">
        <Computer className="h-6 w-6 flex-shrink-0" />
        <p>
          Para uma melhor experiência, recomendamos usar o site em um
          <strong> computador</strong> ou com seu dispositivo na
          <strong> posição horizontal</strong>.
        </p>
      </div>

      {/* Alerta sobre Pesquisa no Drive */}
      <div className="bg-red-900/30 border border-red-600/30 text-red-200 p-4 rounded-lg text-center mb-6 space-y-3">
        <p className="text-sm text-justify">
          A pesquisa em nosso site permite encontrar <strong>DJs e packs</strong> de forma rápida. Para uma busca detalhada por <strong>músicas ou artistas específicos</strong> dentro das pastas, utilize a pesquisa avançada do Google Drive.
        </p>
        {/* CORREÇÃO 2: Separar Link do Button para evitar conflitos */}
        <Link href="/pesquisardrive" passHref>
          <Button className="bg-blue-600/80 hover:bg-blue-700/80 text-white">
              <HelpCircle className="mr-2 h-4 w-4" />
              COMO PESQUISAR NO GOOGLE DRIVE
          </Button>
        </Link>
      </div>

      {/* Seção de Filtro e Pesquisa */}
      <section>
        <div className="bg-black/50 border border-green-600/20 p-4 sm:p-6 rounded-lg space-y-6 mb-8">
            <div>
                <label htmlFor="search-input" className="flex items-center gap-2 mb-2 text-md font-semibold text-green-400 uppercase tracking-wider">
                    <Search className="h-5 w-5" />
                    Pesquisar DJ
                </label>
                <Input
                    id="search-input"
                    type="search"
                    placeholder="Digite o nome de um DJ..."
                    className="w-full p-3 bg-black/60 border-2 border-green-600/30 focus:border-green-500 focus:ring-green-500 text-white placeholder-gray-400 rounded-lg text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="filter-dropdown" className="flex items-center gap-2 mb-2 text-md font-semibold text-green-400 uppercase tracking-wider">
                    <Filter className="h-5 w-5" />
                    Filtrar por Estilo
                </label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button id="filter-dropdown" variant="outline" className="w-full justify-between p-3 text-base border-2 border-green-600/30 bg-black/60 hover:bg-black/80 hover:border-green-500">
                            <span>{selectedTag === "all" ? "Todos os Estilos" : selectedTag}</span>
                            <ChevronDown className="ml-2 h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-[300px] overflow-y-auto bg-[#0F0F10] border-green-600/30">
                        <DropdownMenuItem onClick={() => setSelectedTag("all")}>Todos os Estilos</DropdownMenuItem>
                        {uniqueTags.map((tag) => (
                        <DropdownMenuItem key={tag} onClick={() => setSelectedTag(tag)}>
                            {tag}
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div className="text-center my-8">
            <h3 className="text-3xl md:text-4xl font-bold uppercase flex items-center justify-center gap-3">
                <Music /> Packs Disponíveis
            </h3>
        </div>

        {/* Lista de DJs em Linhas */}
        <div className="space-y-4">
            {filteredDjs.length > 0 ? (
                filteredDjs.map((dj) => {
                    const isCopied = copiedLink === dj.driveLink;
                    return (
                        <div key={dj.id} className="flex flex-col sm:flex-row items-center sm:gap-2">
                            <Link href={dj.driveLink} target="_blank" rel="noopener noreferrer" className="flex-grow w-full">
                                <div className="bg-gradient-to-r from-black/80 to-black/60 hover:from-green-900/20 hover:to-black/70 p-4 rounded-md border border-green-600/20 hover:border-green-600/70 flex items-center gap-4 w-full">
                                    <Image src={dj.avatarUrl} alt={`Avatar de ${dj.name}`} width={40} height={40} className="rounded-full flex-shrink-0" />
                                    <div className="flex-1 text-left">
                                        <h4 className="font-bold text-lg uppercase">{dj.name}</h4>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleCopyLink(dj.driveLink)}
                                    className={`flex-shrink-0 border-2 ${isCopied ? 'border-blue-500 bg-blue-900/50' : 'border-blue-600/30 bg-black/40 hover:bg-blue-600/20'}`}
                                    title="Copiar link"
                                >
                                    {isCopied ? <Check className="h-4 w-4 text-blue-400" /> : <Copy className="h-4 w-4 text-blue-500" />}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleReportLink(dj.name)}
                                    className="flex-shrink-0 border-2 border-yellow-600/30 text-yellow-500 hover:bg-yellow-600/20 hover:text-yellow-400 bg-black/40"
                                    title="Reportar link quebrado"
                                >
                                    <AlertTriangle className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <Alert className="bg-yellow-900/20 border-yellow-600/30 text-yellow-200">
                    <AlertDescription>
                        Nenhum DJ encontrado para os filtros aplicados. Tente outros termos.
                    </AlertDescription>
                </Alert>
            )}
        </div>
      </section>

      {/* Footer Fixo */}
      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-green-600/30 p-4 z-20">
        <div className="container mx-auto flex justify-center items-center">
          <Link href="/atualizacoes" passHref>
              <Button variant="secondary" className="bg-green-600 hover:bg-green-700">
                  <Home className="h-5 w-5" />
              </Button>
          </Link>
        </div>
      </footer>
    </div>
  )
}
