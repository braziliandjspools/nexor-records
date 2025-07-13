import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-transparent border-t border-white/10 mt-20 py-6">
      <div className="container mx-auto px-6 text-sm">

        {/* --- Layout Principal (Desktop: Esquerda/Direita, Mobile: Empilhado) --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Informações de Copyright e Criação */}
          <div className="text-center md:text-left text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} N3XOR RECORDS. Feito com <Heart className="inline h-4 w-4 text-red-500 fill-current" /> no Brasil.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Plataforma criada por{" "}
              <a
                href="https://www.facebook.com/ederson.leo.siebeneichler"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-green-400 hover:text-green-300 transition-colors"
              >
                EDERSON LEONARDO
              </a>
            </p>
          </div>

          {/* Links e Status */}
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Links Legais */}
            <div className="flex items-center gap-x-4 text-gray-300">
              <Link href="https://plataformavip.nexorrecords.com.br/privacy-policy" className="hover:text-white transition-colors">
                  POLÍTICA DE PRIVACIDADE
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="https://plataformavip.nexorrecords.com.br/terms-of-service" className="hover:text-white transition-colors">
                  TERMOS DE SERVIÇO
              </Link>
            </div>
            
            {/* Indicador de Status */}
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-green-900/50 px-3 py-1 text-xs font-medium text-green-300">
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span>Todos os serviços estão online</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}