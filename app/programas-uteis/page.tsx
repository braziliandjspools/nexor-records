"use client"

import React, { useState, useMemo, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Star, Shield, Search, AlertTriangle, Filter, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

// Componente para importar as fontes do Google Fonts
const GoogleFont = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); // Fonte adicionada
    
    body, button, input, select, textarea {
      font-family: 'Roboto', sans-serif;
    }
    .font-bebas-neue {
      font-family: 'Bebas Neue', sans-serif;
    }
  `}</style>
);

const SoundCloudTrack = React.memo(function SoundCloudTrack({ embedCode }: { embedCode: string }) {
  return <div dangerouslySetInnerHTML={{ __html: embedCode }} />;
});

// --- Componente Principal da Página ---
export default function ProgramasUteisPage() {
  const programs = [
    { id: 1, title: "Virtual DJ Pro", description: "Software profissional para DJs com recursos avançados de mixagem e efeitos especiais.", image: "https://i.ibb.co/L5BqgXm/virtualdj.png", category: "DJ Software", type: "Cracked", featured: true, downloadUrl: "#" },
    { id: 2, title: "Serato DJ Lite", description: "Versão gratuita do famoso software Serato com funcionalidades essenciais para DJs.", image: "https://i.ibb.co/hK7JqR4/serato.png", category: "DJ Software", type: "Grátis", featured: false, downloadUrl: "#" },
    { id: 3, title: "Audacity", description: "Editor de áudio gratuito e open-source para gravação e edição de músicas.", image: "https://i.ibb.co/hCsSFWm/audacity.png", category: "Audio Editor", type: "Grátis", featured: true, downloadUrl: "#" },
    { id: 4, title: "FL Studio", description: "Estação de trabalho de áudio digital completa para produção musical profissional.", image: "https://i.ibb.co/k2WcWdY/flstudio.png", category: "DAW", type: "Cracked", featured: false, downloadUrl: "#" },
    { id: 5, title: "OBS Studio", description: "Software gratuito para gravação e transmissão ao vivo de suas performances.", image: "https://i.ibb.co/mHq36b7/obs.png", category: "Streaming", type: "Grátis", featured: true, downloadUrl: "#" },
    { id: 6, title: "Rekordbox", description: "Software oficial da Pioneer DJ para gerenciamento e análise de música.", image: "https://i.ibb.co/1K548jP/rekordbox.png", category: "DJ Software", type: "Pago", featured: false, downloadUrl: "#" },
    { id: 7, title: "LMMS", description: "Estação de trabalho de áudio digital gratuita e multiplataforma.", image: "https://i.ibb.co/3WfK4f5/lmms.png", category: "DAW", type: "Grátis", featured: false, downloadUrl: "#" },
    { id: 8, title: "Mixxx", description: "Software DJ gratuito e open-source com suporte a controladores profissionais.", image: "https://i.ibb.co/fQ1T7t9/mixxx.png", category: "DJ Software", type: "Grátis", featured: true, downloadUrl: "#" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = useMemo(() => {
    const allCategories = programs.map((p) => p.category);
    return ["Todos", ...Array.from(new Set(allCategories)).sort()];
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesCategory = selectedCategory === "Todos" || program.category === selectedCategory;
      const matchesSearch =
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [programs, searchQuery, selectedCategory]);

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "Grátis": return "bg-green-600/20 text-green-300 border-green-600/30";
      case "Pago": return "bg-blue-600/20 text-blue-300 border-blue-600/30";
      case "Cracked": return "bg-red-600/20 text-red-300 border-red-600/30";
      default: return "bg-gray-600/20 text-gray-300 border-gray-600/30";
    }
  };

  return (
    <>
      <GoogleFont />
      <div className="text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild className="bg-black/40 border-purple-600/30 hover:bg-black/60">
              <Link href="/ferramentas">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
            <h1 className="font-bold text-3xl tracking-tight uppercase">Programas Úteis</h1>
          </div>

          <p className="text-slate-300 max-w-3xl mx-auto text-center">
            Descubra nossa coleção de softwares essenciais para DJs e produtores. Todos testados e aprovados pela nossa equipe para garantir downloads seguros.
          </p>

          {/* --- SEÇÃO DE FILTROS (MOVIDA PARA O TOPO) --- */}
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg space-y-4 md:space-y-0 md:flex md:items-end md:justify-between md:gap-4">
            <div className="flex-grow">
              <Label htmlFor="search-input" className="text-sm font-medium text-slate-400 mb-2 block">Pesquisar por nome</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="search-input"
                  type="text"
                  placeholder="Ex: Virtual DJ..."
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

          <Alert className="bg-yellow-900/20 border-yellow-500/30">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertTitle className="text-yellow-300">Página em Construção</AlertTitle>
            <AlertDescription className="text-yellow-400/80">
              Nenhum link de download é funcional no momento. A implementação completa será feita em breve.
            </AlertDescription>
          </Alert>

          {/* --- LISTA DE PROGRAMAS --- */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredPrograms.map((program) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card className="border-slate-800 bg-slate-900/50 hover:border-purple-600/50 transition-colors duration-300 flex flex-col md:flex-row overflow-hidden">
                    <div className="relative w-full h-48 md:w-48 md:h-auto flex-shrink-0">
                      <Image src={program.image} alt={program.title} fill className="object-cover" />
                      {program.featured && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-black shadow-lg">
                          <Star className="h-3 w-3 mr-1" />
                          Destaque
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col flex-grow p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-xl font-bebas-neue tracking-wider">{program.title}</h3>
                        <Badge variant="outline" className={`flex-shrink-0 ${getTypeBadgeClass(program.type)}`}>{program.type}</Badge>
                      </div>
                      <Badge variant="secondary" className="text-xs w-fit mb-3">{program.category}</Badge>
                      <p className="text-slate-400 text-sm mb-4 flex-grow">{program.description}</p>
                      
                      {program.type === 'Pago' ? (
                          <Button asChild className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                              <a href={program.downloadUrl} target="_blank" rel="noopener noreferrer">
                                  <ShoppingCart className="mr-2 h-4 w-4" />
                                  Comprar
                              </a>
                          </Button>
                      ) : (
                          <Button asChild className="w-full mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                              <a href={program.downloadUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                              </a>
                          </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredPrograms.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <p>Nenhum programa encontrado para sua busca.</p>
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-blue-300">Downloads Seguros</h3>
            </div>
            <p className="text-blue-300/80 text-sm max-w-2xl mx-auto">
              Todos os programas são verificados e livres de malware. Recomendamos sempre manter seus softwares
              atualizados para melhor performance e segurança.
            </p>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-2" />
              <h3 className="text-lg font-semibold text-red-300">Aviso sobre Programas Crackeados</h3>
            </div>
            <div className="text-red-300/80 text-sm max-w-2xl mx-auto space-y-3 text-justify">
              <p>
                  Nossos programas com a tag 'Cracked' são testados pela nossa equipe para garantir seu funcionamento. No entanto, é crucial que você esteja ciente que, para a instalação da maioria, <span className="font-bold">pode ser necessário desativar temporariamente seu antivírus ou o Windows Defender</span>, pois os ativadores são frequentemente identificados como 'falsos positivos'.
              </p>
              <p className="font-bold">
                  Ao prosseguir com o download e a instalação, você assume total responsabilidade. Não nos responsabilizamos por usos indevidos ou qualquer tipo de dano ou infecção que possa ocorrer em sua máquina.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
