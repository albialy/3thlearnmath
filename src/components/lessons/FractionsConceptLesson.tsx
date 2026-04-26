import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const CHALLENGES = [
  { total: 4, colored: 1, type: 'circle' as const },
  { total: 5, colored: 3, type: 'rect' as const },
  { total: 8, colored: 5, type: 'circle' as const },
  { total: 6, colored: 2, type: 'rect' as const }
];



export function FractionsConceptLesson() {
  const [level, setLevel] = useState(0);
  const [selectedParts, setSelectedParts] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const challenge = CHALLENGES[level];
  const isCorrect = selectedParts.size === challenge.colored;

  const handlePartClick = (index: number) => {
    if (showResult) return;
    const newSelected = new Set(selectedParts);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedParts(newSelected);
  };

  const checkSolution = () => {
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#5eead4']
      });
      setShowResult(true);
      setTimeout(() => {
        if (level < CHALLENGES.length - 1) {
          setLevel(l => l + 1);
          setSelectedParts(new Set());
          setShowResult(false);
        } else {
          // done
        }
      }, 2500);
    } else {
      // flash error or something
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl p-8 w-full shadow-sm border-2 border-slate-100 text-center">
        <h2 className="text-3xl font-black text-slate-800 mb-6">الكسور كأجزاء من الكل</h2>
        
        {level < CHALLENGES.length ? (
          <>
            <p className="text-xl font-medium text-slate-600 mb-8 border-b-2 border-dashed border-slate-200 pb-8">
              لَوِّن <span className="font-mono text-2xl text-teal-600 font-bold bg-teal-50 px-2 rounded-lg">{challenge.colored}</span> أجزاء من الشكل المقسم إلى <span className="font-mono text-2xl text-teal-600 font-bold bg-teal-50 px-2 rounded-lg">{challenge.total}</span> أجزاء للحصول على الكسر <span className="text-teal-600 font-bold text-3xl mx-2 inline-flex flex-col items-center align-middle"><span className="border-b-2 border-teal-600 px-1 leading-none">{challenge.colored}</span><span className="px-1 leading-none">{challenge.total}</span></span>
            </p>

            <div className="flex justify-center mb-10">
               {challenge.type === 'rect' ? (
                 <div className="flex w-full max-w-lg h-32 border-4 border-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-lg bg-teal-50">
                    {Array.from({ length: challenge.total }).map((_, i) => (
                      <div 
                         key={i} 
                         onClick={() => handlePartClick(i)}
                         className={`flex-1 border-l-4 border-slate-800 transition-colors duration-300 first:border-l-0 ${selectedParts.has(i) ? 'bg-teal-500' : 'bg-white hover:bg-teal-100'}`}
                      />
                    ))}
                 </div>
               ) : (
                 <div className="w-64 h-64 rounded-full border-4 border-slate-800 overflow-hidden cursor-pointer shadow-lg bg-teal-50 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                       {Array.from({ length: challenge.total }).map((_, i) => {
                          const angle = 360 / challenge.total;
                          const startAngle = i * angle;
                          const endAngle = (i + 1) * angle;
                          const x1 = 50 + 50 * Math.cos(Math.PI * startAngle / 180);
                          const y1 = 50 + 50 * Math.sin(Math.PI * startAngle / 180);
                          const x2 = 50 + 50 * Math.cos(Math.PI * endAngle / 180);
                          const y2 = 50 + 50 * Math.sin(Math.PI * endAngle / 180);
                          const largeArc = angle > 180 ? 1 : 0;
                          return (
                             <path 
                                key={i}
                                onClick={() => handlePartClick(i)}
                                d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                fill={selectedParts.has(i) ? '#14b8a6' : 'white'}
                                stroke="#1e293b"
                                strokeWidth="2"
                                className="transition-all duration-300 hover:fill-teal-200 cursor-pointer"
                             />
                          );
                       })}
                    </svg>
                 </div>
               )}
            </div>

            <AnimatePresence mode="wait">
              <motion.button
                key="check"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={checkSolution}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-lg border-b-4 border-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto"
              >
                <Check size={28} />
                <span>تحقق من الإجابة</span>
              </motion.button>
            </AnimatePresence>
            
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex items-center justify-center gap-2 text-2xl font-bold font-mono text-teal-600"
                >
                  <span className="flex flex-col items-center">
                    <span className="border-b-2 border-teal-600 leading-none">{challenge.colored}</span>
                    <span className="leading-none">{challenge.total}</span>
                  </span>
                  <span>=</span>
                  <span className="text-teal-800">أحسنت!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-teal-100 text-teal-500 rounded-full flex items-center justify-center mb-6">
              <Star size={48} fill="currentColor" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">عمل رائع!</h3>
            <p className="text-slate-600 text-lg mb-8">لقد أتقنت تمثيل الكسور كأجزاء من الكل.</p>
            <button 
              onClick={() => { setLevel(0); setSelectedParts(new Set()); setShowResult(false); }}
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
