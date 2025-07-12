"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, CheckCircle, Lock, Key, Minus, Info, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function DeemixGerenciar() {
  const [copied, setCopied] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos
  const [isPasswordWrong, setIsPasswordWrong] = useState(false)

  const arlPremium320 = "048bf08a0ad1e6f2cac6a80cea2aeab3c001e355054391fb196b388ecc19c6e72b1c790a2803788084ae8132a9f28b69704ab230c6450bb7fdd1d186fb51e7349bf536d4116e0c12d8f0e888c8c42f8f01953cddf587eca8b4f257396915225e"
  const arlPremium128 = "0f496e78759765c244468a663840eee11b0b41a498fafe253c7fcc084da45066436919fad08b764e531cc8883b200cf7cad711265fac2550be0a78b0e21cd182551c5eea9cff74c327dd83c94576591d57ed6e2e4cfba2cb63947168f7c4a469"
  const spotifyClientId = "c1cd0ffbb99c41ac8a17bc329d1105d5"
  const spotifyClientSecret = "d8db5aeefe6e439a951e5da66f392889"
  const spotifyUser = "31psvp6pv6rhvjz7zfkcn4bv2ksm"

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isUnlocked && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsUnlocked(false)
      setTimeLeft(300)
    }
    return () => clearInterval(timer)
  }, [isUnlocked, timeLeft])

  const handleUnlock = () => {
    // Lembre-se de usar uma senha segura
    if (password === "JMgQuuKI1LDiXBm") {
      setIsUnlocked(true)
      setTimeLeft(300)
      setIsPasswordWrong(false)
    } else {
      setIsPasswordWrong(true)
    }
    setPassword("")
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }


  return (
    <div className="bg-slate-950 text-white min-h-screen py-12">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild className="bg-slate-900 border-slate-700 hover:bg-slate-800 flex-shrink-0">
              <Link href="/deemix">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
            <h1 className="font-bebas-neue text-[38px] tracking-wider">Gerenciar Deemix</h1>
          </div>

        <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
                <CardTitle className="font-bebas-neue text-3xl tracking-wider text-center">Área do Cliente</CardTitle>
            </CardHeader>
            <CardContent>
                {isUnlocked ? (
                  <div className="space-y-6">
                    <div className="bg-slate-800/70 rounded-lg p-3 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-sm text-yellow-400">
                            <Timer size={16}/>
                            <span>Sessão expira em: {formatTime(timeLeft)}</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${(timeLeft / 300) * 100}%` }}
                          ></div>
                        </div>
                         <p className="text-xs text-green-400 pt-2">ARLS ATUALIZADAS EM: 04/07/2025 ÀS 21:28</p>
                    </div>

                    <Tabs defaultValue="arl" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                        <TabsTrigger value="arl">ARLs Deezer</TabsTrigger>
                        <TabsTrigger value="spotify">Chaves Spotify</TabsTrigger>
                      </TabsList>
                      <TabsContent value="arl" className="space-y-4 pt-4">
                        <Card className="border-blue-600/30 bg-black/50">
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="font-bebas-neue text-2xl">ARL PREMIUM</CardTitle>
                            <Badge className="bg-blue-500 text-white text-xs">FLAC / 320kbps</Badge>
                          </CardHeader>
                          <CardContent className="flex flex-col sm:flex-row gap-2">
                            <Input value={arlPremium320} readOnly className="bg-gray-800/50 border-blue-600/30 text-sm"/>
                            <Button onClick={() => copyToClipboard(arlPremium320, "arl320")} className="bg-blue-600 hover:bg-blue-700 font-bebas-neue w-full sm:w-auto">
                               {copied === "arl320" ? <><CheckCircle className="mr-2" size={16}/>COPIADO!</> : <><Copy className="mr-2" size={16}/>COPIAR</>}
                            </Button>
                          </CardContent>
                        </Card>
                         <Card className="border-pink-600/30 bg-black/50">
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="font-bebas-neue text-2xl">ARL PADRÃO</CardTitle>
                            <Badge className="bg-pink-500 text-white text-xs">128kbps</Badge>
                          </CardHeader>
                          <CardContent className="flex flex-col sm:flex-row gap-2">
                            <Input value={arlPremium128} readOnly className="bg-gray-800/50 border-pink-600/30 text-sm"/>
                            <Button onClick={() => copyToClipboard(arlPremium128, "arl128")} className="bg-pink-600 hover:bg-pink-700 font-bebas-neue w-full sm:w-auto">
                              {copied === "arl128" ? <><CheckCircle className="mr-2" size={16}/>COPIADO!</> : <><Copy className="mr-2" size={16}/>COPIAR</>}
                            </Button>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="spotify" className="space-y-4 pt-4">
                        <Card className="border-green-600/30 bg-black/50">
                          <CardHeader className="pb-2"><CardTitle className="font-bebas-neue text-xl">SPOTIFY CLIENT ID</CardTitle></CardHeader>
                          <CardContent className="flex flex-col sm:flex-row gap-2">
                            <Input value={spotifyClientId} readOnly className="bg-gray-800/50 border-green-600/30 text-sm"/>
                            <Button onClick={() => copyToClipboard(spotifyClientId, "clientId")} className="bg-green-600 hover:bg-green-700 font-bebas-neue w-full sm:w-auto">
                              {copied === "clientId" ? <><CheckCircle className="mr-2" size={16}/>COPIADO!</> : <><Copy className="mr-2" size={16}/>COPIAR</>}
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="border-green-600/30 bg-black/50">
                          <CardHeader className="pb-2"><CardTitle className="font-bebas-neue text-xl">SPOTIFY CLIENT SECRET</CardTitle></CardHeader>
                          <CardContent className="flex flex-col sm:flex-row gap-2">
                            <Input value={spotifyClientSecret} readOnly className="bg-gray-800/50 border-green-600/30 text-sm"/>
                            <Button onClick={() => copyToClipboard(spotifyClientSecret, "clientSecret")} className="bg-green-600 hover:bg-green-700 font-bebas-neue w-full sm:w-auto">
                              {copied === "clientSecret" ? <><CheckCircle className="mr-2" size={16}/>COPIADO!</> : <><Copy className="mr-2" size={16}/>COPIAR</>}
                            </Button>
                          </CardContent>
                        </Card>
                         <Card className="border-green-600/30 bg-black/50">
                          <CardHeader className="pb-2"><CardTitle className="font-bebas-neue text-xl">SPOTIFY USER (OPCIONAL)</CardTitle></CardHeader>
                          <CardContent className="flex flex-col sm:flex-row gap-2">
                            <Input value={spotifyUser} readOnly className="bg-gray-800/50 border-green-600/30 text-sm"/>
                            <Button onClick={() => copyToClipboard(spotifyUser, "user")} className="bg-green-600 hover:bg-green-700 font-bebas-neue w-full sm:w-auto">
                              {copied === "user" ? <><CheckCircle className="mr-2" size={16}/>COPIADO!</> : <><Copy className="mr-2" size={16}/>COPIAR</>}
                            </Button>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center space-y-4 p-4 md:p-8">
                      <Lock className="h-12 w-12 text-yellow-400" />
                      <h3 className="font-bebas-neue text-2xl tracking-wider">Área Protegida</h3>
                      <p className="text-slate-400 max-w-md">
                        Digite a senha fornecida no seu e-mail de boas-vindas para acessar as chaves de configuração.
                      </p>
                      <div className="flex w-full max-w-sm gap-2 pt-4">
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Sua senha de acesso"
                          className={`bg-slate-800/50 border-slate-700 focus:border-yellow-500 ${isPasswordWrong ? "border-red-500" : ""}`}
                          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                        />
                        <Button onClick={handleUnlock} className="bg-yellow-600 hover:bg-yellow-700 text-black">
                          <Key size={16} />
                        </Button>
                      </div>
                      {isPasswordWrong && <p className="text-red-500 text-sm">Senha incorreta. Tente novamente.</p>}
                  </div>
                )}
            </CardContent>
        </Card>
       </div>
    </div>
  )
}
