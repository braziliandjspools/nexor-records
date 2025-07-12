"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Home, Search, Filter, ChevronDown, HelpCircle, Lock, Unlock, Copy, Check, AlertTriangle, Computer, Folder, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// --- ESTRUTURA DOS DADOS QUE VÊM DO BANCO ---
interface FolderItem {
  id: number;
  name: string;
  link: string;
  category: string;
  date: string;
}

// --- DADOS ESTÁTICOS DA PÁGINA ---
const julyMonthData = {
  name: 'Julho 2025',
  imageBanner: "https://i.ibb.co/yFCKR6SN/julho-2025.png",
  driveLink: "https://drive.google.com/drive/folders/1YVBralwZOT_6K1SCNh50bzBDmemeoLQ2?usp=drive_link",
  prevMonth: { name: "Junho 2025", slug: "junho-2025" },
  nextMonth: null,
};

export default function Julho2025Page() {
  // ESTADOS PARA OS DADOS DINÂMICOS
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ESTADOS PARA INTERAÇÃO DO USUÁRIO
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loadingState, setLoadingState] = useState<{ id: string; state: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // EFEITO PARA BUSCAR DADOS DA API QUANDO A PÁGINA CARREGA
  useEffect(() => {
    const fetchFolders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/folders?month=julho-2025');
        if (!response.ok) throw new Error('Falha ao buscar dados');
        const data = await response.json();
        setFolders(data);
      } catch (error) {
        console.error("Falha ao buscar pastas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolders();
  }, []); // O array vazio [] faz com que rode apenas uma vez

  // LÓGICA DE FILTRO E AGRUPAMENTO (AGORA USANDO O ESTADO `folders`)
  const uniqueCategories = useMemo(() => {
    const categories = new Set(folders.map((folder) => {
        if (folder.category.startsWith("DJ")) return "DJS REMIXES";
        if (folder.category.startsWith("BEATPORT")) return "BEATPORT";
        if (folder.category.startsWith("MIXINIT")) return "MIXINIT";
        if (folder.category.startsWith("MIXSHOW")) return "MIXSHOW";
        return folder.category;
    }));
    return Array.from(categories).sort();
  }, [folders]);

  const filteredFolders = useMemo(() => {
    let currentFolders = folders;
    if (selectedCategory !== "all") {
        currentFolders = currentFolders.filter(folder => {
            if (selectedCategory === "DJS REMIXES") return folder.category.startsWith("DJ");
            if (selectedCategory === "BEATPORT") return folder.category.startsWith("BEATPORT");
            if (selectedCategory === "MIXINIT") return folder.category.startsWith("MIXINIT");
            if (selectedCategory === "MIXSHOW") return folder.category.startsWith("MIXSHOW");
            return folder.category === selectedCategory;
        });
    }
    if (searchQuery.trim() !== "") {
        currentFolders = currentFolders.filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return currentFolders;
  }, [folders, searchQuery, selectedCategory]);

  const groupedFolders = useMemo(() => {
    return filteredFolders.reduce((acc, folder) => {
        const date = folder.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(folder);
        return acc;
    }, {} as Record<string, FolderItem[]>);
  }, [filteredFolders]);

  // FUNÇÕES DE MANIPULAÇÃO DE CLIQUES
  const handleOpenLink = (id: number, link: string) => {
    const loadingId = `folder-${id}`;
    setLoadingState({ id: loadingId, state: "CONSULTANDO GOOGLE DRIVE" });
    setTimeout(() => {
      setLoadingState({ id: loadingId, state: "LINK ENCONTRADO" });
      setTimeout(() => {
        window.open(link, "_blank");
        setLoadingState(null);
      }, 1000);
    }, 2000);
  };

  const handleCopyLink = (linkToCopy: string) => {
    navigator.clipboard.writeText(linkToCopy).then(() => {
        setCopiedLink(linkToCopy);
        setTimeout(() => setCopiedLink(null), 2000);
    });
  };

  const handleReportLink = (folderName: string) => {
    const message = `Olá! O link para a pasta "${folderName}" de ${julyMonthData.name} parece estar quebrado.`;
    const whatsappUrl = `https://wa.me/5551935052274?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="space-y-8 pb-24">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap');`}</style>

      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
            <Link href="/atualizacoes">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
            </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">{julyMonthData.name}</h1>
      </div>

      <div className="flex justify-center mb-6">
          <Image src={julyMonthData.imageBanner} alt={julyMonthData.name} width={800} height={400} className="max-w-full h-auto rounded-lg"/>
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
            <h3 className="text-3xl md:text-4xl font-bold uppercase">DRIVE 2025</h3>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10 font-semibold text-xl animate-pulse">Carregando pastas do banco de dados...</div>
        ) : (
          <div className="space-y-8">
              {Object.keys(groupedFolders).length > 0 ? (
                  Object.entries(groupedFolders).map(([date, foldersInGroup]) => (
                      <div key={date} className="space-y-4">
                          <div className="flex items-center gap-3">
                              <div className="h-px flex-grow bg-green-600/30"></div>
                              <h4 className="text-md font-semibold text-green-400 uppercase tracking-wider flex-shrink-0">{date}</h4>
                              <div className="h-px flex-grow bg-green-600/30"></div>
                          </div>

                          {foldersInGroup.map((folder) => {
                              const buttonId = `folder-${folder.id}`;
                              const isOpening = loadingState && loadingState.id === buttonId;
                              const isCopied = copiedLink === folder.link;
                              return (
                                  <div key={folder.id} className="flex flex-col sm:flex-row items-center sm:gap-2">
                                      <div className="relative flex-grow w-full">
                                          <button
                                              onClick={() => handleOpenLink(folder.id, folder.link)}
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
                          })}
                      </div>
                  ))
              ) : (
                  <Alert className="bg-yellow-900/20 border-yellow-600/30 text-yellow-200">
                      <AlertDescription>Nenhuma pasta encontrada no banco de dados para este mês.</AlertDescription>
                  </Alert>
              )}
          </div>
        )}
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href={julyMonthData.driveLink} target="_blank" rel="noopener noreferrer">
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
            {julyMonthData.prevMonth ? (
                <Link href={`/atualizacoes/${julyMonthData.prevMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {julyMonthData.prevMonth.name}
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
            {julyMonthData.nextMonth ? (
                <Link href={`/atualizacoes/${julyMonthData.nextMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        {julyMonthData.nextMonth.name}
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