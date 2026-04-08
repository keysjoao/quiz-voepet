/*
 * WelcomeScreen — Tela de boas-vindas mesclada (Voepet + CoreStudio)
 * Hero com imagem + stats cards + CTA forte + linguagem de diagnóstico
 */

import { motion } from 'framer-motion';
import { PawPrint, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/hero-quiz-voepet-QNtJZRmD8kN9kKqaxvJEJ8.webp"
          alt="Pet acolhido"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-6 px-6 flex items-center gap-2"
        >
          <PawPrint className="w-7 h-7 text-white/90" />
          <span className="text-white/90 font-semibold text-lg tracking-wide">
            Voepet
          </span>
        </motion.header>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-8 max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/20">
              <span className="text-base">🎯</span>
              Diagnóstico Gratuito
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight mb-5"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Descubra o que seu pet
              <br />
              <span className="text-terracotta-light">mais precisa</span>
            </h1>

            <p className="text-white/85 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Este diagnóstico rápido vai revelar a maior necessidade do seu pet e qual o próximo passo para cuidar dele com mais segurança. Feito pela{' '}
              <strong className="text-white">Dra. Wendi</strong>, veterinária há mais de 20 anos.
            </p>
          </motion.div>

          {/* Stats cards — inspirado no CoreStudio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-3 mb-8"
          >
            {[
              { value: '8', label: 'perguntas\nrápidas' },
              { value: '~2 min', label: 'tempo\nestimado' },
              { value: '100%', label: 'gratuito\ne sigiloso' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-3 py-3.5 text-center"
              >
                <p
                  className="text-white text-xl sm:text-2xl font-bold mb-0.5"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-white/65 text-xs leading-tight whitespace-pre-line">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col items-start"
          >
            <button
              onClick={onStart}
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-terracotta text-white font-semibold text-lg shadow-lg shadow-terracotta/30 hover:shadow-xl hover:shadow-terracotta/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
            >
              Desbloquear Meu Diagnóstico
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-white/55 text-sm mt-3 text-center w-full sm:w-auto sm:text-left">
              8 perguntas · Resultado imediato
            </p>
          </motion.div>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="px-6 pb-6"
        >
          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
            {['100% gratuito', 'Resultado personalizado', 'Feito por veterinária', 'Dados seguros'].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
