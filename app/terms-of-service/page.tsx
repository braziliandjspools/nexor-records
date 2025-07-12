"use client";

import { ShieldCheck } from 'lucide-react';
import React from 'react';

// Componente para estilizar seções dos termos
const TermSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-green-400 mb-3 flex items-center gap-2">
      <ShieldCheck size={20} />
      {title}
    </h2>
    <div className="space-y-4 text-gray-300 leading-relaxed pl-2 border-l-2 border-gray-700">
      {children}
    </div>
  </section>
);

export default function TermsOfServicePage() {
  return (
    <div className="w-full max-w-4xl mx-auto text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold uppercase">Termos de Serviço</h1>
        <p className="text-sm text-gray-400 mt-2">Última Atualização: 12 de Julho de 2025</p>
      </div>

      <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-700">
        <p className="mb-6">
          Bem-vindo(a) à N3XOR RECORDS! Estes Termos de Serviço ("Termos") regem o seu acesso e uso da nossa plataforma online, incluindo o site, os conteúdos e os serviços oferecidos (coletivamente, o "Serviço"). Ao acessar ou usar nosso Serviço, você concorda em cumprir e estar vinculado a estes Termos. Se você não concordar com estes Termos, não deverá acessar ou usar o Serviço.
        </p>

        <TermSection title="1. Descrição do Serviço">
          <p>
            A N3XOR RECORDS é uma plataforma VIP de download de conteúdo musical exclusivo para DJs profissionais ("Assinantes"). O Serviço oferece acesso a um acervo de músicas, remixes, edits, acapellas e outros materiais de áudio ("Conteúdo") para uso profissional em apresentações, sets e produções.
          </p>
        </TermSection>

        <TermSection title="2. Contas de Usuário e Segurança">
          <p>
            <strong>2.1. Criação de Conta:</strong> Para acessar as áreas restritas do Serviço, você deve criar uma conta. Você concorda em fornecer informações precisas, atuais e completas durante o processo de registro.
          </p>
          <p>
            <strong>2.2. Autenticação por Terceiros (Clerk):</strong> Para garantir a segurança e a integridade das contas, nosso processo de registro, login e gerenciamento de usuários é operado através do serviço de terceiros <strong>Clerk</strong>. Ao criar uma conta, você concorda que seus dados de autenticação (como e-mail, senha criptografada e informações de perfil) serão processados e armazenados de forma segura pelo Clerk, de acordo com as políticas de privacidade e segurança deles. Nós não temos acesso direto às suas senhas.
          </p>
          <p>
            <strong>2.3. Responsabilidade da Conta:</strong> Você é o único responsável por todas as atividades que ocorrem em sua conta e por manter a confidencialidade de sua senha. Você concorda em nos notificar imediatamente sobre qualquer uso não autorizado de sua conta.
          </p>
        </TermSection>

        <TermSection title="3. Assinaturas e Pagamentos">
            <p><strong>3.1. Planos de Assinatura:</strong> O acesso ao Conteúdo VIP requer uma assinatura ativa. Os detalhes dos planos, preços e ciclos de faturamento estão descritos na nossa página de assinaturas.</p>
            <p><strong>3.2. Renovação Automática:</strong> A menos que seja cancelada, sua assinatura será renovada automaticamente no final de cada ciclo de faturamento. Você pode gerenciar ou cancelar sua assinatura na sua área de cliente.</p>
            <p><strong>3.3. Reembolsos:</strong> As políticas de reembolso são especificadas na página de cada plano. Geralmente, pagamentos de assinaturas não são reembolsáveis, exceto quando exigido por lei.</p>
        </TermSection>

        <TermSection title="4. Uso do Conteúdo e Licença">
            <p><strong>4.1. Licença de Uso:</strong> Ao adquirir uma assinatura, concedemos a você uma licença limitada, não exclusiva, intransferível e revogável para baixar e usar o Conteúdo para fins de performance pública (DJ sets), produções musicais e uso pessoal.</p>
            <p><strong>4.2. Restrições:</strong> Você <strong>NÃO</strong> pode:</p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                <li>Revender, redistribuir, compartilhar ou sublicenciar o Conteúdo a terceiros.</li>
                <li>Disponibilizar o Conteúdo em qualquer plataforma de compartilhamento de arquivos ou rede peer-to-peer.</li>
                <li>Usar o Conteúdo de forma ilegal, difamatória ou que infrinja os direitos de terceiros.</li>
                <li>Alegar propriedade autoral sobre qualquer parte do Conteúdo.</li>
            </ul>
            <p>A violação destas restrições resultará na terminação imediata da sua conta e licença, sem reembolso.</p>
        </TermSection>

        <TermSection title="5. Armazenamento e Gerenciamento de Dados por Terceiros">
            <p>Para operar nosso Serviço, contamos com provedores de tecnologia de ponta. Ao usar nossa plataforma, você reconhece e concorda com o uso desses serviços:</p>
            <p><strong>5.1. Banco de Dados (Neon):</strong> Nossos dados operacionais, como informações sobre as pastas de músicas (nomes, categorias, links) e dados de usuários (referências de conta, status da assinatura), são armazenados em um banco de dados PostgreSQL gerenciado pelo serviço <strong>Neon</strong>. O Neon é responsável pela segurança, disponibilidade e integridade da infraestrutura do banco de dados.</p>
            <p><strong>5.2. Armazenamento de Arquivos (Google Drive):</strong> O Conteúdo musical em si é armazenado e disponibilizado através do <strong>Google Drive</strong>. O acesso aos links de download depende da sua assinatura ativa e das permissões configuradas. A disponibilidade do download está sujeita aos termos de serviço e à operacionalidade do Google Drive.</p>
        </TermSection>

        <TermSection title="6. Propriedade Intelectual">
            <p>Todo o conteúdo original do site, incluindo o design, layout, textos, gráficos, logos e a organização do acervo, é propriedade exclusiva da N3XOR RECORDS. O Conteúdo musical disponibilizado pode conter direitos autorais de terceiros (artistas, produtores, gravadoras), e a licença de uso é concedida conforme a Seção 4.</p>
        </TermSection>

        <TermSection title="7. Rescisão">
            <p>Nós nos reservamos o direito de suspender ou encerrar sua conta e acesso ao Serviço, a nosso critério, a qualquer momento e por qualquer motivo, sem aviso prévio, especialmente em caso de violação destes Termos.</p>
            <p>Você pode cancelar sua assinatura a qualquer momento através do seu painel de cliente.</p>
        </TermSection>

        <TermSection title="8. Isenção de Garantias e Limitação de Responsabilidade">
            <p>O Serviço é fornecido "COMO ESTÁ" e "CONFORME DISPONÍVEL", sem garantias de qualquer tipo. Não garantimos que o Serviço será ininterrupto, seguro ou livre de erros.</p>
            <p>Em nenhuma circunstância a N3XOR RECORDS será responsável por quaisquer danos indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar o Serviço.</p>
        </TermSection>

        <TermSection title="9. Alterações nos Termos">
            <p>Reservamo-nos o direito de modificar estes Termos a qualquer momento. Se fizermos alterações, publicaremos os Termos revisados no site e atualizaremos a data da "Última Atualização". O uso continuado do Serviço após tais alterações constitui sua aceitação dos novos Termos.</p>
        </TermSection>

        <TermSection title="10. Contato">
          <p>
            Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através do e-mail: 
            <a href="mailto:pix.fabricadosdjs@gmail.com" className="text-blue-400 hover:underline ml-1">
              pix.fabricadosdjs@gmail.com
            </a>.
          </p>
        </TermSection>
      </div>
    </div>
  );
}
