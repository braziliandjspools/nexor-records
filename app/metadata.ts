// app/metadata.ts (ou app/head.tsx)
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'N3XOR RECORDS - As Melhores Produções de Música Eletrônica e Packs de DJs do Brasil',
    description: 'Descubra a N3XOR RECORDS, sua plataforma completa para as últimas produções de música eletrônica, packs exclusivos de DJs como Jéssika Luana, e acesso a downloads premium via Debrid-Link e Deemix (músicas em FLAC). Conteúdo atualizado e de alta qualidade para DJs e entusiastas.',
    keywords: [
        'N3XOR RECORDS', 'Música Eletrônica Brasil', 'DJ Pools', 'Packs de DJs', 'DJ Jéssika Luana',
        'Produções Musicais', 'Remixes Exclusivos', 'Downloads FLAC', 'Deemix', 'Debrid-Link',
        'Música para DJs', 'Updates de Música', 'CDs Produzidos', 'Brasil DJ Pools',
        'Cultura DJ', 'Conteúdo para DJs', 'Batidão', 'Sertanejo Remix', 'Funk Remix',
        'House Music Brasil', 'Trance Brasil', 'Future House', 'Progressive House'
    ],
    openGraph: {
        title: 'N3XOR RECORDS - Plataforma VIP',
        description: 'Plataforma de Packs VIPs',
        url: 'https://plataformavip.nexorrecords.com.br/', // **IMPORTANTE: Mude para o URL real do seu site!**
        siteName: 'N3XOR RECORDS',
        images: [
            {
                url: '/images/images/open_graph.jpg', // **IMPORTANTE: Crie e use uma imagem otimizada para Open Graph (1200x630px)!**
                width: 1200,
                height: 630,
                alt: 'N3XOR RECORDS: Música Eletrônica, Packs de DJs, Downloads FLAC',
            },
            {
                url: 'https://n3xorrecords.com.br/images/dj-jessika-luana-profile.jpg', // Exemplo de segunda imagem para OG
                width: 800,
                height: 600,
                alt: 'DJ Jéssika Luana - Artista N3XOR RECORDS',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'N3XOR RECORDS - Música Eletrônica e Packs de DJs',
        description: 'As últimas produções, packs exclusivos de DJs e downloads FLAC para sua coleção. Visite N3XOR RECORDS!',
        creator: '@N3XORRecords', // Opcional: Se você tiver um usuário Twitter, substitua
        images: ['https://n3xorrecords.com.br/images/twitter-image-n3xor.jpg'], // **IMPORTANTE: Crie e use uma imagem otimizada para Twitter!**
    },
    robots: 'index, follow', 
    // Corrigido para 'authors' no plural e formatado como array de objetos
    authors: [{ name: 'N3XOR RECORDS Team' }], 
    creator: 'N3XOR RECORDS',
    publisher: 'N3XOR RECORDS',
    applicationName: 'N3XOR RECORDS App',
    alternates: {
        canonical: 'https://plataformavip.nexorrecords.com.br/', // **IMPORTANTE: Mude para o URL real e canônico da sua página!**
    },
};