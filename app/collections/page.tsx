"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Search, Filter, ChevronDown, Shield, Layers, Calendar, Home, AlertTriangle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Componente para importar as fontes do Google Fonts
const GoogleFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    
    body, button, input, select, textarea {
      font-family: 'Roboto', sans-serif;
    }
    .font-bebas-neue {
      font-family: 'Bebas Neue', sans-serif;
    }
  `}</style>
);

// --- ESTRUTURA E DADOS DAS COLEÇÕES (IMAGENS ATUALIZADAS) ---
interface CollectionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  category: "Pools de Remix" | "Pools de DJ" | "Compilações";
  featured: boolean;
  lastUpdate: string;
  price: number;
}

const collectionsData: CollectionItem[] = [
    {
        id: "mastermix",
        title: "MASTERMIX",
        description: "A coleção definitiva para DJs de eventos, com décadas de música e edições especiais prontas para qualquer festa.",
        imageUrl: "/images/mastermix_cover.jpg",
        href: "/collections/mastermix",
        category: "Pools de DJ",
        featured: true,
        lastUpdate: "Julho 2025",
        price: 35
    },
    {
        id: "dmc",
        title: "DMC",
        description: "Pioneiros em remixes para DJs, oferecendo megamixes icônicos e bootlegs que marcaram gerações.",
        imageUrl: "/images/cmc_cover.jpg",
        href: "/collections/dmc",
        category: "Pools de Remix",
        featured: true,
        lastUpdate: "Julho 2025",
        price: 35
    },
    {
        id: "ultimix",
        title: "ULTIMIX",
        description: "Os maiores hits do Mainstream e Dance em versões estendidas e com batidas marcadas para mixagens perfeitas.",
        imageUrl: "/images/ultimix_cover.jpg",
        href: "/collections/ultimix",
        category: "Pools de Remix",
        featured: false,
        lastUpdate: "Julho 2025",
        price: 35
    },
    {
        id: "funkymix",
        title: "FUNKYMIX",
        description: "Coleções exclusivas de Funk, incluindo remixes, acapellas e instrumentais essenciais para DJs do gênero.",
        imageUrl: "/images/funkymix_cover.jpg",
        href: "/collections/funkymix",
        category: "Compilações",
        featured: false,
        lastUpdate: "Julho 2025",
        price: 35
    },
    {
        id: "select-mix",
        title: "SELECT MIX",
        description: "Essenciais para todo tipo de evento, com mixagens limpas e em alta qualidade, prontas para tocar.",
        imageUrl: "/images/selectmix_cover.jpg",
        href: "/collections/select-mix",
        category: "Pools de DJ",
        featured: false,
        lastUpdate: "Junho 2025",
        price: 35
    },
    {
        id: "x-mix",
        title: "X-MIX",
        description: "Compilações de gêneros como Urban, Dance e Pop, curadas por DJs renomados e focadas na pista de dança.",
        imageUrl: "/images/x_mix_cover.jpg",
        href: "/collections/x-mix",
        category: "Compilações",
        featured: false,
        lastUpdate: "Junho 2025",
        price: 35
    },
    {
        id: "full-tilt-remix",
        title: "FULL TILT REMIX",
        description: "Remixes energéticos e focados na pista de dança, abrangendo uma vasta gama de estilos musicais.",
        imageUrl: "/images/full_tilt_remix_cover.jpg",
        href: "/collections/full-tilt-remix",
        category: "Pools de Remix",
        featured: false,
        lastUpdate: "Maio 2025",
        price: 35
    }
];

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = useMemo(() => {
    const allCategories = collectionsData.map((c) => c.category);
    return ["Todos", ...Array.from(new Set(allCategories)).sort()];
  }, []);

  const filteredCollections = useMemo(() => {
    const sortedData = [...collectionsData].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return sortedData.filter((collection) => {
      const matchesCategory = selectedCategory === "Todos" || collection.category === selectedCategory;
      const matchesSearch =
        collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <GoogleFont />
      <div className="text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-28 space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild className="bg-black/40 border-purple-600/30 hover:bg-black/60">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar para Home</span>
              </Link>
            </Button>
            <h1 className="font-bold text-3xl tracking-tight uppercase">Nossas Coleções</h1>
          </div>
          
          <div className="flex justify-center">
            <Image
              src="/images/poolcollections.jpg"
              alt="Banner das Coleções"
              width={800}
              height={400}
              className="max-w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>

          <p className="text-slate-300 max-w-3xl mx-auto text-center">
            Explore nossas coleções de música selecionadas, pools de remixes e compilações essenciais para DJs. Qualidade e organização em um só lugar.
          </p>

          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg space-y-4 md:space-y-0 md:flex md:items-end md:justify-between md:gap-4">
            <div className="flex-grow">
              <Label htmlFor="search-input" className="text-sm font-medium text-slate-400 mb-2 block">Pesquisar coleção</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="search-input"
                  type="text"
                  placeholder="Ex: Mastermix..."
                  className="w-full pl-10 bg-slate-800 border-slate-700 focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Label htmlFor="category-filter" className="text-sm font-medium text-slate-400 mb-2 block">Filtrar por categoria</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button id="category-filter" variant="outline" className="w-full justify-between bg-slate-800 border-slate-700 hover:bg-slate-700">
                    {selectedCategory}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-slate-800 border-slate-700 text-white">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      className="cursor-pointer focus:bg-purple-600 focus:text-white"
                      onSelect={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Alert className="bg-red-900/30 border-red-600/30 text-red-300">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <AlertTitle className="font-bold">Aviso Importante sobre Valores</AlertTitle>
            <AlertDescription className="text-justify text-red-300/90">
                Cada coleção possui um valor de aquisição individual. Mesmo sendo um usuário VIP pagante, este material não está incluso em nenhum plano de assinatura. No entanto, como benefício, membros VIP têm um desconto exclusivo de 25% sobre o valor de cada coleção.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredCollections.map((collection) => (
                <motion.div
                  key={collection.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card className="border-slate-800 bg-slate-900/50 hover:border-purple-600/50 transition-colors duration-300 flex flex-col md:flex-row overflow-hidden">
                    <div className="relative w-full h-48 md:w-48 md:h-auto flex-shrink-0">
                      <Image src={collection.imageUrl} alt={collection.title} fill className="object-cover" />
                      {collection.featured && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-black shadow-lg">
                          <Star className="h-3 w-3 mr-1" />
                          Destaque
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col flex-grow p-4">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-2xl font-bebas-neue tracking-wider">{collection.title}</h3>
                        <Badge variant="outline" className="bg-green-600/20 text-green-300 border-green-600/30 text-lg font-bold">
                          R$ {collection.price.toFixed(2).replace('.', ',')}
                        </Badge>
                      </div>
                      <Badge variant="secondary" className="text-xs w-fit mb-3">{collection.category}</Badge>
                      <p className="text-slate-400 text-sm mb-4 flex-grow">{collection.description}</p>
                      
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                           <Calendar className="h-4 w-4" />
                           <span>Atualizado em: {collection.lastUpdate}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-auto">
                        <Button asChild variant="outline" className="w-full sm:w-auto border-slate-600 hover:bg-slate-700">
                           <Link href={collection.href}>
                              <Layers className="mr-2 h-4 w-4" />
                              Acessar Coleção
                           </Link>
                        </Button>
                        <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                           <Link href="#"> {/* Substituir # pelo link de compra */}
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Comprar Coleção
                           </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredCollections.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <p>Nenhuma coleção encontrada para sua busca.</p>
              </div>
            )}
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-blue-300">Qualidade Garantida</h3>
            </div>
            <p className="text-blue-300/80 text-sm max-w-2xl mx-auto">
              Todas as nossas coleções são cuidadosamente organizadas e mantidas para garantir a melhor experiência de navegação e uso para DJs profissionais e entusiastas.
            </p>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-purple-600/30 p-3 z-20">
        <div className="container mx-auto flex justify-center items-center">
            <Link href="/atualizacoes" passHref>
                <Button variant="secondary" className="bg-purple-600 hover:bg-purple-700">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </>
  )
}