"use client";

// NOTA: O nome do arquivo para esta rota seria /app/payments/payment_confirm_ID#4512356/page.tsx
// Em um sistema real, o ID seria dinâmico, como /app/payments/[id]/page.tsx

import { CheckCircle2, MessageSquare, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PaymentConfirmationPage() {
  const productName = "COLETÂNEA MASTERMIX";
  const phoneNumber = "5551935052274";
  // Mensagem atualizada para solicitar o e-mail do usuário
  const message = `Olá! Realizei o pagamento de R$ 35,00 pela ${productName}. Gostaria de solicitar meu acesso. Meu e-mail para liberação é:`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    // Container principal ajustado para ocupar mais espaço vertical
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-gray-900/60 p-8 md:p-10 rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 15 }}
        >
          <CheckCircle2 className="mx-auto h-24 w-24 text-green-400" />
        </motion.div>

        <h1 className="text-4xl font-bold mt-6 text-gray-100">
          Pagamento Aprovado!
        </h1>
        
        {/* Texto atualizado */}
        <p className="text-gray-400 mt-4 text-base">
          Obrigado pela sua compra. O acesso precisa ser liberado manualmente através do nosso drive, envie-nos seu e-mail para nosso WhatsApp.
        </p>

        <div className="my-8 py-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-sm uppercase text-gray-400 tracking-wider">Produto</p>
          <p className="text-2xl font-semibold text-white mt-1">{productName}</p>
          <div className="w-24 h-px bg-green-500/50 mx-auto my-4"></div>
          <p className="text-sm uppercase text-gray-400 tracking-wider">Valor Pago</p>
          <p className="text-6xl font-bold text-green-400 mt-1">R$ 35,00</p>
        </div>

        {/* NOVO: Aviso importante em destaque */}
        <Alert className="bg-yellow-900/20 border-yellow-500/30 text-left mb-6">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <AlertTitle className="text-yellow-300 font-bold">Atenção sobre a Liberação do Acesso</AlertTitle>
          <AlertDescription className="text-yellow-400/80 mt-2 space-y-2 text-sm">
            <p>O acesso só poderá ser liberado para e-mails que possuem conta Google ou Google Drive ativo.</p>
            <p>No caso do recebimento do pagamento e você não nos enviar seu e-mail através do nosso WhatsApp em até 2 horas, o acesso será liberado automaticamente para o e-mail usado no ato da compra, caso ele tenha uma conta Google associada.</p>
            <p>Se você não nos enviar um e-mail válido e o e-mail da compra for incompatível, o valor será estornado automaticamente.</p>
          </AlertDescription>
        </Alert>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-4 font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageSquare className="mr-2" />
            Solicitar Acesso via WhatsApp
          </a>
        </Button>
      </motion.div>
    </div>
  );
}