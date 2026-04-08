/*
 * ContactForm — Captura obrigatória de leads com texto adaptado por público
 * Profissionais: "Agendar seu diagnóstico gratuito"
 * Tutores: "Receber seu diagnóstico"
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import type { LeadData, Audience } from '@/lib/quizData';

interface ContactFormProps {
  currentStep: number;
  totalSteps: number;
  onSubmit: (data: LeadData) => void;
  onBack: () => void;
  audience: Audience | null;
}

const COUNTRY_CODES = [
  { code: '+55', flag: '🇧🇷', label: 'Brasil' },
  { code: '+1', flag: '🇺🇸', label: 'EUA' },
  { code: '+54', flag: '🇦🇷', label: 'Argentina' },
  { code: '+351', flag: '🇵🇹', label: 'Portugal' },
  { code: '+595', flag: '🇵🇾', label: 'Paraguai' },
  { code: '+598', flag: '🇺🇾', label: 'Uruguai' },
  { code: '+56', flag: '🇨🇱', label: 'Chile' },
  { code: '+57', flag: '🇨🇴', label: 'Colômbia' },
];

export default function ContactForm({
  currentStep,
  totalSteps,
  onSubmit,
  onBack,
  audience,
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [countryCode, setCountryCode] = useState('+55');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = (currentStep / totalSteps) * 100;
  const isPro = audience === 'profissional';

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
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10)
      newErrors.whatsapp = 'Digite um WhatsApp válido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      countryCode,
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-sand-light">
      {/* Top bar with progress */}
      <div className="sticky top-0 z-20 bg-sand-light/80 backdrop-blur-md border-b border-sand/50">
        <div className="max-w-2xl mx-auto w-full px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Quase lá!
            </span>
            <span className="text-sm font-semibold text-sage-dark">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-sand rounded-full overflow-hidden">
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
          {/* Lock icon */}
          <div className="flex justify-center mb-5">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isPro ? 'bg-sky-100' : 'bg-sage/10'}`}>
              <Lock className={`w-8 h-8 ${isPro ? 'text-sky-700' : 'text-sage-dark'}`} />
            </div>
          </div>

          <h2
            className="text-2xl sm:text-3xl text-warm-dark font-bold text-center leading-snug mb-2"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {isPro ? (
              <>
                Deixe seus dados para agendar{' '}
                <span className="text-sky-700">seu diagnóstico gratuito</span>
              </>
            ) : (
              <>
                Deixe seus dados para receber{' '}
                <span className="text-terracotta">seu diagnóstico</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground text-center text-sm mb-8">
            {isPro
              ? 'Seu resultado está pronto! Nossa equipe entrará em contato para agendar sua sessão de diagnóstico gratuita.'
              : 'Seu resultado está pronto! Preencha abaixo para desbloquear.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-warm-dark uppercase tracking-wider mb-1.5">
                Nome Completo <span className="text-terracotta">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder="Seu nome"
                className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-warm-dark placeholder:text-warm-dark/40 transition-all focus:outline-none focus:ring-0 ${
                  errors.name
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-sand focus:border-sage'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-warm-dark uppercase tracking-wider mb-1.5">
                Melhor E-mail <span className="text-terracotta">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="seu@email.com"
                className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white text-warm-dark placeholder:text-warm-dark/40 transition-all focus:outline-none focus:ring-0 ${
                  errors.email
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-sand focus:border-sage'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* WhatsApp with country selector */}
            <div>
              <label className="block text-xs font-bold text-warm-dark uppercase tracking-wider mb-1.5">
                WhatsApp <span className="text-terracotta">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-28 px-2 py-3.5 rounded-xl border-2 border-sand bg-white text-warm-dark text-sm focus:outline-none focus:ring-0 focus:border-sage appearance-none"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => {
                    setWhatsapp(formatPhone(e.target.value));
                    setErrors((prev) => ({ ...prev, whatsapp: '' }));
                  }}
                  placeholder="(00) 00000-0000"
                  maxLength={16}
                  className={`flex-1 px-4 py-3.5 rounded-xl border-2 bg-white text-warm-dark placeholder:text-warm-dark/40 transition-all focus:outline-none focus:ring-0 ${
                    errors.whatsapp
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-sand focus:border-sage'
                  }`}
                />
              </div>
              {errors.whatsapp && (
                <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`group flex items-center justify-center gap-3 w-full px-6 py-4.5 mt-2 rounded-2xl text-white font-bold text-base uppercase tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                isPro
                  ? 'bg-sky-700 shadow-sky-700/25 hover:shadow-xl hover:shadow-sky-700/35'
                  : 'bg-terracotta shadow-terracotta/25 hover:shadow-xl hover:shadow-terracotta/35'
              }`}
            >
              {isPro ? 'Agendar Diagnóstico Gratuito' : 'Receber Diagnóstico'}
            </button>

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-1">
              <Lock className="w-3 h-3" />
              Seus dados são 100% seguros. Não enviamos spam.
            </div>
          </form>

          {/* Back button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium text-sage-dark hover:text-sage transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
