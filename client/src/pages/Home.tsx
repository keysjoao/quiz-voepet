/*
 * Home — Página principal do Quiz Voepet
 * Design: Consultório Acolhedor — sage/terracotta/sand
 * Fluxo: Welcome → Perguntas (1-7) → Contato → Resultado
 */

import { useState, useCallback } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuestionCard from '@/components/QuestionCard';
import ContactForm from '@/components/ContactForm';
import ResultScreen from '@/components/ResultScreen';
import {
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  calculateResult,
  type Category,
  type LeadTemp,
} from '@/lib/quizData';

type QuizStage = 'welcome' | 'questions' | 'contact' | 'result';

export default function Home() {
  const [stage, setStage] = useState<QuizStage>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultCategory, setResultCategory] = useState<Category>('transporte');
  const [leadTemp, setLeadTemp] = useState<LeadTemp>('morno');
  const [userName, setUserName] = useState('');

  const totalSteps = QUIZ_QUESTIONS.length + 1; // questions + contact form

  const handleStart = useCallback(() => {
    setStage('questions');
    setCurrentQuestionIndex(0);
  }, []);

  const handleSelectAnswer = useCallback(
    (optionId: string) => {
      const question = QUIZ_QUESTIONS[currentQuestionIndex];
      setAnswers((prev) => ({ ...prev, [question.id]: optionId }));

      // Auto-advance after a short delay
      setTimeout(() => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setStage('contact');
        }
      }, 350);
    },
    [currentQuestionIndex]
  );

  const handleBack = useCallback(() => {
    if (stage === 'contact') {
      setStage('questions');
      setCurrentQuestionIndex(QUIZ_QUESTIONS.length - 1);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setStage('welcome');
    }
  }, [stage, currentQuestionIndex]);

  const handleContactSubmit = useCallback(
    (data: { name: string; email: string; whatsapp: string }) => {
      setUserName(data.name);
      const { category, leadTemp: lt } = calculateResult(answers);
      setResultCategory(category);
      setLeadTemp(lt);
      setStage('result');

      // Log lead data (in production, send to backend/CRM)
      console.log('Lead captured:', {
        ...data,
        category,
        leadTemp: lt,
        answers,
      });
    },
    [answers]
  );

  const handleSkipContact = useCallback(() => {
    const { category, leadTemp: lt } = calculateResult(answers);
    setResultCategory(category);
    setLeadTemp(lt);
    setStage('result');
  }, [answers]);

  const handleRestart = useCallback(() => {
    setStage('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setUserName('');
    window.scrollTo(0, 0);
  }, []);

  if (stage === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (stage === 'questions') {
    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    return (
      <QuestionCard
        question={question}
        currentStep={currentQuestionIndex + 1}
        totalSteps={totalSteps}
        selectedAnswer={answers[question.id]}
        onSelect={handleSelectAnswer}
        onBack={handleBack}
        canGoBack={true}
      />
    );
  }

  if (stage === 'contact') {
    return (
      <ContactForm
        currentStep={QUIZ_QUESTIONS.length + 1}
        totalSteps={totalSteps}
        onSubmit={handleContactSubmit}
        onBack={handleBack}
        onSkip={handleSkipContact}
      />
    );
  }

  // Result stage
  const result = QUIZ_RESULTS[resultCategory];
  return (
    <ResultScreen
      result={result}
      leadTemp={leadTemp}
      userName={userName}
      onRestart={handleRestart}
    />
  );
}
