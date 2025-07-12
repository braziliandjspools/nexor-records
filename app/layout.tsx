import type React from "react"
import { Suspense } from "react"
import Image from "next/image"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Loader } from "@/components/loader"
import { PwaInstallButton } from "@/components/pwa-install-button"
import { Poppins, Kanit } from "next/font/google"
import "./globals.css"

// --- IMPORTAÇÕES DO CLERK ---
import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from "@clerk/localizations"

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "N3XOR RECORDS - Plataforma VIP",
  description: "Plataforma VIP de download para DJs profissionais com acesso a pools exclusivos, remixes e edits.",
  manifest: "/manifest.json",
  themeColor: "#22c55e",
  // ... (o resto dos seus metadados)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="theme-color" content="#22c55e" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        </head>
        <body
          className={`${kanit.variable} ${poppins.variable} font-poppins bg-gradient-to-br from-pink-600 via-[#0F0F10] to-[#0F0F10] min-h-screen`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Suspense fallback={<div className="h-1 bg-green-500/30 w-full fixed top-0 z-[9999]"></div>}>
              <Loader />
            </Suspense>
            <div className="relative">
              <Header />
              <main className="pt-20 pb-10">
                <div className="max-w-[800px] mx-auto bg-[#0F0F10]/90 text-white p-6 rounded-lg shadow-2xl backdrop-blur-sm border border-pink-600/10">
                  {children}
                </div>
              </main>
              <Footer />
              <PwaInstallButton />
              <a
                href="https://wa.me/551935052274"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors duration-300 hover:scale-110"
              >
                <div className="relative w-8 h-8">
                  <Image src="https://i.ibb.co/Gv7T2pNS/whatsapp.png" alt="WhatsApp" fill className="object-contain" />
                </div>
              </a>
            </div>
          </ThemeProvider>

          {/* --- INÍCIO: SCRIPT TAWK.TO --- */}
          {/* Este script será carregado após a página se tornar interativa, para não atrasar o carregamento inicial. */}
          <Script
            id="tawk-to-script"
            strategy="afterInteractive"
          >
            {`
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6872e7e08a0a5f1914737f11/1j00dji02';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `}
          </Script>
          {/* --- FIM: SCRIPT TAWK.TO --- */}
          
          <Script id="register-sw" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', async function() {
                  try {
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    window.addEventListener('beforeinstallprompt', (e) => {
                      e.preventDefault();
                      window.deferredPrompt = e;
                      console.log('App is installable! Show install button.');
                    });
                  } catch (error) {
                    console.error('ServiceWorker registration failed: ', error);
                  }
                });
              }
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  )
}
