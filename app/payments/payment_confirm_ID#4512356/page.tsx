"use client";

import { CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PaymentConfirmationPage() {
  const productName = "COLETÂNEA MASTERMIX";
  const phoneNumber = "5551935052274";
  const message = `Olá! Realizei o pagamento de R$ 35,00 pela ${productName}. Gostaria de solicitar meu acesso.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-900/50 p-8 rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-400" />
        </motion.div>

        <h1 className="text-3xl font-bold mt-6 text-gray-100">
          Pagamento Aprovado!
        </h1>
        
        <p className="text-gray-400 mt-2">
          Obrigado pela sua compra. Seu acesso será liberado em breve.
        </p>

        <div className="my-8 py-6 bg-gray-800/50 rounded-lg">
          <p className="text-sm uppercase text-gray-400 tracking-wider">Produto</p>
          <p className="text-xl font-semibold text-white mt-1">{productName}</p>
          <div className="w-24 h-px bg-green-500/50 mx-auto my-4"></div>
          <p className="text-sm uppercase text-gray-400 tracking-wider">Valor Pago</p>
          <p className="text-5xl font-bold text-green-400 mt-1">R$ 35,00</p>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Para agilizar a liberação, clique no botão abaixo e nos envie uma mensagem no WhatsApp.
        </p>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-3 font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageSquare className="mr-2" />
            Solicitar Acesso
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
