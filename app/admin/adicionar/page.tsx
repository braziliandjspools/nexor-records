"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddFolderPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Enquanto carrega os dados do usuário
  if (!isLoaded) return <div>Carregando...</div>;

  // Se não estiver logado, bloquear acesso
  if (!isSignedIn) {
    return (
      <div className="text-center text-red-500 mt-10">
        Você precisa estar logado para acessar essa página.
      </div>
    );
  }

  // Defina os emails que terão permissão de admin
  const adminEmails = ["seuemailadmin@dominio.com"]; // substitua pelo seu email admin

  // Verifica se o usuário tem o email admin
  if (!adminEmails.includes(user.primaryEmailAddress?.emailAddress || "")) {
    return (
      <div className="text-center text-red-500 mt-10">
        Acesso negado. Área restrita para administradores.
      </div>
    );
  }

  // Estado do formulário e controle de loading/status
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
        name: "",
        link: "",
        category: "",
        date: prev.date,
        monthSlug: prev.monthSlug,
      }));
    } catch (error: any) {
      setStatus(`Erro: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Adicionar Nova Pasta
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-900/50 p-8 rounded-lg border border-gray-700"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Pasta</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Link do Google Drive</Label>
          <Input
            id="link"
            type="url"
            value={formData.link}
            onChange={handleChange}
            required
            className="bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Ex: MASTERMIX, DJ ALLAN..."
            className="bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Data de Agrupamento</Label>
            <Input
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
              placeholder="Ex: Atualizações de 12/07/2025"
              className="bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthSlug">Mês de Destino (slug)</Label>
            <Input
              id="monthSlug"
              value={formData.monthSlug}
              onChange={handleChange}
              required
              placeholder="Ex: julho-2025"
              className="bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Adicionando..." : "Adicionar Pasta"}
        </Button>
      </form>
      {status && (
        <p className="mt-4 text-center font-semibold text-gray-100">{status}</p>
      )}
    </div>
  );
}
