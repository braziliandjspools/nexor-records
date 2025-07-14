"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Home, Search, Filter, ChevronDown, HelpCircle, Unlock, Copy, Check, AlertTriangle, Computer, Folder, KeyRound, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AcervoItem {
  id: number;
  name: string;
  link: string;
  category: string;
  date: string;
}

const acervo2023Data = {
  name: 'Acervos 2023',
  imageBanner: "https://i.ibb.co/1YZp04sZ/acervos2023.png",
};

export default function Acervos2023Page() {
  const [acervoItems, setAcervoItems] = useState<AcervoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(50);
  const [loadingState, setLoadingState] = useState<{ id: string; state: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

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

  const filteredItems = useMemo(() => {
    let items = acervoItems;
    if (selectedCategory !== "all") items = items.filter(item => item.category === selectedCategory);
    if (searchQuery.trim() !== "") items = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return items;
  }, [acervoItems, searchQuery, selectedCategory]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {} as Record<string, AcervoItem[]>);
  }, [filteredItems]);

  const displayedGroups = useMemo(() => {
      const allItems = Object.entries(groupedItems).flatMap(([date, items]) => 
          items.map(item => ({...item, groupDate: date}))
      );
      return allItems.slice(0, visibleCount);
  }, [groupedItems, visibleCount]);

  const handleOpenLink = (id: number, link: string) => {
    const loadingId = `item-${id}`;
    setLoadingState({ id: loadingId, state: "CONSULTANDO..." });
    setTimeout(() => {
      setLoadingState({ id: loadingId, state: "LINK OK" });
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

  const pixKey = "51935052274";

  return (
    <div className="space-y-8 pb-24">
      {/* ... (cabeçalho e avisos) ... */}
      <section>
        {/* ... (filtros) ... */}
        <div className="text-center my-8"><h3 className="text-3xl md:text-4xl font-bold uppercase">ACERVOS 2023</h3></div>
        <div className="space-y-8">
            {isLoading ? <div className="text-center py-10 font-semibold text-xl animate-pulse text-white">Carregando itens...</div>
            : Object.keys(groupedItems).length > 0 ? (
                Object.entries(groupedItems).map(([date, items]) => (
                    <div key={date} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-grow bg-green-600/30"></div>
                            <h4 className="text-md font-semibold text-green-400 uppercase tracking-wider flex-shrink-0">{date}</h4>
                            <div className="h-px flex-grow bg-green-600/30"></div>
                        </div>
                        {items.map((item) => {
                            const buttonId = `item-${item.id}`;
                            const isOpening = loadingState?.id === buttonId;
                            const isCopied = copiedLink === item.link;
                            return (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center sm:gap-2">
                                    <div className="relative flex-grow w-full">
                                        <button onClick={() => handleOpenLink(item.id, item.link)} className="bg-gradient-to-r from-black/80 to-black/60 p-4 rounded-md border border-green-600/20 flex items-center gap-3 w-full">
                                            <Folder className="h-5 w-5 text-green-400 flex-shrink-0" />
                                            <span className="flex-1 text-center" style={{ fontFamily: 'Dosis, sans-serif', fontSize: '15px' }}>{item.name}</span>
                                            {isOpening && <Unlock className="h-4 w-4 text-green-400 animate-pulse ml-auto" />}
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                        <Button variant="outline" size="icon" onClick={() => handleCopy(item.link, 'link')} className={`flex-shrink-0 border-green-600/30 ${isCopied ? 'bg-green-600/30' : 'bg-black/40'}`} title="Copiar link">
                                            {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))
            ) : <Alert className="bg-yellow-900/20 border-yellow-600/30 text-yellow-200"><AlertDescription>Nenhum item encontrado.</AlertDescription></Alert>}
        </div>
        {/* ... (botão de carregar mais e footer) ... */}
      </section>
    </div>
  );
}
