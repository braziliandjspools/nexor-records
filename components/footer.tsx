import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-black/50 border-t border-green-600/30 py-6 mt-12">
      <div className="container mx-auto flex flex-col items-center text-center text-gray-400 text-sm space-y-4">
        <Image
          src="https://i.ibb.co/yFpx8Bww/LOGO-SITE.png"
          alt="N3XOR RECORDS Logo"
          width={160}
          height={45}
          className="w-40 h-auto"
        />
        <div className="space-y-2">
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
