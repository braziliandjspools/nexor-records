"use client"

import { useState, useEffect, useMemo } from "react"
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
  week: number // Essencial para agrupar por semana
}

// --- DADOS PARA JANEIRO 2025 ---
const januaryFolders: FolderItem[] = [
    // Semana 1
    { name: "AMERICA REMIX", link: "https://drive.google.com/open?id=1DLrPYERyTq17ZyvB-LKZ_4p4M31LximF", category: "AMERICA REMIX", week: 1 },
    { name: "BACK TO THE FUTURE", link: "https://drive.google.com/open?id=1slG56sJfDI4WY6e5pFoY0mj_fzJTXHlu", category: "BACK TO THE FUTURE", week: 1 },
    { name: "BARBANGERZ", link: "https://drive.google.com/open?id=1E2VptViR8IY-_5LjS-7cKlz8RoyYUqng", category: "BARBANGERZ", week: 1 },
    { name: "BEATFREAKZ", link: "https://drive.google.com/open?id=1maXoro3G9Ga2Ht76PnKnJH86tEnSqKdr", category: "BEATFREAKZ", week: 1 },
    { name: "BEATPORT BEST NEW AFRO HOUSE", link: "https://drive.google.com/open?id=1_xQ12K2qsSiWfTiF7NuKG2j-bNhyajME", category: "BEATPORT", week: 1 },
    { name: "BEATPORT EXCLUSIVES ONLY WEEK 3 (2025)", link: "https://drive.google.com/open?id=1FQyTiHZskYYSzJsU4iBh2NOZ-jC9zRFe", category: "BEATPORT", week: 1 },
    { name: "BEATPORT NEW RELEASES", link: "https://drive.google.com/open?id=1GApddbAhsvQTMlW-M8_s52OTEunWSq4h", category: "BEATPORT", week: 1 },
    { name: "BEATPORT TOP 100 TRANCE", link: "https://drive.google.com/open?id=1FnWFQcQORdSzZlapkiy6u-VJqHAyYpdx", category: "BEATPORT", week: 1 },
    { name: "BEATPORT TOP DOWNLOADS", link: "https://drive.google.com/open?id=1dblgxzN2nPDvYAf7tY_ioa-SR2jgrN57", category: "BEATPORT", week: 1 },
    { name: "BEEZO BEEHIVE", link: "https://drive.google.com/open?id=1XprWsH5Lf2uE9VvMkcqmWiNjZCIleVqC", category: "BEEZO BEEHIVE", week: 1 },
    { name: "BLEND 4 DJS", link: "https://drive.google.com/open?id=1nczV8WF9lXeTHrXTi9nqZMDfh4JWl-cz", category: "BLEND 4 DJS", week: 1 },
    { name: "BOOTLEGS", link: "https://drive.google.com/open?id=1gJaFdKjCzPyAHB5s5AV-e768HTOh6XkI", category: "BOOTLEGS", week: 1 },
    { name: "BPM SUPREME", link: "https://drive.google.com/open?id=11easmwPr62mGngT7KFpcrMjGUE4MqAMN", category: "BPM SUPREME", week: 1 },
    { name: "CICANA", link: "https://drive.google.com/open?id=1u0dvWnG0zMhSLMIR6Q5T7NdvGhJdwUFJ", category: "CICANA", week: 1 },
    { name: "CRACK 4 DJS", link: "https://drive.google.com/open?id=1cKRHYoa_D2vrKhhqpp9L6DR7Iyu6l8CY", category: "CRACK 4 DJS", week: 1 },
    { name: "CRATE GANG", link: "https://drive.google.com/open?id=1IfEtkdPzunhAV6r7254z7nY5C8ysCRFY", category: "CRATE GANG", week: 1 },
    { name: "CROOKLYN CLAN", link: "https://drive.google.com/open?id=1MRmnUAp3_EJi7HfRj4n16XXTfABjlyZm", category: "CROOKLYN CLAN", week: 1 },
    { name: "CUBA REMIX", link: "https://drive.google.com/open?id=19YWx0IRRnUv6GKQsjhoTE0IdCUwu4GyS", category: "CUBA REMIX", week: 1 },
    { name: "DALE MAS BAJO", link: "https://drive.google.com/open?id=1mGH1wYyDOiq0-Xb7KIY7iiHLB3e8mobH", category: "DALE MAS BAJO", week: 1 },
    { name: "DANNY DIGGZ REMIX PACK", link: "https://drive.google.com/open?id=1CcL6ZoVc2fgiq_iP__XNxnnqvDySDdaB", category: "DANNY DIGGZ", week: 1 },
    { name: "DANNYFULL", link: "https://drive.google.com/open?id=1RsoY5lC2W-e2WVxPTi6djF9uD0EIi_s8", category: "DANNYFULL", week: 1 },
    { name: "DEEP HOUSE", link: "https://drive.google.com/open?id=1Dg69oqkx03ZngnyV0_TivRuY5T7OSTiz", category: "DEEP HOUSE", week: 1 },
    { name: "DJ ALLAN REMIX", link: "https://drive.google.com/open?id=1Hu4qCxX3z-uTd45WJBrjstr0EYAgdFpJ", category: "DJ ALLAN", week: 1 },
    { name: "DJ FMSTEFF", link: "https://drive.google.com/open?id=1vZgEFkySPLuriJFFM9sZHgeAdNi_hGkf", category: "DJ FMSTEFF", week: 1 },
    { name: "ELECTRO HOUSE", link: "https://drive.google.com/open?id=1hyVZa5-nc996FgSShS7SSdnlXHeJZn53", category: "ELECTRO HOUSE", week: 1 },
    { name: "EUROPA REMIX", link: "https://drive.google.com/open?id=12XdtQE9FDN37Mmgb9DJtTQc_WmS1iIiH", category: "EUROPA REMIX", week: 1 },
    { name: "EXTENDED LATINO", link: "https://drive.google.com/open?id=1yUwOjknjii5VKoOs0bf4osngreMeA8zi", category: "EXTENDED LATINO", week: 1 },
    { name: "INTENSA", link: "https://drive.google.com/open?id=1Mo_m9_PLczZEp0u3X_tBTFGI5ntooICp", category: "INTENSA", week: 1 },
    { name: "JUST PLAY", link: "https://drive.google.com/open?id=1Lg8LmQUuEWm5BJq-Ax2Wvt6mG0RtryvY", category: "JUST PLAY", week: 1 },
    { name: "LATIN BOX", link: "https://drive.google.com/open?id=1FH5b5wx9gv4C-OrI2hUP4Nb1vlnHE4UB", category: "LATIN BOX", week: 1 },
    { name: "LATIN THROWBACK", link: "https://drive.google.com/open?id=19SgQApcQIEbo2JgUjTRggPITCLHdUU_s", category: "LATIN THROWBACK", week: 1 },
    { name: "MIXESPOOL", link: "https://drive.google.com/open?id=1lHJMZ9HLnlcNd5zaihtTy6m4AajQn_D-", category: "MIXESPOOL", week: 1 },
    { name: "MIXINIT - CLAUDIO D 80S CLASSIC HOUSE MUSIC HITS VOL. 1", link: "https://drive.google.com/open?id=128em6iMnPEnx0mF-d_lQdjmZXRmKvGk1", category: "MIXINIT", week: 1 },
    { name: "MIXINIT - COLLINI BIG ROOM BANGERS VOL. 14", link: "https://drive.google.com/open?id=1S42-MZ5jeDZuSaCv0fZIYm7hZbz-hM97", category: "MIXINIT", week: 1 },
    { name: "MIXINIT - COLLINI CLUB HOUSE VOL. 15", link: "https://drive.google.com/open?id=1FyCEbIVP_5e-UgvLqGdWCnfTWXkYpDen", category: "MIXINIT", week: 1 },

    // Semana 2
    { name: "MIXINIT - COLLINI MOST WANTED 80'S VOL. 2", link: "https://drive.google.com/open?id=1Y5IjZ-8FzL3fBalFiwpJqg9flLqiKHHo", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - CROOKLYN CLAN 2024 TOP HITS", link: "https://drive.google.com/open?id=1onC_akAEdS_1CwR1niXRMGoMlkevS5hi", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - SIZZAHANDZ ULTIMATE 70'S & 80'S DISCO WARPS VOL. 1", link: "https://drive.google.com/open?id=1-vDC4juV8F1pZEF2N-rfKgqKHxRnJTwp", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK 2022 BEST OF RAP SHORT CUTS VOL. 1", link: "https://drive.google.com/open?id=1iewDpJdi52L2HIywL2FawK4cSBxgBwQV", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK FUNKY WEDDING HITS VOL. 1", link: "https://drive.google.com/open?id=1NjDOBw1TCgDjZPIxjftVszUc10yYLHke", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK FUNKY WEDDING HITS VOL. 2", link: "https://drive.google.com/open?id=1d2wNVQR8k04e8i6BQxT785WW8SX8iq4O", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK LATIN FRESH HITZ 2024 VOL. 1", link: "https://drive.google.com/open?id=1wDS5mXCG2d-dL0v2uWFrhdfEtHYg45dQ", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK LATIN PARTY HITS VOL. 1", link: "https://drive.google.com/open?id=1peVtJkMmFZQ0TbLq6gQu-9mit5zc8QxT", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK R&B FRESH HITZ 2024 VOL. 1", link: "https://drive.google.com/open?id=1d59t3qE6tssbgDp3O1i0t4uh6VyyRDtL", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK RAP FRESH HITZ VOL. 1", link: "https://drive.google.com/open?id=1YAUYunQ_z-AZ9hFEQk-QOpbVdCcQAGuR", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK SECRET WEAPON HITS VOL. 13", link: "https://drive.google.com/open?id=13KAkJmrOSWcWasiLDR3qFYTwye9rjig-", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK SECRET WEAPON MASHUPS VOL. 1", link: "https://drive.google.com/open?id=1DgyEiWog7pL6io-BAmcy276DIb1vfq7-", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - STARJACK UNOFFICIAL HOUSE REMIXES VOL. 16", link: "https://drive.google.com/open?id=1AreQ6y3EwhDGtdbnpuCqg0SLGnhdY8n2", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - THE GOODFELLAS ALL TIME BEST SELLERS VOL. 9", link: "https://drive.google.com/open?id=12c8NjlLi3JgwRZYdYAtqXNQ56hc9oE1y", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - THE GOODFELLAS BEST OF FATMAN SCOOP & GF'S VOL. 1", link: "https://drive.google.com/open?id=1Q_kFIQU4zR9kSzBLxrBg3aFr4sANK2uX", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - THE GOODFELLAS NEW HIP-HOP & RAP THE HITS VOL. 11", link: "https://drive.google.com/open?id=1CSJF7_ptTGPusxmHwCnQexMOIHuhhIPX", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - THE GOODFELLAS NEW HIP-HOP & RAP THE HITS VOL. 12", link: "https://drive.google.com/open?id=1A8IK7foRxPXKHGnEBZeIBxgyv8RKHR87", category: "MIXINIT", week: 2 },
    { name: "MIXINIT - TJ THE DJ THE STATE OF POP [2023]", link: "https://drive.google.com/open?id=1NkDrdwMpQ79qDJ7_vNOdkUepxLK9LtQK", category: "MIXINIT", week: 2 },
    { name: "NOTHING BUT... FUNKY HOUSE GROOVES VOL.28", link: "https://drive.google.com/open?id=1AGk1ELYLWI-L1wR3Sa3cINWd38uIHOvr", category: "NOTHING BUT...", week: 2 },
    { name: "PRO LATIN REMIX", link: "https://drive.google.com/open?id=1PBecD54ETGqHQTsgV1zwbCzgtTyErR99", category: "PRO LATIN REMIX", week: 2 },
    { name: "PROMO ONLY ALTERNATIVE CLUB [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1M6oAlRPCJow3KCN4x98YJ5WomjPeojMv", category: "PROMO ONLY", week: 2 },
    { name: "PROMO ONLY ALTERNATIVE CLUB [JANUARY 2025]", link: "https://drive.google.com/open?id=1yKP7XEPkFsEMjx5OM-HrIPih7lmw7MtS", category: "PROMO ONLY", week: 2 },
    { name: "PROMO ONLY CARIBBEAN SERIES [JANUARY 2025]", link: "https://drive.google.com/open?id=1Rqg3N4EM6gqZMmd9Xjx56kp3-EwpgFyf", category: "PROMO ONLY", week: 2 },
    { name: "PROMO ONLY CONTEMPORARY CHRISTIAN [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1aqTtoMdIn8xNgYDiEvC8157VYTyngcPV", category: "PROMO ONLY", week: 2 },
    { name: "PROMO ONLY COUNTRY RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1UhqLwCmOeb-krlVGC5EiBhm6-DF8_AA8", category: "PROMO ONLY", week: 2 },
    { name: "SERTANEJO", link: "https://drive.google.com/open?id=1Pqq2LGnejs4NZEqzAjL_bBuXFzrRbn61", category: "SERTANEJO", week: 2 },
    { name: "THE MASHUP", link: "https://drive.google.com/open?id=1L2BEOoskE-1djlSSVdfukIM0p90i4pxT", category: "THE MASHUP", week: 2 },
    { name: "TRAXSOURCE AFRO HOUSE", link: "https://drive.google.com/open?id=19afzSASHpiptU4HzN8bpmT_7JauZ03CH", category: "TRAXSOURCE", week: 2 },
    { name: "TRAXSOURCE HOUSE", link: "https://drive.google.com/open?id=1cJHm-V8gl81xME-4MrFpTHN7uMeP33vg", category: "TRAXSOURCE", week: 2 },
    { name: "TRAXSOURCE JACKIN HOUSE", link: "https://drive.google.com/open?id=1TTaBLBkRduZIIHDlSQyaWpV-NoQF79j8", category: "TRAXSOURCE", week: 2 },
    { name: "TRAXSOURCE MOST WANTED DJ CHARTS", link: "https://drive.google.com/open?id=1_FRSVkvPtGewTaP05gk_g3sPULZfErE0", category: "TRAXSOURCE", week: 2 },
    { name: "TRAXSOURCE MOST WANTED DJS CHART", link: "https://drive.google.com/open?id=1Effk8SnlVQmQzhvhxoo3Ffec3ytpCaTl", category: "TRAXSOURCE", week: 2 },
    { name: "TRAXSOURCE NEW RELEASES", link: "https://drive.google.com/open?id=12RjJrzrbiHEhqs8RgPPxlHLeMmjalfUQ", category: "TRAXSOURCE", week: 2 },
    { name: "TRAXSOURCE NU DISCO", link: "https://drive.google.com/open?id=1Ed775kiZFBPT1nYtNWNMJL7oIC-IDssm", category: "TRAXSOURCE", week: 2 },
    { name: "UNLIMITED LATIN", link: "https://drive.google.com/open?id=1vu3PjzeKGnn60WNQkou42QsVMg91zSoA", category: "UNLIMITED LATIN", week: 2 },

    // Semana 3
    { name: "BACK TO 90'S", link: "https://drive.google.com/open?id=1GofSEjyABNG3CutVbCrKb3FMA3O3S3Nl", category: "BACK TO 90'S", week: 3 },
    { name: "BACK TO THE FUTURE", link: "https://drive.google.com/open?id=1WkJGe5MqqWZdTe2vWZF0_4fOZPMoteAp", category: "BACK TO THE FUTURE", week: 3 },
    { name: "BARBANGERZ", link: "https://drive.google.com/open?id=1QrzRF40mpzyssJn9Hjq-PzXuiPMhf0MY", category: "BARBANGERZ", week: 3 },
    { name: "BASS HOUSE", link: "https://drive.google.com/open?id=1-uK9OFw48XC_ndiwGB5625MKqcQSr0FG", category: "BASS HOUSE", week: 3 },
    { name: "BEATFREAKZ", link: "https://drive.google.com/open?id=1sElL2mPSLkcTU6MQZX4ZaUo-3tPZFXBj", category: "BEATFREAKZ", week: 3 },
    { name: "BEATJUNKIES", link: "https://drive.google.com/open?id=1gfy64lg7MqAu-rfyptOvE85yaKkJLNdf", category: "BEATJUNKIES", week: 3 },
    { name: "BEATPORT ADE SPECIAL", link: "https://drive.google.com/open?id=1Uz2q4IUUiMBXjb45RfIFIzJ_63-pSz0w", category: "BEATPORT", week: 3 },
    { name: "BEATPORT DJ TRACKS", link: "https://drive.google.com/open?id=12cIsnhWTN_bOq2oerGs0Ko5aXHTZ1iwO", category: "BEATPORT", week: 3 },
    { name: "BEATPORT NEW RELEASES", link: "https://drive.google.com/open?id=1RHCmwnckWFnkatGzMmlj2waInUhclzof", category: "BEATPORT", week: 3 },
    { name: "BEATPORT PACK", link: "https://drive.google.com/open?id=1Qd6cyC6y_7TaZYSQI2DS3lSyzNvBGsLt", category: "BEATPORT", week: 3 },
    { name: "BEATPORT STAFF PICKS", link: "https://drive.google.com/open?id=1QrFloTes73HZhhqNpmAtIkuS9Q5NB7bB", category: "BEATPORT", week: 3 },
    { name: "BEST NEW TRACKS", link: "https://drive.google.com/open?id=1OiEC-C3p0LNOeMjMzwN46TIaxwQ8Wn0t", category: "BEST NEW TRACKS", week: 3 },
    { name: "BIG ROOM", link: "https://drive.google.com/open?id=1nMgbaJIOE-8zBSsYDdmEQ55pKDRnHcbL", category: "BIG ROOM", week: 3 },
    { name: "BLACK MUSIC", link: "https://drive.google.com/open?id=12rkR_a8F4c2kNb0nKmVIOY3-kaS6OqGD", category: "BLACK MUSIC", week: 3 },
    { name: "BPM SUPREME", link: "https://drive.google.com/open?id=1imoBEy_hXcmFJ6dMpgZu2CySIiAGowW1", category: "BPM SUPREME", week: 3 },
    { name: "BRAZILIAN BASS", link: "https://drive.google.com/open?id=1_8NxkoHMNtrCbFQYHaZFeYoi-7kfN70D", category: "BRAZILIAN BASS", week: 3 },
    { name: "CLUB KILLERS", link: "https://drive.google.com/open?id=1QDk8A27M_7qsf_n11zPzPd-s9lqSWsJr", category: "CLUB KILLERS", week: 3 },
    { name: "CRACK 4 DJS", link: "https://drive.google.com/open?id=1xlxy_jbxIsOp_BRPQXA80sTBjPYY7H4q", category: "CRACK 4 DJS", week: 3 },
    { name: "PROMO ONLY DANCE RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1ZiveIiHnbkDw0UsQ4WOv1xyaIGbgFcP7", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY EXPRESS AUDIO DFF [JANUARY 2025] [WEEK 1]", link: "https://drive.google.com/open?id=1VjrR-4ETVVj5KbuwU9gHQIV-Ruo4iofL", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY EXPRESS AUDIO DFF [JANUARY 2025] [WEEK 2]", link: "https://drive.google.com/open?id=1FX0nsgQo-QxqZPwR8ylRoHUDFuqs4_Gs", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY EXPRESS AUDIO DFF DECEMBER 2024 WEEK 2", link: "https://drive.google.com/open?id=1YtiRdc9wqet-dhstS6yp5WR9PbZYWCaz", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY EXPRESS AUDIO DJ TOOLS [JANUARY 2025] [WEEK 1]", link: "https://drive.google.com/open?id=18wi7OG68F2VkRtSWmjQojScTEBz8fJBM", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY EXPRESS AUDIO DJ TOOLS [JANUARY 2025] [WEEK 2]", link: "https://drive.google.com/open?id=1jGmHEUq8hXR6zLomDyHgTUeartu6TH4o", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY EXPRESS AUDIO DJ TOOLS DECEMBER 2024 WEEK 2", link: "https://drive.google.com/open?id=129z6oujv2ZQUYVJscAqcCfxnoaGE_w6N", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY MAINSTREAM RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1tqRP05PXWTqTneR9nHARGkA3bK_hcIuz", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY MODERN ROCK RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=13j40RHZ7lyihnpYgxMp5cspmE5jFaLns", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY REGIONAL LATIN [JANUARY 2025]", link: "https://drive.google.com/open?id=1F4uL3MOCxL7xIgJNwoKS0Qo3r5n8XAnG", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY RHYTHM CLUB [JANUARY 2025]", link: "https://drive.google.com/open?id=1bRsU9mSbt68wYoKo0MdV9nd7CIDRjRxP", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY RHYTHM RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1_hq6dTCT0fbXL1cIW7qpwkGCBSejpho-", category: "PROMO ONLY", week: 3 },
    { name: "PROMO ONLY URBAN RADIO [FEBRUARY 2025]", link: "https://drive.google.com/open?id=1ZT1oIjrpIH0kyCUZLGy4j3SNSu7sJek_", category: "PROMO ONLY", week: 3 },
    { name: "REGGAE & REGGAE REMIX [PROMOS]", link: "https://drive.google.com/open?id=1xJHwxSC8v_bITjKlmYUwgFZoz-CXv_6D", category: "REGGAE", week: 3 },
    { name: "ROMPE DISCOTECA", link: "https://drive.google.com/open?id=1X5VOxltb7nzeioLz22vsGvWwaQa1H2Cv", category: "ROMPE DISCOTECA", week: 3 },
    { name: "RUNDERGROUND", link: "https://drive.google.com/open?id=1WPM-CAu9OdSVgok9MjbLFqVPMXCle6gF", category: "RUNDERGROUND", week: 3 },
    { name: "SEGUE MEGAPACK", link: "https://drive.google.com/open?id=1gf6mTP08Mf4R2rkT4Opfv2Wqe-InlSdI", category: "SEGUE", week: 3 },
];

// Dados de configuração para o mês de Janeiro
const januaryMonthData = {
  name: 'Janeiro 2025',
  folders: januaryFolders,
  weeks: {
      1: { title: "SEMANA 01", dateRange: "30.12 À 05.01", driveLink: "https://drive.google.com/drive/folders/1iDnfzbbmggRBLtkbWpsudglFWLfZ3fal" },
      2: { title: "SEMANA 02", dateRange: "06.01 À 12.01", driveLink: "https://drive.google.com/drive/folders/1XIVY3q2Ns0gi5uhoZ50g-a5d-B0AB_vn" },
      3: { title: "SEMANA 03", dateRange: "13.01 À 19.01", driveLink: "#" },
      4: { title: "SEMANA 04", dateRange: "20.01 À 26.01", driveLink: "#" },
  },
  imageBanner: "https://iili.io/F1ZIKDG.png",
  prevMonth: { name: "Dezembro 2024", slug: "dezembro-2024" },
  nextMonth: { name: "Fevereiro 2025", slug: "fevereiro-2025" },
};


export default function Janeiro2025Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(januaryMonthData.folders.map((folder) => folder.category))).sort();
  }, []);

  const filteredFolders = useMemo(() => {
    let folders = januaryMonthData.folders;
    if (selectedCategory !== "all") {
        folders = folders.filter(folder => folder.category === selectedCategory);
    }
    if (searchQuery.trim() !== "") {
        folders = folders.filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return folders;
  }, [searchQuery, selectedCategory]);

  const groupedFoldersByWeek = useMemo(() => {
    return filteredFolders.reduce((acc, folder) => {
        (acc[folder.week] = acc[folder.week] || []).push(folder);
        return acc;
    }, {} as { [week: number]: FolderItem[] });
  }, [filteredFolders]);


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

  const handleReportLink = (folderName: string, weekTitle: string, monthName: string) => {
    const message = `Olá! O link para a pasta "${folderName}" da ${weekTitle} de ${monthName} parece estar quebrado.`;
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
        <h1 className="font-bold text-3xl tracking-tight uppercase">{januaryMonthData.name}</h1>
      </div>

      <div className="flex justify-center mb-6">
          <Image
              src={januaryMonthData.imageBanner}
              alt={januaryMonthData.name}
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

        <div className="space-y-8">
            {Object.keys(januaryMonthData.weeks).sort((a, b) => Number(b) - Number(a)).map((weekNumberStr, index, array) => {
                const weekNumber = Number(weekNumberStr);
                const weekData = januaryMonthData.weeks[weekNumber];
                const foldersForThisWeek = groupedFoldersByWeek[weekNumber] || [];

                return (
                    <div key={weekNumber} id={`semana-${weekNumber}`}>
                        <div className="text-center mb-4">
                            <h3 className="text-3xl md:text-4xl font-bold uppercase">
                                {weekData.title}
                            </h3>
                            <p className="text-md font-semibold text-green-400">
                                {weekData.dateRange}
                            </p>
                        </div>
                        
                        {weekNumber === 4 ? (
                            <div className="bg-yellow-900/30 border border-yellow-600/30 text-yellow-200 p-4 rounded-lg text-center space-y-2">
                                <AlertTriangle className="h-8 w-8 mx-auto text-yellow-400"/>
                                <p className="font-bold">Semana Indisponível</p>
                                <p className="text-sm">Não houve atualizações de packs nesta semana devido a uma internação da DJ responsável.</p>
                            </div>
                        ) : foldersForThisWeek.length > 0 ? (
                            <>
                                <div className="space-y-4">
                                    {foldersForThisWeek.map((folder, idx) => {
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
                                                        <Image src="https://iili.io/F1Zokg9.png" alt="Folder" width={20} height={20} className="flex-shrink-0" />
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
                                                        onClick={() => handleReportLink(folder.name, weekData.title, januaryMonthData.name)}
                                                        className="flex-shrink-0 border-yellow-600/30 text-yellow-500 hover:bg-yellow-600/20 hover:text-yellow-400 bg-black/40"
                                                        title="Reportar link quebrado"
                                                    >
                                                        <AlertTriangle className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Link href={weekData.driveLink} target="_blank" rel="noopener noreferrer">
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
                            </>
                        ) : (
                             <Alert className="bg-gray-800 border-gray-700 text-gray-400">
                                <AlertDescription className="text-center">
                                    Nenhum pack encontrado para esta semana com os filtros atuais.
                                </AlertDescription>
                            </Alert>
                        )}

                        {index < array.length - 1 && (<hr className="my-8 border-green-600/30"/>)}
                    </div>
                );
            })}
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-green-600/30 p-4 z-20">
        <div className="container mx-auto flex justify-center items-center gap-2 sm:gap-4">
            {januaryMonthData.prevMonth ? (
                <Link href={`/atualizacoes/${januaryMonthData.prevMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {januaryMonthData.prevMonth.name}
                    </Button>
                </Link>
            ) : (
                <Button variant="outline" className="border-gray-600/50" disabled>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Início
                </Button>
            )}
            <Link href="/atualizacoes" passHref>
                <Button variant="secondary" className="bg-green-600 hover:bg-green-700">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
            {januaryMonthData.nextMonth ? (
                <Link href={`/atualizacoes/${januaryMonthData.nextMonth.slug}`} passHref>
                    <Button variant="outline" className="border-green-600/50">
                        {januaryMonthData.nextMonth.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            ) : (
                 <Button variant="outline" className="border-gray-600/50" disabled>
                    Fim
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
        </div>
      </footer>
    </div>
  )
}
