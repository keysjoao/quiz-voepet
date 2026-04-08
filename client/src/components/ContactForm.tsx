/*
 * ContactForm — Captura de contato antes do resultado
 * Design: Consultório Acolhedor — sage green, terracotta, sand
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Gift, Lock } from 'lucide-react';

interface ContactFormProps {
  currentStep: number;
  totalSteps: number;
  onSubmit: (data: { name: string; email: string; whatsapp: string }) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function ContactForm({
  currentStep,
  totalSteps,
  onSubmit,
  onBack,
  onSkip,
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = ((currentStep) / totalSteps) * 100;

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 7)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Digite seu nome';
    if (!email.trim() || !email.includes('@'))
      newErrors.email = 'Digite um e-mail válido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim() });
  }

  return (
    <div className="min-h-screen flex flex-col bg-sand-light">
      {/* Top bar with progress */}
      <div className="sticky top-0 z-20 bg-sand-light/80 backdrop-blur-md border-b border-sand/50">
        <div className="max-w-2xl mx-auto w-full px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium text-sage-dark hover:text-sage transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <span className="text-sm text-muted-foreground font-medium">
              Quase lá!
            </span>
          </div>
          <div className="w-full h-2 bg-sand rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sage to-sage-dark"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gift icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-terracotta/10 flex items-center justify-center">
              <Gift className="w-8 h-8 text-terracotta" />
            </div>
          </div>

          <h2
            className="text-2xl sm:text-3xl text-warm-dark font-bold text-center leading-snug mb-2"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Seu resultado está pronto!
          </h2>
          <p className="text-muted-foreground text-center text-base mb-8">
            Deixe seus dados para receber o resultado e uma{' '}
            <strong className="text-terracotta">surpresa especial</strong> da
            Dra. Wendi.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-warm-dark mb-1.5">
                Seu nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder="Como podemos te chamar?"
                className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-warm-dark placeholder:text-warm-dark/40 transition-all focus:outline-none focus:ring-0 ${
                  errors.name
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-sand focus:border-sage'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-warm-dark mb-1.5">
                Seu melhor e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="email@exemplo.com"
                className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-warm-dark placeholder:text-warm-dark/40 transition-all focus:outline-none focus:ring-0 ${
                  errors.email
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-sand focus:border-sage'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-warm-dark mb-1.5">
                WhatsApp{' '}
                <span className="text-muted-foreground font-normal">
                  (opcional)
                </span>
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                placeholder="(00) 00000-0000"
                maxLength={16}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-sand bg-white text-warm-dark placeholder:text-warm-dark/40 transition-all focus:outline-none focus:ring-0 focus:border-sage"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="group flex items-center justify-center gap-3 w-full px-6 py-4 mt-2 rounded-2xl bg-terracotta text-white font-semibold text-lg shadow-lg shadow-terracotta/25 hover:shadow-xl hover:shadow-terracotta/35 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              Ver Meu Resultado
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Skip link */}
            <button
              type="button"
              onClick={onSkip}
              className="text-sm text-muted-foreground hover:text-warm-dark transition-colors text-center mt-1"
            >
              Pular e ver resultado
            </button>

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-2">
              <Lock className="w-3 h-3" />
              Seus dados estão seguros. Não enviamos spam.
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
