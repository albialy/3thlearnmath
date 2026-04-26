import React, { useMemo } from 'react';
import { MiniQuiz } from './MiniQuiz';
import { generateQuiz } from '../lib/quizGenerator';

interface DynamicQuizProps {
  topic: string;
  onComplete: () => void;
}

export function DynamicQuiz({ topic, onComplete }: DynamicQuizProps) {
  const questions = useMemo(() => generateQuiz(topic), [topic]);
  return <MiniQuiz questions={questions} onComplete={onComplete} />;
}
