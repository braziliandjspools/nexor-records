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

// --- DADOS PARA FEVEREIRO 2025 ---
const februaryFolders: FolderItem[] = [
    { name: "AFRO HOUSE", link: "https://drive.google.com/open?id=1Ew3HTHHWalKh0bRoZLVGvSLEu8TW0Ozc", category: "AFRO HOUSE" },
    { name: "AFRO SOUNDS BIG MOOD JANUARY 2025", link: "https://drive.google.com/open?id=13F0MO99iNQ3XYXuLBYRnPCNOq_OIQU2n", category: "AFRO SOUNDS" },
    { name: "ALL IN ONE PARTYBREAKS AND REMIXES", link: "https://drive.google.com/open?id=1snZctiVK2y6Gf4atyB4nIkvrwoRZ-lNx", category: "ALL IN ONE PARTYBREAKS" },
    { name: "AMERICA REMIX", link: "https://drive.google.com/open?id=1Qken91gHv6qFoOwvw4XC4xfhenF-91ng", category: "AMERICA REMIX" },
    { name: "ARROCHADEIRA", link: "https://drive.google.com/open?id=12Ujd36uhfyJqHK2pp5yQTGDoYoXKslJi", category: "ARROCHADEIRA" },
    { name: "AXÉ", link: "https://drive.google.com/open?id=1WuXiKWqnG2J9XOpHawxx6qQ87oJ9FN6Q", category: "AXÉ" },
    { name: "BACK TO THE FUTURE", link: "https://drive.google.com/open?id=1w8J9p5xGl31ZC8OPPy_-IzZ2jjAqWcT1", category: "BACK TO THE FUTURE" },
    { name: "BARBANGERZ", link: "https://drive.google.com/open?id=1aZ5hxz9IloPp6heuwvs8JOWBLtZ88zg2", category: "BARBANGERZ" },
    { name: "BEATFREAKZ", link: "https://drive.google.com/open?id=1k-rNudyUaR3DSUV8zfsP1sm4OD289t5k", category: "BEATFREAKZ" },
    { name: "BEATPORT EXCLUSIVES ONLY MUSICS_WEEK 4", link: "https://drive.google.com/open?id=182yf2OMA_nNmCL-gg1ZskHt1wlz-bm-W", category: "BEATPORT" },
    { name: "BEATPORT TOP 100 DEEP HOUSE", link: "https://drive.google.com/open?id=1gkGzGJiTkS1heTb7j0WOaAqp4gd4qASK", category: "BEATPORT" },
    { name: "BEATPORT WEEKEND PICKS 5 JANUARY 2025", link: "https://drive.google.com/open?id=12i-7P2FzrJYxlHEGqLyEuYyT9ON7BE3H", category: "BEATPORT" },
    { name: "BEEZO BEEHIVE", link: "https://drive.google.com/open?id=1DZoLQMMfLsEWpX7xhxT3iqzBi4yh3s5n", category: "BEEZO BEEHIVE" },
    { name: "BEST AFRO HOUSE SOUNDS FROM IBIZA", link: "https://drive.google.com/open?id=1Z8Fol38-7giVD6ff-M-L8INY7rbRpXCF", category: "AFRO HOUSE" },
    { name: "BEST PLAYLIST HOUSEWERK JANUARY 2025", link: "https://drive.google.com/open?id=1eOKqPc64rYuPZSs81rsoBicKlfxM8oMC", category: "HOUSE" },
    { name: "BILLBOARD HOT 100", link: "https://drive.google.com/open?id=1FGXdIH9p1z1OsJf5Yo-fkj3hoWOFLI46", category: "BILLBOARD" },
    { name: "BLEND 4 DJS", link: "https://drive.google.com/open?id=1Yqw5V3QncuTGckWC3dIADUlmUxofSRGY", category: "BLEND 4 DJS" },
    { name: "BLOCO DE RUA", link: "https://drive.google.com/open?id=1KTSKHr6cEb_mlNWRWVxx7efks2ZTMyih", category: "CARNAVAL" },
    { name: "BOOTLEGS", link: "https://drive.google.com/open?id=18YuBX_QI7G65YD6qCqE9RikBbcNa4SWm", category: "BOOTLEGS" },
    { name: "BPM SUPREME", link: "https://drive.google.com/open?id=1YbXQ5ouO2xUmNBMtOKWkveKa__23LVNJ", category: "BPM SUPREME" },
    { name: "CARNAVAL DENNIS DJ", link: "https://drive.google.com/open?id=1XBwhwSS2Dt6FqhqZFDRsUGf0vFu_zlwp", category: "CARNAVAL" },
    { name: "CARNAVAL DJ TIAGO MIX", link: "https://drive.google.com/open?id=1knrX1mMRqDRkHAIPA_Gw56_qySyCAFvs", category: "CARNAVAL" },
    { name: "CARNAVAL EMBRAZADO - DENNIS DJ", link: "https://drive.google.com/open?id=1k28u2pWUoHFg_Mr2LdQ9OFICBiZP_WkN", category: "CARNAVAL" },
    { name: "CARNAVAL INFANTIL", link: "https://drive.google.com/open?id=1EplIGi1X8qedNOjctRE8VMwowO9Iae-X", category: "CARNAVAL" },
    { name: "CARNAVAL REMIX", link: "https://drive.google.com/open?id=17MP-Gwihkr9V9B_xUnkLCo7y3AnnY074", category: "CARNAVAL" },
    { name: "CHUS & CEBALLOS BEST AND PROMOS!", link: "https://drive.google.com/open?id=1sIYRd60U_WwQtAJWptGYQnvoGOVwAvgG", category: "CHUS & CEBALLOS" },
    { name: "CLASSIC HOUSE PACK", link: "https://drive.google.com/open?id=1yoE2h1NUAiVPqFPUlDxuKAKpm_GipCdT", category: "HOUSE" },
    { name: "CLUB KILLERS [THROWBACK]", link: "https://drive.google.com/open?id=1Hg8ehpm7hDki3kwaANJxLNFO5jzZxu7r", category: "CLUB KILLERS" },
    { name: "CRACK 4 DJS", link: "https://drive.google.com/open?id=1RV2g1XoLQj8-xucxZm5qwEd9AkUgkjj1", category: "CRACK 4 DJS" },
    { name: "CRATE GANG", link: "https://drive.google.com/open?id=1sX1eGIETOgdiF5paLsjngyja1NKkQcg0", category: "CRATE GANG" },
    { name: "CROOKLYN CLAN", link: "https://drive.google.com/open?id=1j6WAUNn-2mpK2j1hPfOGAvf1KV47Wag6", category: "CROOKLYN CLAN" },
    { name: "CUBA REMIX", link: "https://drive.google.com/open?id=1vKTxgaJf0rqeJYoJnVCIIIXI5_I1uKlz", category: "CUBA REMIX" },
    { name: "DALE MAS BAJO", link: "https://drive.google.com/open?id=1GeFxJ2xUM8yMBjDAyJKUr5y1DWrAbyho", category: "DALE MAS BAJO" },
    { name: "DANCE COMERCIAL", link: "https://drive.google.com/open?id=13P6r5kOQmtgPYbO1fpU1Den2H8tpHfCK", category: "DANCE" },
    { name: "DANCE GOSPEL", link: "https://drive.google.com/open?id=1_iEdhcVy8aHL47TpceczTDXessGkJwYq", category: "GOSPEL" },
    { name: "DEEP HOUSE", link: "https://drive.google.com/open?id=1WJUpr6zEXYAc7t-WtFklV42yE7PI4DCZ", category: "DEEP HOUSE" },
    { name: "DEFECTED BEST HOUSE & CLUB TRACKS", link: "https://drive.google.com/open?id=1kHpPN1Gli7PpHebB1e3fGjCEBcmsIKPJ", category: "DEFECTED" },
    { name: "DEFECTED DFTD - UNDERGROUND HOUSE", link: "https://drive.google.com/open?id=1ErojlCK0lVPiOieNsgBzaftb0Pt2Nv45", category: "DEFECTED" },
    { name: "DEFECTED GLITTERBOX", link: "https://drive.google.com/open?id=1BaM4hAo2Tluncx-Gw0pFGaHwjL8ZxOPk", category: "DEFECTED" },
    { name: "DEFECTED IBIZA", link: "https://drive.google.com/open?id=1_j0_7lKD1cK2-5VnykgAFIsGJyUZftvh", category: "DEFECTED" },
    { name: "DEFECTED NEW HOUSE MUSIC", link: "https://drive.google.com/open?id=1_98bii1MpEw3NeZ5hPlkaO34p2zVFzMS", category: "DEFECTED" },
    { name: "DIGITAL MUSIC POOL", link: "https://drive.google.com/open?id=15X7l_A1cKQfXvI2jHeqorSS7DmwdtjKE", category: "DIGITAL MUSIC POOL" },
    { name: "DJ CITY", link: "https://drive.google.com/open?id=1a6q6HjuIidGXKOJu2fLaxK2ST7_i5221", category: "DJ CITY" },
    { name: "DJ JEFF REMIX", link: "https://drive.google.com/open?id=1P2WDfUmEYTj9PV3vbB7xvoNr1W93GOZU", category: "DJ JEFF" },
    { name: "DJ KLU - MIXILLEST EXKLUSIVE REMIXES 2000", link: "https://drive.google.com/open?id=16oKE4Myjohe6hxrgQVlN6mWXViJXslsG", category: "DJ KLU" },
    { name: "DJ MHARK REMIX", link: "https://drive.google.com/open?id=1KuHUpSJeBJx-4ZkxL4TymcWU-Ab-935S", category: "DJ MHARK" },
    { name: "EUROPA REMIX", link: "https://drive.google.com/open?id=1GivfDXsNsZ0u8uRcq4zDLvo7YhRoUS66", category: "EUROPA REMIX" },
    { name: "EXCLUSIVE PACK - 00's", link: "https://drive.google.com/open?id=12RYgfi0AN1HlWrA_he85J932Wx_8r_4Y", category: "EXCLUSIVE PACK" },
    { name: "EXCLUSIVE PACK - 60's", link: "https://drive.google.com/open?id=1c44ErpzUICvbXXqfliy-19VVUK47enFp", category: "EXCLUSIVE PACK" },
    { name: "EXTENDEDS", link: "https://drive.google.com/open?id=1qIHGkaHgOFRtQmRP3a-ill7YzvKZ8KWz", category: "EXTENDEDS" },
    { name: "FORRÓ", link: "https://drive.google.com/open?id=1zkPc8t18OVY8mB_GzSI8Ndw7N0lwU51T", category: "FORRÓ" },
    { name: "FORRÓ & PISADINHA", link: "https://drive.google.com/open?id=1phx-Vmsz_VlvNbGptn6Tm3vQz3RqNmOR", category: "FORRÓ" },
    { name: "FORRÓ & PISEIRO", link: "https://drive.google.com/open?id=1_A4RCyd8yJjvEd2YNPdvIUSWe7G4_K3X", category: "FORRÓ" },
    { name: "FREVO (CARNAVAL DE PE)", link: "https://drive.google.com/open?id=1lfXwsGbYJOR1QBkhVSfsZm3IvA886U2F", category: "CARNAVAL" },
    { name: "FUNK", link: "https://drive.google.com/open?id=1hZiEZPq_hkNn3VteBcCk3AqgSv6ZEssa", category: "FUNK" },
    { name: "FUNK FAVELA", link: "https://drive.google.com/open?id=1_ttp2Sl0PnFgDE1-byY4aKsn-4Uaa6Sm", category: "FUNK" },
    { name: "FUNK LIGHT", link: "https://drive.google.com/open?id=1UmYJyMphETiZoV9N9j7xS_9YgOb0H0BF", category: "FUNK" },
    { name: "FUNKYMIX VOL. 312", link: "https://drive.google.com/open?id=1Inp7PpAAilcEOxtxZ9LkHn-7-fWul0EW", category: "FUNKYMIX" },
    { name: "G-MEOS TAMBORZÃO - ESPECIAL CARNAVAL VOL. 08", link: "https://drive.google.com/open?id=1l2vZlbOv7FgUBq3DHrfXpHdz2V6dgz9L", category: "G-MEOS" },
    { name: "GOSPEL", link: "https://drive.google.com/open?id=1siVpMQN8BycwLyGB1Yvn1MzJumAW8Avb", category: "GOSPEL" },
    { name: "HOUSE", link: "https://drive.google.com/open?id=1O12auSJERIDpuo3OZuGeAna8lQujKreV", category: "HOUSE" },
    { name: "JUST PLAY", link: "https://drive.google.com/open?id=1bGS_8Z_ELCWJngz7hqj-Wa9fFzPzihxA", category: "JUST PLAY" },
    { name: "LATIN BOX", link: "https://drive.google.com/open?id=1G5qlSjOTL8zALRkbxh-VahV3Vg9D8j_b", category: "LATIN BOX" },
    { name: "LATIN THROWBACK", link: "https://drive.google.com/open?id=1bahnYdkRYbc2peHZ2SYrmqEmr2iAoL9E", category: "LATIN THROWBACK" },
    { name: "MADE IN BRAZIL", link: "https://drive.google.com/open?id=1GmF5nu0VBtw8s2WnBt1WP0SBjrsXaioQ", category: "MADE IN BRAZIL" },
    { name: "MARCHINHAS DE CARNAVAL", link: "https://drive.google.com/open?id=1ePg51RLIjksb-tKEUENw5HM7hvgFBK2f", category: "CARNAVAL" },
    { name: "MASTERMIX DJ EDITS 00S POP VOL. 3", link: "https://drive.google.com/open?id=1WoaMBzPq8RcOJJoRQZ0t5TB7yvxwSotU", category: "MASTERMIX" },
    { name: "MASTERMIX ESSENTIAL HITS POP VOL. 3 (2000 - 2004)", link: "https://drive.google.com/open?id=1eAv4c7kpvHhcRydCfTly6csYi1-SuCwe", category: "MASTERMIX" },
    { name: "MASTERMIX ESSENTIAL HITS POP VOL. 4 (2005 - 2009)", link: "https://drive.google.com/open?id=1r9jnrMiVRZQJj99TlobQv_REMflIEJg-", category: "MASTERMIX" },
    { name: "MELODIC HOUSE & TECHNO", link: "https://drive.google.com/open?id=1F_a0tdHUG5mfYYS1GpjekEN56t6OvB2B", category: "MELODIC HOUSE & TECHNO" },
    { name: "MELODY", link: "https://drive.google.com/open?id=1BasFkWBxA1DdY_c9ZQrtPFlCEn0fGgMJ", category: "MELODY" },
    { name: "NEW NIGHT RIDER JANUARY 2025", link: "https://drive.google.com/open?id=1-Q6Xvkhj_4CPyjwwticV0MsqVYTe1J92", category: "NEW NIGHT RIDER" },
    { name: "NOTHING BUT... BASS HOUSE VIBES, VOL. 01", link: "https://drive.google.com/open?id=1w9oROI5h_tmOwsU5l1q89WnDdyLp2qkE", category: "NOTHING BUT..." },
    { name: "NOTHING BUT... DEEP HOUSE ESSENTIALS, VOL. 28", link: "https://drive.google.com/open?id=1sXyZnf50keUXH4jOzma654GJ9_gUlIZR", category: "NOTHING BUT..." },
    { name: "NOTHING BUT... ESSENTIAL BIG ROOM, VOL. 28", link: "https://drive.google.com/open?id=1r_dk5AEzZQ6MHPVIKQR6ktkakOqaSDez", category: "NOTHING BUT..." },
    { name: "PACK 70'S", link: "https://drive.google.com/open?id=1d25A3kY6ifG7eyeVrd9KAxMihyLIlPkJ", category: "PACK 70'S" },
    { name: "PACK 80'S", link: "https://drive.google.com/open?id=1wQBdxwpk9NYefHw5jQV_LJIyb4lf9Dsc", category: "PACK 80'S" },
    { name: "PAGODE", link: "https://drive.google.com/open?id=1jL5KUqBbjKbcu3rIKErOeM0jEeIQ3NYe", category: "PAGODE" },
    { name: "PERU REMIX", link: "https://drive.google.com/open?id=11VFsGxqyS9QU3EMu3BfJPfIPdg43f_9u", category: "PERU REMIX" },
    { name: "PRO LATIN REMIX", link: "https://drive.google.com/open?id=1W_DDHBs4bsXcLuedOwTrKD-4R710BkqB", category: "PRO LATIN REMIX" },
    { name: "PROMO ONLY - ALTERNATIVE CLUB [FEBRUARY 2025]", link: "https://drive.google.com/open?id=11EkO5YBH98Km1q0QXeA8Wyq_XRn_tcIp", category: "PROMO ONLY" },
    { name: "PROMO ONLY - CARIBBEAN SERIES [FEBRUARY 2025]", link: "https://drive.google.com/open?id=13ZzFOGf-zEWBgYRVCwrU6tAPB9hUAoaA", category: "PROMO ONLY" },
    { name: "PROMO ONLY - CONTEMPORARY CHRISTIAN [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1dRlM9LROPQHg331CvNeXl9oeI6ZJlLdn", category: "PROMO ONLY" },
    { name: "PROMO ONLY - COUNTRY VIDEO", link: "https://drive.google.com/open?id=1sGimlkHPN3tc_4sj-JiFJi0uVVVVgnQl", category: "PROMO ONLY" },
    { name: "PROMO ONLY - LATIN VIDEO", link: "https://drive.google.com/open?id=1GFX1K-Ec0rtjPTdBoSHsKI2txgmSI_vj", category: "PROMO ONLY" },
    { name: "PROMO ONLY - URBAN CLUB [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1pSkRFVNdKPzTu3K8XS4nfbK3mdLVdXCi", category: "PROMO ONLY" },
    { name: "PROMO ONLY - URBAN RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1hQRb7IBndpPdM-UQgvy2hfGbtSVnilht", category: "PROMO ONLY" },
    { name: "RAVE FUNK", link: "https://drive.google.com/open?id=1rIxSx2ZV5AronpVN9BuFqVwRlLQB5jCC", category: "RAVE FUNK" },
    { name: "ROMPE DISCOTECA", link: "https://drive.google.com/open?id=1e7EGhefr__fhE4LZPST0dmwJ9BoHOv59", category: "ROMPE DISCOTECA" },
    { name: "RUNDERGROUND", link: "https://drive.google.com/open?id=1dKPeZ2KcU5y4Euq8XC_OBt7_Hk4z9sHy", category: "RUNDERGROUND" },
    { name: "SAMBA FUNK", link: "https://drive.google.com/open?id=1Cywf1OvF1v8IYRtpct70vkWIFz7XVEHi", category: "SAMBA" },
    { name: "SAMBA RAÍZ", link: "https://drive.google.com/open?id=11OQG_ezRS4uqSD84rT-IXa5l7UuYqwsC", category: "SAMBA" },
    { name: "SAMBAS DE ENREDO (RJ)", link: "https://drive.google.com/open?id=1cy2cLBquyoKuuWS3pwg4mnRKxHXBmj65", category: "SAMBA" },
    { name: "SAMBAS DE ENREDO (SP)", link: "https://drive.google.com/open?id=1k95Mm9LSi54BVyWd7cNYt4wc9sRuypQM", category: "SAMBA" },
    { name: "SELECT MIX - 70S ESSENTIALS VOL. 38", link: "https://drive.google.com/open?id=1VSBjmVV9mayMOKckwYbass_RMnpbwosg", category: "SELECT MIX" },
    { name: "SERTANEJO", link: "https://drive.google.com/open?id=1IKSf6fZEiFeLzvhofUCuSdf5yKi2FODl", category: "SERTANEJO" },
    { name: "SOULFUL HOUSE", link: "https://drive.google.com/open?id=17Ed2QFXFgHG16exY18KCwPxJYewedu5P", category: "SOULFUL HOUSE" },
    { name: "SWINGUEIRA", link: "https://drive.google.com/open?id=1tEAuW1mCggKbrCVllLAK2IYJ6PFWurau", category: "SWINGUEIRA" },
    { name: "TECH HOUSE", link: "https://drive.google.com/open?id=1rXFXEAwj2hxYBk6gU34xeQGRLpSWcQ9I", category: "TECH HOUSE" },
    { name: "TRAXSOURCE AFRO HOUSE", link: "https://drive.google.com/open?id=1r7KhUsnoVDuM91E0LChBWwo2N2qt5aip", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE JACKIN HOUSE", link: "https://drive.google.com/open?id=1tvT_Ex7VZn3LiFiG7A84cu4AA4MEX2hI", category: "TRAXSOURCE" },
    { name: "TRAXSOURCE NU DISCO", link: "https://drive.google.com/open?id=1nSNUtwupxxN-KgJCAUgkLNjkzqX19Num", category: "TRAXSOURCE" },
    { name: "ULTIMIX PROMO PACK", link: "https://drive.google.com/open?id=13HP5M0ZhGaSMgquC3vAdhOPDc4wPn0-0", category: "ULTIMIX" },
    { name: "ULTRASOUND AND ULTRATRAXX", link: "https://drive.google.com/open?id=1Jmsi8gnI_iss7LmqZgqxdauobOTjku60", category: "ULTRASOUND" },
    { name: "ULTRASOUND STUDIO VOL.18 - RARE REMIXES", link: "https://drive.google.com/open?id=1nduP_CPyBua79Mu2MNiwABk6K34dn_M8", category: "ULTRASOUND" },
    { name: "UNLIMITED LATIN", link: "https://drive.google.com/open?id=1JLbRZm95sV7EB7--DioJ_uTqM-8hItiF", category: "UNLIMITED LATIN" },
    { name: "WEEKEND PICKS 6 FEBRUARY 2025", link: "https://drive.google.com/open?id=1mkDMHfW1B0XVjvYoha4To3GHnPxDJAgv", category: "WEEKEND PICKS" },
    { name: "XMIX CHARTBUSTERS 229", link: "https://drive.google.com/open?id=1945ZRYPXBboQShOY-cjYwSMaohCwa_2a", category: "XMIX" },
    { name: "XMIX DANCE 303", link: "https://drive.google.com/open?id=1TqeIa7Hdy1qFLyAsWHIHdwxw1WRHcJxS", category: "XMIX" },
    { name: "XMIX SHORTCUTZ 2024", link: "https://drive.google.com/open?id=1Gzq5ciNJ0nHr_zrDaYx9znodPCBFKnAj", category: "XMIX" },
    { name: "XMIX URBAN + CLUB 310", link: "https://drive.google.com/open?id=12uLRFQ2QbxXuo5cee0-sVeK0av5rudCm", category: "XMIX" },
];

// Dados de configuração para o mês de Fevereiro
const februaryMonthData = {
  name: 'Fevereiro 2025',
  folders: februaryFolders,
  imageBanner: "https://i.ibb.co/mF67MMcG/fevereiro2025.png",
  prevMonth: { name: "Janeiro 2025", slug: "janeiro-2025" },
  nextMonth: { name: "Março 2025", slug: "marco-2025" },
};


export default function Fevereiro2025Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(februaryMonthData.folders.map((folder) => folder.category))).sort();
  }, []);

  const filteredFolders = useMemo(() => {
    let folders = februaryMonthData.folders;
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
    const message = `Olá! O link para a pasta "${folderName}" de Fevereiro de 2025 parece estar quebrado.`;
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
        <h1 className="font-bold text-3xl tracking-tight uppercase">{februaryMonthData.name}</h1>
      </div>

      <div className="flex justify-center mb-6">
          <Image
              src={februaryMonthData.imageBanner}
              alt={februaryMonthData.name}
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
            <h3 className="text-3xl md:text-4xl font-bold uppercase">Pastas de Fevereiro 2025</h3>
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
            <Link href="https://drive.google.com/drive/folders/1gqsgfmOXMbyXyC6T2IMQgAYK2WPvX1F7?usp=drive_link" target="_blank" rel="noopener noreferrer">
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
            {februaryMonthData.prevMonth ? (
                <Link href={`/atualizacoes/${februaryMonthData.prevMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {februaryMonthData.prevMonth.name}
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
            {februaryMonthData.nextMonth ? (
                <Link href={`/atualizacoes/${februaryMonthData.nextMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        {februaryMonthData.nextMonth.name}
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
