import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-black/50 border-t border-green-600/30 py-8 mt-12">
      <div className="container mx-auto flex flex-col items-center text-center text-gray-400 text-sm space-y-6">
        <Link href="/">
          <Image
            src="https://i.ibb.co/yFpx8Bww/LOGO-SITE.png"
            alt="N3XOR RECORDS Logo"
            width={160}
            height={45}
            className="w-40 h-auto"
          />
        </Link>
        
        {/* Links de Política e Termos */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="https://plataformavip.nexorrecords.com.br/privacy-policy" className="font-medium text-gray-300 hover:text-white transition-colors">
                POLÍTICA DE PRIVACIDADE
            </Link>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <Link href="https://plataformavip.nexorrecords.com.br/terms-of-service" className="font-medium text-gray-300 hover:text-white transition-colors">
                TERMOS DE SERVIÇO
            </Link>
        </div>

        {/* Indicador de Status */}
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-green-900/50 px-3 py-1.5 text-xs font-medium text-green-300">
            <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </div>
            <span>Todos os serviços estão online</span>
        </div>

        {/* Créditos e Copyright */}
        <div className="space-y-2 pt-2 border-t border-white/10 w-full max-w-xs">
            <p className="flex items-center justify-center gap-1.5">
            © 2025 N3XOR RECORDS. Feito com <Heart className="h-4 w-4 text-red-500 fill-current" /> no Brasil
            </p>
            <p>
            PLATAFORMA CRIADA POR{" "}
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
      </div>
    </footer>
  )
}