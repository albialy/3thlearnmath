import React, { useState } from 'react';
import { DynamicQuiz } from '../DynamicQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const CHALLENGES = [
  { total: 5, wantColor: 'yellow', numerator: 3, items: ['yellow', 'yellow', 'red', 'yellow', 'red'] },
  { total: 6, wantColor: 'blue', numerator: 4, items: ['blue', 'blue', 'blue', 'red', 'blue', 'red'] },
  { total: 4, wantColor: 'green', numerator: 1, items: ['red', 'green', 'red', 'red'] }
];

const COLORS: Record<string, string> = {
  yellow: 'bg-yellow-400',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500'
};

const COLOR_NAMES_AR: Record<string, string> = {
  yellow: 'الصفراء',
  red: 'الحمراء',
  blue: 'الزرقاء',
  green: 'الخضراء'
};



export function FractionsGroupLesson() {
  const [level, setLevel] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [numInput, setNumInput] = useState<string>('');
  const [denInput, setDenInput] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const challenge = CHALLENGES[level];

  const checkSolution = () => {
    if (parseInt(numInput) === challenge.numerator && parseInt(denInput) === challenge.total) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fda4af']
      });
      setShowResult(true);
      setErrorMsg('');
      setTimeout(() => {
        if (level < CHALLENGES.length - 1) {
          setLevel(l => l + 1);
          setNumInput('');
          setDenInput('');
          setShowResult(false);
        } else {
          // done
        }
      }, 2500);
    } else {
      setErrorMsg('حاول مرة أخرى! تأكد من عدد الأشياء المطلوبة والعدد الكلي.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl p-8 w-full shadow-sm border-2 border-slate-100 text-center">
        <h2 className="text-3xl font-black text-rose-600 mb-6">الكسور كأجزاء من مجموعة</h2>
        
        {level < CHALLENGES.length ? (
          <>
            <p className="text-xl font-medium text-slate-600 mb-8 pb-8 border-b-2 border-dashed border-slate-200">
               ما الكسر الذي يدل على عدد الأشياء <span className="font-bold text-slate-800">{COLOR_NAMES_AR[challenge.wantColor]}</span>؟
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10 bg-slate-50 p-8 rounded-2xl border-2 border-slate-100">
               {challenge.items.map((color, i) => (
                 <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    className={`w-16 h-16 rounded-full border-4 border-slate-800 shadow-md ${COLORS[color]}`}
                 />
               ))}
            </div>

            <div className="flex flex-col items-center gap-4 mb-8">
               <div className="flex gap-4 items-center">
                  <div className="text-xl font-bold text-slate-600">البسط (عدد الأشياء {COLOR_NAMES_AR[challenge.wantColor]}):</div>
                  <input
                    type="number"
                    value={numInput}
                    onChange={(e) => setNumInput(e.target.value)}
                    className="w-16 h-16 text-center text-3xl font-black bg-rose-50 border-4 border-rose-200 rounded-xl text-rose-600 focus:outline-none focus:border-rose-400"
                    placeholder="؟"
                  />
               </div>
               <div className="w-48 h-1 bg-slate-800 rounded-full" />
               <div className="flex gap-4 items-center">
                  <div className="text-xl font-bold text-slate-600">المقام (العدد الكلي):</div>
                  <input
                    type="number"
                    value={denInput}
                    onChange={(e) => setDenInput(e.target.value)}
                    className="w-16 h-16 text-center text-3xl font-black bg-slate-50 border-4 border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:border-slate-400"
                    placeholder="؟"
                  />
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
                className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-lg border-b-4 border-rose-700 transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto"
              >
                <Check size={28} />
                <span>تحقق من الإجابة</span>
              </motion.button>
            </AnimatePresence>
            
          </>
        ) : !quizDone ? (
          <DynamicQuiz topic="FractionsGroupLesson.tsx" onComplete={() => setQuizDone(true)} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6">
              <Star size={48} fill="currentColor" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">عمل رائع!</h3>
            <p className="text-slate-600 text-lg mb-8">لقد فهمت كيف تكتب الكسر لمجموعة أشياء.</p>
            <button 
              onClick={() => { setLevel(0); setQuizDone(false); setNumInput(''); setDenInput(''); setShowResult(false); }}
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
