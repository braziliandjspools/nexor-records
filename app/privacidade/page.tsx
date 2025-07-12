import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PoliticaPrivacidade() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild className="bg-black/40 border-green-600/30 hover:bg-black/60">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="font-bold text-3xl tracking-tight uppercase">Política de Privacidade</h1>
      </div>

      <div className="text-gray-300 space-y-6">
        <p className="text-sm text-gray-400">Última atualização: 09 de maio de 2025</p>

        <p>
          A sua privacidade é fundamental para nós. Esta Política de Privacidade descreve como coletamos, usamos,
          armazenamos e protegemos as informações dos usuários da Plataforma VIP – N3XOR RECORDS, acessível em
          https://plataformavip.brazilianremixservice.com.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">1. Informações que Coletamos</h2>
          <p>Coletamos apenas os dados estritamente necessários para fornecer nossos serviços, tais como:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Nome</li>
            <li>E-mail</li>
            <li>Dados de acesso (login e senha)</li>
            <li>Endereço IP e informações de navegação (cookies)</li>
          </ul>
          <p className="mt-2">Não coletamos CPF nem outros dados sensíveis.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">2. Finalidade da Coleta</h2>
          <p>As informações são utilizadas para:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Criar e gerenciar sua conta na plataforma;</li>
            <li>Permitir acesso a conteúdos exclusivos;</li>
            <li>Realizar comunicações com o usuário via WhatsApp;</li>
            <li>Monitorar e melhorar a experiência de navegação;</li>
            <li>Cumprir com obrigações legais básicas relacionadas à segurança da informação.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">3. Pagamentos</h2>
          <p>
            Os pagamentos são realizados exclusivamente via PIX, de forma manual ou por meio de instruções enviadas
            diretamente ao usuário. Não armazenamos ou processamos dados bancários ou de cartão.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">4. Contato</h2>
          <p>O contato oficial da plataforma é feito exclusivamente via WhatsApp no número:</p>
          <p className="font-medium">📱 +55 51 93505-2274</p>
          <p className="mt-2">Não utilizamos e-mails para suporte ou atendimento ao usuário.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">5. Compartilhamento de Dados</h2>
          <p>Não vendemos nem compartilhamos seus dados com terceiros, exceto quando necessário para:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Operação técnica da plataforma (ex: hospedagem);</li>
            <li>Cumprimento de obrigações legais.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">6. Armazenamento e Segurança</h2>
          <p>
            Os dados coletados são armazenados com segurança em servidores confiáveis. Adotamos medidas técnicas e
            organizacionais para proteger suas informações contra acesso não autorizado, perda ou destruição.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">7. Direitos do Usuário</h2>
          <p>Você tem o direito de:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Acessar seus dados pessoais;</li>
            <li>Solicitar a correção ou exclusão de seus dados;</li>
            <li>Revogar o consentimento para o uso de informações.</li>
          </ul>
          <p className="mt-2">Para exercer seus direitos, entre em contato via WhatsApp: +55 51 93505-2274</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">8. Cookies</h2>
          <p>
            Utilizamos cookies essenciais e de desempenho para melhorar a navegação e funcionalidade do site. Para mais
            informações, consulte nossa{" "}
            <Link href="/termos" className="text-green-400 hover:underline">
              Política de Cookies
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">9. Informações Técnicas</h2>
          <p>
            Este site foi desenvolvido com a plataforma v0.dev e é hospedado pela Vercel, oferecendo desempenho
            otimizado e segurança no acesso aos conteúdos.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">10. Alterações na Política</h2>
          <p>
            Esta Política pode ser atualizada periodicamente. Sempre que houver alterações, elas serão publicadas nesta
            página com a data da última modificação.
          </p>
        </div>
      </div>
    </div>
  )
}
