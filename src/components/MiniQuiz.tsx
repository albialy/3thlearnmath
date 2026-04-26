import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { useAppStore } from '../store';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface MiniQuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export function MiniQuiz({ questions, onComplete }: MiniQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const { addPoints } = useAppStore();

  const handleOption = (idx: number) => {
    if (isEvaluating) return;
    setSelectedOption(idx);
    setIsEvaluating(true);

    if (idx === questions[currentQ].correctAnswer) {
      addPoints(5);
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ(c => c + 1);
          setSelectedOption(null);
          setIsEvaluating(false);
        } else {
          setShowEnd(true);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setSelectedOption(null);
        setIsEvaluating(false);
      }, 1500);
    }
  };

  if (showEnd) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8 text-center bg-white rounded-3xl p-8 shadow-sm border-2 border-slate-100">
         <div className="w-20 h-20 bg-success-100 text-success-500 rounded-full flex items-center justify-center mb-4">
           <Star size={40} fill="currentColor" />
         </div>
         <h3 className="text-2xl font-black text-slate-800 mb-4">اختبار أمهر!</h3>
         <p className="text-slate-600 mb-6 font-bold text-lg">لقد اجتزت الاختبار المصغر بنجاح.</p>
         <button onClick={onComplete} className="bg-success-500 hover:bg-success-600 text-white font-black text-xl px-8 py-3 rounded-xl transition-all shadow-md border-b-4 border-success-700 active:scale-95">
           استمرار
         </button>
      </motion.div>
    );
  }

  const q = questions[currentQ];

  return (
    <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full bg-white border-2 border-primary-100 p-8 rounded-3xl mt-4 shadow-sm text-center">
       <h4 className="text-lg font-bold text-primary-600 mb-6 flex items-center justify-between bg-primary-50 px-4 py-2 rounded-xl">
         <span>اختبار سريع 🧠</span>
         <span className="text-sm bg-primary-200 text-primary-800 px-3 py-1 rounded-full font-black">{currentQ + 1} / {questions.length}</span>
       </h4>
       <p className="text-2xl font-black text-slate-800 mb-8 leading-relaxed">{q.question}</p>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {q.options.map((opt, i) => {
             let btnClass = "bg-white border-4 border-slate-100 text-slate-700 hover:border-primary-300 hover:bg-primary-50 active:scale-95";
             if (isEvaluating && selectedOption === i) {
                if (i === q.correctAnswer) btnClass = "bg-success-500 border-success-600 border-b-4 text-white scale-105 shadow-lg z-10 ring-4 ring-success-200";
                else btnClass = "bg-red-500 border-red-600 border-b-4 text-white scale-95 opacity-90 shadow-inner";
             } else if (isEvaluating && i === q.correctAnswer) {
                btnClass = "bg-success-100 border-success-400 text-success-800 opacity-80 border-b-4";
             } else if (isEvaluating) {
                btnClass = "bg-slate-100 border-slate-200 text-slate-400 scale-95 opacity-50";
             }
             return (
               <button
                 key={i}
                 onClick={() => handleOption(i)}
                 disabled={isEvaluating}
                 className={`p-6 rounded-2xl font-black text-2xl transition-all flex items-center justify-center min-h-[5rem] ${btnClass}`}
                 dir="rtl"
               >
                 {opt}
               </button>
             );
          })}
       </div>
    </motion.div>
  );
}
