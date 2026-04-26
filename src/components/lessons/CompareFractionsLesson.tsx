import React, { useState } from 'react';
import { DynamicQuiz } from '../DynamicQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const CHALLENGES = [
  { f1Num: 1, f1Den: 4, f2Num: 3, f2Den: 4, correctSign: '<' },
  { f1Num: 5, f1Den: 8, f2Num: 3, f2Den: 8, correctSign: '>' },
  { f1Num: 1, f1Den: 2, f2Num: 2, f2Den: 4, correctSign: '=' },
  { f1Num: 2, f1Den: 3, f2Num: 1, f2Den: 3, correctSign: '>' }
];



export function CompareFractionsLesson() {
  const [level, setLevel] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const challenge = CHALLENGES[level];

  const checkSolution = () => {
    if (selectedSign === challenge.correctSign) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#d8b4fe']
      });
      setShowResult(true);
      setErrorMsg('');
      setTimeout(() => {
        if (level < CHALLENGES.length - 1) {
          setLevel(l => l + 1);
          setSelectedSign(null);
          setShowResult(false);
        } else {
          // done
        }
      }, 2500);
    } else {
      setErrorMsg('إشارة غير صحيحة! انظر إلى المساحة المظللة لتتأكد.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl p-8 w-full shadow-sm border-2 border-slate-100 text-center">
        <h2 className="text-3xl font-black text-purple-600 mb-6">مقارنة الكسور وترتيبها</h2>
        
        {level < CHALLENGES.length ? (
          <>
            <p className="text-xl font-medium text-slate-600 mb-8 pb-8 border-b-2 border-dashed border-slate-200">
               قارن بين الكسرين. اختر الإشارة المناسبة (أكبر من، أصغر من، أو يساوي).
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
               {/* Fraction 1 */}
               <div className="flex flex-col items-center gap-4 bg-purple-50 p-6 rounded-2xl border-2 border-purple-100">
                  <div className="flex w-32 h-8 border-2 border-slate-800 rounded-lg overflow-hidden shadow-sm">
                     {Array.from({ length: challenge.f1Den }).map((_, i) => (
                       <div 
                         key={i} 
                         className={`flex-1 border-l-2 border-slate-800 first:border-l-0 ${i < challenge.f1Num ? 'bg-purple-500' : 'bg-white'}`}
                       />
                     ))}
                  </div>
                  <div className="flex flex-col items-center text-4xl font-black text-purple-700 mt-2">
                     <span>{challenge.f1Num}</span>
                     <div className="w-12 h-1 bg-purple-700 rounded-full my-1" />
                     <span>{challenge.f1Den}</span>
                  </div>
               </div>

               {/* Sign Selector */}
               <div className="flex gap-2">
                  {['>', '=', '<'].map(sign => (
                     <button
                        key={sign}
                        onClick={() => setSelectedSign(sign)}
                        className={`w-16 h-16 rounded-2xl text-3xl font-black transition-all ${selectedSign === sign ? 'bg-slate-800 text-white shadow-inner scale-110' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border-b-4 border-slate-300 active:scale-95'}`}
                     >
                        {sign}
                     </button>
                  ))}
               </div>

               {/* Fraction 2 */}
               <div className="flex flex-col items-center gap-4 bg-purple-50 p-6 rounded-2xl border-2 border-purple-100">
                  <div className="flex w-32 h-8 border-2 border-slate-800 rounded-lg overflow-hidden shadow-sm">
                     {Array.from({ length: challenge.f2Den }).map((_, i) => (
                       <div 
                         key={i} 
                         className={`flex-1 border-l-2 border-slate-800 first:border-l-0 ${i < challenge.f2Num ? 'bg-purple-500' : 'bg-white'}`}
                       />
                     ))}
                  </div>
                  <div className="flex flex-col items-center text-4xl font-black text-purple-700 mt-2">
                     <span>{challenge.f2Num}</span>
                     <div className="w-12 h-1 bg-purple-700 rounded-full my-1" />
                     <span>{challenge.f2Den}</span>
                  </div>
               </div>
            </div>

            {errorMsg && (
               <p className="text-red-500 font-bold mb-4">{errorMsg}</p>
            )}

            <AnimatePresence mode="wait">
              {selectedSign && (
                 <motion.button
                   key="check"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   onClick={checkSolution}
                   className="bg-purple-500 hover:bg-purple-600 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-lg border-b-4 border-purple-700 transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto"
                 >
                   <Check size={28} />
                   <span>تحقق من الإجابة</span>
                 </motion.button>
              )}
            </AnimatePresence>
            
          </>
        ) : !quizDone ? (
          <DynamicQuiz topic="CompareFractionsLesson.tsx" onComplete={() => setQuizDone(true)} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-purple-100 text-purple-500 rounded-full flex items-center justify-center mb-6">
              <Star size={48} fill="currentColor" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">بطل المقارنات!</h3>
            <p className="text-slate-600 text-lg mb-8">لقد أجبت على جميع التحديات بنجاح.</p>
            <button 
              onClick={() => { setLevel(0); setQuizDone(false); setSelectedSign(null); setShowResult(false); }}
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
