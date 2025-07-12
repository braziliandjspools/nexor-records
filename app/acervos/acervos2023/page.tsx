"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Home, Search, Filter, ChevronDown, HelpCircle, Lock, Unlock, Copy, Check, AlertTriangle, Computer, Folder, DollarSign, KeyRound, Globe, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// --- ESTRUTURA DE DADOS ---
interface FolderItem {
  name: string
  link: string
  category: string
  isNew?: boolean
}

// --- DADOS PARA ACERVOS 2023 ---
const acervoFolders: FolderItem[] = [
    // 10 Novos estilos adicionados
    { name: "KUTS PACK", link: "https://drive.google.com/drive/folders/1jL7Q2ECGyJLSLSp4Xvw0bhOVaKm9rBMO?usp=drive_link", category: "KUTS PACK" },
    { name: "LASH HOUSE MIX", link: "https://drive.google.com/drive/folders/1PpQOzgMKkc0nWiPBRIou_SepBS22ucWJ?usp=drive_link", category: "LASH HOUSE MIX" },
    { name: "LASHBACK", link: "https://drive.google.com/drive/folders/1iyNwGsIrR96WMBR2QZgYIi-5Vn5EGP0S?usp=drive_link", category: "LASHBACK" },
    { name: "LATE NIGHT RECORD POOL", link: "https://drive.google.com/drive/folders/1jLJ1XscNkarlAqoWFM9BkltIjRyi4cOE?usp=drive_link", category: "LATE NIGHT RECORD POOL" },
    { name: "LATIN BOX", link: "https://drive.google.com/drive/folders/1tyQxDgucjDCibvy7-uvk3tIEh_N2cyeo?usp=drive_link", category: "LATIN BOX" },
    { name: "LATIN LAB MUSIC", link: "https://drive.google.com/drive/folders/1c8uDwkE015k9GF6uVQ7MLDz-3MDVvOfX?usp=drive_link", category: "LATIN LAB MUSIC" },
    { name: "LATIN REMIXES", link: "https://drive.google.com/drive/folders/1jL_MR3OEl92vixVcOZP0noq4kygOV5O8?usp=drive_link", category: "LATIN REMIXES" },
    { name: "LATIN THROWBACK", link: "https://drive.google.com/drive/folders/1jScb4JggeC_NmYfOD81DuB_wDUww25OD?usp=drive_link", category: "LATIN THROWBACK" },
    { name: "LIVE DJ SERVICE", link: "https://drive.google.com/drive/folders/1jTgOCf0XUE1pNbGfnqSzGyxaL8zoq3iA?usp=drive_link", category: "LIVE DJ SERVICE" },
    { name: "MADE IN BRAZIL", link: "https://drive.google.com/drive/folders/1UxU3U6XyXhDv9A0ZB_AzxO9JP4jfp0D8?usp=drive_link", category: "MADE IN BRAZIL" },

    // Estilos já existentes
    { name: "ELETROFUNK", link: "https://drive.google.com/drive/folders/1It66CNAjX8BX1wKoGohunkqwfZ52Mr-l?usp=drive_link", category: "ELETROFUNK" },
    { name: "ESTA EM GERAL (MIX)", link: "https://drive.google.com/drive/folders/1xVRRz5flhN3yaVygpmn53SnjknXHx41L?usp=drive_link", category: "ESTA EM GERAL (MIX)" },
    { name: "EURODANCE", link: "https://drive.google.com/drive/folders/1iu_H6L6WMnohRGTsHBF_sXNOQ3a8ukTw?usp=drive_link", category: "EURODANCE" },
    { name: "EURODISCO", link: "https://drive.google.com/drive/folders/1GaGJYFAlu5gEzXmQZ8az4z-VLMcd5_AA?usp=drive_link", category: "EURODISCO" },
    { name: "EUROPA REMIX", link: "https://drive.google.com/drive/folders/1eW6musRoLdC0gHM-65TClrwbvonFTSS8?usp=drive_link", category: "EUROPA REMIX" },
    { name: "EXCLUSIVE REMIXES", link: "https://drive.google.com/drive/folders/1quo_HOywQhX72RyE9cHUXLQE3t0wL5P7?usp=drive_link", category: "EXCLUSIVE REMIXES" },
    { name: "EXTENDEDS", link: "https://drive.google.com/drive/folders/1ivEr837C4w8GlhEuLotT_hgym0_KUS5c?usp=drive_link", category: "EXTENDEDS" },
    { name: "FUNK RAVE", link: "https://drive.google.com/drive/folders/1EW7THqxLFHWzI2UPXfu8udg29YgSJWnD?usp=drive_link", category: "FUNK RAVE" },
    { name: "FUNK REMIX", link: "https://drive.google.com/drive/folders/1GCYhp7Tn05exP_74HdakQukgNLAwI1k_?usp=drive_link", category: "FUNK REMIX" },
    { name: "FUNK TIKTOK", link: "https://drive.google.com/drive/folders/1PhOQk_KyMptYgAAGIwevwZsLhLnftN4X?usp=drive_link", category: "FUNK TIKTOK" },
    { name: "CLUB DANCE", link: "https://drive.google.com/open?id=1itu_psBbLoRi5fmzc2leglMQ5Th5b-Za", category: "CLUB DANCE" },
    { name: "DESANDE HOUSE", link: "https://drive.google.com/open?id=1Zq1fz9HHHjuwEXnrvSGbUJ5JAoB4unoW", category: "DESANDE HOUSE" },
    { name: "DJ MHARK REMIX PACK", link: "https://drive.google.com/open?id=1TJxyqvgemoQ_B0N_CRtC4kmGqSw0RENU", category: "DJ MHARK REMIX PACK" },
    { name: "DJ NASA REMIX PACK", link: "https://drive.google.com/open?id=1TK4z4ogh46AKn41b0fIjmZtROTVIWCTG", category: "DJ NASA REMIX PACK" },
    { name: "DJ PROMOS EXPRESS", link: "https://drive.google.com/open?id=1TNxCAvq5SS6SClrcmSf19bwc1d58XUhA", category: "DJ PROMOS EXPRESS" },
    { name: "DJ RAGOZA - 90'S & 2000'S", link: "https://drive.google.com/open?id=1TUetPLmXQI26-n9g71HJgBQRbrAMK0QG", category: "DJ RAGOZA - 90'S & 2000'S" },
    { name: "DJS CHART", link: "https://drive.google.com/open?id=13ps5MtfxEYON-TuY0N50rhsjfmKaQ6Pe", category: "DJS CHART" },
    { name: "DMC COMMERCIAL COLLECTION VOL. 490", link: "https://drive.google.com/open?id=1qeXAFvP_SGfgucVUnLIXCV5MamYyfL9K", category: "DMC COMMERCIAL COLLECTION VOL. 490" },
    { name: "EDM", link: "https://drive.google.com/open?id=1aACJUtwwI1b1KsFVZZW8IwZHOU3lRTtI", category: "EDM" },
    { name: "ELECTRO HOUSE", link: "https://drive.google.com/open?id=1yetSiLQ6O0N8k3Wt1UXPyK-rqYPToqic", category: "ELECTRO HOUSE" },
];

// Dados de configuração para a página
const acervo2023Data = {
  name: 'Acervos 2023',
  folders: acervoFolders,
  imageBanner: "https://i.ibb.co/1YZp04sZ/acervos2023.png",
  prevAcervo: null,
  nextAcervo: null,
};


export default function Acervos2023Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [visibleCount, setVisibleCount] = useState(50);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(acervoFolders.map(folder => folder.category));
    return Array.from(categories).sort();
  }, []);

  const filteredFolders = useMemo(() => {
    let folders = acervoFolders;

    if (selectedCategory !== "all") {
      folders = folders.filter(folder => folder.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
        folders = folders.filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return folders;
  }, [searchQuery, selectedCategory]);

  const displayedFolders = useMemo(() => {
    return filteredFolders.slice(0, visibleCount);
  }, [filteredFolders, visibleCount]);

  useEffect(() => {
    setVisibleCount(50);
  }, [searchQuery, selectedCategory]);

  const [loadingState, setLoadingState] = useState<{ id: string; state: string } | null>(null)
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

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

  const handleCopy = (textToCopy: string, type: 'link' | 'pix') => {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        if (type === 'link') {
            setCopiedLink(textToCopy);
            setTimeout(() => setCopiedLink(null), 2000);
        } else if (type === 'pix') {
            setCopiedPix(true);
            setTimeout(() => setCopiedPix(false), 2000);
        }
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  const handleReportLink = (folderName: string) => {
    const message = `Olá! O link para a pasta "${folderName}" do acervo de 2023 parece estar quebrado.`;
    const whatsappUrl = `https://wa.me/5551935052274?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 50);
  };

  const pixKey = "51935052274";

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
            <Link href="/acervos">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
            </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">{acervo2023Data.name}</h1>
      </div>

      <div className="flex justify-center mb-6">
          <Image
              src={acervo2023Data.imageBanner}
              alt={acervo2023Data.name}
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

      <div className="text-gray-300 space-y-4">
        <p className="text-justify">
            Aqui se encontram os acervos de 2023 que tinham sido disponibilizados para os usuários naquele ano. Talvez tenha pouco conteúdo porque nosso plano VIP começou nessa época. Os arquivos desta página são de acesso gratuito e downloads ilimitados, mas recomendamos que todos que baixarem material aqui façam um Pix de qualquer valor para incentivar os administradores a adicionarem mais conteúdo grátis.
        </p>
        <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-grow w-full">
                    <Input
                        type="text"
                        readOnly
                        value={pixKey}
                        className="w-full bg-gray-800 border-gray-600 text-white pr-12"
                    />
                    <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <Button onClick={() => handleCopy(pixKey, 'pix')} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    {copiedPix ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copiedPix ? 'Copiado!' : 'Copiar Chave PIX Celular'}
                </Button>
            </div>
            <div className="text-xs text-gray-400 text-center sm:text-left">
                <p><strong>Titular:</strong> Ederson Leonardo Siebeneichler</p>
                <p><strong>Banco:</strong> Caixa Econômica Federal</p>
            </div>
        </div>
      </div>

      <section>
        <div className="bg-black/50 border border-green-600/20 p-4 sm:p-6 rounded-lg space-y-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
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
        </div>

        {/* Aviso de novos estilos */}
        <div className="bg-red-600/90 border border-red-500/50 text-white p-4 rounded-lg flex items-center justify-center text-center space-x-3 text-sm my-8">
            <AlertTriangle className="h-6 w-6 flex-shrink-0" />
            <p className="font-semibold">Serão adicionados em média 10 novos estilos por dia. Fique de olho!</p>
        </div>

        <div className="text-center my-8">
            <h3 className="text-3xl md:text-4xl font-bold uppercase">ACERVOS 2023</h3>
        </div>

        <div className="space-y-4">
            {displayedFolders.length > 0 ? (
                displayedFolders.map((folder, idx) => {
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
                                    <Folder className="h-5 w-5 text-green-400 flex-shrink-0" />
                                    <span
                                        className="flex-1 text-center"
                                        style={{ fontFamily: 'Dosis, sans-serif', fontWeight: 300, fontSize: '15px' }}
                                    >
                                        {folder.name}
                                    </span>
                                    {isOpening ? (
                                        <Unlock className="h-4 w-4 text-green-400 animate-pulse ml-auto" />
                                    ) : (
                                        <div className="w-4 h-4 ml-auto" /> // Placeholder to keep alignment
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
                                    onClick={() => handleCopy(folder.link, 'link')}
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

        {visibleCount < filteredFolders.length && (
            <div className="mt-8 flex justify-center">
                <Button onClick={handleLoadMore} variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    CARREGAR MAIS
                </Button>
            </div>
        )}

      </section>

      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-green-600/30 p-4 z-20">
        <div className="container mx-auto flex justify-center items-center gap-2 sm:gap-4">
            {acervo2023Data.prevAcervo ? (
                <Link href={`/acervos/${acervo2023Data.prevAcervo.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {acervo2023Data.prevAcervo.name}
                    </Button>
                </Link>
            ) : (
                <Button variant="outline" className="border-gray-600/50" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                </Button>
            )}
            <Link href="/acervos" passHref>
                <Button variant="secondary" className="bg-green-600 hover:bg-green-700">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
            {acervo2023Data.nextAcervo ? (
                <Link href={`/acervos/${acervo2023Data.nextAcervo.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        {acervo2023Data.nextAcervo.name}
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
