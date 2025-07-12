"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Verificar se o app já está instalado
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to show install button
      setIsInstallable(true)
      // Mostrar banner após 3 segundos
      setTimeout(() => {
        setShowBanner(true)
      }, 3000)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Verificar se o app foi instalado durante a sessão
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setShowBanner(false)
      console.log("PWA was installed")
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", () => {})
    }
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
        setIsInstalled(true)
      } else {
        console.log("User dismissed the install prompt")
      }
      // Clear the saved prompt since it can't be used again
      setDeferredPrompt(null)
      setIsInstallable(false)
      setShowBanner(false)
    })
  }

  if (isInstalled) return null

  if (showBanner && isInstallable) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 shadow-lg z-50 flex items-center justify-between">
        <div className="flex items-center">
          <Download size={24} className="mr-3" />
          <div>
            <p className="font-bold">Instale nosso app</p>
            <p className="text-sm">Acesse mais rápido e offline</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowBanner(false)}
            variant="ghost"
            className="text-white hover:bg-green-700"
            size="sm"
          >
            <X size={18} />
          </Button>
          <Button onClick={handleInstallClick} className="bg-white text-green-600 hover:bg-gray-100">
            Instalar
          </Button>
        </div>
      </div>
    )
  }

  if (!isInstallable) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={handleInstallClick}
        className="bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 shadow-lg"
      >
        <Download size={16} />
        Instalar App
      </Button>
    </div>
  )
}
