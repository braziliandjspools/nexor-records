import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
      <h1 className="text-4xl font-bold text-white">404</h1>
      <h2 className="text-2xl font-semibold text-pink-400">Página não encontrada</h2>
      <p className="text-gray-400 max-w-md">
        A página que você está procurando não existe ou foi movida para outro endereço.
      </p>
      <Button asChild className="mt-4 bg-pink-600 hover:bg-pink-700">
        <Link href="/" className="flex items-center gap-2">
          <Home size={16} />
          <span>Voltar para a página inicial</span>
        </Link>
      </Button>
    </div>
  )
}
