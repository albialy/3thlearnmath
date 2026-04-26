import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Star, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateMixedQuiz } from '../lib/quizGenerator';
import { useAppStore } from '../store';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export function ComprehensiveQuiz() {
  const { addPoints } = useAppStore();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setQuestions(generateMixedQuiz());
  }, []);

  const handleSelect = (idx: number) => {
    if (selectedOpt !== null) return;
    
    setSelectedOpt(idx);
    const correct = idx === questions[currentIdx].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 10);
      addPoints(5); // App global points
      confetti({
        particleCount: 30,
        spread: 50,
        colors: ['#10b981', '#34d399', '#fcd34d']
      });
    }

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(i => i + 1);
        setSelectedOpt(null);
        setIsCorrect(null);
      } else {
        setIsDone(true);
      }
    }, 2000);
  };

  const restart = () => {
    setQuestions(generateMixedQuiz());
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsCorrect(null);
    setScore(0);
    setIsDone(false);
  };

  if (questions.length === 0) return null;

  if (isDone) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl shadow-lg border-4 border-primary-200 mt-10 max-w-2xl mx-auto w-full">
        <div className="bg-primary-100 p-4 rounded-full text-primary-600 mb-4 inline-block">
          <Star size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">انتهى الاختبار الشامل!</h2>
        <p className="text-lg text-slate-600 font-bold mb-6">لقد أحرزت {score} نقطة من أصل {questions.length * 10}</p>
        <button
          onClick={restart}
          className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-2xl font-black flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md border-b-4 border-primary-700 mx-auto"
        >
          <RotateCcw size={24} />
          العب بمسائل جديدة
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto pb-8 pt-4">
      {/* HUD Header */}
      <div className="w-full flex justify-between items-center mb-8 bg-white p-4 md:p-5 rounded-3xl shadow-sm border-4 border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 p-3 rounded-2xl text-primary-600 shadow-inner">
             <Target size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">اختبار المهارات المتنوعة</h2>
        </div>
        <div className="bg-slate-50 flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-slate-200">
          <span className="text-lg font-black text-primary-600">{score}</span>
          <span className="text-sm text-slate-400 font-bold">نقطة</span>
        </div>
      </div>

      <div className="w-full bg-white rounded-3xl p-6 md:p-10 shadow-lg border-4 border-slate-200 text-center relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
           <motion.div 
             className="h-full bg-primary-500"
             animate={{ width: `${((currentIdx) / questions.length) * 100}%` }}
             transition={{ duration: 0.3 }}
           />
        </div>

        <div className="mb-4 mt-2">
           <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-sm font-bold border-2 border-slate-200">
              سؤال {currentIdx + 1} من {questions.length}
           </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-8" dir="rtl">
          {q.question}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="rtl">
          {q.options.map((opt, i) => {
            const isSelected = selectedOpt === i;
            const isTargetCorrect = q.correctAnswer === i;
            let btnClass = "p-4 text-xl font-bold rounded-2xl border-b-4 transition-all duration-200 text-center relative flex justify-center items-center gap-2 ";
            
            if (selectedOpt === null) {
              btnClass += "bg-slate-50 border-slate-200 text-slate-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 active:scale-95";
            } else if (isSelected && isTargetCorrect) {
              btnClass += "bg-success-500 border-success-700 text-white scale-105 shadow-xl";
            } else if (isSelected && !isTargetCorrect) {
              btnClass += "bg-red-500 border-red-700 text-white scale-95 opacity-90";
            } else if (isTargetCorrect) {
              // highlight the correct one if they were wrong
              btnClass += "bg-success-200 border-success-400 text-success-800";
            } else {
              btnClass += "bg-slate-100 border-slate-200 text-slate-400 opacity-50";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selectedOpt !== null}
                className={btnClass}
              >
                {opt}
                {selectedOpt !== null && isTargetCorrect && <CheckCircle className="absolute left-4" size={24} />}
                {isSelected && !isTargetCorrect && <XCircle className="absolute left-4" size={24} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedOpt !== null && (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="mt-8 text-xl font-black"
             >
               {isCorrect ? (
                  <span className="text-success-600">إجابة رائعة! 🎉</span>
               ) : (
                  <span className="text-red-500">حاول التركيز في المرة القادمة! 💪</span>
               )}
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
