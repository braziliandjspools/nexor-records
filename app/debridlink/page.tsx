"use client"

import Link from "next/link"
import {
  LinkIcon, Zap, Sparkles, DownloadCloud, GaugeCircle, ShieldOff,
  ServerCog, FileVideo, CloudCog, Lock, Check, MessageCircle,
  ExternalLink, ArrowRight, ArrowDownCircle, ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ReactNode } from "react"
import { motion } from "framer-motion"

// --- Componentes de Card (sem alterações) ---

const FeatureCard = ({ icon, title, description }: { icon: ReactNode; title: string; description: string }) => (
  <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-green-400/50 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-green-500/10 lg:hover:scale-105 h-full">
    <div className="mb-4 text-green-400">{icon}</div>
    <h3 className="mb-2 text-lg font-bold uppercase tracking-wider text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-slate-400">{description}</p>
  </div>
)

const StepCard = ({ icon, title, description }: { icon: ReactNode; title: string; description: string }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center transition-all duration-300 hover:scale-105 hover:bg-slate-800/80 h-full">
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-green-400">
      {icon}</div>
    <h3 className="mb-3 text-xl font-semibold uppercase text-white">{title}</h3>
    <p className="text-base text-slate-400">{description}</p>
  </div>
)

const PricingCard = ({
  serviceName, logoSrc, price, period, features, isRecommended,
}: { serviceName: string; logoSrc?: string; price: string; period: string; features: string[]; isRecommended?: boolean; }) => (
  <div
    className={`relative flex h-full flex-col rounded-2xl border p-8 text-center transition-all duration-300 ${isRecommended ? "border-2 border-green-500 bg-slate-900 shadow-2xl shadow-green-500/20" : "border-slate-800 bg-slate-900/50"}`}
  >
    {isRecommended && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 transform rounded-full bg-green-500 px-4 py-1 text-sm font-bold uppercase text-white">
        A Solução Definitiva
      </span>
    )}
    <div className="mb-6 flex-grow flex items-center justify-center">
      {logoSrc ? (<Image src={logoSrc} alt={`${serviceName} Logo`} width={140} height={45} className="mx-auto" unoptimized/>) : (<h3 className="text-3xl font-bold uppercase tracking-widest text-green-400">{serviceName}</h3>)}
    </div>
    <div className="mb-6">
      <div className={`text-5xl font-black ${isRecommended ? "text-green-400" : "text-red-400"}`}>{price}</div>
      <p className="text-slate-400">{period}</p>
    </div>
    <ul className="space-y-3 text-slate-400">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center justify-center">
          {isRecommended && <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-400" />}
          <span className={isRecommended ? "text-slate-300" : "text-slate-500"}>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
)

// --- Componente Principal da Página ---

export default function DebridLinkPage() {
  const topFeatures = [
    { icon: <ServerCog className="h-10 w-10" />, title: "Suporte a +150 Hosters", description: "Com uma única conta, acesse dezenas de servidores de arquivos como se fosse premium em todos." },
    { icon: <GaugeCircle className="h-10 w-10" />, title: "Velocidade Irrestrita", description: "Baixe na máxima velocidade da sua conexão, sem gargalos ou limitações artificiais." },
    { icon: <CloudCog className="h-10 w-10" />, title: "Conversor de Torrents", description: "Converta arquivos torrent em links de download direto, baixando com privacidade e velocidade." },
    { icon: <ShieldOff className="h-10 w-10" />, title: "100% Livre de Anúncios", description: "Navegue e baixe em um ambiente limpo, sem pop-ups, banners ou qualquer tipo de distração irritante." },
  ]

  const steps = [
    { icon: <LinkIcon className="h-8 w-8" />, title: "1. Cole o Link", description: "Copie o link do arquivo que você deseja baixar de qualquer um dos +150 servidores suportados." },
    { icon: <Zap className="h-8 w-8" />, title: "2. Acesso Premium", description: "Nós usamos nossas contas premium para acessar e baixar o arquivo instantaneamente para nossa nuvem." },
    { icon: <Sparkles className="h-8 w-8" />, title: "3. Link Gerado", description: "Geramos um link de download exclusivo para você: limpo, seguro e sem as restrições do original." },
    { icon: <Lock className="h-8 w-8" />, title: "4. Privacidade Garantida", description: "Seu novo link é anônimo. Nós protegemos sua identidade, escondendo seu IP do host de origem." },
    { icon: <FileVideo className="h-8 w-8" />, title: "5. Assista na Hora", description: "Faça o streaming de vídeos instantaneamente pelo nosso player, sem precisar baixar o arquivo completo." },
    { icon: <DownloadCloud className="h-8 w-8" />, title: "6. Baixe no Máximo", description: "Use o novo link para baixar na máxima velocidade da sua internet, sem anúncios ou interrupções." },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white">
      {/* Cabeçalho Adicionado */}
      <div className="flex items-center gap-2 mb-6 pt-8 px-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Debrid-Link</h1>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-12 text-center">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-500/50 blur-[150px]"></div>
          </div>
          <div className="container relative z-10 mx-auto px-6">
            <div className="mx-auto max-w-5xl">
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
                Acelere Seus Downloads para a{" "}
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  Velocidade Máxima
                </span>
              </h1>
              <p className="mx-auto mt-3 max-w-3xl text-lg text-slate-300 md:text-xl">
                Acesse mais de 150 provedores de hospedagem com uma única conta. Cole seus links e baixe ou
                transmita instantaneamente, sem esperas e com performance total.
              </p>
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg" className="group rounded-full bg-green-500 px-8 py-6 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500/40">
                  <a href="https://debrid-link.com/id/QgHfc" target="_blank" rel="noopener noreferrer">
                    Comece Agora
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
              <div className="relative mx-auto mt-16 max-w-5xl">
                <div className="absolute -inset-2 z-0 rounded-2xl bg-gradient-to-r from-green-500/50 to-teal-500/50 opacity-20 blur-xl"></div>
                <Image src="/images/debrid-macbook.webp" alt="Interface do Debrid-Link em MacBook" width={1200} height={600} className="relative z-10 w-full h-auto rounded-2xl shadow-2xl" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="how-it-works" className="py-16 -mt-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
                Tudo em 6 Passos Simples
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-400">
                Nosso processo é desenhado para ser rápido, intuitivo e poderoso.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StepCard {...step} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Preços */}
        <section id="pricing" className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
                Quatro Problemas.{" "}
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  Uma Solução.
                </span>
              </h2>
              <p className="mx-auto mt-3 mb-2 max-w-3xl text-slate-400">
                Pagar por serviços individuais é caro e ineficiente. Veja como o Debrid-Link unifica tudo com um custo-benefício imbatível.
              </p>
            </div>
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <PricingCard serviceName="Mega.nz" logoSrc="/images/mega-logo.svg" price="R$ 32" period="por mês" features={["Apenas 1 TB de transferência", "Velocidade limitada", "Acesso a 1 hoster"]} />
                <PricingCard serviceName="Filecat" logoSrc="/images/filecat-logo.svg" price="R$ 95" period="por mês" features={["Plano de 30 dias", "Apenas 1 hoster", "Preço elevado por 1 serviço"]} />
                <PricingCard serviceName="Turbobit" logoSrc="https://turbobit.me/wp-content/uploads/2019/09/logo-e1567507204298.png" price="R$ 53,84" period="por mês" features={["Apenas 600 GB de transferência", "Velocidade ilimitada", "Acesso a 1 hoster (turbobit)"]} />
                <PricingCard serviceName="Tezfiles" logoSrc="https://filesearch.link/wp-content/uploads/2022/07/tezfiles.svg" price="R$ 81" period="por mês" features={["Apenas 20 GB de transferência/dia", "Velocidade limitada", "Acesso a 1 hoster (tezfiles)"]} />
              </div>

              <motion.div
                className="my-6 flex justify-center text-center text-slate-600"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDownCircle className="h-12 w-12 text-green-500" />
              </motion.div>

              <div className="mx-auto max-w-md">
                <PricingCard serviceName="Debrid-Link" price="R$ 25" period="por mês (média)" features={["Downloads ILIMITADOS", "Velocidade MÁXIMA da sua internet", "Suporte a +150 servidores", "TODOS os hosts acima inclusos"]} isRecommended />
              </div>
            </div>
          </div>
        </section>


        {/* Recursos */}
        <section id="features" className="bg-gray-900/50 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
                Recursos que{" "}
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  Impressionam
                </span>
              </h2>
              <p className="mx-auto mt-3 mb-12 max-w-3xl text-slate-400">
                Focamos no que realmente importa para uma experiência de download superior.
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              {topFeatures.map((feature, index) => (
                   <motion.div
                   key={index}
                   variants={cardVariants}
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: true, amount: 0.3 }}
                   transition={{ duration: 0.5, delay: index * 0.1 }}
                 >
                   <FeatureCard {...feature} />
                 </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold uppercase tracking-wider text-white md:text-4xl">
                Diga Adeus à Frustração.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-300">
                Junte-se a milhares de usuários satisfeitos. Crie sua conta e comece a baixar sem limites hoje
                mesmo.
              </p>
              <div className="mt-6">
                <Button asChild size="lg" className="group rounded-full bg-green-500 px-10 py-7 text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500/40">
                  <a href="https://debrid-link.com/id/QgHfc" target="_blank" rel="noopener noreferrer">
                    Criar Minha Conta Agora
                    <ExternalLink className="ml-3 h-6 w-6" />
                  </a>
                </Button>
              </div>
              <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
                <div className="flex flex-col items-center justify-center sm:flex-row">
                  <MessageCircle className="mb-4 h-8 w-8 flex-shrink-0 text-green-400 sm:mb-0 sm:mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Não tem cartão internacional?</h3>
                    <p className="text-slate-400">Compre via PIX diretamente conosco pelo WhatsApp.</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="group rounded-full border-2 border-green-500/80 bg-transparent px-6 py-5 font-bold text-green-400 transition-all duration-300 hover:border-green-500 hover:bg-green-500 hover:text-white">
                    <a href="https://wa.me/5551935052274?text=Olá,%20gostaria%20de%20comprar%20uma%20conta%20Debrid-Link" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Falar no WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer Removido */}
    </div>
  )
}
