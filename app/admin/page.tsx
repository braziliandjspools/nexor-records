"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { PlusCircle, Database, LayoutDashboard, Users, BarChart3, Wifi, WifiOff } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define a estrutura dos dados que esperamos da nossa API
interface StatsData {
  serverStatus: 'Online' | 'Error';
  onlineUsers: number;
  totalUsers: number;
  totalFolders: number;
  foldersByMonth: {
    month: string;
    count: number;
  }[];
}

const StatCard = ({ title, value, icon, isLoading }: { title: string, value: string | number, icon: React.ReactNode, isLoading: boolean }) => (
  <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700 flex items-center gap-4 transition-all hover:border-blue-500/50 hover:bg-gray-800">
      {icon}
      <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{isLoading ? '...' : value}</p>
      </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Busca todos os dados da nossa API avançada
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/advanced-stats");
        if (!response.ok) throw new Error("Falha ao buscar dados da API");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Falha ao buscar estatísticas:", error);
        setStats({ serverStatus: 'Error', onlineUsers: 0, totalUsers: 0, totalFolders: 0, foldersByMonth: [] });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Calcula o total de pastas a partir do estado
  const totalFolders = stats?.foldersByMonth.reduce((acc, stat) => acc + stat.count, 0) ?? 0;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
          <LayoutDashboard className="w-8 h-8 text-blue-400" />
          Painel de Controle
        </h1>
        <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Admin</span>
            <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Seção de Estatísticas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
            title="Status do Servidor" 
            value={stats?.serverStatus || 'Offline'} 
            icon={stats?.serverStatus === 'Online' ? <Wifi className="w-10 h-10 text-green-500" /> : <WifiOff className="w-10 h-10 text-red-500" />}
            isLoading={isLoading}
        />
        <StatCard 
            title="Usuários Online" 
            value={stats?.onlineUsers ?? 0} 
            icon={<Users className="w-10 h-10 text-cyan-400" />}
            isLoading={isLoading}
        />
        <StatCard 
            title="Total de Pastas" 
            value={totalFolders} 
            icon={<Database className="w-10 h-10 text-amber-400" />}
            isLoading={isLoading}
        />
        <StatCard 
            title="Total de Usuários" 
            value={stats?.totalUsers ?? 0} 
            icon={<Users className="w-10 h-10 text-purple-400" />}
            isLoading={isLoading}
        />
      </div>
      
      {/* Seção de Ações e Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
                <div className="space-y-3">
                    <Link href="/admin/adicionar" className="block">
                        <div className="bg-blue-600/80 hover:bg-blue-600 p-4 rounded-lg transition-colors flex items-center gap-3 w-full">
                            <PlusCircle className="w-6 h-6"/>
                            <span className="font-semibold">Adicionar Pastas</span>
                        </div>
                    </Link>
                    <a href="https://dashboard.clerk.com/apps" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="bg-purple-600/80 hover:bg-purple-600 p-4 rounded-lg transition-colors flex items-center gap-3 w-full">
                            <Users className="w-6 h-6"/>
                            <span className="font-semibold">Gerenciar Usuários</span>
                        </div>
                    </a>
                    <a href="https://console.neon.tech" target="_blank" rel="noopener noreferrer" className="block">
                        <div className="bg-green-600/80 hover:bg-green-600 p-4 rounded-lg transition-colors flex items-center gap-3 w-full">
                            <Database className="w-6 h-6"/>
                            <span className="font-semibold">Acessar Banco de Dados</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div className="lg:col-span-2 bg-gray-800/70 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-gray-400" />
                Comparativo de Pastas por Mês
            </h2>
            {isLoading ? (
                <div className="text-center py-20">Carregando dados do gráfico...</div>
            ) : (
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={stats?.foldersByMonth} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                            <XAxis dataKey="month" tick={{ fill: '#a0aec0' }} tickFormatter={(value) => value.replace('-2025', '')} />
                            <YAxis tick={{ fill: '#a0aec0' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} />
                            <Legend wrapperStyle={{ color: '#a0aec0' }} />
                            <Bar dataKey="count" name="Pastas" fill="#4299E1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
