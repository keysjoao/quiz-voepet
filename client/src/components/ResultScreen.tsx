/*
 * ResultScreen — Tela de resultado mesclada (Voepet + CoreStudio)
 * Diagnóstico visual, pontos identificados, CTA forte, autoridade
 */

import { motion } from 'framer-motion';
import { BookOpen, PawPrint, Share2, RotateCcw, CheckCircle2 } from 'lucide-react';
import type { QuizResult, LeadTemp } from '@/lib/quizData';

interface ResultScreenProps {
  result: QuizResult;
  leadTemp: LeadTemp;
  userName?: string;
  onRestart: () => void;
}

export default function ResultScreen({
  result,
  leadTemp,
  userName,
  onRestart,
}: ResultScreenProps) {
  const greeting = userName ? `${userName}, v` : 'V';

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `Sou ${result.title}! — Quiz Voepet`,
        text: `Fiz o Diagnóstico da Voepet e descobri que sou ${result.title}! Faça o seu também:`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado!');
    }
  }

  return (
    <div className="min-h-screen bg-sand-light">
      {/* Hero section with result image */}
      <div className="relative h-[40vh] sm:h-[45vh] overflow-hidden">
        <img
          src={result.image}
          alt={result.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-sand-light" />

        {/* Badge overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        >
          <div className="w-20 h-20 rounded-full bg-white shadow-xl shadow-black/10 flex items-center justify-center text-4xl">
            {result.emoji}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto w-full px-5 pt-14 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-6"
        >
          <p className="text-sage-dark font-bold text-xs uppercase tracking-widest mb-2">
            Seu Diagnóstico
          </p>
          <h1
            className="text-3xl sm:text-4xl text-warm-dark font-bold mb-4"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {greeting}ocê é um{' '}
            <span className="text-terracotta">{result.title}!</span>
          </h1>
          <p className="text-warm-dark/75 text-base leading-relaxed">
            {result.description}
          </p>
        </motion.div>

        {/* Diagnostic points card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl border border-sage/20 p-5 mb-6"
        >
          <p className="text-sage-dark font-bold text-xs uppercase tracking-widest mb-3">
            {result.diagnosticTitle}
          </p>
          <ul className="flex flex-col gap-2.5">
            {result.diagnosticPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                <span className="text-warm-dark/80 text-sm leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* E-book recommendation card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-3xl border-2 border-terracotta/20 p-6 sm:p-8 mb-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <p className="text-xs font-bold text-terracotta uppercase tracking-wider">
                Recomendação para você
              </p>
            </div>
          </div>

          <h3
            className="text-xl sm:text-2xl text-warm-dark font-bold mb-3"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {result.ebookTitle}
          </h3>

          <p className="text-warm-dark/70 text-sm leading-relaxed mb-6">
            {result.ebookDescription}
          </p>

          {/* Authority badge */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sand-light mb-6">
            <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
              <PawPrint className="w-5 h-5 text-sage-dark" />
            </div>
            <div>
              <p className="text-sm font-semibold text-warm-dark">
                Dra. Wendi
              </p>
              <p className="text-xs text-muted-foreground">
                Médica Veterinária — +20 anos de experiência
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={result.ctaLink}
            className="group flex items-center justify-center gap-3 w-full px-6 py-4.5 rounded-2xl bg-terracotta text-white font-bold text-base uppercase tracking-wide shadow-lg shadow-terracotta/25 hover:shadow-xl hover:shadow-terracotta/35 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          >
            {result.ctaText}
          </a>

          {leadTemp === 'frio' && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Conteúdo acessível e com valor real. Sem enrolação.
            </p>
          )}
          {leadTemp === 'morno' && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Investimento acessível com conteúdo direto ao ponto.
            </p>
          )}
          {leadTemp === 'quente' && (
            <p className="text-center text-xs text-terracotta/70 font-medium mt-3">
              Você está pronto para dar o próximo passo!
            </p>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-sand text-warm-dark/70 text-sm font-medium hover:border-sage/40 hover:text-warm-dark transition-all"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-sand text-warm-dark/70 text-sm font-medium hover:border-sage/40 hover:text-warm-dark transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Refazer Quiz
          </button>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-sand text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PawPrint className="w-5 h-5 text-sage" />
            <span className="font-semibold text-warm-dark">Voepet</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Cuidado, confiança e conhecimento para o seu pet.
          </p>
        </div>
      </div>
    </div>
  );
}
