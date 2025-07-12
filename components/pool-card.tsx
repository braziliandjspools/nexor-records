import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface PoolCardProps {
  title: string
  image: string
  href?: string
}

export function PoolCard({ title, image, href }: PoolCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/20 border-pink-600/30 bg-black/80 group w-full">
      <CardContent className="p-0 relative h-40">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <ExternalLink className="text-white h-8 w-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
        </div>
      </CardContent>
      <CardFooter className="bg-black p-3 text-center">
        <h3 className="font-semibold text-sm text-white w-full group-hover:text-green-400 transition-colors uppercase">
          {title}
        </h3>
      </CardFooter>
    </Card>
  )
}
