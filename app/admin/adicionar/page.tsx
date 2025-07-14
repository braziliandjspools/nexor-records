"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Archive } from "lucide-react";

// --- ESTRUTURAS E ESTADOS ---
interface FormData {
  name: string;
  link: string;
  category: string;
  date: string; // 'date' é comum a ambos os modos
  monthSlug?: string;
  acervoSlug?: string;
}

export default function AddContentPage() {
  const [mode, setMode] = useState<'folder' | 'acervo'>('folder');
  const [formData, setFormData] = useState<FormData>({
    name: "",
    link: "",
    category: "",
    date: `Atualizações de ${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}`,
    monthSlug: "julho-2025",
    acervoSlug: "acervos2023",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Enviando...");

    const endpoint = mode === 'folder' ? "/api/add-folder" : "/api/add-acervo-item";
    
    // CORREÇÃO: Garante que todos os campos relevantes sejam enviados para cada modo.
    let dataToSend: Partial<FormData> = {};
    if (mode === 'folder') {
      dataToSend = {
        name: formData.name,
        link: formData.link,
        category: formData.category,
        date: formData.date,
        monthSlug: formData.monthSlug,
      };
    } else {
      dataToSend = {
        name: formData.name,
        link: formData.link,
        category: formData.category,
        date: formData.date, // <-- Este campo estava faltando
        acervoSlug: formData.acervoSlug,
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Falha ao enviar o formulário.");
      }

      setStatus("Item adicionado com sucesso!");
      setFormData((prev) => ({
        ...prev,
        name: "",
        link: "",
        category: "",
      }));
    } catch (error: any) {
      setStatus(`Erro: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <Image 
            src="https://i.ibb.co/yFpx8Bww/LOGO-SITE.png" 
            alt="N3XOR RECORDS Logo" 
            width={200} 
            height={50} 
            className="mx-auto"
        />
        <h1 className="text-3xl font-bold mt-4 text-gray-100">
          Gerenciador de Conteúdo
        </h1>
        <p className="text-gray-400">Adicione novos itens às atualizações mensais ou aos acervos.</p>
      </div>

      <div className="flex justify-center gap-2 mb-8 p-1 bg-gray-800/50 border border-gray-700 rounded-lg">
        <Button onClick={() => setMode('folder')} variant={mode === 'folder' ? 'default' : 'ghost'} className="flex-1 data-[state=active]:bg-blue-600">
            <Plus size={16} className="mr-2"/> Adicionar Pack Mensal
        </Button>
        <Button onClick={() => setMode('acervo')} variant={mode === 'acervo' ? 'default' : 'ghost'} className="flex-1 data-[state=active]:bg-green-600">
            <Archive size={16} className="mr-2"/> Adicionar ao Acervo
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-900/50 p-8 rounded-lg border border-gray-700 shadow-xl"
      >
        {/* Campos Comuns */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">Nome do Item</Label>
          <Input id="name" value={formData.name} onChange={handleChange} required className="bg-gray-800 border-gray-600 focus:ring-pink-500 focus:border-pink-500" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link" className="text-gray-300">Link do Google Drive</Label>
          <Input id="link" type="url" value={formData.link} onChange={handleChange} required className="bg-gray-800 border-gray-600 focus:ring-pink-500 focus:border-pink-500"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category" className="text-gray-300">Categoria</Label>
          <Input id="category" value={formData.category} onChange={handleChange} required placeholder="Ex: MASTERMIX, DJ ALLAN..." className="bg-gray-800 border-gray-600 focus:ring-pink-500 focus:border-pink-500"/>
        </div>
        <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-300">Data de Agrupamento</Label>
            <Input id="date" value={formData.date} onChange={handleChange} required placeholder="Ex: Novidades de 14/07/2025" className="bg-gray-800 border-gray-600 focus:ring-pink-500 focus:border-pink-500"/>
        </div>

        {/* Campos Condicionais */}
        {mode === 'folder' ? (
            <div className="pt-4 border-t border-gray-700/50">
                <div className="space-y-2">
                    <Label htmlFor="monthSlug" className="text-gray-300">Mês de Destino (slug)</Label>
                    <Input id="monthSlug" value={formData.monthSlug ?? ''} onChange={handleChange} required placeholder="Ex: julho-2025" className="bg-gray-800 border-gray-600 focus:ring-pink-500 focus:border-pink-500"/>
                </div>
            </div>
        ) : (
            <div className="pt-4 border-t border-gray-700/50">
                <div className="space-y-2">
                    <Label htmlFor="acervoSlug" className="text-gray-300">Acervo de Destino (slug)</Label>
                    <Input id="acervoSlug" value={formData.acervoSlug ?? ''} onChange={handleChange} required placeholder="Ex: acervos2023" className="bg-gray-800 border-gray-600 focus:ring-pink-500 focus:border-pink-500"/>
                </div>
            </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-3 font-semibold shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "Adicionando..." : "Adicionar Item ao Banco"}
        </Button>
      </form>
      {status && (
        <p className="mt-4 text-center font-semibold text-gray-100">{status}</p>
      )}
       <div className="mt-8 text-center">
          <Link href="/admin" className="text-sm text-blue-400 hover:underline flex items-center justify-center gap-2">
              <ArrowLeft size={14} />
              Voltar para o Dashboard
          </Link>
      </div>
    </div>
  );
}
