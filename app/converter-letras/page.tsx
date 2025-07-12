"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check, Type, ArrowUpDown, TextQuote, Heading1, Heading2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function ConverterLetras() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const convertToUppercase = () => {
    setText(text.toUpperCase())
  }

  const convertToLowercase = () => {
    setText(text.toLowerCase())
  }

  const convertToAlternating = () => {
    const chars = text.split("")
    const alternated = chars.map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())).join("")
    setText(alternated)
  }

  const reverseText = () => {
    const reversed = text.split("").reverse().join("")
    setText(reversed)
  }

  const capitalizeFirstLetterOfEachWord = () => {
    const words = text.split(" ")
    const capitalized = words
      .map((word) => (word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""))
      .join(" ")
    setText(capitalized)
  }

  const capitalizeFirstLetterOfSentence = () => {
    if (text.length === 0) return
    setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())
  }

  const copyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
      document.execCommand("copy")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Converter Letras</h1>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Converter Maiúsculas e Minúsculas</h2>
        <p className="text-gray-300 text-justify">
          Transformar textos para maiúsculas ou para minúsculas? Basta usar nossa ferramenta.
        </p>
        <div className="bg-blue-900/30 border border-blue-600/30 text-blue-200 p-4 rounded-lg text-center mb-6">
          <p>
            Esta ferramenta processa o texto localmente no seu navegador. Nenhum dado é enviado para nossos servidores.
          </p>
        </div>
      </div>

      <Card className="border-green-600/30 bg-black/50">
        <CardContent className="p-6 space-y-6">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder="Cole ou digite seu texto aqui..."
              className="min-h-[200px] bg-black/40 border-green-600/30 focus:border-green-500 focus:ring-green-500 text-white placeholder-gray-400 rounded-lg"
              value={text}
              onChange={handleInputChange}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 text-gray-400 hover:text-white hover:bg-green-600/20"
              onClick={copyToClipboard}
              title="Copiar para a área de transferência"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button onClick={convertToUppercase} className="bg-green-600 hover:bg-green-700">
              <Type className="mr-2 h-4 w-4" />
              MAIÚSCULO
            </Button>
            <Button onClick={convertToLowercase} className="bg-blue-600 hover:bg-blue-700">
              <Type className="mr-2 h-4 w-4" />
              minúsculo
            </Button>
            <Button onClick={convertToAlternating} className="bg-purple-600 hover:bg-purple-700">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              AlTerNadO
            </Button>
            <Button onClick={reverseText} className="bg-red-600 hover:bg-red-700">
              <TextQuote className="mr-2 h-4 w-4" />
              INVERTER TEXTO
            </Button>
            <Button onClick={capitalizeFirstLetterOfEachWord} className="bg-yellow-600 hover:bg-yellow-700">
              <Heading2 className="mr-2 h-4 w-4" />
              PRIMEIRA LETRA PALAVRA
            </Button>
            <Button onClick={capitalizeFirstLetterOfSentence} className="bg-pink-600 hover:bg-pink-700">
              <Heading1 className="mr-2 h-4 w-4" />
              PRIMEIRA PALAVRA FRASE
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-400">
        <p>
          Esta ferramenta processa o texto localmente no seu navegador. Nenhum dado é enviado para nossos servidores.
        </p>
      </div>
    </div>
  )
}
