const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const folderData = [
    // --- ATUALIZAÇÕES DE 11/07/2025 ---
    { name: "MASTERMIX BEN LIEBRAND GRANDMIX 1993", link: "https://drive.google.com/drive/folders/1ogojtAMIArGLVwJef74RLOJrqWoSMD6s", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX CRATE 061 SPEED GARAGE", link: "https://drive.google.com/drive/folders/1h3JhRKEI0aRZtbOVa4_xxGRx4xRU1kgs", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX CRATE 063 (COUNTRY POP)", link: "https://drive.google.com/drive/folders/1hX64ds6utZ2GjEowrEvBjZY10876MqZi", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX DJ BEATS CHART 103", link: "https://drive.google.com/drive/folders/1qwaokxj2Ca-aTIgyawVB1lEVOHfZ8U1U", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX DJ EDITS SUMMER DANCE VOL. 1", link: "https://drive.google.com/drive/folders/1dFtuFGsqyzxV5oWoRv7xfmD8-ctGQEuy", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX GRANDMASTER COUNTRY POP", link: "https://drive.google.com/drive/folders/1acBpqhUu3gEAK5NYoy9ryZGJQ6pYKeAp", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX GRANDMASTER WARM UP VOL. 14 IBIZA DANCE", link: "https://drive.google.com/drive/folders/1adjjicGmZQmAuH_5hvruaTWDFbazDGqU", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX ISSUE 457", link: "https://drive.google.com/drive/folders/1zAf_FtF2wGIorIglSjCf4m9FiLr-XFCl", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX ISSUE 469", link: "https://drive.google.com/drive/folders/1-IBwkAWy-P-K6OpO9LJor5mTwZiZa3nP", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX JET BOOT JACK CLASSIC HITS VOL. 3 (EXTENDED)", link: "https://drive.google.com/drive/folders/19cKD5vBh7IXl1q-2p8mcu0r3kwy1eaff", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX JET BOOT JACK CLASSIC HITS VOL. 3 EDITS", link: "https://drive.google.com/drive/folders/1bzUqvQPQ9CueHtW3annkoi5JB1YRd4rr", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "DJ JÉSSIKA PRODUÇÕES", link: "https://drive.google.com/drive/folders/1YRwHbCsqQASUuu8tJMQizJ9Zp23XxdfS", category: "DJ JÉSSIKA", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "FUNKYMIX VOL. 305", link: "https://drive.google.com/drive/folders/1nYqSvvCmnVUAldu982LMZmt4JytbUKo_", category: "FUNKYMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "HYPERZ & REDRUMS", link: "https://drive.google.com/drive/folders/1nqxNcHZN_we581ful0GqeIhbPQd02BmW", category: "HYPERZ & REDRUMS", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX - CRATE 062 NEO SOUL", link: "https://drive.google.com/drive/folders/1M3nhafJb4_IC0PnlhOE-ETw7pozrp-HA", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX - DJ BEATS CHART VOL. 129", link: "https://drive.google.com/drive/folders/1eCSYkERV37kkWnD4CeSey_AJPjS7dC4H", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX - DJ BEATS VOL. 140", link: "https://drive.google.com/drive/folders/1CfxBvdDyhbkNk4LzxDSvzqQoQCZ0G4wA", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX - MX FUNKY HOUSE VOL. 01", link: "https://drive.google.com/drive/folders/1TaKNHwjYZWEYVCaWtThDTcep5tTfc4f1", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX BEN LIEBRAND CLASSICS VOL. 01", link: "https://drive.google.com/drive/folders/10_6NhTpImDY2uBgVaMLhkDftbk6OAUes", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "MASTERMIX BEN LIEBRAND COLLECTION VOL. 01", link: "https://drive.google.com/drive/folders/1aeJCSLO9Yfu3_0NCsKpmI43LUi1B8rg-", category: "MASTERMIX", date: "Atualizações de 11/07/2025", monthSlug: "julho-2025" },
    { name: "70's FLASHBACK REMIX", link: "https://drive.google.com/drive/folders/1nFV1jW4hUx0ozekdNAceI4IG0XL1xsXl", category: "FLASHBACK", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "8th WONDER", link: "https://drive.google.com/drive/folders/1ed1dcfB7UF_jydasfNimhjojmGLjSO-b", category: "8TH WONDER", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "ADESSO MUSIC SESSION 06", link: "https://drive.google.com/drive/folders/1Qce5LO-bToANBEf27JN6JGnTi7_Qrr0O", category: "ADESSO MUSIC", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "ALL IN ONE PARTYBREAKS AND REMIXES", link: "https://drive.google.com/drive/folders/1RTJcnCE-GIBT0gCgunUU1lU9iu8JPX-u", category: "ALL IN ONE PARTYBREAKS", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BACK TO THE FUTURE", link: "https://drive.google.com/drive/folders/1p1rkcmOA6j8H8ilYvXxsMVIK5-F_vA-r", category: "BACK TO THE FUTURE", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BARBANGERZ", link: "https://drive.google.com/drive/folders/1ioeIEGXfw2kemWBmAtxMnE13qqUQitex", category: "BARBANGERZ", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BEATFREAKS", link: "https://drive.google.com/drive/folders/1uhfxj3Kf6Tu3g3aN6l4b2gY7C7e3RniW", category: "BEATFREAKS", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BEATPORT DOWNTEMPO", link: "https://drive.google.com/drive/folders/1kBxaYb-yt0kOWLFZC4V3h5XRnHRXJMzg", category: "BEATPORT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BEATPORT FUNKY HOUSE", link: "https://drive.google.com/drive/folders/1sakSiut_5IS9kv0UcJxuWUfeoGc_uJN0", category: "BEATPORT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BEATPORT NEW RELEASES", link: "https://drive.google.com/drive/folders/1xAPfxmyV1Ho86fUo8tVbTzfunVQ2c2Ws", category: "BEATPORT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BEATPORT NU DISCO", link: "https://drive.google.com/drive/folders/1CYGQzAq4-dPf5Ykqje8dohLumLYKblxC", category: "BEATPORT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BEATPORT PROGRESSIVE HOUSE", link: "https://drive.google.com/drive/folders/1u_u6eXevZb_mQSPeWgx4H9Cef2aq8Isa", category: "BEATPORT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BEATPORT TECH HOUSE", link: "https://drive.google.com/drive/folders/1NoMRy_l3ffCnNDscDbXOclVeOu3Svj6W", category: "BEATPORT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "BEATPORT TECHNO (PEAK TIME DRIVING)", link: "https://drive.google.com/drive/folders/1gbOj8D0kpvba5Nd8fic405R4tBqkpCEO", category: "BEATPORT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "CRATE GANG", link: "https://drive.google.com/drive/folders/1eIcLWt8ntOxebJHU4Q2g-71UZTeW5izX", category: "CRATE GANG", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "CROOKLYN CLAN", link: "https://drive.google.com/drive/folders/11SdqPfQRwrt_AK6qwMKhTN-WMJ_QRk1u", category: "CROOKLYN CLAN", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "CUBA REMIX", link: "https://drive.google.com/drive/folders/19uLauCc7z8ifRdxcfOJXDV7JDNukz2Vx", category: "CUBA REMIX", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DEEP-HOUSE, BABY!, VOL. 3", link: "https://drive.google.com/drive/folders/1FzCKvOE82157xQuB13foWlTuaBXqlcUe", category: "DEEP HOUSE", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DIGITAL MUSIC POOL", link: "https://drive.google.com/drive/folders/1BaWKqNKU_ZI2-sBrQE5URTEg8kc0tGzV", category: "DIGITAL MUSIC POOL", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DIGITAL MUSIC SERVICE", link: "https://drive.google.com/drive/folders/1cy7hG_h36FCLRizxQgeIk41JRG44358_", category: "DIGITAL MUSIC SERVICE", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ ALLAN REMIX", link: "https://drive.google.com/drive/folders/18ocwCgUoD1Juk3aIY7T-G1P36y6soZVJ", category: "DJ ALLAN", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ ALLAN REMIX PACK", link: "https://drive.google.com/drive/folders/1TKTOWilEU5mynl_PBpgmXyHyChE_scy3", category: "DJ ALLAN", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ ARMAN AVEIRU REMIX PACK", link: "https://drive.google.com/drive/folders/1LzkC8aB0ZaBBi5EkwI9AWQiVrDLiQFIQ", category: "DJ ARMAN AVEIRU", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ CITY", link: "https://drive.google.com/drive/folders/111Om1jVTx7qQK5iHT8qlGpEX0cOxGIrT", category: "DJ CITY", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ JEFF REMIX", link: "https://drive.google.com/drive/folders/1LVeojt2d9VazsB8MccQWpBitfdfHR4p-", category: "DJ JEFF", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ JEFF REMIX PACK", link: "https://drive.google.com/drive/folders/1vDMoixpnFWvQ6iYjUOLvcp_KpiDfu0py", category: "DJ JEFF", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ MHARK REMIX", link: "https://drive.google.com/drive/folders/1Xy72HZ7Khsudlh02E9Tw35p9ThIz8kT4", category: "DJ MHARK", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ MHARK REMIX PACK", link: "https://drive.google.com/drive/folders/1ngRemU3g3idl76hTz2SmZlUyHeBCEZEW", category: "DJ MHARK", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ NASA REMIX PACK", link: "https://drive.google.com/drive/folders/1D7G-AiEX7JRqwU3bQ_TzcZEnoDWQeq4F", category: "DJ NASA", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "DJ OD REMIX PACK", link: "https://drive.google.com/drive/folders/1pQ6MdBiJHpbrCUAxXK3yq7eCH6YIGD0A", category: "DJ OD", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "EURODANCE", link: "https://drive.google.com/drive/folders/1RwkNxITYoFllXS3gjAk-SEBV6gDKg4xG", category: "EURODANCE", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "FUNK REMIX", link: "https://drive.google.com/drive/folders/1VE-TlTF_Djr0qEYOcpzc-E-AvyEIJWHb", category: "FUNK REMIX", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "HITS HITS HITS ÉTÉ (2025)", link: "https://drive.google.com/drive/folders/1VnRP2c6SBhk-V3uJs2XKIZ8Kqi_YGlqL", category: "HITS HITS HITS", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "HOUSE WAVES, VOL. 13", link: "https://drive.google.com/drive/folders/1ljIe8j5IRB7nH2Ogezv_9Z8TTwzSehiu", category: "HOUSE WAVES", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "HOUSE, BABY!, VOL. 2", link: "https://drive.google.com/drive/folders/1T-ZoVTeK2dGUIMZt6qFhJwxxDCObIk61", category: "HOUSE, BABY!", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "HOUSE, BABY!, VOL. 3", link: "https://drive.google.com/drive/folders/1KvSQ1a-rKknSr7FC7x5pdpiGKonR_w4K", category: "HOUSE, BABY!", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "HYPE JAMS MEGAPACK", link: "https://drive.google.com/drive/folders/1rxYCueozBsUMEjX9xFfyiC-uRRcIPysW", category: "HYPE JAMS", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "JAMES HYPE REMIX PACK", link: "https://drive.google.com/drive/folders/1K5NyfQWI5Aj1kGZJF1CGfPA-jAuLrg4-", category: "JAMES HYPE", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "LATIN THROWBACK", link: "https://drive.google.com/drive/folders/14HlwoBZgaqq8HdQTBAIL07qqNhhIld10", category: "LATIN THROWBACK", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MASTERMIX DJ BEATS VOL. 151", link: "https://drive.google.com/drive/folders/1aKa1Hfe76eIPmdG9ECybS7wr1leQIsKf", category: "MASTERMIX", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIDNIGHT GROOVES IN THE HOUSE, VOL.05", link: "https://drive.google.com/drive/folders/1nhZBYpRHw7tPFtNVgZtWwWwsFqrbwJc3", category: "MIDNIGHT GROOVES", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXINIT - CROOKLYN CLAN 2K10'S PARTY HITS VOL. 7", link: "https://drive.google.com/drive/folders/10Xxwsyoe9UhCCjr7-mNA-7rEUhFhMLTm", category: "MIXINIT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXINIT - SIZZAHANDZ ACTION DISCO WARPS VOL. 1", link: "https://drive.google.com/drive/folders/1cFTcl1hK0o8BGLNM14Rq04X5QpU8j6EN", category: "MIXINIT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXINIT - SIZZAHANDZ ACTION DISCO WARPS VOL. 3", link: "https://drive.google.com/drive/folders/1Bg_UnGapQeBTs46r3UoMD3WpoM_qmB3l", category: "MIXINIT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXINIT - STARJACK 2000’S WEDDING HITS VOL. 2", link: "https://drive.google.com/drive/folders/1WqCPJBKsFMUbkEznqTIY64KDxPrdg3Lf", category: "MIXINIT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXINIT - STARJACK EDM WEDDING HITS VOL. 2", link: "https://drive.google.com/drive/folders/1bUKav8r0SPnev3uO_CVK-1DEow4yaYc1", category: "MIXINIT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXINIT - STARJACK MERENGUE HITS VOL. 1", link: "https://drive.google.com/drive/folders/1ZplAyoeLr26xrXn_XZYE3I5Up_U1bLjR", category: "MIXINIT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXINIT - STARJACK WEDDING BANGERS VOL. 5", link: "https://drive.google.com/drive/folders/1zN1Vz9Tj8D8l1iMXwR-g9GMmL0ob7DuQ", category: "MIXINIT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXINIT - STARJACK WEDDING BANGERS VOL. 6", link: "https://drive.google.com/drive/folders/1R9v2SKRYigHlyjEJ-JsJG8I7tUIB0qUm", category: "MIXINIT", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXSHOW EDITS", link: "https://drive.google.com/drive/folders/1dxDMbXIMHez6nB3vQXGepApG63OCdC4B", category: "MIXSHOW", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MIXSHOW MEGAPACK", link: "https://drive.google.com/drive/folders/1au_nGJmOzXCPIqugF4UtUqX2dIF-OvEC", category: "MIXSHOW", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "MOOMBAHTON MEGAPACK", link: "https://drive.google.com/drive/folders/1lOC_hiw1n3GfH7od3saKwmz6Qtn399s6", category: "MOOMBAHTON", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "PETEDOWN REMIX PACK", link: "https://drive.google.com/drive/folders/1HfSfFWu00KZD1M2pxjh2VVCWA7ZBRFOn", category: "PETEDOWN", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "REMIX PLANET", link: "https://drive.google.com/drive/folders/1j5wkJpBSRrm1AAJOkQUI1ify1UkttgNm", category: "REMIX PLANET", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "RIVAS REMIX PACK", link: "https://drive.google.com/drive/folders/129jsqiyTkLaVINpeExeOIFbtoE59cPDG", category: "RIVAS", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "SEGUE MEGAPACK", link: "https://drive.google.com/drive/folders/1nC233lkqRyDTqxNAsXDsBkIyHcQ3fi0b", category: "SEGUE", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "SERTANEJO", link: "https://drive.google.com/drive/folders/1i5tTPBBzpVjwTFlFheA_yyC0wjKMX9sF", category: "SERTANEJO", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "SNIP HITS", link: "https://drive.google.com/drive/folders/1o6UOG9tAhaXriJITNwc_rZHz1cZ4iX3s", category: "SNIP HITS", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "SPIN BACK PROMOS", link: "https://drive.google.com/drive/folders/1MIABNw-USRb-C3lK5N7_UxbPlZbTc-dR", category: "SPIN BACK", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "STARJACK MEGAPACK", link: "https://drive.google.com/drive/folders/1Hi7ArIM1et3y3vyOO4bm2HkLyrFNWkCD", category: "STARJACK", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "THE MASHUP", link: "https://drive.google.com/drive/folders/1BABrFq4_H0RSeC8Hevj_jlSy8VbYmid_", category: "THE MASHUP", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
    { name: "TOTALMIX", link: "https://drive.google.com/drive/folders/11F7uQj1B0S_MBRpf63QP_4Bcb_xE81u5", category: "TOTALMIX", date: "Atualizações Anteriores", monthSlug: "julho-2025" },
];

async function main() {
  console.log("Iniciando o processo de semeadura...");
  for (const folder of folderData) {
    try {
      await prisma.folder.create({
        data: folder,
      });
      console.log(`- Criada a pasta: ${folder.name}`);
    } catch (error) {
      // Ignora o erro se a pasta já existir (baseado no link único)
      if (error.code === 'P2002') {
        console.log(`- Pasta já existe, pulando: ${folder.name}`);
      } else {
        console.error(`Erro ao criar a pasta ${folder.name}:`, error);
      }
    }
  }
  console.log("Semeadura concluída.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });