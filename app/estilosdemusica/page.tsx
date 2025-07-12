"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
// Ícone ShieldAlert removido da importação
import { ArrowLeft, Search, Filter, ChevronDown, Music, Info, Folder, Lock, ShieldCheck } from "lucide-react" 
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Definindo a interface para os itens
interface FolderItem {
  name: string
  link: string
  category: string
}

// Lista de pastas.
const allMusicStyles: FolderItem[] = [
    {
        name: "AXÉ ANTIGO",
        link: "https://drive.google.com/drive/folders/1nibKoCtlzJE-UFbwSvoD166x1oen_150?usp=drive_link",
        category: "AXÉ",
    },
    {
        name: "AXÉ 2025",
        link: "https://drive.google.com/drive/folders/11-Rbvo0rT6Ya1aBOFAA4CUyvHtKdnUcj?usp=drive_link",
        category: "AXÉ",
    },
    // ... resto das suas pastas
];

export default function EstilosDeMusica() {
  const [expandedStyle, setExpandedStyle] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loadingState, setLoadingState] = useState<{ id: string; state: string } | null>(null)
  const [searchResults, setSearchResults] = useState<FolderItem[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const uniqueStyles = useMemo(() => {
    return Array.from(new Set(allMusicStyles.map((folder) => folder.category)))
      .sort()
      .map((category) => ({
        id: category,
        name: category,
      }))
  }, [])
  
  const handleOpenLink = (id: string, link: string) => {
    setLoadingState({ id, state: "CONSULTANDO GOOGLE DRIVE" })
    setTimeout(() => {
      setLoadingState({ id, state: "LINK ENCONTRADO" })
      setTimeout(() => {
        window.open(link, "_blank")
        setLoadingState(null)
      }, 1000)
    }, 2000)
  }

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setIsSearching(true)
      const results = allMusicStyles.filter(
        (folder) =>
          folder.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedCategory === "all" || folder.category === selectedCategory)
      )
      setSearchResults(results)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }, [searchQuery, selectedCategory])
  
  useEffect(() => {
      if (selectedCategory !== "all") {
          setExpandedStyle(selectedCategory);
      }
  }, [selectedCategory]);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-yellow-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">ESTILOS DISPONÍVEIS</h1>
      </div>

      <section>
        <div className="relative mb-6 group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
          </div>
          <Input
            type="search"
            placeholder="Pesquisar em todos os estilos..."
            className="pl-10 bg-black/40 border-yellow-600/30 focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder-gray-400 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-xs text-gray-400">
              {isSearching ? searchResults.length : allMusicStyles.length} pastas
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-300">Filtrar por estilo:</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between border-yellow-600/30 bg-black/40">
                {selectedCategory === "all" ? "Todos os estilos" : selectedCategory}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-h-[300px] overflow-y-auto bg-[#0F0F10] border-yellow-600/30">
              <DropdownMenuItem
                className={`cursor-pointer ${selectedCategory === "all" ? "bg-yellow-600/20" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                Todos os estilos
              </DropdownMenuItem>
              {uniqueStyles.map((style) => (
                <DropdownMenuItem
                  key={style.id}
                  className={`cursor-pointer ${selectedCategory === style.id ? "bg-yellow-600/20" : ""}`}
                  onClick={() => setSelectedCategory(style.id)}
                >
                  {style.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Alert className="mb-6 bg-blue-900/30 border-blue-600/30 text-blue-200">
            <Info className="h-5 w-5 text-blue-400" />
            <AlertTitle className="font-bold text-white">ATENÇÃO: SOBRE MÚSICAS REPETIDAS</AlertTitle>
            <AlertDescription className="text-blue-200">
                Pode ocorrer que pastas diferentes contenham a mesma música. Isso acontece devido a vários fatores, como diferentes versões (remix, ao vivo) ou atualizações de pacotes, e as faixas repetidas acabam se misturando.
            </AlertDescription>
        </Alert>

        <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg space-y-4 mb-6">
            <Alert variant="destructive" className="bg-transparent border-0 text-red-300 p-0 text-center">
                {/* ÍCONE REMOVIDO DAQUI */}
                <AlertTitle className="font-bold text-white text-lg">ACESSO SOMENTE PARA VIPs</AlertTitle>
                <AlertDescription className="text-red-300 mt-1">
                O conteúdo destas pastas está disponível apenas para assinantes do Plano VIP.
                </AlertDescription>
            </Alert>
            <div className="text-center">
                <a href="https://djjessica.vercel.app/servicos/musicas-eletronicas" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold transition-all hover:scale-105">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        ASSINAR PLANO VIP
                    </Button>
                </a>
            </div>
        </div>

        {isSearching && (
          <Card className="border-yellow-600/30 bg-black/50 backdrop-blur-sm mb-6">
            {/* ...código dos resultados da pesquisa... */}
          </Card>
        )}

        <div className="flex flex-col space-y-4">
          <Accordion type="single" collapsible className="w-full" value={expandedStyle} onValueChange={setExpandedStyle}>
            {uniqueStyles.map(style => {
              const itemsInStyle = allMusicStyles.filter(item => item.category === style.id);
              if (selectedCategory !== 'all' && selectedCategory !== style.id) return null;

              return (
              <AccordionItem key={style.id} value={style.id} className="border-yellow-600/30">
                <AccordionTrigger>
                  <div className="flex items-center justify-between w-full">
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-lg h-16 w-full justify-between shadow-md uppercase"
                    >
                      <span className="flex items-center">
                        <Music className="mr-2" size={20} />
                        {style.name}
                      </span>
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  {style.id === "AXÉ" && (
                    <div className="bg-black/30 border border-yellow-600/30 text-gray-300 p-4 rounded-lg text-center mb-4">
                        <h3 className="font-bold text-xl mb-2 text-yellow-400">SOBRE O AXÉ</h3>
                        <p className="text-sm text-justify">
                            O Axé é um gênero musical que surgiu no estado da Bahia na década de 1980, durante as manifestações populares do Carnaval de Salvador. Ele mistura ritmos afro-brasileiros como o ijexá com o frevo, reggae, merengue e pop. Caracterizado por sua energia contagiante, é a trilha sonora dos trios elétricos e das maiores festas do Brasil.
                        </p>
                    </div>
                  )}
                  <Card className="border-yellow-600/30 bg-black/50 backdrop-blur-sm">
                    <CardHeader className="pb-2 pt-4">
                      <h3 className="text-xl font-semibold text-white text-center uppercase">
                        Pastas de {style.name}
                      </h3>
                    </CardHeader>
                    <CardContent>
                       <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2">
                        {itemsInStyle.map((folder, index) => (
                          <div key={`${style.id}-${index}`} className="relative">
                            <button
                              onClick={() => handleOpenLink(`${style.id}-${index}`, folder.link)}
                              className="bg-zinc-800 hover:bg-zinc-700/80 transition-all duration-300 p-4 rounded-md border border-zinc-700 hover:border-yellow-600/70 flex items-center gap-3 w-full group"
                            >
                                <Folder className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                                <span className="text-white text-sm font-bold truncate flex-1 text-center">{folder.name}</span>
                                <Lock className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            )})}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
