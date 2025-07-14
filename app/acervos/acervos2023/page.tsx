"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
// CORREÇÃO: Ícone ArrowRight adicionado à lista
import { ArrowLeft, ArrowRight, Home, Search, Filter, ChevronDown, HelpCircle, Unlock, Copy, Check, AlertTriangle, Computer, Folder, KeyRound, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// --- ESTRUTURA DOS DADOS QUE VÊM DO BANCO ---
interface AcervoItem {
  id: number;
  name: string;
  link: string;
  category: string;
}

// --- DADOS ESTÁTICOS DA PÁGINA (TÍTULO, BANNER, ETC.) ---
const acervo2023Data = {
  name: 'Acervos 2023',
  imageBanner: "https://i.ibb.co/1YZp04sZ/acervos2023.png",
  prevAcervo: null,
  nextAcervo: null,
};


export default function Acervos2023Page() {
  // ESTADOS PARA OS DADOS DINÂMICOS
  const [acervoItems, setAcervoItems] = useState<AcervoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ESTADOS PARA INTERAÇÃO
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(50);
  const [loadingState, setLoadingState] = useState<{ id: string; state: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  // EFEITO PARA BUSCAR DADOS DA API QUANDO A PÁGINA CARREGA
  useEffect(() => {
    const fetchAcervoItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/get-acervo-items?slug=acervos2023');
        if (!response.ok) throw new Error('Falha ao buscar dados do acervo');
        const data = await response.json();
        setAcervoItems(data);
      } catch (error) {
        console.error("Falha ao buscar itens do acervo:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcervoItems();
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(acervoItems.map(item => item.category));
    return ["all", ...Array.from(categories).sort()];
  }, [acervoItems]);

  const filteredFolders = useMemo(() => {
    let items = acervoItems;
    if (selectedCategory !== "all") {
      items = items.filter(item => item.category === selectedCategory);
    }
    if (searchQuery.trim() !== "") {
      items = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return items;
  }, [acervoItems, searchQuery, selectedCategory]);

  const displayedFolders = useMemo(() => {
    return filteredFolders.slice(0, visibleCount);
  }, [filteredFolders, visibleCount]);

  useEffect(() => {
    setVisibleCount(50);
  }, [searchQuery, selectedCategory]);

  const handleOpenLink = (id: number, link: string) => {
    const loadingId = `item-${id}`;
    setLoadingState({ id: loadingId, state: "CONSULTANDO GOOGLE DRIVE" });
    setTimeout(() => {
      setLoadingState({ id: loadingId, state: "LINK ENCONTRADO" });
      setTimeout(() => {
        window.open(link, "_blank");
        setLoadingState(null);
      }, 1000);
    }, 2000);
  };

  const handleCopy = (textToCopy: string, type: 'link' | 'pix') => {
    navigator.clipboard.writeText(textToCopy).then(() => {
        if (type === 'link') {
            setCopiedLink(textToCopy);
            setTimeout(() => setCopiedLink(null), 2000);
        } else {
            setCopiedPix(true);
            setTimeout(() => setCopiedPix(false), 2000);
        }
    });
  };

  const handleReportLink = (folderName: string) => {
    const message = `Olá! O link para a pasta "${folderName}" do acervo de 2023 parece estar quebrado.`;
    const whatsappUrl = `https://wa.me/5551935052274?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const pixKey = "51935052274";

  return (
    <div className="space-y-8 pb-24">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap');`}</style>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
            <Link href="/acervos"><ArrowLeft className="h-4 w-4" /><span className="sr-only">Voltar</span></Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">{acervo2023Data.name}</h1>
      </div>
      <div className="flex justify-center mb-6">
          <Image src={acervo2023Data.imageBanner} alt={acervo2023Data.name} width={800} height={400} className="max-w-full h-auto rounded-lg"/>
      </div>
      <div className="bg-pink-600/80 border border-pink-500/50 text-white p-4 rounded-lg flex items-center justify-center text-center space-x-3 text-sm">
        <Computer className="h-6 w-6 flex-shrink-0" />
        <p>Para uma melhor experiência, recomendamos usar o site em um <strong>computador</strong> ou na <strong>posição horizontal</strong>.</p>
      </div>
      <div className="bg-red-900/30 border border-red-600/30 text-red-200 p-4 rounded-lg text-center mb-6 space-y-3">
        <p className="text-sm text-justify">A pesquisa em nosso site permite encontrar <strong>estilos musicais (pastas)</strong>. Para buscar <strong>músicas ou artistas específicos</strong>, use a pesquisa avançada do Google Drive.</p>
        <Button asChild className="bg-blue-600/80 hover:bg-blue-700/80 text-white">
            <Link href="/pesquisardrive"><HelpCircle className="mr-2 h-4 w-4" />COMO PESQUISAR NO GOOGLE DRIVE</Link>
        </Button>
      </div>
      <div className="text-gray-300 space-y-4">
        <p className="text-justify">Aqui se encontram os acervos de 2023 que tinham sido disponibilizados para os usuários naquele ano. Talvez tenha pouco conteúdo porque nosso plano VIP começou nessa época. Os arquivos desta página são de acesso gratuito e downloads ilimitados, mas recomendamos que todos que baixarem material aqui façam um Pix de qualquer valor para incentivar os administradores a adicionarem mais conteúdo grátis.</p>
        <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-grow w-full">
                    <Input type="text" readOnly value={pixKey} className="w-full bg-gray-800 border-gray-600 text-white pr-12" />
                    <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <Button onClick={() => handleCopy(pixKey, 'pix')} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    {copiedPix ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copiedPix ? 'Copiado!' : 'Copiar Chave PIX'}
                </Button>
            </div>
            <div className="text-xs text-gray-400 text-center sm:text-left">
                <p><strong>Titular:</strong> Ederson Leonardo Siebeneichler</p><p><strong>Banco:</strong> Caixa Econômica Federal</p>
            </div>
        </div>
      </div>
      <section>
        <div className="bg-black/50 border border-green-600/20 p-4 sm:p-6 rounded-lg space-y-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="search-input" className="flex items-center gap-2 mb-2 text-md font-semibold text-green-400 uppercase tracking-wider"><Search className="h-5 w-5" />Pesquisar Estilos</label>
                    <Input id="search-input" type="search" placeholder="Digite o nome de um estilo..." className="w-full p-3 bg-black/60 border-2 border-green-600/30 focus:border-green-500 text-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="filter-dropdown" className="flex items-center gap-2 mb-2 text-md font-semibold text-green-400 uppercase tracking-wider"><Filter className="h-5 w-5" />Filtrar por Categoria</label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button id="filter-dropdown" variant="outline" className="w-full justify-between p-3 text-base border-2 border-green-600/30 bg-black/60 hover:bg-black/80">
                                <span>{selectedCategory === "all" ? "Todas as categorias" : selectedCategory}</span><ChevronDown className="ml-2 h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-[300px] overflow-y-auto bg-[#0F0F10] border-green-600/30">
                            <DropdownMenuItem onClick={() => setSelectedCategory("all")}>Todas as categorias</DropdownMenuItem>
                            {uniqueCategories.map((category) => (<DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>{category}</DropdownMenuItem>))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
        <div className="bg-red-600/90 border border-red-500/50 text-white p-4 rounded-lg flex items-center justify-center text-center space-x-3 text-sm my-8">
            <AlertTriangle className="h-6 w-6 flex-shrink-0" />
            <p className="font-semibold">Serão adicionados em média 10 novos estilos por dia. Fique de olho!</p>
        </div>
        <div className="text-center my-8"><h3 className="text-3xl md:text-4xl font-bold uppercase">ACERVOS 2023</h3></div>
        <div className="space-y-4">
            {isLoading ? <div className="text-center py-10 font-semibold text-xl animate-pulse text-white">Carregando itens do acervo...</div>
            : displayedFolders.length > 0 ? displayedFolders.map((item) => {
                    const buttonId = `item-${item.id}`;
                    const isOpening = loadingState?.id === buttonId;
                    const isCopied = copiedLink === item.link;
                    return (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center sm:gap-2">
                            <div className="relative flex-grow w-full">
                                <button onClick={() => handleOpenLink(item.id, item.link)} className="bg-gradient-to-r from-black/80 to-black/60 hover:from-green-900/20 p-4 rounded-md border border-green-600/20 hover:border-green-600/70 flex items-center gap-3 w-full">
                                    <Folder className="h-5 w-5 text-green-400 flex-shrink-0" />
                                    <span className="flex-1 text-center" style={{ fontFamily: 'Dosis, sans-serif', fontSize: '15px' }}>{item.name}</span>
                                    {isOpening ? <Unlock className="h-4 w-4 text-green-400 animate-pulse ml-auto" /> : <div className="w-4 h-4 ml-auto" />}
                                </button>
                                {isOpening && <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-md z-10"><div className="text-center"><div className="animate-pulse text-green-500 font-bold">{loadingState?.state}</div><div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden"><div className="bg-green-500 h-full rounded-full animate-loader"></div></div></div></div>}
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Button variant="outline" size="icon" onClick={() => handleCopy(item.link, 'link')} className={`flex-shrink-0 border-green-600/30 hover:bg-green-600/20 ${isCopied ? 'bg-green-600/30' : 'bg-black/40'}`} title="Copiar link">
                                    {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => handleReportLink(item.name)} className="flex-shrink-0 border-yellow-600/30 text-yellow-500 hover:bg-yellow-600/20 bg-black/40" title="Reportar link quebrado">
                                    <AlertTriangle className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    );
                })
            : <Alert className="bg-yellow-900/20 border-yellow-600/30 text-yellow-200"><AlertDescription>Nenhum item encontrado. Use o painel de admin para adicionar conteúdo a este acervo.</AlertDescription></Alert>}
        </div>
        {displayedFolders.length > 0 && visibleCount < filteredFolders.length && (
            <div className="mt-8 flex justify-center">
                <Button onClick={() => setVisibleCount(c => c + 50)} variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />CARREGAR MAIS
                </Button>
            </div>
        )}
      </section>
      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-green-600/30 p-4 z-20">
        <div className="container mx-auto flex justify-center items-center gap-2 sm:gap-4">
            <Button variant="outline" className="border-gray-600/50" disabled><ArrowLeft className="mr-2 h-4 w-4" />Anterior</Button>
            <Link href="/acervos" passHref><Button variant="secondary" className="bg-green-600 hover:bg-green-700"><Home className="h-5 w-5" /></Button></Link>
            <Button variant="outline" className="border-gray-600/50" disabled>Próximo<ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </footer>
    </div>
  )
}
