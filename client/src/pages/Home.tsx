/*
 * Home — Quiz Voepet com ramificação para dois públicos
 * Profissionais → Mentoria Vet Sem Fronteiras
 * Tutores → E-books
 */

import { useState, useCallback } from 'react';
import {
  QUIZ_QUESTIONS,
  getQuestionsForAudience,
  TUTOR_RESULTS,
  PRO_RESULTS,
  calculateTutorResult,
  calculateProResult,
} from '@/lib/quizData';
import type {
  Audience,
  QuizResult,
  LeadTemp,
  LeadData,
} from '@/lib/quizData';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuestionCard from '@/components/QuestionCard';
import ContactForm from '@/components/ContactForm';
import ResultScreen from '@/components/ResultScreen';

type Phase = 'welcome' | 'quiz' | 'contact' | 'result';

export default function Home() {
  const [phase, setPhase] = useState<Phase>('welcome');
  const [audience, setAudience] = useState<Audience | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [leadTemp, setLeadTemp] = useState<LeadTemp>('morno');
  const [userName, setUserName] = useState('');

  // Get the active question list based on audience
  const questions = audience ? getQuestionsForAudience(audience) : [QUIZ_QUESTIONS[0]];
  const currentQuestion = questions[currentIndex];
  const totalSteps = audience ? questions.length : 1;

  const handleStart = useCallback(() => {
    setPhase('quiz');
    setCurrentIndex(0);
    setAnswers({});
    setAudience(null);
  }, []);

  const handleSelect = useCallback(
    (optionId: string) => {
      const q = questions[currentIndex];
      const option = q.options.find((o) => o.id === optionId);
      if (!option) return;

      const newAnswers = { ...answers, [q.id]: optionId };
      setAnswers(newAnswers);

      // If this is the first question (audience selector)
      if (q.id === 'q1' && option.audience) {
        setAudience(option.audience);
        // After setting audience, the questions list will change
        // Move to index 1 (second question in the audience-specific list)
        setTimeout(() => setCurrentIndex(1), 400);
        return;
      }

      // Auto-advance after selection
      setTimeout(() => {
        if (currentIndex < totalSteps - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Quiz finished → go to contact form
          setPhase('contact');
        }
      }, 400);
    },
    [answers, currentIndex, questions, totalSteps]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      // If going back to question 1, reset audience
      if (currentIndex === 1) {
        setAudience(null);
        setCurrentIndex(0);
        return;
      }
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleContactSubmit = useCallback(
    (data: LeadData) => {
      setUserName(data.name.split(' ')[0]);

      if (audience === 'tutor') {
        const { category, leadTemp: lt } = calculateTutorResult(answers);
        setResult(TUTOR_RESULTS[category]);
        setLeadTemp(lt);
      } else if (audience === 'profissional') {
        const { category, leadTemp: lt } = calculateProResult(answers);
        setResult(PRO_RESULTS[category]);
        setLeadTemp(lt);
      }

      setPhase('result');
    },
    [answers, audience]
  );

  const handleContactBack = useCallback(() => {
    setPhase('quiz');
    // Go back to last question
    if (audience) {
      const qs = getQuestionsForAudience(audience);
      setCurrentIndex(qs.length - 1);
    }
  }, [audience]);

  const handleRestart = useCallback(() => {
    setPhase('welcome');
    setAudience(null);
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setLeadTemp('morno');
    setUserName('');
  }, []);

  if (phase === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (phase === 'quiz' && currentQuestion) {
    return (
      <QuestionCard
        question={currentQuestion}
        currentStep={currentIndex + 1}
        totalSteps={totalSteps}
        selectedAnswer={answers[currentQuestion.id]}
        onSelect={handleSelect}
        onBack={handleBack}
        canGoBack={currentIndex > 0}
      />
    );
  }

  if (phase === 'contact') {
    return (
      <ContactForm
        currentStep={totalSteps + 1}
        totalSteps={totalSteps + 1}
        onSubmit={handleContactSubmit}
        onBack={handleContactBack}
        audience={audience}
      />
    );
  }

  if (phase === 'result' && result) {
    return (
      <ResultScreen
        result={result}
        leadTemp={leadTemp}
        userName={userName}
        audience={audience!}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}
