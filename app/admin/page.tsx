"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { PlusCircle, Database, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define a estrutura dos dados que esperamos da nossa API
interface MonthStat {
  month: string;
  count: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<MonthStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados da nossa API de estatísticas quando a página carrega
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard-stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Falha ao buscar estatísticas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-blue-400" />
          Painel de Controle
        </h1>
        {/* O botão de perfil/logout do Clerk fica aqui */}
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Seção de Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/admin/adicionar">
          <Button className="w-full h-20 text-lg bg-green-600 hover:bg-green-700">
            <PlusCircle className="mr-2" />
            Adicionar Nova Pasta
          </Button>
        </Link>
        <Button disabled className="w-full h-20 text-lg bg-gray-500 cursor-not-allowed">
            {/* Espaço para uma futura funcionalidade */}
        </Button>
      </div>

      {/* Seção de Estatísticas */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-blue-400" />
          Pastas por Mês
        </h2>
        {isLoading ? (
          <p>Carregando estatísticas...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.month} className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 text-center">
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