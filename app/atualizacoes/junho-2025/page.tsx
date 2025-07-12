"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Home, Search, Filter, ChevronDown, HelpCircle, Lock, Unlock, Copy, Check, AlertTriangle, Computer, Folder, DollarSign } from "lucide-react"
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

// --- DADOS PARA JUNHO 2025 ---
const juneFolders: FolderItem[] = [
    { name: "2024 - BEATPORTAL'S 50 FAVOURITE TRACKS", link: "https://drive.google.com/open?id=1Ixpp-mMBbSyO-a7ppof6ZGLcAfJs_V5j&usp=drive_copy", category: "BEATPORT" },
    { name: "270 DJ LOADED - THE VINYL GROOVE", link: "https://drive.google.com/open?id=1_saqwrVq2iUdZva9Gy5orghciYMofpuK&usp=drive_copy", category: "DJ LOADED" },
    { name: "8 YEARS SYNTH COLLECTIVE", link: "https://drive.google.com/open?id=1Wrd9yHSHkgOlk1i8VrZsfcyrDrsb06l5&usp=drive_copy", category: "SYNTH" },
    { name: "ANOTHER WORD FOR SOUL, VOL. 3", link: "https://drive.google.com/open?id=1ilWIDN1tA4kBn4MW6LN43SsGqg_gcfSO&usp=drive_copy", category: "SOUL" },
    { name: "BACK TO THE FUTURE", link: "https://drive.google.com/open?id=1tQlt85w67_uAtLfnteJrgIoFMVDC__Mb&usp=drive_copy", category: "BACK TO THE FUTURE" },
    { name: "BEATFREAKZ", link: "https://drive.google.com/open?id=1utBlIwILgo3hH_4UFR9qkmEzxdA9YHjg&usp=drive_copy", category: "BEATFREAKZ" },
    { name: "BEATPORT BEST NEW AMAPIANO", link: "https://drive.google.com/open?id=1E1PugOF1JxLKavv-jongjxa9Q_I2d3J8&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT BEST NEW HYPE", link: "https://drive.google.com/open?id=1mmMpxfeKteaSGGEoFK9dp7soy-WYil3c&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT BEST NEW PROGRESSIVE HOUSE", link: "https://drive.google.com/open?id=1xd07jjVOX4XhGXvL1Uq52LDnYq3vyqd5&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT BEST NEW TECH HOUSE", link: "https://drive.google.com/open?id=1J1A2BAMxxVcZu7kLf1NQUvQtWR4MY1Ft&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT EXCLUSIVE COLLECTIONS MAY 2025", link: "https://drive.google.com/open?id=1UmwYN10EiIq5jNSy78a1S-k332r8qAdg&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT HYPE SONGS & DJ TRACKS JUNE 2025", link: "https://drive.google.com/open?id=19_rrZQeA7hxpwIdH2JHbC-9qzHLYz5TC&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT IMPACT SHAPING THE SOUND OF TOMORROW", link: "https://drive.google.com/open?id=1ismXRmv5dzV9QYtae_t-dUNC7Ihl__1C&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT LEGENDS TOP 100 UNLEASHED", link: "https://drive.google.com/open?id=1GLWYXQkuS74BMAjsXYf2Uf9Nh8DxS0MF&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT MAINSTAGE TOP 100 MAY 2025", link: "https://drive.google.com/open?id=1XBu78vjzavxW7GBkyGMt16hpI88r1PYT&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT MELODIC HOUSE", link: "https://drive.google.com/open?id=117umhFQRHTRQlm3-Rl-bfBe4PEYidf9T&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT SESSIONS THE ULTIMATE 2025 MIX", link: "https://drive.google.com/open?id=1hSl73EUd_gEtikUFF7JeTzJdkk5_7kRa&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT TECH HOUSE JUNE 2025", link: "https://drive.google.com/open?id=1_Fa5nedljKxFBC6fdRwUJBrclgBSGKXj&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT THE UK GARAGE SHORTLIST MAY 2025", link: "https://drive.google.com/open?id=1XJIOzzz979i9u_Fwo0LLaXHQVxC-PVKB&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT TOP 100 PROGRESSIVE HOUSE JUNE 2025", link: "https://drive.google.com/open?id=1ubfmDw5UDRAXUqN0YRvPN-0tmFPqPijW&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT WEEKEND PICKS", link: "https://drive.google.com/open?id=1HqrUqz7l1pbSXjCrhxHGxVVqQuKeYtK6&usp=drive_copy", category: "BEATPORT" },
    { name: "BEEZO BEEHIVE", link: "https://drive.google.com/open?id=1hDhyBUEHfxFsNTqbOBvC_TNA67L4auCd&usp=drive_copy", category: "BEEZO BEEHIVE" },
    { name: "BLEND 4 DJS", link: "https://drive.google.com/open?id=1wDLUCCF6oKj8VTAUHg2wE5Vrkm3eGaLQ&usp=drive_copy", category: "BLEND 4 DJS" },
    { name: "BOOTLEGS", link: "https://drive.google.com/open?id=1KIpOrTBKY83NF1jsG0B28cjZlh1TRR7L&usp=drive_copy", category: "BOOTLEGS" },
    { name: "BPM SUPREME", link: "https://drive.google.com/open?id=15yyVaH_R4lsIp-AMhS1jKxmN_uqXVRjS&usp=drive_copy", category: "BPM SUPREME" },
    { name: "BRAZILIAN REMIXES", link: "https://drive.google.com/open?id=1OY85IFYCJZa_kWn2kwyCVuxVjwwkhwep&usp=drive_copy", category: "BRAZILIAN REMIXES" },
    { name: "CLUB ON FUNKY HITS PLAYERS", link: "https://drive.google.com/open?id=1uXLzdEP_CiCulWFHa3FchtCSiVIl_dwr&usp=drive_copy", category: "FUNK" },
    { name: "CRACK 4 DJS", link: "https://drive.google.com/open?id=1ULIHl-acaTrxSpYIbkiUSOUkmsNBmiLj&usp=drive_copy", category: "CRACK 4 DJS" },
    { name: "CRATE GANG", link: "https://drive.google.com/open?id=166jswME2qEstrpVlpg__7zPVszGM63OF&usp=drive_copy", category: "CRATE GANG" },
    { name: "CUBA REMIX", link: "https://drive.google.com/open?id=1CBsV6S8SDMHoOMviPkTGv0N_ppwNZgGY&usp=drive_copy", category: "CUBA REMIX" },
    { name: "DALE MAS BAJO", link: "https://drive.google.com/open?id=1EuLismOZOyn8llGhfV3UWmaMX_RHL2_j&usp=drive_copy", category: "DALE MAS BAJO" },
    { name: "DANCE COMERCIAL", link: "https://drive.google.com/open?id=1iu1w0uefwkWcmUzMU5-uw2p4WJqhpnec&usp=drive_copy", category: "DANCE" },
    { name: "DANCEFLOOR AFRO HOUSE", link: "https://drive.google.com/open?id=1xYEN9hf7ATVSQFukjm0CpxONtF_BtA_m&usp=drive_copy", category: "AFRO HOUSE" },
    { name: "DEEP HOUSE", link: "https://drive.google.com/open?id=1wzkkOuid67ochR-OTNFrVrAWaEpU1y2S&usp=drive_copy", category: "DEEP HOUSE" },
    { name: "DIGITAL MUSIC POOL", link: "https://drive.google.com/open?id=1_Un1c7NUVD19WmHupyiCHliP8tnp_kzo&usp=drive_copy", category: "DIGITAL MUSIC POOL" },
    { name: "DJ CITY", link: "https://drive.google.com/open?id=1VU0AEXTNOc65Gd1J_jRq56Y57EsWrwFe&usp=drive_copy", category: "DJ CITY" },
    { name: "EUROPA REMIX", link: "https://drive.google.com/open?id=122Lqqynmjy8njP9xSflIJENKybfjq3Ob&usp=drive_copy", category: "EUROPA REMIX" },
    { name: "FUNK", link: "https://drive.google.com/open?id=1dljrzlFRXC1JoWyYqebf85z_d5TiQr_S&usp=drive_copy", category: "FUNK" },
    { name: "FUNK DEBOXE", link: "https://drive.google.com/open?id=1zQ-xNvnv4mvyOkNj3iEGqgiP2U60g8Fk&usp=drive_copy", category: "FUNK" },
    { name: "FUNK MANDELÃO", link: "https://drive.google.com/open?id=1wikiMn7tOvQUC3aYB3DsOuLAiereCvgu&usp=drive_copy", category: "FUNK" },
    { name: "HOUSE", link: "https://drive.google.com/open?id=1Tzk34pMKE7XgVNGzzfOm_9qnuBRjxcnq&usp=drive_copy", category: "HOUSE" },
    { name: "HYPERZ & REDRUM", link: "https://drive.google.com/open?id=1znkYYLnwmDl6k6Gysgqu-vaSr9QYbyXF&usp=drive_copy", category: "HYPERZ" },
    { name: "ITALODANCE", link: "https://drive.google.com/open?id=1AE_6ylzGDtd7E52nHAthTVpGzAD6mRHy&usp=drive_copy", category: "ITALODANCE" },
    { name: "LATIN THROWBACK", link: "https://drive.google.com/open?id=1pcL8VmgOHGHTNuqvGEjZtAVUc-0P-IRh&usp=drive_copy", category: "LATIN" },
    { name: "MASTERMIX - DECADES USB 70'S (1977)", link: "https://drive.google.com/open?id=1DvKSWzauJ1FFBdcIfiKni92pGlVn43jh&usp=drive_copy", category: "MASTERMIX" },
    { name: "MASTERMIX DJ RE-GRIDS COLLECTION SOUL & MOTOWN VOL. 1", link: "https://drive.google.com/open?id=1e_eVyeawNshyZ2sn2s-iyv8A4rF4uv7h&usp=drive_copy", category: "MASTERMIX" },
    { name: "MASTERMIX DR PACKER REMIXES 8 DECADES EXTENDED", link: "https://drive.google.com/open?id=1wNEa4J-O3Oxq3CoXUgKYx8-bd3z6IayB&usp=drive_copy", category: "MASTERMIX" },
    { name: "MELOMANIAC, VOL.04", link: "https://drive.google.com/open?id=10GKco5EKWoQ23aIjRQ5xW95dFJjdWSmI&usp=drive_copy", category: "MELOMANIAC" },
    { name: "MIXINIT - BILLY BROWN COUNTRY REMIXES VOL. 1", link: "https://drive.google.com/open?id=1Zuv4pKut6c-VAF37zhZk1vYKCDQrUrGT&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - THE GOODFELLAS ALL TIME BEST SELLERS VOL. 11", link: "https://drive.google.com/open?id=1BMa-OwtlVp3O6WyQ84Riv49eq5NJx2HV&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT THE GOODFELLAS 4TH QUARTER BANGERS VOL. 4", link: "https://drive.google.com/open?id=1qs4cd8x3vUziToRB7LU8b4bZksWxK8PR&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT TJ THE DJ 4 MINUTE THROWBACKS PACK VOL. 1", link: "https://drive.google.com/open?id=1QmW4x3FlXOqIv7We7YgKzBlWkOYtvD0H&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXSHOW EDITS", link: "https://drive.google.com/open?id=1Y7hdlXJYeBbQ4zPGy5dx8Ncq5Dz55XTi&usp=drive_copy", category: "MIXSHOW" },
    { name: "PACK SÃO JOÃO 2025", link: "https://drive.google.com/open?id=1qhtuwwXUyDGIw-1UaQIKce7w8a7w1fCX&usp=drive_copy", category: "SÃO JOÃO" },
    { name: "PERU REMIX", link: "https://drive.google.com/open?id=1H1l4yU260GCR-hUAn9ccAOPFy4bYGPND&usp=drive_copy", category: "PERU REMIX" },
    { name: "PROGRESSIVE HOUSE", link: "https://drive.google.com/open?id=1fSnyvVPUIMDQx_sP4BoLcZ9LSHgbOzns&usp=drive_copy", category: "PROGRESSIVE HOUSE" },
    { name: "PROMO ONLY ALTERNATIVE CLUB [MAY 2025]", link: "https://drive.google.com/open?id=1LLYzqlfaRioTSmpsOO4iw_w-N_MQHOCc&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY CARIBBEAN SERIES [APRIL 2025]", link: "https://drive.google.com/open?id=1J0S-aRgS4c6NlO4cY_OQ_VsAPpw_GmLk&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY COUNTRY RADIO [MAY 2025]", link: "https://drive.google.com/open?id=1iP42CTwmRAazK2wfzgfIoUq6hDwJQMsc&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY EXPRESS AUDIO DFF", link: "https://drive.google.com/open?id=1CmHbAKEWyaIfrxP4nNy9oP5iv1g3eTpW&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY EXPRESS AUDIO DJ TOOLS", link: "https://drive.google.com/open?id=1qQ5eCKDoCDuddxtiaSHKn01pyXgwLZvG&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY MAINSTREAM RADIO [MAY 2025]", link: "https://drive.google.com/open?id=1gbrd1U0GrFqpBe8MQSqqocJ1cd9KSHKr&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY POP LATIN", link: "https://drive.google.com/open?id=1dIoqKQCD_4ytZ1J0P0qpCqOVjQWj4NIX&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY POP LATIN [APRIL 2025]", link: "https://drive.google.com/open?id=1_WfNzwBZkroBLu-WMuPXhUARWFFuB6Ct&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY REGIONAL LATIN", link: "https://drive.google.com/open?id=1e6Gma1FU-zmFy3aRh1NgdM7yYJnDttdq&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY REGIONAL LATIN [APRIL 2025]", link: "https://drive.google.com/open?id=1JI-HqtZQuCrVBuFk7TpAijJqDjsp6Jq7&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY TROPICAL LATIN", link: "https://drive.google.com/open?id=15b7cJyNmaGj2DgPGyOauyxyQOBExncWd&usp=drive_copy", category: "PROMO ONLY" },
    { name: "PROMO ONLY URBAN RADIO [JUNE 2025]", link: "https://drive.google.com/open?id=1rynRQZPD8G_Bmov4IBb8psWgvSIDg6E7&usp=drive_copy", category: "PROMO ONLY" },
    { name: "REMIX PLANET", link: "https://drive.google.com/open?id=1--l4i7rQwVpN5Otx16bcjFrN9Pwex1zV&usp=drive_copy", category: "REMIX PLANET" },
    { name: "RUNDERGROUND", link: "https://drive.google.com/open?id=1DXZBKLS2MASRToPFSQo-YFfkp43kJaxj&usp=drive_copy", category: "RUNDERGROUND" },
    { name: "SERTANEJO", link: "https://drive.google.com/open?id=1zz2j96Tp0bhEfjdephmb52PYOiViDZLI&usp=drive_copy", category: "SERTANEJO" },
    { name: "SICKMIX - REGGAETON JAMS VOL.1", link: "https://drive.google.com/open?id=1xm6pJHi7w0leqr2K4eMl3yF3y5KQs1uv&usp=drive_copy", category: "SICKMIX" },
    { name: "SPIN BACK PROMOS", link: "https://drive.google.com/open?id=1xeUJ7os7AAKeaDi_nl7X46rlErj7DyBT&usp=drive_copy", category: "SPIN BACK" },
    { name: "TECHNO", link: "https://drive.google.com/open?id=11wNrAdqnhsd6cMM6ME65nL9xoEwDUClF&usp=drive_copy", category: "TECHNO" },
    { name: "THE MASHUP", link: "https://drive.google.com/open?id=1ai0lQKKBJWJlFvPeja4K52CmFyw1txYO&usp=drive_copy", category: "THE MASHUP" },
    { name: "THE OFFICIAL UK TOP 100 SINGLES CHART (08-MAY-2025)", link: "https://drive.google.com/open?id=1WxMtSNFEeC1KnHgTLgvu3ysGZ9uyxhj2&usp=drive_copy", category: "UK TOP 100" },
    { name: "TRANCE CAPTIVED MELODIC PROJECTS", link: "https://drive.google.com/open?id=1vmzx9u4xmopkORzs4EFZfRqXSRWJbNtM&usp=drive_copy", category: "TRANCE" },
    { name: "TRAXSOURCE DJS CHOICE DEEP HOUSE", link: "https://drive.google.com/open?id=1vXfSSyj40qsJToIrUrx2rUKaOi4qRcI2&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE ELECTRONICA", link: "https://drive.google.com/open?id=1K9YJuiiaaby08J6jHjjJUEgerrLDbF5f&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE JACKIN HOUSE", link: "https://drive.google.com/open?id=10gX4a9l3R5JuhucVCvxELZUMiMavgvR6&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE MELODIC HOUSE", link: "https://drive.google.com/open?id=1jOoBKCkt7yFUxf3wZxG1_QGmgQhiJusH&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE MELODIC HOUSE & TECHNO", link: "https://drive.google.com/open?id=1phHU_snSfZBpJ2ZIxq1K1cwMXdXKYYTQ&usp=drive_copy", category: "TRAXSOURCE" },
];

// Dados de configuração para o mês de Junho
const juneMonthData = {
  name: 'Junho 2025',
  folders: juneFolders,
  imageBanner: "https://i.ibb.co/cXLK8yKG/junho-2025.png",
  prevMonth: { name: "Maio 2025", slug: "maio-2025" },
  nextMonth: { name: "Julho 2025", slug: "julho-2025" },
};


export default function Junho2025Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(juneMonthData.folders.map((folder) => folder.category))).sort();
  }, []);

  const filteredFolders = useMemo(() => {
    let folders = juneMonthData.folders;
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
    const message = `Olá! O link para a pasta "${folderName}" de Junho de 2025 parece estar quebrado.`;
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
        <h1 className="font-bold text-3xl tracking-tight uppercase">{juneMonthData.name}</h1>
      </div>

      <div className="flex justify-center mb-6">
          <Image
              src={juneMonthData.imageBanner}
              alt={juneMonthData.name}
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
            <h3 className="text-3xl md:text-4xl font-bold uppercase">Pastas de {juneMonthData.name}</h3>
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
            <Link href="https://drive.google.com/drive/folders/1Nx60dq2EpD2b3GhbUePkOlRlFmESb4Tq?usp=drive_link" target="_blank" rel="noopener noreferrer">
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
            {juneMonthData.prevMonth ? (
                <Link href={`/atualizacoes/${juneMonthData.prevMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {juneMonthData.prevMonth.name}
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
            {juneMonthData.nextMonth ? (
                <Link href={`/atualizacoes/${juneMonthData.nextMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        {juneMonthData.nextMonth.name}
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
