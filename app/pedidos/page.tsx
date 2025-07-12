"use client"

import Link from "next/link"
import { ArrowLeft, FileText, CheckCircle, Clock, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Pedidos() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-pink-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Pedidos</h1>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-pink-300 mb-2">Pedidos Personalizados para Usuários VIP</h2>
          <p className="text-gray-300">Este é o seu canal direto para solicitar músicas, remixes e packs exclusivos.</p>
        </div>

        <hr className="border-pink-600/30" />

        <Card className="border-pink-600/30 bg-black/50">
          <CardHeader>
            <CardTitle className="text-center">Um Serviço Exclusivo para Assinantes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-justify">
              A N3XOR RECORDS oferece um serviço exclusivo para nossos assinantes VIP: a possibilidade de solicitar
              músicas e packs personalizados que serão incluídos nas atualizações mensais. Entendemos que cada DJ tem
              necessidades específicas e gostos musicais únicos, por isso criamos este espaço para que você possa
              influenciar diretamente o conteúdo que disponibilizamos.
            </p>
            <p className="text-gray-300 text-justify mt-4">
              Os pedidos são processados por ordem de chegada e incluídos nas atualizações mensais subsequentes,
              dependendo da complexidade e disponibilidade do material solicitado. Usuários VIP têm prioridade no
              atendimento e recebem notificações quando seus pedidos são atendidos.
            </p>
          </CardContent>
        </Card>

        <Card className="border-pink-600/30 bg-black/50">
          <CardHeader>
            <CardTitle className="text-center">Como Funciona:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Clique no botão abaixo para abrir o formulário e detalhar seu pedido.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Nossa equipe avaliará a viabilidade e o prazo para atendimento.</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Seu pedido será incluído em uma das próximas atualizações mensais.</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Você receberá uma notificação por e-mail quando o conteúdo estiver disponível.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Botão para abrir o formulário em nova aba */}
        <div className="text-center pt-6">
            <Button asChild size="lg" className="group bg-pink-600 px-10 py-7 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-pink-700 hover:shadow-2xl hover:shadow-pink-500/40">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdizHAFQOIHmyM7-fwX4HcmgSeuJWs4TJstEVIzZ6-c-_3KIw/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                    ABRIR FORMULÁRIO DE PEDIDO
                    <ExternalLink className="ml-3 h-5 w-5" />
                </a>
            </Button>
        </div>

        <Alert className="border-yellow-600/50 bg-yellow-950/20">
          <AlertDescription className="text-yellow-200">
            Lembre-se que alguns conteúdos podem estar sujeitos a restrições de direitos autorais ou disponibilidade.
            Faremos o possível para atender a todos os pedidos, mas não podemos garantir que todos serão atendidos
            integralmente.
          </AlertDescription>
        </Alert>
        
      </div>
    </div>
  )
}
