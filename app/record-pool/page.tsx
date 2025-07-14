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
  genre: 'Progressive House' | 'Deep House' | 'Eurodance' | 'Electronic' | 'Latin House' | 'Hip Hop';
  bpm: number;
  version: 'Clean' | 'Dirty' | 'Instrumental' | 'Extended';
  releaseDate: string; // Formato 'YYYY-MM-DD'
  musicSrc: string;    // Lembre-se de usar o link direto: https://drive.google.com/uc?export=download&id=...
}

// --- DADOS DAS MÚSICAS ---
// Adicionei mais variedade para testar os filtros.
const allTracks: Track[] = [
  { id: 1, title: 'Kepler 62F (Original Mix)', artist: 'Mariatti', genre: 'Progressive House', bpm: 115, version: 'Clean', releaseDate: '2025-07-14', musicSrc: 'URL_DA_MUSICA_1.mp3' },
  { id: 2, title: 'Saksun (Radio Mix)', artist: 'Tail Muss, Matur', genre: 'Progressive House', bpm: 123, version: 'Clean', releaseDate: '2025-07-14', musicSrc: 'URL_DA_MUSICA_2.mp3' },
  { id: 8, title: 'Summer Haze', artist: 'Aura', genre: 'Deep House', bpm: 120, version: 'Instrumental', releaseDate: '2025-07-14', musicSrc: 'URL_DA_MUSICA_8.mp3' },
  { id: 3, title: 'Proxima B (Extended Mix)', artist: 'Mariatti', genre: 'Progressive House', bpm: 118, version: 'Extended', releaseDate: '2025-07-12', musicSrc: 'URL_DA_MUSICA_3.mp3' },
  { id: 4, title: 'Rhythm of the Night', artist: 'Corona', genre: 'Eurodance', bpm: 128, version: 'Clean', releaseDate: '2025-07-11', musicSrc: 'URL_DA_MUSICA_4.mp3' },
  { id: 5, title: 'Get Up (Original Mix)', artist: 'Sander Wilder', genre: 'Electronic', bpm: 127, version: 'Dirty', releaseDate: '2025-07-11', musicSrc: 'URL_DA_MUSICA_5.mp3' },
  { id: 6, title: 'Latin Groove', artist: 'El Maestro', genre: 'Latin House', bpm: 105, version: 'Clean', releaseDate: '2025-07-10', musicSrc: 'URL_DA_MUSICA_6.mp3' },
  { id: 7, title: 'Street Flow', artist: 'MC Rhyme', genre: 'Hip Hop', bpm: 95, version: 'Dirty', releaseDate: '2025-07-10', musicSrc: 'URL_DA_MUSICA_7.mp3' },
];

// --- FUNÇÃO PARA AGRUPAR AS MÚSICAS POR DATA ---
const groupTracksByDate = (tracks: Track[]): Record<string, Track[]> => {
  return tracks.reduce((acc, track) => {
    const date = track.releaseDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(track);
    return acc;
  }, {} as Record<string, Track[]>);
};

export default function RecordPoolPage() {
  // --- ESTADOS GERAIS ---
  const [isSubscriber] = useState(true);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // --- ESTADOS E LÓGICA DE FILTROS ---
  const [filters, setFilters] = useState({
    genres: new Set<string>(),
    versions: new Set<string>(),
    bpm: 80,
  });

  const filteredTracks = useMemo(() => {
    return allTracks.filter(track => {
      const genreMatch = filters.genres.size === 0 || filters.genres.has(track.genre);
      const versionMatch = filters.versions.size === 0 || filters.versions.has(track.version);
      const bpmMatch = track.bpm >= filters.bpm;
      return genreMatch && versionMatch && bpmMatch;
    });
  }, [filters]);
  
  const handleFilterChange = (type: 'genres' | 'versions', value: string) => {
    setFilters(prev => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });
  };

  const uniqueGenres = [...new Set(allTracks.map(t => t.genre))];
  const uniqueVersions = [...new Set(allTracks.map(t => t.version))];
  
  // --- AGRUPAMENTO DAS MÚSICAS JÁ FILTRADAS ---
  const groupedTracks = useMemo(() => groupTracksByDate(filteredTracks), [filteredTracks]);
  const sortedDates = useMemo(() => Object.keys(groupedTracks).sort((a, b) => b.localeCompare(a)), [groupedTracks]);

  // --- CONTROLE DO PLAYER ---
  useEffect(() => {
    const audio = new Audio();
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => setCurrentTrack(null);
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

  // --- FORMATAÇÃO DE DATA ---
  const formatDateHeader = (dateString: string) => {
    const date = parseISO(dateString);
    const distance = formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
    const formattedDate = format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    return `${distance.charAt(0).toUpperCase() + distance.slice(1)} - ${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`;
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#1B1C1D' }}>
      <main className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* --- COLUNA DE FILTROS (ESQUERDA) --- */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 self-start">
            <h3 className="text-xl font-bold mb-6 text-green-400 border-b border-zinc-700 pb-3 flex items-center gap-2">
              <Search size={20} /> Filtros
            </h3>
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-3">Gênero</h4>
                    <div className="space-y-2 text-sm">
                        {uniqueGenres.map(genre => (
                            <label key={genre} className="flex items-center cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded accent-green-500 bg-zinc-700 border-zinc-600 mr-3" onChange={() => handleFilterChange('genres', genre)} />{genre}</label>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">BPM Mínimo: <span className="text-green-400 font-bold">{filters.bpm}</span></h4>
                    <input type="range" min="80" max="180" step="1" value={filters.bpm} onChange={e => setFilters(prev => ({ ...prev, bpm: Number(e.target.value) }))} className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Versão</h4>
                    <div className="space-y-2 text-sm">
                        {uniqueVersions.map(version => (
                            <label key={version} className="flex items-center cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded accent-green-500 bg-zinc-700 border-zinc-600 mr-3" onChange={() => handleFilterChange('versions', version)} />{version}</label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>

        {/* --- CONTEÚDO PRINCIPAL (DIREITA) --- */}
        <div className="w-full md:w-3/4 lg:w-4/5">
            <h1 className="text-4xl font-bold mb-8">New Music</h1>
            <div className="space-y-8">
              {sortedDates.length > 0 ? (
                sortedDates.map(date => (
                  <section key={date}>
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-zinc-700 flex items-center gap-3"><CalendarDays className="text-green-400" size={22} /><span>{formatDateHeader(date)}</span></h2>
                    <div className="flex flex-col">
                      {groupedTracks[date].map(track => (
                        <div key={track.id} className={`grid grid-cols-12 gap-4 items-center p-3 border-b border-zinc-800 transition-all duration-200 ${currentTrack?.id === track.id ? 'bg-green-500/10' : 'hover:bg-zinc-800/60'}`}>
                          <div className="col-span-1">
                            <button onClick={() => handlePlayPause(track)} className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black cursor-pointer transition-colors"><{currentTrack?.id === track.id && isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
                          </div>
                          <div className="col-span-11 md:col-span-5"><p className="font-bold truncate">{track.title}</p><p className="text-sm text-zinc-400 truncate">{track.artist}</p></div>
                          <p className="hidden md:block col-span-2 text-zinc-300 truncate">{track.genre}</p>
                          <p className="hidden md:block col-span-2 text-zinc-300">{track.bpm} BPM</p>
                          <div className="hidden md:flex col-span-2 items-center justify-end gap-5 text-zinc-400">
                            <Heart size={20} className="hover:text-pink-500 cursor-pointer transition-colors" />
                            <a href={track.musicSrc} download onClick={handleDownload}><Download size={20} className="hover:text-green-400 cursor-pointer transition-colors" /></a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <div className="text-center py-10 px-6 bg-zinc-900/50 rounded-lg">
                  <p className="text-lg text-zinc-400">Nenhuma música encontrada com os filtros selecionados.</p>
                </div>
              )}
            </div>
        </div>
      </main>
    </div>
  );
}