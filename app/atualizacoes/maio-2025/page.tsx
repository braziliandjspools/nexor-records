"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Home, Search, Filter, ChevronDown, HelpCircle, Lock, Unlock, Copy, Check, AlertTriangle, Computer, Folder, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// --- ESTRUTURA DE DADOS ---
interface FolderItem {
  name: string
  link: string
  category: string
}

// --- DADOS PARA MAIO 2025 ---
const mayFolders: FolderItem[] = [
    { name: "AFRO HOUSE", link: "https://drive.google.com/open?id=1nKN0AG1E0knmaG4HRLuHEkI-ePtqA5Fn&usp=drive_copy", category: "AFRO HOUSE" },
    { name: "AFRO RHYTHMS, VOL. 01", link: "https://drive.google.com/open?id=1TvtxTKQZOmwUJWNdmePVYZZzd--S_VWm&usp=drive_copy", category: "AFRO HOUSE" },
    { name: "AMERICA REMIX", link: "https://drive.google.com/open?id=135ClSGXrMvGblqdSk2dt8FKPDZ7p9CNF&usp=drive_copy", category: "AMERICA REMIX" },
    { name: "BACK TO THE FUTURE", link: "https://drive.google.com/open?id=18gjRRE10ArtQuQ4IcJ1hQSJQJ1wN3uqv&usp=drive_copy", category: "BACK TO THE FUTURE" },
    { name: "BEACH RELAX HOME (TO GET LOST IN THE MUSIC)", link: "https://drive.google.com/open?id=122cjKyioAkIh-zF69eDWSZmA7X3dKGuv&usp=drive_copy", category: "HOUSE" },
    { name: "BEATFREAKZ", link: "https://drive.google.com/open?id=19byR9XQUnbx2Q3zTsPFUJYZ66GXQBuwW&usp=drive_copy", category: "BEATFREAKZ" },
    { name: "BEATPORT - NEW EXCLUSIVE MUSIC СOLLECTION APRIL 2025", link: "https://drive.google.com/open?id=1NIet6J9K-upwKYn-zd90QASDWMvMMqtV&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT HOUSE TRACKS", link: "https://drive.google.com/open?id=1MEp1AEx3nAtATlP0mvszX9XxIo449kVS&usp=drive_copy", category: "BEATPORT" },
    { name: "CLUB KILLERS [THROWBACK]", link: "https://drive.google.com/open?id=1d52nY9BYZ-_Nw4fGhKVGA2jv7MElx_oO&usp=drive_copy", category: "CLUB KILLERS" },
    { name: "CLUB ON FUNKY HITS PLAYERS", link: "https://drive.google.com/open?id=1FgdWqB9hvh1Rz6NhpkpiR3iSQQAe_MCZ&usp=drive_copy", category: "FUNK" },
    { name: "CONFIG Q-B! SOUND TOP 372", link: "https://drive.google.com/open?id=1aGm0puq0QSMlTEG-tUxnOrxgU3X0ynvN&usp=drive_copy", category: "CONFIG Q-B!" },
    { name: "CUBA REMIX", link: "https://drive.google.com/open?id=1kCcg8JvJeG4y9Yvwc3GhTm250rhinDe4&usp=drive_copy", category: "CUBA REMIX" },
    { name: "DISCO, POP, NEW WAVE, SYNTHPOP MUSIC OVERPASS", link: "https://drive.google.com/open?id=1X4901_3uK1hrYNZ0DBlmOA7lnJM3xT8_&usp=drive_copy", category: "DISCO" },
    { name: "DJ JÉSSICA PRODUÇÕES", link: "https://drive.google.com/open?id=10MoO14UDAOJHkp5eGqzj1Jy12WoOmVaF&usp=drive_copy", category: "DJ JÉSSICA" },
    { name: "FETENHITS - 80S (2025)", link: "https://drive.google.com/open?id=1qBlD7jQO7WK-Ben_Vos86H6N8yUbsN8e&usp=drive_copy", category: "80S" },
    { name: "FUNK", link: "https://drive.google.com/open?id=1i8EH2PDUcCuaK09W2NwYwBFY52RXjNrG&usp=drive_copy", category: "FUNK" },
    { name: "FUNK LIGHT", link: "https://drive.google.com/open?id=1tjDHrP3_HFm3aJbj3pcmnE6ZoFmUFYaq&usp=drive_copy", category: "FUNK" },
    { name: "FUTURE SOUND OF EGYPT - SPRING 2025", link: "https://drive.google.com/open?id=1zhC-RIU4j2rtQ6SSVHznkFB6nT4OTtZc&usp=drive_copy", category: "FUTURE SOUND" },
    { name: "JUST PLAY", link: "https://drive.google.com/open?id=1Dcpy23-S-YuXPgj5ZLE2bQGXUGookSXj&usp=drive_copy", category: "JUST PLAY" },
    { name: "LATIN THROWBACK", link: "https://drive.google.com/open?id=1EHDbM6slcLepVP7X-D2PtsNOcsR0WR-N&usp=drive_copy", category: "LATIN" },
    { name: "MASTERMIX MICHAEL GRAY REMIXES VOL. 1 EXTENDED", link: "https://drive.google.com/open?id=1fHFHWfngMUXjqTqNi59ZqtO49PYWRzdt&usp=drive_copy", category: "MASTERMIX" },
    { name: "MIXINIT - STARJACK DISCO HOUSE HITS VOL. 4", link: "https://drive.google.com/open?id=1lxPKAltht8oYOC-sTKt2IXoYD6mAE9Tf&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT COLLINI CLUB HOUSE VOL. 16", link: "https://drive.google.com/open?id=13lo1eom2R57za2JIwfgbJNfGHecTViX3&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT THE GOODFELLAS 4TH QUARTER BANGERS VOL. 2", link: "https://drive.google.com/open?id=1L4_pD_kh6OCXqxgYk2U7Cuf9vy3tR7xI&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT THE GOODFELLAS 4TH QUARTER BANGERS VOL. 3", link: "https://drive.google.com/open?id=15gfnJlTdBiU9p13qZwylkvYGpRZxJwcN&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT THE GOODFELLAS 4TH QUARTER BANGERS VOL. 4", link: "https://drive.google.com/open?id=1jJEfUbL7LAPCPbhtuxEQ4HCBCUia_RTd&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT THE GOODFELLAS WORDPLAY EDITS VOL. 10", link: "https://drive.google.com/open?id=17UNVSyhpKALMY09tS7htl7mBBkNGza5S&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT TJ THE DJ 4 MINUTE THROWBACKS PACK VOL. 1", link: "https://drive.google.com/open?id=1EIsWfbvZKiPUzCn_roTKdognUfjmDg8-&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT TJ THE DJ URBAN THROWBACKS [2005] VOL. 1", link: "https://drive.google.com/open?id=1icBFn4U8YlljbeZT3DDp9f27rhlnKXLU&usp=drive_copy", category: "MIXINIT" },
    { name: "NOVIDADES DA SEMANA", link: "https://drive.google.com/open?id=1rpSK7XNVtRlN0xwLdlGAoR3ZnKDfgT23&usp=drive_copy", category: "NOVIDADES" },
    { name: "PRO LATIN REMIXES", link: "https://drive.google.com/open?id=18GTLb9Y7OU7kNcS11zFTrpH7yhJE1sbC&usp=drive_copy", category: "PRO LATIN" },
    { name: "R&B", link: "https://drive.google.com/open?id=1JvRKw2wkW4sTb4Ciigvo6aF58LGU8gsj&usp=drive_copy", category: "R&B" },
    { name: "SERTANEJO", link: "https://drive.google.com/open?id=1BWlaBWb8j2_JqBWk7pn3xudfrUUW0ewW&usp=drive_copy", category: "SERTANEJO" },
    { name: "SICKMIX - 80S NEW WAVE ACAPELLA OUT", link: "https://drive.google.com/open?id=1YkLnpt-0fLCABIlCtNg00xVgBXZv6ab_&usp=drive_copy", category: "SICKMIX" },
    { name: "SICKMIX - FUNK", link: "https://drive.google.com/open?id=1LyJcaigNkFMy01F1ab8jAowbT2KkuYWj&usp=drive_copy", category: "SICKMIX" },
    { name: "THE MASHUP", link: "https://drive.google.com/open?id=17aXfMa-EEa1AkVdJ71Ontc_r70nbLUBF&usp=drive_copy", category: "THE MASHUP" },
    { name: "TOMORROWLAND PACK", link: "https://drive.google.com/open?id=1VAiSWIZAoLyWmdt-v9bPNUA-oND02UK9&usp=drive_copy", category: "TOMORROWLAND" },
    { name: "TRAXSOURCE DJS CHOICE MELODIC HOUSE & TECHNO", link: "https://drive.google.com/open?id=1Di_ZoM6Wjoig-fYTbvWGtmuyvmlLtg1M&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE PROGRESSIVE HOUSE", link: "https://drive.google.com/open?id=1LJ9bvB2zHil0-OC25EDF-qLn7MQuJjAW&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "UGEEZY EDITS - R&B UGEEZY EDITS (DJ INTROS)", link: "https://drive.google.com/open?id=1hHLUP_88Rzlpg8NSQLS_6VLyX6iiI9CV&usp=drive_copy", category: "UGEEZY EDITS" },
    { name: "WEST COST HIP HOP & R&B", link: "https://drive.google.com/open?id=1l39Yp9h4qPflB7dhc5t53HRnGv6rUNrK&usp=drive_copy", category: "HIP HOP" },
];

// Dados de configuração para o mês de Maio
const mayMonthData = {
  name: 'Maio 2025',
  folders: mayFolders,
  imageBanner: "https://i.ibb.co/Sp7JzxL/maio2025.png",
  prevMonth: { name: "Abril 2025", slug: "abril-2025" },
  nextMonth: { name: "Junho 2025", slug: "junho-2025" },
};


export default function Maio2025Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(mayMonthData.folders.map((folder) => folder.category))).sort();
  }, []);

  const filteredFolders = useMemo(() => {
    let folders = mayMonthData.folders;
    if (selectedCategory !== "all") {
        folders = folders.filter(folder => folder.category === selectedCategory);
    }
    if (searchQuery.trim() !== "") {
        folders = folders.filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return folders;
  }, [searchQuery, selectedCategory]);

  const [loadingState, setLoadingState] = useState<{ id: string; state: string } | null>(null)
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

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

  const handleCopyLink = (linkToCopy: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = linkToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        setCopiedLink(linkToCopy);
        setTimeout(() => setCopiedLink(null), 2000); // Reset after 2 seconds
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  const handleReportLink = (folderName: string) => {
    const message = `Olá! O link para a pasta "${folderName}" de Maio de 2025 parece estar quebrado.`;
    const whatsappUrl = `https://wa.me/5551935052274?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Adiciona a fonte Dosis ao documento */}
      <style>
          {`
              @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap');
          `}
      </style>
      
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
            <Link href="/atualizacoes">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
            </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">{mayMonthData.name}</h1>
      </div>

      <div className="flex justify-center mb-6">
          <Image
              src={mayMonthData.imageBanner}
              alt={mayMonthData.name}
              width={800}
              height={400}
              className="max-w-full h-auto rounded-lg"
          />
      </div>

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

      <section>
        <div className="bg-black/50 border border-green-600/20 p-4 sm:p-6 rounded-lg space-y-6 mb-8">
            <div>
                <label htmlFor="search-input" className="flex items-center gap-2 mb-2 text-md font-semibold text-green-400 uppercase tracking-wider">
                    <Search className="h-5 w-5" />
                    Pesquisar Estilos
                </label>
                <Input
                    id="search-input"
                    type="search"
                    placeholder="Digite o nome de um estilo..."
                    className="w-full p-3 bg-black/60 border-2 border-green-600/30 focus:border-green-500 focus:ring-green-500 text-white placeholder-gray-400 rounded-lg text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="filter-dropdown" className="flex items-center gap-2 mb-2 text-md font-semibold text-green-400 uppercase tracking-wider">
                    <Filter className="h-5 w-5" />
                    Filtrar por Categoria
                </label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button id="filter-dropdown" variant="outline" className="w-full justify-between p-3 text-base border-2 border-green-600/30 bg-black/60 hover:bg-black/80 hover:border-green-500">
                            <span>{selectedCategory === "all" ? "Todas as categorias" : selectedCategory}</span>
                            <ChevronDown className="ml-2 h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-[300px] overflow-y-auto bg-[#0F0F10] border-green-600/30">
                        <DropdownMenuItem onClick={() => setSelectedCategory("all")}>Todas as categorias</DropdownMenuItem>
                        {uniqueCategories.map((category) => (
                        <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                            {category}
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div className="text-center my-8">
            <h3 className="text-3xl md:text-4xl font-bold uppercase">Pastas de {mayMonthData.name}</h3>
        </div>

        <div className="space-y-4">
            {filteredFolders.length > 0 ? (
                filteredFolders.map((folder, idx) => {
                    const buttonId = `${folder.name}-${idx}`;
                    const isOpening = loadingState && loadingState.id === buttonId;
                    const isCopied = copiedLink === folder.link;

                    return (
                        <div key={idx} className="flex flex-col sm:flex-row items-center sm:gap-2">
                            <div className="relative flex-grow w-full">
                                <button
                                    onClick={() => handleOpenLink(buttonId, folder.link)}
                                    className="bg-gradient-to-r from-black/80 to-black/60 hover:from-green-900/20 hover:to-black/70 transition-all duration-300 p-4 rounded-md border border-green-600/20 hover:border-green-600/70 flex items-center gap-3 w-full group"
                                >
                                    <Image src="https://i.ibb.co/dwTBqG5z/pngwing-com.png" alt="Folder" width={20} height={20} className="flex-shrink-0" />
                                    <span 
                                        className="flex-1 text-center"
                                        style={{ fontFamily: 'Dosis, sans-serif', fontWeight: 300, fontSize: '15px' }}
                                    >
                                        {folder.name}
                                    </span>
                                    {isOpening ? (
                                        <Unlock className="h-4 w-4 text-green-400 animate-pulse" />
                                    ) : (
                                        <Lock className="h-4 w-4 text-gray-400 group-hover:text-green-400 transition-colors" />
                                    )}
                                </button>
                                {isOpening && (
                                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-md z-10 pointer-events-none">
                                        <div className="text-center">
                                            <div className="animate-pulse text-green-500 font-bold">{loadingState?.state}</div>
                                            <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                                                <div className="bg-green-500 h-full rounded-full animate-loader"></div>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleCopyLink(folder.link)}
                                    className={`flex-shrink-0 border-green-600/30 hover:bg-green-600/20 ${isCopied ? 'bg-green-600/30' : 'bg-black/40'}`}
                                    title="Copiar link"
                                >
                                    {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleReportLink(folder.name)}
                                    className="flex-shrink-0 border-yellow-600/30 text-yellow-500 hover:bg-yellow-600/20 hover:text-yellow-400 bg-black/40"
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
                        Nenhum resultado encontrado para os filtros aplicados. Tente outros termos ou remova os filtros.
                    </AlertDescription>
                </Alert>
            )}
        </div>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="https://drive.google.com/drive/folders/1ujmHz5aCwEbDywebFlceY0gtLjhgSyev?usp=drive_link" target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    BAIXAR PASTA COMPLETA
                </Button>
            </Link>
            <Link href="https://djjessica.vercel.app/servicos/musicas-eletronicas" target="_blank" rel="noopener noreferrer">
                <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    SEM ACESSO? ASSINE
                </Button>
            </Link>
        </div>

      </section>

      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-green-600/30 p-4 z-20">
        <div className="container mx-auto flex justify-center items-center gap-2 sm:gap-4">
            {mayMonthData.prevMonth ? (
                <Link href={`/atualizacoes/${mayMonthData.prevMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {mayMonthData.prevMonth.name}
                    </Button>
                </Link>
            ) : (
                <Button variant="outline" className="border-gray-600/50" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                </Button>
            )}
            <Link href="/atualizacoes" passHref>
                <Button variant="secondary" className="bg-green-600 hover:bg-green-700">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
            {mayMonthData.nextMonth ? (
                <Link href={`/atualizacoes/${mayMonthData.nextMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        {mayMonthData.nextMonth.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            ) : (
                 <Button variant="outline" className="border-gray-600/50" disabled>
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
        </div>
      </footer>
    </div>
  )
}
