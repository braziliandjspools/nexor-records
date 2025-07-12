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

// --- DADOS PARA ABRIL 2025 ---
const aprilFolders: FolderItem[] = [
    { name: "BANBANGERZ", link: "https://drive.google.com/open?id=1O5lBWsK69w9Sm0EbjxDzD6eXEU3sygk_&usp=drive_copy", category: "BANBANGERZ" },
    { name: "BEATAHOLIC INTRO - R&B KNOCKERZ VOLUME 1", link: "https://drive.google.com/open?id=1MUBZ0WrQKdH58yfhpds3vcjRzeFvewWs&usp=drive_copy", category: "BEATAHOLIC INTRO" },
    { name: "BEATFREAKZ", link: "https://drive.google.com/open?id=13EL3rb0Q1oQLPdx9Lehck_3LJvAmORd8&usp=drive_copy", category: "BEATFREAKZ" },
    { name: "BEATPORT BEST NEW HYPE", link: "https://drive.google.com/open?id=1_LLcfcQHUrnTnJIi4wSGyu4nDpG1BZqc&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT MELODIC", link: "https://drive.google.com/open?id=1m9d0u7_uSGe9HWTGSaItutX7_LDBwaOz&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT PROGRESSIVE HOUSE", link: "https://drive.google.com/open?id=1lk08qAIO1ubXBrPkRBTNLdXUM5Y4ElRu&usp=drive_copy", category: "BEATPORT" },
    { name: "BEATPORT TECHNO (PEAK TIME DRIVING)", link: "https://drive.google.com/open?id=1TGUkxol1RoCKCja1LhNRUlNBVynk41zD&usp=drive_copy", category: "BEATPORT" },
    { name: "BEEZO BEEHIVE", link: "https://drive.google.com/open?id=15yF7vocKgR6K6YLS_k_h-OlyodOTCoAp&usp=drive_copy", category: "BEEZO BEEHIVE" },
    { name: "BLACK FUSION VOL. 8", link: "https://drive.google.com/open?id=1gY8WM76Q0TAd26OzJbgbQA0H1fcaZvs2&usp=drive_copy", category: "BLACK FUSION" },
    { name: "BLEND 4 DJS", link: "https://drive.google.com/open?id=1Fn75b8zs7wK-Wr8rzC8dtS2VTdPfPX4J&usp=drive_copy", category: "BLEND 4 DJS" },
    { name: "BOOTLEGS", link: "https://drive.google.com/open?id=1DU-eOmO2yKzTRfhIHWBLPhqBNTxfpod6&usp=drive_copy", category: "BOOTLEGS" },
    { name: "BPM SUPREME", link: "https://drive.google.com/open?id=1rOmKD01-onz4xNyFvwZpxUwqUCcbdClA&usp=drive_copy", category: "BPM SUPREME" },
    { name: "CLAUDIO D THE BEST OF K. DOT R&B", link: "https://drive.google.com/open?id=1lqyx3gOqdFU7-UvtJkkxCdubTAVN7M8V&usp=drive_copy", category: "CLAUDIO D" },
    { name: "CLUB KILLERS [THROWBACK]", link: "https://drive.google.com/open?id=1PORPi65GR6-QwSGPA4ApmQgT4m0CQxho&usp=drive_copy", category: "CLUB KILLERS" },
    { name: "CONFIG Q-B! SOUND TOP 371", link: "https://drive.google.com/open?id=1tW-c0QydJ4ZAsLxDUcfeIubOBv2xE0q6&usp=drive_copy", category: "CONFIG Q-B!" },
    { name: "COUNTRY PACK", link: "https://drive.google.com/open?id=1Gh2rDAx7jUIRRQQhXE5SR99uXRkTJK39&usp=drive_copy", category: "COUNTRY" },
    { name: "CRACK 4 DJS", link: "https://drive.google.com/open?id=1s-7-WDaNt62g0ssMsVlN35CbJUszjtC9&usp=drive_copy", category: "CRACK 4 DJS" },
    { name: "CRATE GANG", link: "https://drive.google.com/open?id=1ClrFRW_PTHKJmFyTplPOU-uEXvmEmAiQ&usp=drive_copy", category: "CRATE GANG" },
    { name: "CROOKLYN CLAN", link: "https://drive.google.com/open?id=1h3cIKrqCn9HaGiDQQu0dZsBAw_6_eXOD&usp=drive_copy", category: "CROOKLYN CLAN" },
    { name: "CROOKLYN CLAN V.4 - HIP-HOP & R&B HITS", link: "https://drive.google.com/open?id=1545wzf1WEatIYsQPz9KhxT7KDHeb_gQS&usp=drive_copy", category: "CROOKLYN CLAN" },
    { name: "CROOKLYN CLAN V.4 - TRIBAL HITS", link: "https://drive.google.com/open?id=1VU86Xd3gBmL_pbdHBp7tSDj64WothWL6&usp=drive_copy", category: "CROOKLYN CLAN" },
    { name: "CUBA REMIX", link: "https://drive.google.com/open?id=1n9OQrhfcGU3AztyYK34aKeA5xtnPmdYR&usp=drive_copy", category: "CUBA REMIX" },
    { name: "DALE MAS BAJO", link: "https://drive.google.com/open?id=14Q9pa7tLr07SwlPILrG3JZRfs97CQMEw&usp=drive_copy", category: "DALE MAS BAJO" },
    { name: "DANCE 2025", link: "https://drive.google.com/open?id=1g4enr8EZeYBGePF7MV1naxOOp7tBRTyu&usp=drive_copy", category: "DANCE" },
    { name: "DIGITAL MUSIC POOL", link: "https://drive.google.com/open?id=15lnma8lBExoO432AXvH459ZWxcRA5yyh&usp=drive_copy", category: "DIGITAL MUSIC POOL" },
    { name: "DIGITAL MUSIC SERVICE", link: "https://drive.google.com/open?id=18NZ-FJqPub4AxM3hDu73NVInI3Wy50Yz&usp=drive_copy", category: "DIGITAL MUSIC SERVICE" },
    { name: "DJ CITY", link: "https://drive.google.com/open?id=1733-cZIesP3fCahFbGmPBML_4SK-3ITx&usp=drive_copy", category: "DJ CITY" },
    { name: "DJ DARK XTDS REMIXES", link: "https://drive.google.com/open?id=1E7SJQd3_j3i-JXxZ3xtQrrL8-9PZScQI&usp=drive_copy", category: "DJ DARK" },
    { name: "DJ JAY MMP EDITS", link: "https://drive.google.com/open?id=1EGLYDu-1sdoqqT8Ra72yIFIa8S9mNHRL&usp=drive_copy", category: "DJ JAY MMP" },
    { name: "DJ KLU - MIXILLEST EXKLUSIVE REMIXES 2000", link: "https://drive.google.com/open?id=1_MRag7F6jVsPlXwdhZ3HVea6mFJ9k7Zi&usp=drive_copy", category: "DJ KLU" },
    { name: "DJ KLU - MIXILLEST SLOW JAM", link: "https://drive.google.com/open?id=1sXfmZeMVmJgFHqMEr2NjHDi5LWftBd6l&usp=drive_copy", category: "DJ KLU" },
    { name: "DJ MIGHTY MOVES - SLOW JAMS PART 2 (VALENTINE'S DAY)", link: "https://drive.google.com/open?id=1LlC_21yZDLKqg59ki9fcP0TQXdVq4Lc5&usp=drive_copy", category: "DJ MIGHTY MOVES" },
    { name: "DJ PROMOTION CD POOL BIG ROOM 513-514", link: "https://drive.google.com/open?id=1HssS2v3cLwecJqHlNkKvOOzEE2nBaszk&usp=drive_copy", category: "DJ PROMOTION" },
    { name: "DJ SOULBR REMIX EDITS", link: "https://drive.google.com/open?id=1H11p1mXk90kVg2bY7l3nREFojLtNnDfM&usp=drive_copy", category: "DJ SOULBR" },
    { name: "DJ UGEEZY EDITS - RARE FUNK VOL. 13 (DJ INTROS )", link: "https://drive.google.com/open?id=1v0ShVUG-D8AorM2J4IKA8DUov5qVxRTa&usp=drive_copy", category: "DJ UGEEZY" },
    { name: "DJSOULBR 90_S RE-EDITS", link: "https://drive.google.com/open?id=1XQLZ-jk0a4XQIhnsCQpYjR7YZT-zjsU5&usp=drive_copy", category: "DJSOULBR" },
    { name: "DOING THE DAMAGE", link: "https://drive.google.com/open?id=1Zq__Md87RK_bHgM-de_H_SFGk8yiN5Mc&usp=drive_copy", category: "DOING THE DAMAGE" },
    { name: "DZ 80S RMX - FEVEREIRO 2025", link: "https://drive.google.com/open?id=1HuEzt6REp_Ax6SRddecgqdGMz73fwkue&usp=drive_copy", category: "DZ 80S RMX" },
    { name: "EAST COST HIP HOP & R&B", link: "https://drive.google.com/open?id=1og6391q0ueTYBsZasEsPsMg31s6AUOHj&usp=drive_copy", category: "HIP HOP" },
    { name: "EDM", link: "https://drive.google.com/open?id=1NfGNchTkKwgu94wFCtt8_8Iz-QnMNiQx&usp=drive_copy", category: "EDM" },
    { name: "EUROPA REMIX", link: "https://drive.google.com/open?id=1ksx9SH62W3gNPTV5zw5Di84rjSPeQKmz&usp=drive_copy", category: "EUROPA REMIX" },
    { name: "EXTENDEDS", link: "https://drive.google.com/open?id=1ADkH7KoT3tWG9Ov-aSqV3UJJzBr-1e8v&usp=drive_copy", category: "EXTENDEDS" },
    { name: "FABIO RNB DJ PACK VOL.23", link: "https://drive.google.com/open?id=1TVr8ALYzdvVUeAKoGtr4gH1ckmvP3S_x&usp=drive_copy", category: "FABIO RNB" },
    { name: "FUNK", link: "https://drive.google.com/open?id=1tnh2Q0nDUAUx1psTVRyn1GbRNkQXi1_1&usp=drive_copy", category: "FUNK" },
    { name: "FUNK FAVELA", link: "https://drive.google.com/open?id=1c0FtF1HH6ibhJhR5qiEIOmVO_CJBhvql&usp=drive_copy", category: "FUNK" },
    { name: "FUNK GRINGO", link: "https://drive.google.com/open?id=1ygPJ4AUlJFgH4gjueSN4O8picf_nxpal&usp=drive_copy", category: "FUNK" },
    { name: "FUNK LIGHT", link: "https://drive.google.com/open?id=1_Pe_YfGwdAAqgCGRrxlxOhPduzu8quYL&usp=drive_copy", category: "FUNK" },
    { name: "FUTURE HOUSE", link: "https://drive.google.com/open?id=1TQD4w62ATVpMmfMNUpXo0izTlLfwHcU3&usp=drive_copy", category: "HOUSE" },
    { name: "HOT DJ CHARTS", link: "https://drive.google.com/open?id=1ZC0e_Qw7rT9sP2a8fsDjguFTINTRMkUO&usp=drive_copy", category: "HOT DJ CHARTS" },
    { name: "HOUSE", link: "https://drive.google.com/open?id=1OCXUpzCkqbAzlcvg31gaFZZDpQkUjYkM&usp=drive_copy", category: "HOUSE" },
    { name: "HOUSE EDITS (DJ RUE HEFNER)", link: "https://drive.google.com/open?id=1l1J7ISuJT0jvFv92nwb1yPsY53-omcYj&usp=drive_copy", category: "HOUSE" },
    { name: "HYPERZ", link: "https://drive.google.com/open?id=1T8IYA48u0eCeiQQaVJ2DFUA6QClaNrgk&usp=drive_copy", category: "HYPERZ" },
    { name: "ICA REMIX", link: "https://drive.google.com/open?id=1g43fxSk2SKkVRvpKP7MwMODn_z75r2oQ&usp=drive_copy", category: "ICA REMIX" },
    { name: "IN ONE PARTYBREAKS AND REMIXEX", link: "https://drive.google.com/open?id=1bbYsvi_9aOku1yrOTIBP7e5v8sKkYsDX&usp=drive_copy", category: "PARTYBREAKS" },
    { name: "JAMES HYPE REMIX PACK", link: "https://drive.google.com/open?id=1mrKDwMgwXkCNZf8MqeEvR7tRmHWO0rYT&usp=drive_copy", category: "JAMES HYPE" },
    { name: "JIMMIX 2000'S", link: "https://drive.google.com/open?id=1u87V56-5rnWJjWCUfbSGgrwE3HI_-CtR&usp=drive_copy", category: "JIMMIX" },
    { name: "JIMMIX 70'S", link: "https://drive.google.com/open?id=1FLLqPyZXeEIa4xQTXctWwWqsMKI70B5K&usp=drive_copy", category: "JIMMIX" },
    { name: "JIMMIX 80'S", link: "https://drive.google.com/open?id=1-SljxrRd5s8t6sFvanEosBJ6hrWTmaB0&usp=drive_copy", category: "JIMMIX" },
    { name: "JIMMIX 90'S", link: "https://drive.google.com/open?id=1TuLe1h3xZNFOguos80bUJe24X8G9CQLT&usp=drive_copy", category: "JIMMIX" },
    { name: "KLAAS XTDS REMIX", link: "https://drive.google.com/open?id=1JSyL_BgXPmnGFcKfA91qE5U-fmh_cYjn&usp=drive_copy", category: "KLAAS" },
    { name: "LATIN THROWBACK", link: "https://drive.google.com/open?id=1Sdm0y0jEHz7SXK3fCAEzZDrMO_csdiT1&usp=drive_copy", category: "LATIN" },
    { name: "MASTERMIX PRO DISC VOL. 283", link: "https://drive.google.com/open?id=1x2S7lZukWF1FzdeMlUxIwyVZTpmSCfZL&usp=drive_copy", category: "MASTERMIX" },
    { name: "MELO IN MY HEAD, VOL.05 (2025)", link: "https://drive.google.com/open?id=1_AyPMwQtnkx41ez4o8BzdRnPFipg27lA&usp=drive_copy", category: "MELO" },
    { name: "MIXINIT - COLLINI BIG ROOM BANGERS VOL. 15", link: "https://drive.google.com/open?id=1Wci2cmhTbbM_DqU_So54rtJkd7c4C0WO&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXINIT - STARJACK BEST OF CROOKLYN CLAN VOL. 4", link: "https://drive.google.com/open?id=1OLTzI67f6jmBrLqbr8Ahjjc5AoinA4eN&usp=drive_copy", category: "MIXINIT" },
    { name: "MIXSHOW EDITS", link: "https://drive.google.com/open?id=10o2O-_j367Cg_e-WmLpsSRov8y_ydNcb&usp=drive_copy", category: "MIXSHOW" },
    { name: "MIXSHOW MEGAPACK", link: "https://drive.google.com/open?id=1joliOhENjMUBNMQntYv1l1sFQ8QwZt3J&usp=drive_copy", category: "MIXSHOW" },
    { name: "PACK ANOS 2000", link: "https://drive.google.com/open?id=1C2mKgsER9VZ-ujx7ADbhKoUEoHEAoK1O&usp=drive_copy", category: "PACK ANOS" },
    { name: "PACK ANOS 70", link: "https://drive.google.com/open?id=1WKG4gEdpAwwq0fIAbd-oDosQAO_LMKoP&usp=drive_copy", category: "PACK ANOS" },
    { name: "PACK ANOS 80", link: "https://drive.google.com/open?id=1quwad8rv63J0QrP1PXscIweUTKbL130o&usp=drive_copy", category: "PACK ANOS" },
    { name: "PACK ANOS 90", link: "https://drive.google.com/open?id=1MmeSKMQ6PVNUULxun6UtcXaKuOBax4w4&usp=drive_copy", category: "PACK ANOS" },
    { name: "REDRUMS", link: "https://drive.google.com/open?id=1qRe4as3azNZTwz4H_9JSV0kHkOYtWXWU&usp=drive_copy", category: "REDRUMS" },
    { name: "REMIX PLANET", link: "https://drive.google.com/open?id=1rPR8P-VT-fWzrwb0hyjsPVtQEDZEAiJp&usp=drive_copy", category: "REMIX PLANET" },
    { name: "ROMPE DISCOTECA", link: "https://drive.google.com/open?id=14-aYrA1Ynu8yTsX4BjjL-K0OZ6FxW_wB&usp=drive_copy", category: "ROMPE DISCOTECA" },
    { name: "RUNDERGROUND", link: "https://drive.google.com/open?id=1nOaQAPVeeNd41CCmlovN0I3g_l7E1RjX&usp=drive_copy", category: "RUNDERGROUND" },
    { name: "SICKMIX - SLOW JAM EDIT PACK ( ACAPELLA OUTS) VOL. 1", link: "https://drive.google.com/open?id=1wiw_pFOLr3AlWbDizJqPEQVjJ9OHDVOt&usp=drive_copy", category: "SICKMIX" },
    { name: "SNIP HITZ", link: "https://drive.google.com/open?id=1byFE6GYsA3GzRQdM89K7yQqnWmOtEWcy&usp=drive_copy", category: "SNIP HITZ" },
    { name: "SPIN BACK PROMOS", link: "https://drive.google.com/open?id=1tt2JMrp4Y9OdIiIjHMD48C4nx799udIn&usp=drive_copy", category: "SPIN BACK" },
    { name: "STARJACK MEGAPACK", link: "https://drive.google.com/open?id=1uc_3rHKzDznL0RFE5LG3xigNvSQ64yzO&usp=drive_copy", category: "STARJACK" },
    { name: "TECHNO EXTENDEDS", link: "https://drive.google.com/open?id=1MZf_6bBy-XK31Hgj6Ec6hx03BM0e1x3J&usp=drive_copy", category: "TECHNO" },
    { name: "THE BEST OF DJ CARLOS RUAN [ TRIBAL MIX]", link: "https://drive.google.com/open?id=1apO6ua7KswNtMgTgmwNK1M4p_HRbqPo2&usp=drive_copy", category: "TRIBAL" },
    { name: "THE MASHUP", link: "https://drive.google.com/open?id=1iKhwjTxis0mjZXLfoGi_qIUtEk6usuKL&usp=drive_copy", category: "THE MASHUP" },
    { name: "TO THE FUTURE", link: "https://drive.google.com/open?id=1PuBN_ay7qnfSEQm7ey2PikeQ765E-rnO&usp=drive_copy", category: "TO THE FUTURE" },
    { name: "TOP 500 JOVEM PAN", link: "https://drive.google.com/open?id=1LfjCEaMzWw7bTyfUWwCLbPydiOMc1V59&usp=drive_copy", category: "TOP 500" },
    { name: "TOP 80 CLASSIC HOUSE [2025]", link: "https://drive.google.com/open?id=14fXMuCTKsOcH4S5luGAWGQCm9fNPXPf6&usp=drive_copy", category: "HOUSE" },
    { name: "TOTALMIX - TOP FEB 2025 DJ FMSTEFF", link: "https://drive.google.com/open?id=1rwyqZaju5t5fBPUeH550SiDbC4k8B4bh&usp=drive_copy", category: "TOTALMIX" },
    { name: "TRAXSOURCE DJS CHOICE", link: "https://drive.google.com/open?id=1mbjAwtoLholaSU28PnSpG-eTrc5aaDSv&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE AFRO HOUSE", link: "https://drive.google.com/open?id=1eGjdlhA5hlGA2kPdhXUpwreqSrkQQx1K&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE DANCE POP", link: "https://drive.google.com/open?id=1XkydgROl1blfpGKwzun_C1yHlk7fH8Ys&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE DANCE POP", link: "https://drive.google.com/open?id=18ZdmfbgbtuonPHU41uvP9fIn8_cktQIf&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE DEEP HOUSE", link: "https://drive.google.com/open?id=14M6ewXnWSALExdbm_p4eLWV8nGdCXzaP&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE ELECTRO", link: "https://drive.google.com/open?id=1_EiUd3gd_Q9IzrtvJGrwmaT0wMU1L4sA&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE HOUSE", link: "https://drive.google.com/open?id=1fRw6m2wWhBTetlGNP5ZXd0-abDgbrW-Q&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE DJS CHOICE PROGRESSIVE HOUSE", link: "https://drive.google.com/open?id=1QrbQl0vXawaoI9orFAQ8224HdhM2Vhea&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE – MOST WANTED DJS CHART", link: "https://drive.google.com/open?id=1YM5ECKfs2IylEm9aZoT3r9KcML5MSMaL&usp=drive_copy", category: "TRAXSOURCE" },
    { name: "TRIBAL HOUSE EXTENDED MIX", link: "https://drive.google.com/open?id=1hqc4E5-AmYmUxgedllDrZrHjhPdaheIs&usp=drive_copy", category: "TRIBAL" },
    { name: "VA - SPRINGTIME 2025 COMPILATION BY BEATPORT", link: "https://drive.google.com/open?id=14h3NbwRu_rOPw5rCrDgXObJEL-PcutJX&usp=drive_copy", category: "BEATPORT" },
];

// Dados de configuração para o mês de Abril
const aprilMonthData = {
  name: 'Abril 2025',
  folders: aprilFolders,
  imageBanner: "https://i.ibb.co/3mWQ1Jyn/abril2025.png",
  prevMonth: { name: "Março 2025", slug: "marco-2025" },
  nextMonth: { name: "Maio 2025", slug: "maio-2025" },
};


export default function Abril2025Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(aprilMonthData.folders.map((folder) => folder.category))).sort();
  }, []);

  const filteredFolders = useMemo(() => {
    let folders = aprilMonthData.folders;
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
    const message = `Olá! O link para a pasta "${folderName}" de Abril de 2025 parece estar quebrado.`;
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
        <h1 className="font-bold text-3xl tracking-tight uppercase">{aprilMonthData.name}</h1>
      </div>

      <div className="flex justify-center mb-6">
          <Image
              src={aprilMonthData.imageBanner}
              alt={aprilMonthData.name}
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
            <h3 className="text-3xl md:text-4xl font-bold uppercase">Pastas de {aprilMonthData.name}</h3>
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
            <Link href="https://drive.google.com/drive/folders/1QTYonbvPt3AO7FDqeU9N1TZGeHDCRv61?usp=drive_link" target="_blank" rel="noopener noreferrer">
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
            {aprilMonthData.prevMonth ? (
                <Link href={`/atualizacoes/${aprilMonthData.prevMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {aprilMonthData.prevMonth.name}
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
            {aprilMonthData.nextMonth ? (
                <Link href={`/atualizacoes/${aprilMonthData.nextMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        {aprilMonthData.nextMonth.name}
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
