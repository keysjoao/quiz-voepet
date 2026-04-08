/*
 * QuestionCard — Mesclado Voepet + CoreStudio
 * Badges de categoria, emojis, layout cards/list, percentual de progresso
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { QuizQuestion } from '@/lib/quizData';
import { BADGE_CONFIG } from '@/lib/quizData';

interface QuestionCardProps {
  question: QuizQuestion;
  currentStep: number;
  totalSteps: number;
  selectedAnswer: string | undefined;
  onSelect: (optionId: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function QuestionCard({
  question,
  currentStep,
  totalSteps,
  selectedAnswer,
  onSelect,
  onBack,
  canGoBack,
}: QuestionCardProps) {
  const progress = (currentStep / totalSteps) * 100;
  const percentText = `${Math.round(progress)}%`;
  const badge = BADGE_CONFIG[question.badge];
  const questionNumber = String(currentStep).padStart(2, '0');

  return (
    <div className="min-h-screen flex flex-col bg-sand-light">
      {/* Top bar with progress */}
      <div className="sticky top-0 z-20 bg-sand-light/80 backdrop-blur-md border-b border-sand/50">
        <div className="max-w-2xl mx-auto w-full px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Pergunta {currentStep} de {totalSteps}
            </span>
            <span className="text-sm font-semibold text-sage-dark">
              {percentText}
            </span>
          </div>

          {/* Progress bar */}
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

      {/* Question content */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            {/* Badge */}
            <div className="mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badge.color}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {badge.label}
              </span>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-3xl border border-sand/80 shadow-sm p-6 sm:p-8 mb-4 flex-1">
              {/* Question number */}
              <p className="text-sage-dark text-xs font-bold uppercase tracking-widest mb-3">
                Pergunta {questionNumber}
              </p>

              {/* Question text */}
              <h2
                className="text-2xl sm:text-3xl text-warm-dark font-bold leading-snug mb-2"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                {question.question}
              </h2>
              {question.subtitle && (
                <p className="text-muted-foreground text-sm mb-6 italic">
                  {question.subtitle}
                </p>
              )}

              {/* Options — cards layout */}
              {question.layout === 'cards' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.06 }}
                        onClick={() => onSelect(option.id)}
                        className={`group relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-sage bg-sage/10 shadow-md shadow-sage/10'
                            : 'border-sand/80 bg-sand-light hover:border-sage/40 hover:bg-sage/5 hover:shadow-sm'
                        }`}
                      >
                        <span className="text-3xl mb-2.5">{option.emoji}</span>
                        <span
                          className={`text-sm leading-snug transition-colors ${
                            isSelected
                              ? 'text-warm-dark font-semibold'
                              : 'text-warm-dark/75 group-hover:text-warm-dark'
                          }`}
                        >
                          {option.text}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                /* Options — list layout */
                <div className="flex flex-col gap-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.06 }}
                        onClick={() => onSelect(option.id)}
                        className={`group relative w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-sage bg-sage/10 shadow-md shadow-sage/10'
                            : 'border-sand/80 bg-white hover:border-sage/40 hover:bg-sage/5 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <span className="text-xl flex-shrink-0 mt-0.5">
                            {option.emoji}
                          </span>
                          <span
                            className={`text-base leading-relaxed transition-colors ${
                              isSelected
                                ? 'text-warm-dark font-medium'
                                : 'text-warm-dark/80 group-hover:text-warm-dark'
                            }`}
                          >
                            {option.text}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Back button */}
            <div className="pt-2">
              <button
                onClick={onBack}
                disabled={!canGoBack}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  canGoBack
                    ? 'text-sage-dark hover:text-sage'
                    : 'text-transparent pointer-events-none'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
