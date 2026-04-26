import React, { useState } from 'react';
import { DynamicQuiz } from '../DynamicQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Check, Star, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const CHALLENGES = [
  { baseNum: 1, baseDen: 2, eqNum: 2, eqDen: 4 },
  { baseNum: 1, baseDen: 3, eqNum: 2, eqDen: 6 },
  { baseNum: 3, baseDen: 4, eqNum: 6, eqDen: 8 }
];



export function EquivalentFractionsLesson() {
  const [level, setLevel] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [numInput, setNumInput] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const challenge = CHALLENGES[level];

  const checkSolution = () => {
    if (parseInt(numInput) === challenge.eqNum) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#93c5fd']
      });
      setShowResult(true);
      setErrorMsg('');
      setTimeout(() => {
        if (level < CHALLENGES.length - 1) {
          setLevel(l => l + 1);
          setNumInput('');
          setShowResult(false);
        } else {
          // done
        }
      }, 2500);
    } else {
      setErrorMsg('غير متطابق! جرب عد الأجزاء المظللة في الشكل الثاني.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl p-8 w-full shadow-sm border-2 border-slate-100 text-center">
        <h2 className="text-3xl font-black text-blue-600 mb-6">الكسور المتكافئة</h2>
        
        {level < CHALLENGES.length ? (
          <>
            <p className="text-xl font-medium text-slate-600 mb-8 pb-8 border-b-2 border-dashed border-slate-200">
               أكمل الكسر ليكون مكافئاً للكسر المعطى باستخدام الأشكال كدليل.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-10">
               {/* Base Fraction */}
               <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center text-4xl font-black text-blue-600">
                     <span>{challenge.baseNum}</span>
                     <div className="w-12 h-1 bg-blue-600 rounded-full my-1" />
                     <span>{challenge.baseDen}</span>
                  </div>
                  <div className="flex w-64 h-16 border-4 border-slate-800 rounded-xl overflow-hidden shadow-md">
                     {Array.from({ length: challenge.baseDen }).map((_, i) => (
                       <div 
                         key={i} 
                         className={`flex-1 border-l-4 border-slate-800 first:border-l-0 ${i < challenge.baseNum ? 'bg-blue-500' : 'bg-slate-100'}`}
                       />
                     ))}
                  </div>
               </div>

               <div className="text-4xl font-black text-slate-400">=</div>

               {/* Equivalent Fraction */}
               <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center text-4xl font-black text-indigo-600">
                     <input
                       type="number"
                       value={numInput}
                       onChange={(e) => setNumInput(e.target.value)}
                       className="w-16 text-center bg-indigo-50 border-b-4 border-indigo-200 focus:outline-none focus:border-indigo-400 rounded-t-lg"
                       placeholder="؟"
                     />
                     <div className="w-16 h-1 bg-indigo-600 rounded-full my-1" />
                     <span>{challenge.eqDen}</span>
                  </div>
                  <div className="flex w-64 h-16 border-4 border-slate-800 rounded-xl overflow-hidden shadow-md">
                     {Array.from({ length: challenge.eqDen }).map((_, i) => (
                       <div 
                         key={i} 
                         className={`flex-1 border-l-4 border-slate-800 first:border-l-0 ${i < challenge.eqNum ? 'bg-indigo-400 bg-opacity-80' : 'bg-slate-100'}`}
                       />
                     ))}
                  </div>
               </div>
            </div>

            {errorMsg && (
               <p className="text-red-500 font-bold mb-4">{errorMsg}</p>
            )}

            <AnimatePresence mode="wait">
              <motion.button
                key="check"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={checkSolution}
                className="bg-blue-500 hover:bg-blue-600 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-lg border-b-4 border-blue-700 transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto"
              >
                <Check size={28} />
                <span>تحقق من الإجابة</span>
              </motion.button>
            </AnimatePresence>
            
          </>
        ) : !quizDone ? (
          <DynamicQuiz topic="EquivalentFractionsLesson.tsx" onComplete={() => setQuizDone(true)} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-6">
              <Star size={48} fill="currentColor" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">ممتاز!</h3>
            <p className="text-slate-600 text-lg mb-8">أنت الآن تعرف كيف تجد الكسور المتكافئة.</p>
            <button 
              onClick={() => { setLevel(0); setQuizDone(false); setNumInput(''); setShowResult(false); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <RefreshCw size={20} />
              إعادة الدرس
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
