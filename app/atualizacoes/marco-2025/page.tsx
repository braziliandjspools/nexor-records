"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Home, Search, Filter, ChevronDown, HelpCircle, Lock, Unlock, Copy, Check, AlertTriangle, Computer, Folder, DollarSign, Globe, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// --- ESTRUTURA DE DADOS ---
interface FolderItem {
  name: string
  link: string
  category: string
}

// --- DADOS PARA MARÇO 2025 ---
const marchFolders: FolderItem[] = [
    { name: "AFRO HOUSE", link: "https://drive.google.com/open?id=1axVgbH6hgux7uzxPEViiVtq4JD7D_ily&usp=drive_copy", category: "AFRO HOUSE" },
    { name: "ALL IN ONE PARTYBREAKS AND REMIXES", link: "https://drive.google.com/open?id=1-QWfQrS_4RUP-ccyVeLw2e5qpcoV4Czl&usp=drive_copy", category: "ALL IN ONE PARTYBREAKS" },
    { name: "AMERICA REMIX", link: "https://drive.google.com/open?id=1OnN1S2Lem5rucnH7U0J1V_KTEycFAUrr&usp=drive_copy", category: "AMERICA REMIX" },
    { name: "AXÉ", link: "https://drive.google.com/open?id=1HuixrO9Z5Ifu32OKSdojK0RAeZ26oDsw&usp=drive_copy", category: "AXÉ" },
    { name: "BACK TO THE FUTURE", link: "https://drive.google.com/open?id=1u3UQdu9hWAVT8iZP84Px__lDt6WqNoOd&usp=drive_copy", category: "BACK TO THE FUTURE" },
    { name: "BARBANGERZ", link: "https://drive.google.com/open?id=1uvuG7qclCXTISZ8dEThF2x6zn4fwho1y&usp=drive_copy", category: "BARBANGERZ" },
    { name: "BEATFREAKZ", link: "https://drive.google.com/open?id=1Y-xwpet_kyofOv4KUlgOEeWBkyJL5xo-&usp=drive_copy", category: "BEATFREAKZ" },
    { name: "BOOTLEGS", link: "https://drive.google.com/open?id=1DSw_4V6HinYElMgVXUW6jyKrHB9TtUq2&usp=drive_copy", category: "BOOTLEGS" },
    { name: "BPM SUPREME", link: "https://drive.google.com/open?id=1HdHHkxX-3KGG_hiYCgCC1s_gNy0y17Fu&usp=drive_copy", category: "BPM SUPREME" },
    { name: "CLUB KILLERS [THROWBACK]", link: "https://drive.google.com/open?id=1-lfxkC4DyOlN6_QcvCboxpZxIrnXUB5Y&usp=drive_copy", category: "CLUB KILLERS" },
    { name: "CRACK 4 DJS", link: "https://drive.google.com/open?id=1SAPcnUNMocuQcS3f_CYVkCEdb55LZafI&usp=drive_copy", category: "CRACK 4 DJS" },
    { name: "CRATE GANG", link: "https://drive.google.com/open?id=1Y0DJkpTOxBQmvvwhkmwyHjGBhsFQFOrP&usp=drive_copy", category: "CRATE GANG" },
    { name: "CROOKLYN CLAN", link: "https://drive.google.com/open?id=1TocdslFpwta0UsxwygQm6Nnh5uCUkagX&usp=drive_copy", category: "CROOKLYN CLAN" },
    { name: "CUBA REMIX", link: "https://drive.google.com/open?id=1HQ1Mq-d5aOhx-XOcD5T8LjNhhgMfoM-n&usp=drive_copy", category: "CUBA REMIX" },
    { name: "DALE MAS BAJO", link: "https://drive.google.com/open?id=1Jd98dzLrv7nO72UlwJ5c-AEEKp2lLrRj&usp=drive_copy", category: "DALE MAS BAJO" },
    { name: "DANCE GOSPEL", link: "https://drive.google.com/open?id=1_N225zmNlVXeikq0s1jfwAy2j3zQV7VY&usp=drive_copy", category: "GOSPEL" },
    { name: "DEFECTED BEST HOUSE & CLUB TRACKS", link: "https://drive.google.com/open?id=1ACuIFvttPf9EmzCPBfXrIBUEGk6YfTuF&usp=drive_copy", category: "DEFECTED" },
    { name: "DIGITAL MUSIC POOL", link: "https://drive.google.com/open?id=1xTbhulxUMwBS3VKKnFRl2p1Wlp_gDB5E&usp=drive_copy", category: "DIGITAL MUSIC POOL" },
    { name: "DIGITAL MUSIC SERVICE", link: "https://drive.google.com/open?id=1-B8gB-J1tv3n4tktMAjFpHAeOSSdOj0L&usp=drive_copy", category: "DIGITAL MUSIC SERVICE" },
    { name: "DJ ALLAN REMIX PACK", link: "https://drive.google.com/open?id=1zB5hPEXNaef_LtU2veyduGmAg_Bm6I4B&usp=drive_copy", category: "DJ ALLAN" },
    { name: "DJ ARMAN AVEIRU REMIX PACK", link: "https://drive.google.com/open?id=1UrBRae7QfrX3dEGfVf6GhlFvrkdQINAG&usp=drive_copy", category: "DJ ARMAN AVEIRU" },
    { name: "DJ CITY", link: "https://drive.google.com/open?id=1t-NzKrcyB6XRWs5fQCmMXQdnzcAOT5wQ&usp=drive_copy", category: "DJ CITY" },
    { name: "DJ DARK XTDS REMIXES", link: "https://drive.google.com/open?id=1ukLdufCwleM8mXUDUnfTp2KRv4NzszTP&usp=drive_copy", category: "DJ DARK" },
    { name: "DJ JEFF REMIX PACK", link: "https://drive.google.com/open?id=19T2RLIWFjDPG5GRKlkqGVHtyfFybPZwt&usp=drive_copy", category: "DJ JEFF" },
    { name: "DJ MHARK REMIX PACK", link: "https://drive.google.com/open?id=1gKoBiRBjp_A5_uIKOoCaIHcb8Qxiy4MK&usp=drive_copy", category: "DJ MHARK" },
    { name: "DJ NASA REMIX PACK", link: "https://drive.google.com/open?id=1AzlF11ONldOdsXv7kGeWKPFPn78iwpiO&usp=drive_copy", category: "DJ NASA" },
    { name: "DJ OD REMIX PACK", link: "https://drive.google.com/open?id=19_WnvyBBiZ05XJkD5uy0Q7oiHGkRWPs6&usp=drive_copy", category: "DJ OD" },
    { name: "DOING THE DAMAGE", link: "https://drive.google.com/open?id=1C8LqV8OtFuRNWynD69hWEoeMJ06RMIpH&usp=drive_copy", category: "DOING THE DAMAGE" },
    { name: "EXTENDED LATINO", link: "https://drive.google.com/open?id=1A2em0v3hPZUxYvKCaWAE4XWCsUeOASvf&usp=drive_copy", category: "EXTENDED LATINO" },
    { name: "EXTENDEDS", link: "https://drive.google.com/open?id=1CtbPz0WvXaiflqdvKFobsVM150HveNt8&usp=drive_copy", category: "EXTENDEDS" },
    { name: "HYPE JAMS MEGAPACK", link: "https://drive.google.com/open?id=1niwmEkjKdYmICaCsh2sFReImWElMnAzC&usp=drive_copy", category: "HYPE JAMS" },
    { name: "HYPERZ", link: "https://drive.google.com/open?id=1Es2TDElGo2PE_Ejf14JRaWGLYL55Me3U&usp=drive_copy", category: "HYPERZ" },
    { name: "JUST PLAY", link: "https://drive.google.com/open?id=1aV-UXyY2L5CaTqh29vc1VLTzgCVYOmFv&usp=drive_copy", category: "JUST PLAY" },
    { name: "KLAAS XTDS REMIX", link: "https://drive.google.com/open?id=11cV6QN5nyvGrYBy7jzQ4r4vSIddBgQJR&usp=drive_copy", category: "KLAAS" },
    { name: "LATIN BOX", link: "https://drive.google.com/open?id=1I-6t0jDedzBPmEeFzgPHiwAfYIz928rh&usp=drive_copy", category: "LATIN BOX" },
    { name: "LATIN THROWBACK", link: "https://drive.google.com/open?id=1wMP3PaiWzh1tzzDS-PHHZrr_H8J2QY67&usp=drive_copy", category: "LATIN THROWBACK" },
    { name: "MADE IN BRAZIL", link: "https://drive.google.com/open?id=1n2N5piApE348myQbUsRQPwGB2Qt3GNmy&usp=drive_copy", category: "MADE IN BRAZIL" },
    { name: "MASTERMIX PRO DISC PLUS 2025", link: "https://drive.google.com/open?id=1xKud2ECNLuCGm1nWcl0-JY8nEM8WIGZQ&usp=drive_copy", category: "MASTERMIX" },
    { name: "MIXINIT - CLAUDIO D FREESTYLE MINI MIXES", link: "https://drive.google.com/open?id=1gv46y3T2AFMFirJ1eP7XtSIHAJQWLWQt&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - CLAUDIO D THE BEST OF K. DOT [KENDRICK LAMAR]", link: "https://drive.google.com/open?id=1Z8ldh90VjjrjXgWSLgvHFmiH1S4_Yuqq&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - COLLINI BIG ROOM BANGERS VOL. 15", link: "https://drive.google.com/open?id=1dWTt2uT4R1epSIU6ncnQ_WFw8OM-M9bI&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - CROOKLYN CLAN 2K10'S PARTY HITS VOL. 7", link: "https://drive.google.com/open?id=1JdmM1xSbinj5mri5VnietvU4p5MJJCBz&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - SIZZAHANDZ ACTION DISCO WARPS VOL. 1", link: "https://drive.google.com/open?id=1dkIQmNyMX3Zn_WUciKpfEcL8Z_5QO2Jz&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - SIZZAHANDZ ACTION DISCO WARPS VOL. 3", link: "https://drive.google.com/open?id=1vXxR5ila8YCYWroKwtkJEfEO2GQxZNMn&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - STARJACK 2000’S WEDDING HITS VOL. 2", link: "https://drive.google.com/open?id=1hW2WRL37LiJ-a5pQ22z3F0ylBdrZYOT0&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - STARJACK EDM WEDDING HITS VOL. 2", link: "https://drive.google.com/open?id=1zufQuZTksyQ3Lkwo1tVZqQ3CusPieIKL&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - STARJACK MERENGUE HITS VOL. 1", link: "https://drive.google.com/open?id=1UAptg0b1oRLCgJQbZgAzHOoQ8P44bGZS&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - TJ THE DJ THE STATE OF POP [2009]", link: "https://drive.google.com/open?id=1hSCKp081mceK1yjwQ6Koo4_ZM6RppB5z&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXSHOW EDITS", link: "https://drive.google.com/open?id=11pvtJS6m5nMDCrDa-_wtldCGlKZAE3pk&usp=drive_copy", category: "MIXSHOW" },
    { name: "MIXSHOW MEGAPACK", link: "https://drive.google.com/open?id=1w0QkFvtjvGpNTa1hj8lsOS4OhyfOnveW&usp=drive_copy", category: "MIXSHOW" },
    { name: "MOOMBAHTON MEGAPACK", link: "https://drive.google.com/open?id=1eiURTxpw5oCRbBfIDP93Z4tXIpitjW0k&usp=drive_copy", category: "MOOMBAHTON" },
    { name: "MY MP3 POOL", link: "https://drive.google.com/open?id=1zvKOu5O6XxpQ85xPx4KOMyqZxclA_CNy&usp=drive_copy", category: "MY MP3 POOL" },
    { name: "PACK 80'S", link: "https://drive.google.com/open?id=1K8AqZK3PiBN1BSRfHuNwGnytIJYEo7OQ&usp=drive_copy", category: "PACK 80'S" },
    { name: "PERU REMIX", link: "https://drive.google.com/open?id=1bEEiovMxIwOceAmZB2clzujQ_8aEqAew&usp=drive_copy", category: "PERU REMIX" },
    { name: "PETEDOWN REMIX PACK", link: "https://drive.google.com/open?id=1-URUYJUH9DXMoktLmbLa-zWUlOvQ7zLC&usp=drive_copy", category: "PETEDOWN" },
    { name: "PRO LATIN REMIX", link: "https://drive.google.com/open?id=126KFvi6MMjsjFPEpM7BZzI0m0vzYc5Zy&usp=drive_copy", category: "PRO LATIN REMIX" },
    { name: "PROMO ONLY - COUNTRY RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1DY05XmrhpiVgHxIOmQftEv1mdt3hU9wY&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - DANCE RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1FUeNWrrwhnUTsjxPS-IfgYEfAx2rNOWu&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - EXPRESS AUDIO DFF [JANUARY 2025]", link: "https://drive.google.com/open?id=1ahZYxNDRQrYKvEaZTVRs2rvitOLRfrfz&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - EXPRESS AUDIO DJ TOOLS [JANUARY 2025]", link: "https://drive.google.com/open?id=13tf3s5uzOEWG5tP2CARsFFJXr9FAyGbP&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - MAINSTREAM RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1spvpY_PMVPWKp1KkgAc18GyiKcDry6gc&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - MODERN ROCK RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=11Kv7HSdaBAV4xCclfoZfanYf8O2Ukh8h&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - POP LATIN [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1-afbuWH5ewXypKGBrvErNhtnVNAWe5Yr&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - REGIONAL LATIN [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1o4mdB2zlqlt16CKEF1uAyQ3Y-UYFURnE&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - RHYTHM CLUB [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1WDOLJU3VcMsmQuNaO6RtNbXnjwtCT4FD&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - RHYTHM RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1t8J3ZI1brul9qrg00_X6NBE6amCMx8Hs&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY - TROPICAL LATIN [FEBRUARY 2025]", link: "https://drive.google.com/open?id=17CcupnqQLTrdv2SRSPoCjW1U-xCdFD6T&usp=drive_copy", category: "PROMO ONLY" },
    { name: "REDRUMS", link: "https://drive.google.com/open?id=14fG8SpntAKt5qIPAfJlABkK0Z2HzePJv&usp=drive_copy", category: "REDRUMS" },
    { name: "REMIX PLANET", link: "https://drive.google.com/open?id=1StISakfNGNDNedk1vtA_MeTGf7a4xAcJ&usp=drive_copy", category: "REMIX PLANET" },
    { name: "RIVAS REMIX PACK", link: "https://drive.google.com/open?id=1KWEm70m2xLDgmMAg4SP1BbCbjX-4IkJV&usp=drive_copy", category: "RIVAS" },
    { name: "ROMPE DISCOTECA", link: "https://drive.google.com/open?id=1cOcchmffiwOyPqZTouTBKLwKX4bNX0J4&usp=drive_copy", category: "ROMPE DISCOTECA" },
    { name: "RUNDERGROUND", link: "https://drive.google.com/open?id=1GjsDtd_P3f5IeD3ovJWDSaCKrhDqYR94&usp=drive_copy", category: "RUNDERGROUND" },
    { name: "SEGUE MEGAPACK", link: "https://drive.google.com/open?id=1Rv5mNT7DA-kyFPjJsbeqhhbqpx-ergkG&usp=drive_copy", category: "SEGUE" },
    { name: "SERTANEJO RAÍZ", link: "https://drive.google.com/open?id=1HPkd018tltiUMHEWMzJVaose3eWXYO91&usp=drive_copy", category: "SERTANEJO" },
    { name: "SNIP HITZ", link: "https://drive.google.com/open?id=1fu3vWPPZ0RUXnlDFYpqGIZbPbSScwa7S&usp=drive_copy", category: "SNIP HITZ" },
    { name: "SPIN BACK PROMOS", link: "https://drive.google.com/open?id=12S-bfAbsxPwFspLBZPb4dxi44JxoF2hc&usp=drive_copy", category: "SPIN BACK" },
    { name: "ST PATRICKS DAY PACK", link: "https://drive.google.com/open?id=1P3_6fIpkeHx3aW2AI60N17opUVE-4j-o&usp=drive_copy", category: "ST PATRICKS DAY" },
    { name: "STARJACK MEGAPACK", link: "https://drive.google.com/open?id=1qQ4-jcGzr6Gp-nKLGHm70eGgZ0RtfL_-&usp=drive_copy", category: "STARJACK" },
    { name: "THE MASHUP", link: "https://drive.google.com/open?id=1QjDxWLsCgxoaLk8Un9cdADfRIA6A2jlO&usp=drive_copy", category: "THE MASHUP" },
    { name: "TOTALMIX - FEB 2025 PT1 DJ FMSTEFF", link: "https://drive.google.com/open?id=1mtntzyg6k8_VVOYbkQZpZvcrxAhI0YVZ&usp=drive_copy", category: "TOTALMIX" },
    { name: "TRAXSOURCE TOP 100", link: "https://drive.google.com/open?id=1umPl40iMwG7b7kTdSWArKLMl2CDLcipD&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "UNLIMITED LATIN", link: "https://drive.google.com/open?id=1oPPtlScI7erIkYj_mYRyRyyCWcAkL7y1&usp=drive_copy", category: "UNLIMITED LATIN" },
    { name: "X-MIX XPRESS", link: "https://drive.google.com/open?id=1iBO5Zuggidb7HpIRNIsUwkSjF0-IgxFt&usp=drive_copy", category: "X-MIX" },
    { name: "ZIP DJ", link: "https://drive.google.com/open?id=1YSJZADA1rj_qTmkkHuNni5cg7RkjAhpD&usp=drive_copy", category: "ZIP DJ" },
];

// Dados de configuração para o mês de Março
const marchMonthData = {
  name: 'Março 2025',
  folders: marchFolders,
  imageBanner: "https://i.ibb.co/qYN0NV90/marco2025.png",
  prevMonth: { name: "Fevereiro 2025", slug: "fevereiro-2025" },
  nextMonth: { name: "Abril 2025", slug: "abril-2025" },
};


export default function Marco2025Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(marchMonthData.folders.map((folder) => folder.category))).sort();
  }, []);

  const filteredFolders = useMemo(() => {
    let folders = marchMonthData.folders;
    if (selectedCategory !== "all") {
        folders = folders.filter(folder => folder.category === selectedCategory);
    }
    if (searchQuery.trim() !== "") {
        folders = folders.filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return folders;
  }, [searchQuery, selectedCategory]);

  const [loadingState, setLoadingState] = useState<{ id: string; state: string } | null>(null)
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleOpenLink = (id: string, link: string) => {
    setLoadingState({ id, state: "CONSULTANDO GOOGLE DRIVE" })
    setTimeout(() => {
      setLoadingState({ id, state: "LINK ENCONTRADO" })
      setTimeout(() => {
        window.open(link, "_blank")
        setLoadingState(null)
      }, 1000)
    }, 2000)
  }

  const handleCopyLink = (linkToCopy: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = linkToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        setCopiedLink(linkToCopy);
        setTimeout(() => setCopiedLink(null), 2000); // Reset after 2 seconds
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  const handleReportLink = (folderName: string) => {
    const message = `Olá! O link para a pasta "${folderName}" de Março de 2025 parece estar quebrado.`;
    const whatsappUrl = `https://wa.me/5551935052274?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Adiciona a fonte Dosis ao documento */}
      <style>
          {`
              @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap');
          `}
      </style>
      
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
            <Link href="/atualizacoes">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
            </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">{marchMonthData.name}</h1>
      </div>

      <div className="flex justify-center mb-6">
          <Image
              src={marchMonthData.imageBanner}
              alt={marchMonthData.name}
              width={800}
              height={400}
              className="max-w-full h-auto rounded-lg"
          />
      </div>

      <div className="bg-pink-600/80 border border-pink-500/50 text-white p-4 rounded-lg flex items-center justify-center text-center space-x-3 text-sm">
        <Computer className="h-6 w-6 flex-shrink-0" />
        <p>
            Para uma melhor experiência, recomendamos usar o site em um
            <strong> computador</strong> ou com seu dispositivo na
            <strong> posição horizontal</strong>.
        </p>
      </div>
      
      <div className="bg-red-900/30 border border-red-600/30 text-red-200 p-4 rounded-lg text-center mb-6 space-y-3">
        <p className="text-sm text-justify">
            A pesquisa em nosso site permite encontrar <strong>estilos musicais (pastas)</strong> de forma rápida. Para uma busca detalhada por <strong>músicas ou artistas específicos</strong>, recomendamos utilizar a pesquisa avançada diretamente no Google Drive, que oferece mais filtros e precisão.
        </p>
        <Button asChild className="bg-blue-600/80 hover:bg-blue-700/80 text-white">
            <Link href="/pesquisardrive">
                <HelpCircle className="mr-2 h-4 w-4" />
                COMO PESQUISAR NO GOOGLE DRIVE
            </Link>
        </Button>
      </div>

      <section>
        <div className="bg-black/50 border border-green-600/20 p-4 sm:p-6 rounded-lg space-y-6 mb-8">
            <div>
                <label htmlFor="search-input" className="flex items-center gap-2 mb-2 text-md font-semibold text-green-400 uppercase tracking-wider">
                    <Search className="h-5 w-5" />
                    Pesquisar Estilos
                </label>
                <Input
                    id="search-input"
                    type="search"
                    placeholder="Digite o nome de um estilo..."
                    className="w-full p-3 bg-black/60 border-2 border-green-600/30 focus:border-green-500 focus:ring-green-500 text-white placeholder-gray-400 rounded-lg text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="filter-dropdown" className="flex items-center gap-2 mb-2 text-md font-semibold text-green-400 uppercase tracking-wider">
                    <Filter className="h-5 w-5" />
                    Filtrar por Categoria
                </label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button id="filter-dropdown" variant="outline" className="w-full justify-between p-3 text-base border-2 border-green-600/30 bg-black/60 hover:bg-black/80 hover:border-green-500">
                            <span>{selectedCategory === "all" ? "Todas as categorias" : selectedCategory}</span>
                            <ChevronDown className="ml-2 h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-[300px] overflow-y-auto bg-[#0F0F10] border-green-600/30">
                        <DropdownMenuItem onClick={() => setSelectedCategory("all")}>Todas as categorias</DropdownMenuItem>
                        {uniqueCategories.map((category) => (
                        <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                            {category}
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div className="text-center my-8">
            <h3 className="text-3xl md:text-4xl font-bold uppercase">Pastas de Março 2025</h3>
        </div>

        <div className="space-y-4">
            {filteredFolders.length > 0 ? (
                filteredFolders.map((folder, idx) => {
                    const buttonId = `${folder.name}-${idx}`;
                    const isOpening = loadingState && loadingState.id === buttonId;
                    const isCopied = copiedLink === folder.link;

                    return (
                        <div key={idx} className="flex flex-col sm:flex-row items-center sm:gap-2">
                            <div className="relative flex-grow w-full">
                                <button
                                    onClick={() => handleOpenLink(buttonId, folder.link)}
                                    className="bg-gradient-to-r from-black/80 to-black/60 hover:from-green-900/20 hover:to-black/70 transition-all duration-300 p-4 rounded-md border border-green-600/20 hover:border-green-600/70 flex items-center gap-3 w-full group"
                                >
                                    <Image src="https://i.ibb.co/dwTBqG5z/pngwing-com.png" alt="Folder" width={20} height={20} className="flex-shrink-0" />
                                    <span 
                                        className="flex-1 text-center"
                                        style={{ fontFamily: 'Dosis, sans-serif', fontWeight: 300, fontSize: '15px' }}
                                    >
                                        {folder.name}
                                    </span>
                                    {isOpening ? (
                                        <Unlock className="h-4 w-4 text-green-400 animate-pulse" />
                                    ) : (
                                        <Lock className="h-4 w-4 text-gray-400 group-hover:text-green-400 transition-colors" />
                                    )}
                                </button>
                                {isOpening && (
                                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-md z-10 pointer-events-none">
                                        <div className="text-center">
                                            <div className="animate-pulse text-green-500 font-bold">{loadingState?.state}</div>
                                            <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                                                <div className="bg-green-500 h-full rounded-full animate-loader"></div>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleCopyLink(folder.link)}
                                    className={`flex-shrink-0 border-green-600/30 hover:bg-green-600/20 ${isCopied ? 'bg-green-600/30' : 'bg-black/40'}`}
                                    title="Copiar link"
                                >
                                    {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleReportLink(folder.name)}
                                    className="flex-shrink-0 border-yellow-600/30 text-yellow-500 hover:bg-yellow-600/20 hover:text-yellow-400 bg-black/40"
                                    title="Reportar link quebrado"
                                >
                                    <AlertTriangle className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    );
                })
            ) : (
                 <Alert className="bg-yellow-900/20 border-yellow-600/30 text-yellow-200">
                    <AlertDescription>
                        Nenhum resultado encontrado para os filtros aplicados. Tente outros termos ou remova os filtros.
                    </AlertDescription>
                </Alert>
            )}
        </div>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="https://drive.google.com/drive/folders/1jGt8UYKgfXVpB8u3xEnznQWcyOLJVSIc?usp=drive_link" target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    BAIXAR PASTA COMPLETA
                </Button>
            </Link>
            <Link href="https://djjessica.vercel.app/servicos/musicas-eletronicas" target="_blank" rel="noopener noreferrer">
                <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    SEM ACESSO? ASSINE
                </Button>
            </Link>
        </div>

      </section>

      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-green-600/30 p-4 z-20">
        <div className="container mx-auto flex justify-center items-center gap-2 sm:gap-4">
            {marchMonthData.prevMonth ? (
                <Link href={`/atualizacoes/${marchMonthData.prevMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {marchMonthData.prevMonth.name}
                    </Button>
                </Link>
            ) : (
                <Button variant="outline" className="border-gray-600/50" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                </Button>
            )}
            <Link href="/atualizacoes" passHref>
                <Button variant="secondary" className="bg-green-600 hover:bg-green-700">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
            {marchMonthData.nextMonth ? (
                <Link href={`/atualizacoes/${marchMonthData.nextMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        {marchMonthData.nextMonth.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            ) : (
                 <Button variant="outline" className="border-gray-600/50" disabled>
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
        </div>
      </footer>
    </div>
  )
}
