import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Changelog() {
  const changes = [
    {
      version: "4.6.07",
      date: "07/07/2025",
      changes: [
        "Reestruturação completa da seção 'Atualizações' para um sistema de páginas por mês, melhorando a organização e o desempenho.",
        "Criada uma nova página de menu para os meses com botões de navegação e status de disponibilidade.",
        "Adicionada uma caixa de boas-vindas na página de atualizações com um botão de destaque para assinatura VIP.",
        "Implementado um layout semanal (Semana 01, 02, etc.) com ordenação decrescente nas páginas de cada mês.",
        "Adicionado rodapé de navegação fixo para alternar facilmente entre o mês anterior, a página inicial e o próximo mês.",
        "Adicionada funcionalidade para copiar o link da pasta e para reportar links quebrados diretamente via WhatsApp com mensagem automática.",
        "Melhorada a responsividade da lista de pastas e da navegação em dispositivos móveis.",
        "Implementada a fonte personalizada 'Dosis' para os nomes dos estilos, com ajustes de peso e tamanho.",
        "Adicionados ícones interativos de cadeado e animações para uma melhor experiência do usuário.",
      ],
    },
    {
      version: "4.5.11",
      date: "09/05/2025",
      changes: [
        "Adicionada seção de Maio 2025 na página de atualizações",
        "Atualizado o esquema de cores para usar verde como cor principal",
        "Melhorada a interface do Deemix com informações de versão e data de atualização das ARLs",
        "Adicionadas páginas de Termos de Uso e Política de Privacidade",
        "Melhorada a navegação entre categorias na página de atualizações",
        "Adicionadas imagens para os meses de Março, Abril e Maio 2025",
        "Corrigida a barra de rolagem para usar a cor verde",
      ],
    },
    {
      version: "4.5.10",
      date: "08/05/2025",
      changes: [
        "Corrigido erro de carregamento na página de atualizações",
        "Simplificada a exibição de pastas para melhorar o desempenho",
        "Mantida a funcionalidade principal de pesquisa, filtragem e expansão de acordeões",
        "Corrigido erro de sintaxe na página inicial que causava falha na implantação",
        "Simplificadas as listas de pools e drives mensais",
      ],
    },
    {
      version: "4.5.9",
      date: "07/05/2025",
      changes: [
        "Atualizações de estilo no site",
        "Adicionados novos conteúdos",
        "Implementação de SEO",
        "Adicionado suporte a PWA",
        "Ajustes no componente Quick Access",
        "Redução de tamanhos de fonte em cards específicos",
      ],
    },
    {
      version: "4.5.0",
      date: "01/02/2025",
      changes: [
        "Redesign completo da interface",
        "Nova seção de playlists da semana",
        "Integração com Spotify aprimorada",
        "Sistema de recados da administração",
      ],
    },
    {
      version: "4.4.2",
      date: "15/12/2024",
      changes: [
        "Correções de bugs no sistema de download",
        "Melhorias na responsividade em dispositivos móveis",
        "Atualização das bibliotecas de segurança",
      ],
    },
    {
      version: "4.4.0",
      date: "05/11/2024",
      changes: [
        "Adicionado suporte para Deemix",
        "Nova seção de pedidos",
        "Melhorias no sistema de autenticação",
        "Otimização de performance",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">CHANGELOG</h1>
      </div>

      <div className="relative border-l-2 border-green-600 pl-6 space-y-8">
        {changes.map((change, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[29px] h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div className="bg-black/50 p-4 rounded-lg border border-green-600/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <h2 className="font-bold text-2xl tracking-tight text-white uppercase">Versão {change.version}</h2>
                <span className="text-gray-400 text-sm">{change.date}</span>
              </div>
              <ul className="space-y-2">
                {change.changes.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
