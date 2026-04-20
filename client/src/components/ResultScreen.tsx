/*
 * ResultScreen — Tela de resultado com diferenciação por público
 * Profissionais: visual teal, CTA para agendar diagnóstico, módulos da mentoria
 * Tutores: visual terracotta/sage, CTA para e-book
 */

import { motion } from 'framer-motion';
import { BookOpen, PawPrint, Share2, RotateCcw, CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import type { QuizResult, LeadTemp, Audience } from '@/lib/quizData';

interface ResultScreenProps {
  result: QuizResult;
  leadTemp: LeadTemp;
  userName?: string;
  audience: Audience;
  onRestart: () => void;
}

export default function ResultScreen({
  result,
  leadTemp,
  userName,
  audience,
  onRestart,
}: ResultScreenProps) {
  const greeting = userName ? `${userName}, v` : 'V';
  const isPro = audience === 'profissional';

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

  const accentColor = isPro ? 'sky-700' : 'terracotta';

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
          <p className={`font-bold text-xs uppercase tracking-widest mb-2 ${isPro ? 'text-sky-700' : 'text-sage-dark'}`}>
            Seu Diagnóstico
          </p>
          <h1
            className="text-3xl sm:text-4xl text-warm-dark font-bold mb-4"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {greeting}ocê é um{' '}
            <span className={isPro ? 'text-sky-700' : 'text-terracotta'}>{result.title}!</span>
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
          <p className={`font-bold text-xs uppercase tracking-widest mb-3 ${isPro ? 'text-sky-700' : 'text-sage-dark'}`}>
            {result.diagnosticTitle}
          </p>
          <ul className="flex flex-col gap-2.5">
            {result.diagnosticPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPro ? 'text-sky-600' : 'text-sage'}`} />
                <span className="text-warm-dark/80 text-sm leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Professional: Mentoria modules preview */}
        {isPro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="bg-white rounded-2xl border border-sky-200 p-5 mb-6"
          >
            <p className="text-sky-700 font-bold text-xs uppercase tracking-widest mb-3">
              O que você vai aprender
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: '🧠', title: 'Mentalidade e Gestão', desc: 'De "salvador de pets" para empresário' },
                { icon: '💰', title: 'Precificação Lucrativa', desc: 'Pare de pagar para trabalhar' },
                { icon: '📈', title: 'Vendas e Posicionamento', desc: 'Atraia clientes premium' },
                { icon: '✈️', title: 'Bônus: Método Voepet', desc: 'Monetize com transporte de animais' },
                { icon: '🌍', title: 'Bônus: Assessoria na Prática', desc: 'Viagens internacionais passo a passo' },
              ].map((mod, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-sky-50/50">
                  <span className="text-xl flex-shrink-0">{mod.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-warm-dark">{mod.title}</p>
                    <p className="text-xs text-muted-foreground">{mod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Offer card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={`bg-white rounded-3xl border-2 p-6 sm:p-8 mb-6 shadow-sm ${
            isPro ? 'border-sky-200' : 'border-terracotta/20'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isPro ? 'bg-sky-100' : 'bg-terracotta/10'
            }`}>
              {isPro ? (
                <GraduationCap className="w-5 h-5 text-sky-700" />
              ) : (
                <BookOpen className="w-5 h-5 text-terracotta" />
              )}
            </div>
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${
                isPro ? 'text-sky-700' : 'text-terracotta'
              }`}>
                {result.offerLabel}
              </p>
            </div>
          </div>

          <h3
            className="text-xl sm:text-2xl text-warm-dark font-bold mb-3"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {result.offerTitle}
          </h3>

          <p className="text-warm-dark/70 text-sm leading-relaxed mb-6">
            {result.offerDescription}
          </p>

          {/* Authority badge */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-sand-light mb-6">
            <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
              {isPro ? (
                <Briefcase className="w-5 h-5 text-sage-dark" />
              ) : (
                <PawPrint className="w-5 h-5 text-sage-dark" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-warm-dark">
                Dra. Wendi
              </p>
              <p className="text-xs text-muted-foreground">
                {isPro
                  ? 'Médica Veterinária e Empresária — +20 anos de experiência'
                  : 'Médica Veterinária — +20 anos de experiência'}
              </p>
            </div>
          </div>

          {/* Potential income highlight (pro only) */}
          {isPro && (
            <div className="bg-gradient-to-r from-sky-50 to-sky-100/50 rounded-xl p-4 mb-6 border border-sky-200">
              <p className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-2">
                Potencial de renda com a mentoria
              </p>
              <div className="flex items-center justify-between gap-2">
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-warm-dark/50 line-through">R$ 4.500</p>
                  <p className="text-[10px] text-muted-foreground">Vet CLT</p>
                </div>
                <div className="text-sky-600 text-xl">→</div>
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-sky-700">R$ 15.000</p>
                  <p className="text-[10px] text-muted-foreground">Gestão otimizada</p>
                </div>
                <div className="text-sky-600 text-xl">→</div>
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-emerald-600">R$ 25.000</p>
                  <p className="text-[10px] text-muted-foreground">+ Transporte pet</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <a
            href={result.ctaLink}
            target="_top"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center gap-3 w-full px-6 py-4.5 rounded-2xl text-white font-bold text-base uppercase tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
              isPro
                ? 'bg-sky-700 shadow-sky-700/25 hover:shadow-xl hover:shadow-sky-700/35'
                : 'bg-terracotta shadow-terracotta/25 hover:shadow-xl hover:shadow-terracotta/35'
            }`}
          >
            {result.ctaText}
          </a>

          {isPro && leadTemp === 'quente' && (
            <p className="text-center text-xs text-sky-700/70 font-medium mt-3">
              Vagas limitadas — nossa equipe entrará em contato pelo WhatsApp
            </p>
          )}
          {isPro && leadTemp === 'morno' && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Sessão de diagnóstico 100% gratuita e sem compromisso
            </p>
          )}
          {isPro && leadTemp === 'frio' && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Conheça a mentoria sem compromisso. Diagnóstico gratuito.
            </p>
          )}
          {!isPro && leadTemp === 'frio' && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Conteúdo acessível e com valor real. Sem enrolação.
            </p>
          )}
          {!isPro && leadTemp === 'morno' && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Investimento acessível com conteúdo direto ao ponto.
            </p>
          )}
          {!isPro && leadTemp === 'quente' && (
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
            {isPro
              ? 'Transformando veterinários em empreendedores de alto faturamento.'
              : 'Cuidado, confiança e conhecimento para o seu pet.'}
          </p>
        </div>
      </div>
    </div>
  );
}
