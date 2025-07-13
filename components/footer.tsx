import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-transparent border-t border-white/10 mt-20 py-10">
      <div className="container mx-auto px-6">
        
        {/* Container principal centralizado com espaçamento entre os grupos */}
        <div className="flex flex-col items-center gap-6 text-center">

          {/* Grupo 1: Links Legais */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 text-sm font-medium text-gray-300">
            <Link href="https://plataformavip.nexorrecords.com.br/privacy-policy" className="hover:text-white transition-colors duration-200">
                POLÍTICA DE PRIVACIDADE
            </Link>
            <span className="text-gray-600">&middot;</span>
            <Link href="https://plataformavip.nexorrecords.com.br/terms-of-service" className="hover:text-white transition-colors duration-200">
                TERMOS DE SERVIÇO
            </Link>
          </div>

          {/* Grupo 2: Indicador de Status */}
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-green-900/50 px-3 py-1.5 text-xs font-medium text-green-300">
              <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </div>
              <span>Todos os serviços estão online</span>
          </div>

          {/* Grupo 3: Créditos e Copyright */}
          <div className="text-xs text-gray-500">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} N3XOR RECORDS &middot; Feito com <Heart className="inline-block h-3.5 w-3.5 text-red-500 fill-current" /> no Brasil
            </p>
            <p>
              Plataforma criada por{" "}
              <a
                href="https://www.facebook.com/ederson.leo.siebeneichler"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                EDERSON LEONARDO
              </a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}