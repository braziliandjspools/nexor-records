import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Type, Wrench, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Ferramentas() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Ferramentas</h1>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Ferramentas Úteis para DJs</h2>
        <p className="text-gray-300">
          Utilize nossas ferramentas para facilitar seu trabalho como DJ. Todas as ferramentas são gratuitas e de fácil
          utilização.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-600/30 bg-black/50 hover:shadow-md hover:shadow-green-500/20 transition-all duration-300">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl flex items-center justify-center gap-2">
              <Type className="h-5 w-5 text-green-500" />
              Converter Letras
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-4">
              Transformar textos para maiúsculas ou para minúsculas? Basta usar nossa ferramenta.
            </p>
            <Alert className="bg-blue-900/30 border border-blue-600/30 text-blue-200 mb-4">
              <AlertDescription className="text-center">
                Esta ferramenta processa o texto localmente no seu navegador. Nenhum dado é enviado para nossos
                servidores.
              </AlertDescription>
            </Alert>
            <div className="relative w-full h-32 mb-4">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Converter Letras"
                fill
                className="object-contain rounded-md"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/converter-letras">
              <Button className="bg-green-600 hover:bg-green-700">
                <ExternalLink className="mr-2 h-4 w-4" />
                Acessar Ferramenta
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-green-600/30 bg-black/50 hover:shadow-md hover:shadow-green-500/20 transition-all duration-300">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl flex items-center justify-center gap-2">
              <Wrench className="h-5 w-5 text-green-500" />
              Em Breve
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-4">
              Estamos desenvolvendo novas ferramentas para facilitar seu trabalho. Fique atento às novidades!
            </p>
            <div className="relative w-full h-32 mb-4">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Em Breve"
                fill
                className="object-contain rounded-md opacity-50"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-gray-600 hover:bg-gray-700" disabled>
              <ExternalLink className="mr-2 h-4 w-4" />
              Em Desenvolvimento
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
