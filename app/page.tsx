// app/page.tsx
"use client"

import React, { useEffect, useState, memo, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react"
import { Download, ShoppingBag, Music, Clock, ExternalLink, Disc, Cloud, Star, Users, Album, Sparkles, Rocket, Heart } from "lucide-react"

// A importação de Metadata NÃO é mais necessária aqui, pois ela está em app/metadata.ts
// import { Metadata } from 'next'; 

// --- Componentes de UI autônomos ---

interface CardProps {
    className?: string;
    children: ReactNode;
    [key: string]: any; 
}

const Card = ({ className, children, ...props }: CardProps) => (
    <div className={`bg-card text-card-foreground border rounded-lg shadow-sm ${className}`} {...props}>
        {children}
    </div>
);

interface CardContentProps {
    className?: string;
    children: ReactNode;
    [key: string]: any;
}

const CardContent = ({ className, children, ...props }: CardContentProps) => (
    <div className={`p-0 ${className}`} {...props}>
        {children}
    </div>
);

interface CardFooterProps {
    className?: string;
    children: ReactNode;
    [key: string]: any;
}

const CardFooter = ({ className, children, ...props }: CardFooterProps) => (
    <div className={`flex items-center p-3 text-center ${className}`} {...props}>
        {children}
    </div>
);

interface CarouselProps {
    children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 3;

    const childrenArray = React.Children.toArray(children);
    const totalPages = Math.ceil(childrenArray.length / itemsPerSlide);

    const pages = Array.from({ length: totalPages }).map((_, pageIndex) =>
        childrenArray.slice(pageIndex * itemsPerSlide, (pageIndex + 1) * itemsPerSlide)
    );

    const next = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
    };

    const prev = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + totalPages) % totalPages);
    };

    const goToSlide = (pageIndex: number) => { 
        setCurrentIndex(pageIndex);
    };

    return (
        <div className="relative group/carousel" style={{ paddingBottom: '30px' }}>
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {pages.map((page, pageIndex) => (
                        <div key={pageIndex} className="flex-shrink-0 w-full flex justify-start">
                            {page.map((child, itemIndex) => (
                                <div key={itemIndex} className="w-1/3 px-2">
                                    {child}
                                </div>
                            ))}
                            {page.length < itemsPerSlide && Array.from({ length: itemsPerSlide - page.length }).map((_, i) => (
                                <div key={`placeholder-${i}`} className="w-1/3 px-2"></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={prev}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all z-10 hover:bg-black/75"
                aria-label="Anterior"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
                onClick={next}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all z-10 hover:bg-black/75"
                aria-label="Próximo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-[width,background-color] duration-300 ease-in-out ${currentIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Ir para a página ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    href?: never; 
}

interface ButtonAsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    children: ReactNode;
    href: string; 
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = ({ className, children, ...props }: ButtonProps) => {
    const isLink = 'href' in props && props.href !== undefined;
    const baseClasses = `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`;

    if (isLink) {
        const linkProps = props as ButtonAsLinkProps; 
        return (
            <a className={`${baseClasses} ${className}`} {...linkProps}>
                {children}
            </a>
        );
    } else {
        const buttonProps = props as ButtonAsButtonProps; 
        return (
            <button className={`${baseClasses} ${className}`} {...buttonProps}>
                {children}
            </button>
        );
    }
};

interface SoundCloudTrackProps {
    embedCode: string;
}

const SoundCloudTrack = memo(function SoundCloudTrack({ embedCode }: SoundCloudTrackProps) {
    return <div dangerouslySetInnerHTML={{ __html: embedCode }} />;
});

const GoogleFont = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,200&display=swap');
    
    .font-version {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 200;
      font-style: italic;
    }
  `}</style>
);


export default function Home() {
    const [currentDate, setCurrentDate] = useState("")
    const [currentTime, setCurrentTime] = useState("")
    const [isSubscriber, setIsSubscriber] = useState(true); 

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date()
            const formattedDate = now.toLocaleDateString("pt-BR")
            const formattedTime = now.toLocaleTimeString("pt-BR")
            setCurrentDate(formattedDate)
            setCurrentTime(formattedTime)
        }
        updateDateTime()
        const interval = setInterval(updateDateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    const pools = [
        { id: 1, title: "Dj Jéssika Luana - Il Dj Di Tutta Italia", image: "/images/atwork_5623.jpg" },
        { id: 2, title: "Dj Jéssika Luana - I Shattered with You", image: "/images/atwork_4568.jpg" },
        { id: 3, title: "Dj Jéssika Luana - Feel Me Close", image: "/images/atwork_0001.jpg" },
        { id: 4, title: "Dj Jéssika Luana - Vodka na Gela 2.0", image: "/images/atwork_4125.jpg" },
        { id: 5, title: "Dj Jéssika Luana - Notte Senza Fine", image: "/images/atwork_4189.jpg" },
        { id: 6, title: "Dj Jéssika Luana - Molhando o Volante", image: "/images/atwork_5689.jpg" },
        { id: 7, title: "Dj Jéssika Luana - Ela Trocou a City pelo Sertão", image: "/images/atwork_5856.jpg" },
        { id: 8, title: "Dj Jéssika Luana - Agro é Top no Batidão", image: "/images/atwork_4330840.jpg" },
        { id: 9, title: "Dj Jéssika Luana - Burning Horizon", image: "/images/atwork_4325293.jpg" },
        { id: 10, title: "Dj Jéssika Luana - Favela é Potência", image: "/images/atwork_4316416.jpg" },
        { id: 11, title: "Dj Jéssika Luana - Electric Strings", image: "/images/atwork_4316388.jpg" },
        { id: 23, title: "Dj Jéssika Luana - Ela sabe que é Patrícia", image: "/images/atwork_4316374.jpg" },
        { id: 24, title: "Dj Jéssika Luana - EP - Melô da Cultura", image: "/images/atwork_4313524.jpg" },
        { id: 12, title: "Dj Jéssika Luana - Notte Senza Fine", image: "/images/atwork_4313427.jpg" },
        { id: 13, title: "Dj Jéssika Luana - Do You Wanna Play A Game", image: "/images/atwork_4313416.jpg" },
        { id: 14, title: "Dj Jéssika Luana - Bate Forte Pernambuco", image: "/images/atwork_4313365.jpg" },
        { id: 15, title: "Dj Jéssika Luana - Vem Pro Meu Ritmo", image: "/images/atwork_4302245.jpg" },
        { id: 16, title: "Dj Jéssika Luana - No Limite Dos Graves", image: "/images/atwork_4302452.jpg" },
        { id: 17, title: "Dj Jéssika Luana - O Mamute Morreu", image: "/images/atwork_4302651.jpg" },
        { id: 18, title: "Dj Jéssika Luana - Electric Pulse", image: "/images/atwork_4302688.jpg" },
        { id: 19, title: "Dj Jéssika Luana - Tomorrow Beats", image: "/images/atwork_4302708.jpg" },
        { id: 20, title: "Dj Jéssika Luana - Light up the Night", image: "/images/atwork_4305560.jpg" },
        { id: 21, title: "Dj Jéssika Luana - Tu Acha Que Manda", image: "/images/atwork_4312939.jpg" },
        { id: 22, title: "Dj Jéssika Luana - Whistle in the Dark", image: "/images/atwork_4313244.jpg" },
    ]

    const djPacks = [
        { id: 5, name: "DJ JÉSSIKA LUANA", image: "https://i.ibb.co/xtF9YZv/Dj-J-ssica-site.png" },
        { id: 1, name: "DJ ALOK", image: "https://i.ibb.co/XZHWSnPN/ALOK.jpg" },
        { id: 2, name: "DENNIS DJ", image: "https://i.ibb.co/5WFTMDZY/IMAGEM-INTERNA-0.jpg" },
        { id: 3, name: "MARTIN GARRIX", image: "https://i.ibb.co/NnpjWzz0/MARTIN-GARRIX.jpg" },
        { id: 4, name: "DJ ERNANI", image: "https://i.ibb.co/nsJ860vn/DJ-ERNANI.jpg" },
        { id: 6, name: "CALVIN HARRIS", image: "https://i.ibb.co/R4ty5QHX/CALVIN-HARRIS.jpgD" },
        { id: 7, name: "DON DIABLO", image: "https://i.ibb.co/8Vxqy5h/DON-DIABLO.jpg" },
        { id: 8, name: "R3HAB", image: "https://i.ibb.co/4wYq8Hf8/R3HAB.jpg" },
        { id: 9, name: "DAVID GUETTA", image: "https://i.ibb.co/Qv0Wr0w0/davidguetta.jpg" },
        { id: 10, name: "ALESSO", image: "https://i.ibb.co/pv2p1chC/M1wi-F7-YZXSAya-NSo-Kvle.jpg" },
        { id: 11, name: "BRUNO MARTINI", image: "https://i.ibb.co/LD6bkPPf/BRUNO-MARTINI.jpg" },
        { id: 12, name: "DUBDOGZ", image: "https://i.ibb.co/hJsDSHPT/DUBDOGZ.jpg" },
    ]

    const cdsProduzidos = [
        { id: 5, title: "LINHA CRUZADA", image: "https://i.ibb.co/jP11Z3Cz/20250522-1101-lbum-Sertanejo-Cora-o-remix-01jvw4prw4ee9vd325v5zgwdaa.png", link: "https://suamusica.com.br/rebekasanches/coracao-em-linha-cruzada" },
        { id: 4, title: "RAÍZES SERTANEJAS", image: "https://i.ibb.co/xtxYjZtD/20250519-1108-Ra-zes-Sertanejas-remix-01jvmdxcndeq09a3e4j0jgftv0.png20250516-1126-Capa-Playlist-DJ-Rick-remix-01jvcqr7y8f08937wx3qryfntz.png", link: "https://suamusica.com.br/rebekasanches/raizes-sertanejas" },
        { id: 1, title: "FORROZINHO DA SAUDADE", image: "https://i.ibb.co/JRDXNxhr/20250518-1108-Tema-Nordestino-Alegre-remix-01jvhvhd57exp8tffdqwn42tyn.png", link: "https://suamusica.com.br/rebeka_sanches/forrozinho-da-saudade-boa" },
        { id: 2, title: "DUETOS", image: "https://i.ibb.co/3m31HMDx/20250517-1114-Duetos-Homenagem-Musical-remix-01jvf9f8asf08a13ncyxhg1y6g.png", link: "https://suamusica.com.br/rebeka_sanches/duetos" },
        { id: 3, title: "DJ RICK VOL. 01", image: "https://i.ibb.co/N2wnbPcf/20250516-1126-Capa-Playlist-DJ-Rick-remix-01jvcqr7y8f08937wx3qryfntz.png", link: "https://soundcloud.com/brdjspools-757234068/sets/dj-rick-cd-01" },
    ]

    const soundcloudTracks = [
        { id: 1, embedCode: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2029329996&color=%232d6c75&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>` },
    ];

    return (
        <>
            <GoogleFont />
            <div className="space-y-8">
                <section className="text-center space-y-2">
                    <div className="inline-block mx-auto">
                        <h1 className="font-bold text-5xl md:text-6xl tracking-tight text-white uppercase">
                            N3XOR RECORDS
                        </h1>
                        <p className="font-version text-red-500 text-right text-[14px] -mt-1">
                            APP VERSION 4.6.08
                        </p>
                    </div>
                    <p className="text-gray-300 pt-2">
                        Version published 07/07/2025, see{" "}
                        <a href="/changelog" className="text-green-400 hover:underline">
                            About section for changelog
                        </a>
                    </p>
                </section>

                <div className="bg-pink-600 text-white text-center p-4 rounded-lg">
                    {isSubscriber ? (
                        <div className="flex flex-col items-center gap-2">
                            <Heart className="w-8 h-8" />
                            <h2 className="font-bold text-xl">Bem-vindo(a) de volta!</h2>
                            <p className="text-sm">Agradecemos por fazer parte do nosso plano. Aproveite todos os benefícios exclusivos!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="font-bold text-xl">Olá, Visitante!</h2>
                            <p className="text-sm">Seja bem-vindo(a) ao nosso site. Seria um prazer tê-lo como cliente. Explore nossos planos!</p>
                        </div>
                    )}
                </div>

                <section className="bg-gradient-to-r from-green-600/20 to-teal-600/20 p-6 rounded-lg border border-green-600/30 backdrop-blur-sm">
                    <div className="text-center">
                        <h2 className="font-bold text-2xl mb-4 text-white uppercase flex items-center justify-center gap-2">
                            <Rocket className="text-green-400" />
                            ACELERE SEUS DOWNLOADS
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Baixe de +150 servidores com velocidade máxima e sem anúncios. Mega, Rapidgator, 1fichier e muito mais!
                        </p>
                        <Button
                            href="/debridlink"
                            className="bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-sm sm:text-base h-16 w-full shadow-md uppercase"
                        >
                            <Download className="mr-2" size={20} />
                            DEBRID-LINK - DOWNLOADS PREMIUM
                        </Button>
                    </div>
                </section>

                <section className="bg-gradient-to-r from-purple-600/20 to-black/20 p-6 rounded-lg border border-purple-600/30 backdrop-blur-sm">
                    <div className="text-center">
                        <h2 className="font-bold text-2xl mb-4 text-white uppercase flex items-center justify-center gap-2">
                            <Sparkles className="text-purple-400" />
                            BAIXE MÚSICAS EM ALTA QUALIDADE
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Tenha acesso a milhões de músicas em qualidade FLAC para seus sets. Baixe álbuns completos com um clique.
                        </p>
                        <Button
                            href="/deemix"
                            className="bg-gradient-to-r from-purple-600 to-black hover:from-purple-700 hover:to-gray-900 hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-sm sm:text-base h-16 w-full shadow-md uppercase"
                        >
                            <Music className="mr-2" size={20} />
                            DEEMIX - MÚSICAS EM FLAC
                        </Button>
                    </div>
                </section>

                <section>
                    <h2 className="font-bold text-3xl tracking-tight mb-6 text-white border-b border-green-600/30 pb-2 uppercase flex items-center gap-2">
                        <Star className="text-green-500" />
                        NOSSAS PRODUÇÕES
                    </h2>
                    <Carousel>
                        {pools.map((pool) => (
                            <a href="/atualizacoes" key={pool.id} className="cursor-pointer group block w-full h-56">
                                <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-green-500/20 border-green-600/30 bg-black/80 h-full flex flex-col">
                                    <CardContent className="p-0 relative flex-grow">
                                        <img src={pool.image} alt={pool.title} className="absolute inset-0 w-full h-full object-cover" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a1a/ffffff?text=Falha'; }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                            <Music className="text-green-400 h-8 w-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-black/80">
                                        <h3 className="font-semibold text-sm text-white w-full group-hover:text-green-400 transition-colors uppercase">
                                            {pool.title}
                                        </h3>
                                    </CardFooter>
                                </Card>
                            </a>
                        ))}
                    </Carousel>
                    <div className="mt-6 flex justify-center">
                        <Button href="https://open.spotify.com/intl-pt/artist/5NdJcuUWBt4pNGJC2sI6iZ?si=H_jVVe-YSdii5zzNpsaf_g" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-10 text-lg rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <Music className="mr-2 h-5 w-5" />
                            ACESSAR NO SPOTIFY
                        </Button>
                    </div>
                </section>

                <section>
                    <h2 className="font-bold text-3xl tracking-tight mb-6 text-white border-b border-purple-600/30 pb-2 uppercase flex items-center gap-2">
                        <Users className="text-purple-500" />
                        DJS EM DESTAQUE
                    </h2>
                    <div className="bg-pink-600/80 border border-pink-500/50 text-white p-4 rounded-lg text-center mb-6">
                        <p>Esta página ainda está em construção e será liberada em breve.</p>
                    </div>
                    <Carousel>
                        {djPacks.map((dj) => (
                            <div key={dj.id} className="cursor-pointer group w-full h-56">
                                <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/20 border-purple-600/30 bg-black/80 h-full flex flex-col">
                                    <CardContent className="p-0 relative flex-grow">
                                        <img src={dj.image} alt={dj.name} className="absolute inset-0 w-full h-full object-cover" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a1a/ffffff?text=Falha'; }} />
                                        <div className="absolute inset-0 bg-black/50 z-10"></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                            <Disc className="text-purple-400 h-8 w-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-black/80">
                                        <h3 className="font-semibold text-sm text-white w-full group-hover:text-purple-400 transition-colors uppercase">
                                            {dj.name}
                                        </h3>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </Carousel>
                    <div className="mt-6 flex justify-center">
                        <Button disabled className="bg-gray-500 text-gray-300 cursor-not-allowed py-4 px-10 text-lg">
                            <Users className="mr-2 h-5 w-5" />
                            ACESSAR PASTA DOS DJS
                        </Button>
                    </div>
                </section>

                <section>
                    <h2 className="font-bold text-3xl tracking-tight mb-6 text-white border-b border-pink-600/30 pb-2 uppercase flex items-center gap-2">
                        <Album className="text-pink-500" />
                        CDS PRODUZIDOS
                    </h2>
                    <Carousel>
                        {cdsProduzidos.map((cd) => (
                            <a href={cd.link} target="_blank" rel="noopener noreferrer" key={cd.id} className="cursor-pointer group block w-full h-56">
                                <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-pink-500/20 border-pink-600/30 bg-black/80 h-full flex flex-col">
                                    <CardContent className="p-0 relative flex-grow">
                                        <img src={cd.image} alt={cd.title} className="absolute inset-0 w-full h-full object-cover" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a1a/ffffff?text=Falha'; }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                            <ExternalLink className="text-white h-8 w-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-black/80">
                                        <h3 className="font-semibold text-sm text-white w-full group-hover:text-pink-400 transition-colors uppercase">
                                            {cd.title}
                                        </h3>
                                    </CardFooter>
                                </Card>
                            </a>
                        ))}
                    </Carousel>
                    <div className="mt-6 flex justify-center">
                        <Button href="https://djjessica.vercel.app/producoes" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white font-bold py-4 px-10 text-lg rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <Sparkles className="mr-2 h-5 w-5" />
                            PRODUZA CONOSCO
                        </Button>
                    </div>
                </section>

                <section>
                    <h2 className="font-bold text-3xl tracking-tight mb-6 text-white border-b border-green-600/30 pb-2 uppercase flex items-center gap-2">
                        <Cloud className="text-green-500" />
                        SOUNDCLOUD
                    </h2>
                    <div className="bg-black/50 p-2 rounded-lg border border-green-600/20">
                        <SoundCloudTrack embedCode={soundcloudTracks[0].embedCode} />
                    </div>
                    <div className="mt-6 flex justify-center">
                        <Button href="https://soundcloud.com/djjessikaluana" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-10 text-lg rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <Cloud className="mr-2 h-5 w-5" />
                            VER PERFIL COMPLETO
                        </Button>
                    </div>
                </section>

                <section className="bg-black/60 p-6 rounded-lg border border-green-600/30 backdrop-blur-sm">
                    <h2 className="font-bold text-3xl mb-4 text-white text-center flex items-center justify-center gap-2">
                        <Sparkles className="text-green-400" />
                        O QUE DESEJA FAZER HOJE?
                    </h2>
                    <h3 className="font-bold text-2xl mb-2 text-white text-center">{currentDate}</h3>
                    <p className="text-green-500 font-semibold text-center mb-6 flex items-center justify-center text-2xl">
                        <Clock className="mr-2" size={24} />
                        {currentTime}
                    </p>
                    <div className="flex flex-col space-y-4">
                        <Button
                            href="/atualizacoes"
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-lg h-16 w-full shadow-md uppercase"
                        >
                            <Download className="mr-2" size={20} />
                            BAIXAR ATUALIZAÇÕES
                        </Button>
                        <Button
                            href="/pedidos"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-lg h-16 w-full shadow-md uppercase"
                        >
                            <ShoppingBag className="mr-2" size={20} />
                            PEDIDOS
                        </Button>
                        <Button
                            href="/deemix"
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-lg h-16 w-full shadow-md uppercase"
                        >
                            <Music className="mr-2" size={20} />
                            ASSINAR DEEMIX
                        </Button>
                        <Button
                            href="https://djjessica.vercel.app/servicos/musicas-eletronicas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#FF4500] hover:bg-[#E03E00] hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-lg h-16 w-full shadow-md uppercase"
                        >
                            <ExternalLink className="mr-2" size={20} />
                            ASSINAR PLANO VIP
                        </Button>
                        <Button
                            href="https://djjessica.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 hover:scale-[1.02] transition-all duration-300 text-white font-semibold tracking-wide text-lg h-16 w-full shadow-md uppercase"
                        >
                            <ExternalLink className="mr-2" size={20} />
                            CONHEÇA A NOSSA DJ
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}