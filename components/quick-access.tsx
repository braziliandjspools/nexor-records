"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExternalLink, Music, Disc, Headphones, Mic2, Flame, Star, Music2, Radio, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StyleItem {
  name: string
  link: string
  month: string
}

interface QuickAccessProps {
  styles: StyleItem[]
}

export function QuickAccess({ styles }: QuickAccessProps) {
  const router = useRouter()
  const [loadingState, setLoadingState] = useState<{ id: string; state: string } | null>(null)

  // Extrair o nome do estilo/pool (antes do hífen, se houver)
  const getStyleName = (name: string) => {
    const parts = name.split(" - ")
    return parts[0]
  }

  // Agrupar estilos por nome
  const styleGroups: Record<string, StyleItem[]> = {}

  styles.forEach((style) => {
    const styleName = getStyleName(style.name)
    if (!styleGroups[styleName]) {
      styleGroups[styleName] = []
    }
    styleGroups[styleName].push(style)
  })

  // Obter estilos únicos
  const uniqueStyles = Object.keys(styleGroups).sort()

  // Função para abrir link com mensagem de carregamento
  const handleOpenLink = (id: string, link: string) => {
    setLoadingState({ id, state: "ACESSANDO GOOGLE DRIVE" })

    setTimeout(() => {
      setLoadingState({ id, state: "LINK ENCONTRADO" })

      setTimeout(() => {
        window.open(link, "_blank")
        setLoadingState(null)
      }, 1000)
    }, 2000)
  }

  // Selecionar categorias populares para exibição (agora 8 categorias)
  const popularCategories = ["HOUSE/EDM", "HIP HOP/R&B", "FUNK", "REMIXES", "POOLS", "CLASSICS", "LATIN", "TECHNO"]

  // Mapear estilos para categorias
  const stylesByCategory: Record<string, StyleItem[]> = {
    "HOUSE/EDM": styles
      .filter((s) =>
        ["AFRO HOUSE", "BEATPORT", "EDM", "TECHNO", "HOUSE", "DANCE"].some((term) => s.name.includes(term)),
      )
      .slice(0, 6),

    "HIP HOP/R&B": styles
      .filter((s) => ["HIP HOP", "R&B", "TRAP", "RAP"].some((term) => s.name.includes(term)))
      .slice(0, 6),

    FUNK: styles.filter((s) => ["FUNK", "BAILE"].some((term) => s.name.includes(term))).slice(0, 6),

    REMIXES: styles
      .filter((s) => ["REMIX", "BOOTLEG", "EDIT", "MASHUP"].some((term) => s.name.includes(term)))
      .slice(0, 6),

    POOLS: styles
      .filter((s) => ["DJ CITY", "BPM SUPREME", "DIGITAL MUSIC", "POOL"].some((term) => s.name.includes(term)))
      .slice(0, 6),

    CLASSICS: styles
      .filter((s) => ["ANOS", "THROWBACK", "CLASSIC", "BACK TO"].some((term) => s.name.includes(term)))
      .slice(0, 6),

    LATIN: styles
      .filter((s) => ["LATIN", "REGGAETON", "CUBA", "AMERICA"].some((term) => s.name.includes(term)))
      .slice(0, 6),

    TECHNO: styles.filter((s) => ["TECHNO", "TECH HOUSE", "MINIMAL"].some((term) => s.name.includes(term))).slice(0, 6),
  }

  // Definir ícones e cores de gradiente para cada categoria
  const categoryIcons = {
    "HOUSE/EDM": <Headphones className="h-5 w-5" />,
    "HIP HOP/R&B": <Mic2 className="h-5 w-5" />,
    FUNK: <Flame className="h-5 w-5" />,
    REMIXES: <Music2 className="h-5 w-5" />,
    POOLS: <Disc className="h-5 w-5" />,
    CLASSICS: <Star className="h-5 w-5" />,
    LATIN: <Radio className="h-5 w-5" />,
    TECHNO: <Zap className="h-5 w-5" />,
  }

  const categoryGradients = {
    "HOUSE/EDM": "from-blue-600 to-cyan-400",
    "HIP HOP/R&B": "from-purple-600 to-indigo-400",
    FUNK: "from-pink-600 to-rose-400",
    REMIXES: "from-green-600 to-emerald-400",
    POOLS: "from-orange-600 to-amber-400",
    CLASSICS: "from-red-600 to-yellow-400",
    LATIN: "from-yellow-600 to-amber-400",
    TECHNO: "from-indigo-600 to-blue-400",
  }

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-3xl tracking-tight mb-6 text-white border-b border-green-600/30 pb-2 uppercase">
        PACKS MAIS ACESSADOS
      </h2>

      <div className="space-y-8">
        {popularCategories.map((category) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-md bg-gradient-to-r ${categoryGradients[category as keyof typeof categoryGradients]}`}
              >
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <h3 className="font-bold text-lg text-white">{category}</h3>
            </div>

            <div className="space-y-2">
              {stylesByCategory[category].map((style, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => handleOpenLink(`style-${category}-${index}`, style.link)}
                    className={`bg-black/40 hover:bg-black/60 border border-transparent hover:border-white/20 transition-all duration-300 p-3 rounded-md text-left flex items-center gap-3 w-full group overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${categoryGradients[category as keyof typeof categoryGradients]}`}
                    ></div>
                    <div
                      className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br ${categoryGradients[category as keyof typeof categoryGradients]}`}
                    >
                      <Music className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-sm font-medium truncate block">{style.name}</span>
                      <span className="text-gray-400 text-xs">
                        {style.month === "abril-2025" ? "Abril 2025" : "Março 2025"}
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-white/50 group-hover:text-white transition-colors flex-shrink-0" />
                  </button>

                  {loadingState && loadingState.id === `style-${category}-${index}` && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-md z-10">
                      <div className="text-center">
                        <div className="animate-pulse text-green-500 font-bold">{loadingState.state}</div>
                        <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full animate-loader"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Link
              href={`/atualizacoes`}
              className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1"
            >
              Ver mais <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>

      <Link href="/atualizacoes" className="block w-full">
        <div className="bg-gradient-to-r from-green-600/20 to-black/60 hover:from-green-600/30 hover:to-black/70 border border-green-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 p-4 rounded-lg flex items-center justify-between">
          <span className="font-semibold text-white">Ver todos os estilos e pools</span>
          <Badge className="bg-green-600">{uniqueStyles.length} estilos</Badge>
        </div>
      </Link>
    </div>
  )
}
