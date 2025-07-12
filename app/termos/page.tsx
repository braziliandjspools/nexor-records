import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermosDeUso() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Termos de Uso</h1>
      </div>

      <div className="text-gray-300 space-y-6">
        <p className="text-sm text-gray-400">Última atualização: 09 de maio de 2025</p>

        <p>
          Bem-vindo à Plataforma VIP – N3XOR RECORDS (https://plataformavip.brazilianremixservice.com/), uma plataforma
          exclusiva dedicada à distribuição de pacotes musicais e DJ pools para DJs profissionais e entusiastas da
          música. Ao acessar ou utilizar o site, você concorda com os seguintes Termos de Uso. Leia com atenção antes de
          utilizar nossos serviços.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar ou utilizar este site, você declara que leu, entendeu e concorda em se comprometer com estes
            Termos de Uso, bem como com nossa Política de Privacidade e Política de Cookies. Se você não concorda com
            qualquer parte destes termos, não utilize o site.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">2. Elegibilidade</h2>
          <p>
            O acesso à Plataforma VIP é restrito a maiores de 18 anos e usuários devidamente cadastrados, mediante
            assinatura ou convite. O uso é estritamente pessoal e intransferível.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">3. Conteúdo da Plataforma</h2>
          <p>A plataforma disponibiliza conteúdos exclusivos, incluindo:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Pacotes de músicas remixadas (packs)</li>
            <li>DJ pools com faixas para performance</li>
            <li>Materiais promocionais e bônus</li>
          </ul>
          <p className="mt-2">
            Todo o conteúdo é protegido por leis de direitos autorais. O uso é restrito à reprodução em apresentações ao
            vivo ou privadas. É proibido:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Redistribuir, revender ou compartilhar os arquivos;</li>
            <li>Fazer upload para outras plataformas ou redes;</li>
            <li>Usar o conteúdo para fins comerciais sem autorização expressa.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">4. Assinaturas e Pagamentos</h2>
          <p>
            O acesso completo à plataforma pode exigir uma assinatura paga. Os valores, planos e formas de pagamento são
            exibidos na página de adesão. Ao assinar, o usuário concorda com a cobrança periódica até o cancelamento.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">5. Cancelamento e Reembolsos</h2>
          <p>
            O usuário pode cancelar a assinatura a qualquer momento. Não há reembolso proporcional ou integral após o
            início do ciclo vigente, exceto em casos de falha técnica comprovada da plataforma.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">6. Responsabilidades do Usuário</h2>
          <p>O usuário concorda em:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Manter seus dados de login seguros;</li>
            <li>Não compartilhar sua conta com terceiros;</li>
            <li>Usar o conteúdo apenas dentro dos limites permitidos;</li>
            <li>Respeitar os direitos autorais de todos os materiais disponibilizados.</li>
          </ul>
          <p className="mt-2">
            O descumprimento destes termos pode resultar na suspensão ou exclusão da conta, sem direito a reembolso.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">7. Modificações</h2>
          <p>
            A N3XOR RECORDS se reserva o direito de alterar estes Termos de Uso a qualquer momento. As mudanças entrarão
            em vigor após a publicação no site. Recomendamos a revisão periódica dos termos.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">8. Limitação de Responsabilidade</h2>
          <p>
            A plataforma é fornecida "como está". Não garantimos que o serviço será livre de erros, interrupções ou
            falhas técnicas. Em nenhuma hipótese seremos responsáveis por danos indiretos, lucros cessantes ou perda de
            dados.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">9. Contato</h2>
          <p>
            Em caso de dúvidas, entre em contato pelo e-mail:
            <br />📧 djpoolrecordsbrazil@gmail.com
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Política de Cookies</h2>
          <p>
            Este site utiliza cookies para melhorar a sua experiência de navegação. Ao continuar utilizando o site, você
            concorda com o uso de cookies conforme descrito abaixo.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4 mb-2">O que são cookies?</h3>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu navegador para coletar informações sobre sua
            navegação. Eles permitem lembrar preferências, armazenar sessões de login, e entender como você interage com
            o site.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4 mb-2">Tipos de Cookies que Usamos</h3>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <span className="font-medium">Cookies Essenciais:</span> Necessários para o funcionamento básico do site,
              como login e acesso a áreas restritas.
            </li>
            <li>
              <span className="font-medium">Cookies de Desempenho:</span> Coletam dados anônimos sobre o uso do site,
              como páginas visitadas e tempo de navegação.
            </li>
            <li>
              <span className="font-medium">Cookies de Funcionalidade:</span> Guardam preferências e escolhas do usuário
              para melhorar a experiência.
            </li>
            <li>
              <span className="font-medium">Cookies de Terceiros:</span> Utilizamos serviços de terceiros como Google
              Analytics para entender o comportamento dos visitantes.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-white mt-4 mb-2">Como Gerenciar Cookies</h3>
          <p>
            Você pode controlar e/ou apagar cookies a qualquer momento pelas configurações do seu navegador. No entanto,
            a desativação de alguns cookies pode comprometer o funcionamento correto do site.
          </p>
        </div>
      </div>
    </div>
  )
}
