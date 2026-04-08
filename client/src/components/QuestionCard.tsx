/*
 * QuestionCard — Exibe uma pergunta do quiz com opções
 * Design: Consultório Acolhedor — cards suaves, transições orgânicas
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { QuizQuestion } from '@/lib/quizData';

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
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-sand-light">
      {/* Top bar with progress */}
      <div className="sticky top-0 z-20 bg-sand-light/80 backdrop-blur-md border-b border-sand/50">
        <div className="max-w-2xl mx-auto w-full px-5 py-4">
          <div className="flex items-center justify-between mb-3">
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
            <span className="text-sm text-muted-foreground font-medium">
              {currentStep} de {totalSteps}
            </span>
          </div>

          {/* Progress bar */}
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

      {/* Question content */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full px-5 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Question text */}
            <div className="mb-8">
              <h2
                className="text-2xl sm:text-3xl text-warm-dark font-bold leading-snug mb-2"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                {question.question}
              </h2>
              {question.subtitle && (
                <p className="text-muted-foreground text-base">
                  {question.subtitle}
                </p>
              )}
            </div>

            {/* Options */}
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
                        : 'border-sand bg-white hover:border-sage/40 hover:bg-sage/5 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Radio indicator */}
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'border-sage bg-sage'
                            : 'border-sand group-hover:border-sage/50'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </div>

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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative paw prints */}
      <div className="fixed bottom-4 right-4 opacity-[0.04] pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-sage-dark">
          <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5-2c-.83 0-1.5.67-1.5 1.5S6.67 11 7.5 11 9 10.33 9 9.5 8.33 8 7.5 8zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S17.33 8 16.5 8zM12 16c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm-4-9c-.83 0-1.5.67-1.5 1.5S7.17 10 8 10s1.5-.67 1.5-1.5S8.83 7 8 7zm8 0c-.83 0-1.5.67-1.5 1.5S15.17 10 16 10s1.5-.67 1.5-1.5S16.83 7 16 7z" />
        </svg>
      </div>
    </div>
  );
}
