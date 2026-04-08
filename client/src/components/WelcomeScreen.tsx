/*
 * WelcomeScreen — Tela de boas-vindas do Quiz Voepet
 * Design: Consultório Acolhedor — sage green, terracotta, sand
 * Hero com imagem de fundo, CTA forte
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
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
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/20">
              Quiz Gratuito
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
              Responda 7 perguntas rápidas e receba uma recomendação
              personalizada da{' '}
              <strong className="text-white">Dra. Wendi</strong>, veterinária há
              mais de 20 anos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <button
              onClick={onStart}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-terracotta text-white font-semibold text-lg shadow-lg shadow-terracotta/30 hover:shadow-xl hover:shadow-terracotta/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Começar o Quiz
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 text-white/70 text-sm mt-2 sm:mt-3">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Leva menos de 2 minutos
            </div>
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
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              100% gratuito
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Resultado personalizado
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Feito por veterinária
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
