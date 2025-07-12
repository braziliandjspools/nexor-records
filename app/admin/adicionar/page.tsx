"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddFolderPage() {
  const { isLoaded, user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    link: "",
    category: "",
    date: `Atualizações de ${new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`,
    monthSlug: "julho-2025",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // O middleware já protege a rota, então a verificação de !isSignedIn é uma camada extra de UI.
  if (!isLoaded) {
    return <div className="text-white text-center py-20">Carregando sessão...</div>;
  }

  const adminEmails = ["leverman.ann@gmail.com"];
  if (!user || !adminEmails.includes(user.primaryEmailAddress?.emailAddress || "")) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Acesso Negado. Esta área é restrita a administradores autorizados.
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");
    setIsLoading(true);

    try {
      const response = await fetch("/api/add-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Falha ao enviar o formulário.");
      }

      setStatus("Pasta adicionada com sucesso!");
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
          Adicionar Nova Pasta
        </h1>
        <p className="text-gray-400">Preencha os campos para adicionar um novo item ao banco de dados.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-900/50 p-8 rounded-lg border border-gray-700 shadow-xl"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">Nome da Pasta</Label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-300">Data de Agrupamento</Label>
            <Input id="date" value={formData.date} onChange={handleChange} required placeholder="Ex: Atualizações de 12/07/2025" className="bg-gray-800 border-gray-600 focus:ring-pink-500 focus:border-pink-500"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthSlug" className="text-gray-300">Mês de Destino (slug)</Label>
            <Input id="monthSlug" value={formData.monthSlug} onChange={handleChange} required placeholder="Ex: julho-2025" className="bg-gray-800 border-gray-600 focus:ring-pink-500 focus:border-pink-500"/>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-3 font-semibold shadow-lg transition-transform transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? "Adicionando..." : "Adicionar Pasta ao Banco"}
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
