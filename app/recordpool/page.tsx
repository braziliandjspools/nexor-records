// app/record-pool/page.tsx
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Music, Download, Heart, Play, Pause, Search, CalendarDays } from 'lucide-react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// --- TIPOS DE DADOS E DADOS DE EXEMPLO ---
interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  key?: string; // Chave musical (opcional)
  releaseDate: string; // Formato 'YYYY-MM-DD'
  musicSrc: string;
}

// Adicionei datas e mais músicas para o exemplo ficar melhor
const allTracks: Track[] = [
  // Lembre-se de usar o link https://drive.google.com/uc?export=download&id=...
  { id: 1, title: 'Kepler 62F (Original Mix)', artist: 'Mariatti', genre: 'Progressive House', bpm: 115, releaseDate: '2025-07-14', musicSrc: 'URL_DA_MUSICA_1.mp3' },
  { id: 2, title: 'Saksun (Radio Mix)', artist: 'Tail Muss, Matur', genre: 'Progressive House', bpm: 123, releaseDate: '2025-07-14', musicSrc: 'URL_DA_MUSICA_2.mp3' },
  { id: 8, title: 'Summer Haze', artist: 'Aura', genre: 'Deep House', bpm: 120, releaseDate: '2025-07-14', musicSrc: 'URL_DA_MUSICA_8.mp3' },
  { id: 3, title: 'Proxima B (Extended Mix)', artist: 'Mariatti', genre: 'Progressive House', bpm: 118, releaseDate: '2025-07-12', musicSrc: 'URL_DA_MUSICA_3.mp3' },
  { id: 4, title: 'Rhythm of the Night', artist: 'Corona', genre: 'Eurodance', bpm: 128, releaseDate: '2025-07-11', musicSrc: 'URL_DA_MUSICA_4.mp3' },
  { id: 5, title: 'Get Up (Original Mix)', artist: 'Sander Wilder', genre: 'Electronic', bpm: 127, releaseDate: '2025-07-11', musicSrc: 'URL_DA_MUSICA_5.mp3' },
  { id: 6, title: 'Latin Groove', artist: 'El Maestro', genre: 'Latin House', bpm: 105, releaseDate: '2025-07-10', musicSrc: 'URL_DA_MUSICA_6.mp3' },
  { id: 7, title: 'Street Flow', artist: 'MC Rhyme', genre: 'Hip Hop', bpm: 95, releaseDate: '2025-07-10', musicSrc: 'URL_DA_MUSICA_7.mp3' },
];

// --- FUNÇÃO PARA AGRUPAR AS MÚSICAS POR DATA ---
const groupTracksByDate = (tracks: Track[]): Record<string, Track[]> => {
  return tracks.reduce((acc, track) => {
    const date = track.releaseDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(track);
    return acc;
  }, {} as Record<string, Track[]>);
};

export default function RecordPoolPage() {
  const [isSubscriber] = useState(true);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Agrupando as músicas por data
  const groupedTracks = useMemo(() => groupTracksByDate(allTracks), []);
  const sortedDates = useMemo(() => Object.keys(groupedTracks).sort((a, b) => b.localeCompare(a)), [groupedTracks]);

  useEffect(() => {
    const audio = new Audio();
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    setAudioPlayer(audio);
    return () => { audio.pause(); };
  }, []);

  const handlePlayPause = (track: Track) => {
    if (!isSubscriber) {
      alert('Você precisa ser assinante para ouvir as músicas.');
      return;
    }
    if (audioPlayer) {
      if (currentTrack?.id === track.id) {
        isPlaying ? audioPlayer.pause() : audioPlayer.play();
      } else {
        setCurrentTrack(track);
        audioPlayer.src = track.musicSrc;
        audioPlayer.play();
      }
    }
  };

  const handleDownload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isSubscriber) {
      event.preventDefault();
      alert('Você precisa ser assinante para baixar as músicas.');
    }
  };

  // Função para formatar o cabeçalho da data
  const formatDateHeader = (dateString: string) => {
    const date = parseISO(dateString);
    const distance = formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
    const formattedDate = format(date, 'EEEE, dd \'de\' MMMM \'de\' yyyy', { locale: ptBR });
    
    // Capitaliza a primeira letra da distância e do dia da semana
    const capitalizedDistance = distance.charAt(0).toUpperCase() + distance.slice(1);
    const capitalizedFormattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return `${capitalizedDistance} - ${capitalizedFormattedDate}`;
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#1B1C1D' }}>
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8">New Music</h1>

        {/* Mapeia as datas ordenadas para criar as seções */}
        <div className="space-y-8">
          {sortedDates.map(date => (
            <section key={date}>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-700 flex items-center gap-3">
                <CalendarDays className="text-green-400" size={22} />
                <span>{formatDateHeader(date)}</span>
              </h2>
              
              {/* "Tabela" de músicas */}
              <div className="flex flex-col">
                {groupedTracks[date].map(track => (
                   <div key={track.id} className={`grid grid-cols-12 gap-4 items-center p-3 border-b border-zinc-800 transition-all duration-200 ${currentTrack?.id === track.id ? 'bg-green-500/10' : 'hover:bg-zinc-800/60'}`}>
                      
                      {/* 1. Botão de Play (1/12 colunas) */}
                      <div className="col-span-1">
                          <button 
                            onClick={() => handlePlayPause(track)}
                            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black cursor-pointer transition-colors"
                          >
                              {currentTrack?.id === track.id && isPlaying ? <Pause size={18} /> : <Play size={18} />}
                          </button>
                      </div>

                      {/* 2. Título e Artista (5/12 colunas) */}
                      <div className="col-span-11 md:col-span-5">
                          <p className="font-bold truncate">{track.title}</p>
                          <p className="text-sm text-zinc-400 truncate">{track.artist}</p>
                      </div>

                      {/* 3. Gênero (2/12 colunas) */}
                      <p className="hidden md:block col-span-2 text-zinc-300 truncate">{track.genre}</p>
                      
                      {/* 4. BPM (2/12 colunas) */}
                      <p className="hidden md:block col-span-2 text-zinc-300">{track.bpm} BPM</p>

                      {/* 5. Ações (2/12 colunas) */}
                      <div className="hidden md:flex col-span-2 items-center justify-end gap-5 text-zinc-400">
                          <Heart size={20} className="hover:text-pink-500 cursor-pointer transition-colors" />
                          <a href={track.musicSrc} download onClick={handleDownload}>
                              <Download size={20} className="hover:text-green-400 cursor-pointer transition-colors" />
                          </a>
                      </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}