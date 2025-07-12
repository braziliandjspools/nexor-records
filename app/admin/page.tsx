"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { PlusCircle, Database, LayoutDashboard, Users, Settings, BarChart3 } from "lucide-react";

// Define a estrutura dos dados que esperamos das nossas APIs
interface MonthStat {
  month: string;
  count: number;
}

interface UserStat {
  totalUsers: number;
}

export default function AdminDashboard() {
  const [folderStats, setFolderStats] = useState<MonthStat[]>([]);
  const [userStats, setUserStats] = useState<UserStat>({ totalUsers: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Busca todos os dados para o dashboard quando a página carrega
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Busca os dados das duas APIs em paralelo para mais velocidade
        const [folderRes, userRes] = await Promise.all([
          fetch("/api/dashboard-stats"),
          fetch("/api/user-stats"),
        ]);

        const folderData = await folderRes.json();
        const userData = await userRes.json();

        setFolderStats(folderData);
        setUserStats(userData);
      } catch (error) {
        console.error("Falha ao buscar dados para o dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const totalFolders = folderStats.reduce((acc, stat) => acc + stat.count, 0);

  return (
    <div className="w-full max-w-5xl mx-auto">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700 flex items-center gap-4">
            <Database className="w-10 h-10 text-green-400" />
            <div>
                <p className="text-sm text-gray-400">Total de Pastas</p>
                <p className="text-3xl font-bold text-white">{isLoading ? '...' : totalFolders}</p>
            </div>
        </div>
        <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700 flex items-center gap-4">
            <Users className="w-10 h-10 text-purple-400" />
            <div>
                <p className="text-sm text-gray-400">Total de Usuários</p>
                <p className="text-3xl font-bold text-white">{isLoading ? '...' : userStats.totalUsers}</p>
            </div>
        </div>
      </div>
      
      {/* Seção de Ações e Links */}
      <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700 mb-8">
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/adicionar" className="block">
                <div className="bg-blue-600/80 hover:bg-blue-600 p-4 rounded-lg transition-colors flex items-center gap-3">
                    <PlusCircle className="w-6 h-6"/>
                    <span className="font-semibold">Adicionar Nova Pasta</span>
                </div>
            </Link>
             <a href="https://dashboard.clerk.com/apps" target="_blank" rel="noopener noreferrer" className="block">
                <div className="bg-purple-600/80 hover:bg-purple-600 p-4 rounded-lg transition-colors flex items-center gap-3">
                    <Users className="w-6 h-6"/>
                    <span className="font-semibold">Gerenciar Usuários (Clerk)</span>
                </div>
            </a>
        </div>
      </div>

      {/* Seção de Detalhes por Mês */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-gray-400" />
          Detalhes por Mês
        </h2>
        {isLoading ? (
          <div className="text-center py-8">Carregando estatísticas...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folderStats.map((stat) => (
              <div key={stat.month} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 text-center transition-transform hover:scale-105 hover:border-blue-500">
                <p className="text-sm font-semibold text-gray-400 uppercase">
                  {stat.month.replace('-', ' ')}
                </p>
                <p className="text-4xl font-bold text-white">{stat.count}</p>
                <p className="text-xs text-gray-500">pastas</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}