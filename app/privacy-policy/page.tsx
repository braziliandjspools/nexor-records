"use client";

import { ShieldCheck, Cookie, Compass } from 'lucide-react';
import React from 'react';

// Componente para estilizar seções dos termos
const PolicySection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
      {icon}
      {title}
    </h2>
    <div className="space-y-4 text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold uppercase">Política de Privacidade</h1>
        <p className="text-sm text-gray-400 mt-2">Última Atualização: 12 de Julho de 2025</p>
      </div>

      <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-700">
        <p className="mb-8 text-center text-gray-300">
          A sua privacidade é de extrema importância para nós da N3XOR RECORDS. Esta política descreve como coletamos, usamos e protegemos suas informações.
        </p>

        <PolicySection title="1. Informações que Coletamos" icon={<ShieldCheck size={22} />}>
          <p><strong>1.1. Informações Fornecidas por Você:</strong> Ao criar uma conta, coletamos dados essenciais como nome e e-mail, gerenciados pelo nosso parceiro de autenticação, Clerk.</p>
          <p><strong>1.2. Informações Coletadas Automaticamente:</strong> Coletamos dados de uso como endereço IP, tipo de navegador e páginas visitadas para melhorar nosso serviço.</p>
        </PolicySection>

        <PolicySection title="2. Como Usamos Suas Informações" icon={<ShieldCheck size={22} />}>
          <p>Utilizamos os dados para fornecer o serviço, gerenciar sua conta via Clerk, enviar comunicações importantes (incluindo marketing, com opção de saída) e analisar o uso para otimizar a plataforma.</p>
        </PolicySection>
        
        <PolicySection title="3. Cookies e Consentimento" icon={<Cookie size={22} />}>
            <p><strong>O que são cookies?</strong> Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles são essenciais para o funcionamento de muitas funcionalidades online.</p>
            <p><strong>Como usamos cookies:</strong></p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                <li><strong>Cookies Essenciais:</strong> Utilizamos cookies estritamente necessários para o funcionamento do nosso Serviço. Isso inclui, por exemplo, os cookies gerenciados pelo nosso parceiro de autenticação, **Clerk**, para manter sua sessão segura e lembrar que você está logado. Sem esses cookies, o acesso à área de membros não seria possível.</li>
                <li><strong>Cookies de Desempenho e Análise:</strong> Podemos usar cookies para coletar informações sobre como os visitantes usam nosso site, o que nos ajuda a melhorar a experiência do usuário.</li>
            </ul>
            <p><strong>Seu Consentimento:</strong> Ao utilizar nossa plataforma, você concorda com o uso de cookies essenciais. Para cookies não essenciais, solicitaremos seu consentimento quando aplicável, de acordo com a legislação vigente.</p>
        </PolicySection>

        <PolicySection title="4. Papel dos Serviços de Terceiros" icon={<ShieldCheck size={22} />}>
          <p>Para operar, contamos com parceiros tecnológicos de ponta:</p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
            <li><strong>Autenticação (Clerk):</strong> Gerencia todo o ciclo de vida do usuário. Recomendamos a leitura da <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Política de Privacidade do Clerk</a>.</li>
            <li><strong>Banco de Dados (Neon):</strong> Armazena de forma segura os dados da nossa aplicação.</li>
            <li><strong>Hospedagem (Vercel):</strong> Fornece a infraestrutura de nuvem para nosso site.</li>
            <li><strong>Armazenamento de Arquivos (Google Drive):</strong> O conteúdo musical é armazenado e disponibilizado através do Google Drive.</li>
          </ul>
        </PolicySection>

        <PolicySection title="5. Segurança dos Dados" icon={<ShieldCheck size={22} />}>
          <p>Empregamos medidas de segurança robustas, mas nenhum sistema é 100% impenetrável. Nos esforçamos para usar os melhores meios para proteger seus dados, mas não podemos garantir segurança absoluta.</p>
        </PolicySection>

        <PolicySection title="6. Navegadores Recomendados" icon={<Compass size={22} />}>
            <p>Para garantir a melhor experiência, funcionalidade completa e máxima segurança ao navegar em nossa plataforma, recomendamos o uso das versões mais recentes dos seguintes navegadores:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                <li>Google Chrome</li>
                <li>Microsoft Edge</li>
                <li>Mozilla Firefox</li>
                <li>Safari (para usuários de dispositivos Apple)</li>
                <li>Opera</li>
            </ul>
            <p>Manter seu navegador atualizado garante que você tenha as últimas correções de segurança e suporte para as tecnologias web modernas que utilizamos.</p>
        </PolicySection>

        <PolicySection title="7. Seus Direitos e Contato" icon={<ShieldCheck size={22} />}>
          <p>Você tem o direito de acessar, atualizar ou excluir suas informações pessoais, o que pode ser feito em grande parte através do seu perfil de usuário. Para outras solicitações ou dúvidas sobre esta política, entre em contato conosco.</p>
          <p>
            <strong>E-mail:</strong> 
            <a href="mailto:pix.fabricadosdjs@gmail.com" className="text-blue-400 hover:underline ml-1">
              pix.fabricadosdjs@gmail.com
            </a>
          </p>
        </PolicySection>
      </div>
    </div>
  );
}
