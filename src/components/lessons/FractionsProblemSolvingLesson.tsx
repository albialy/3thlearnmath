import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, RefreshCw, PenTool } from 'lucide-react';
import confetti from 'canvas-confetti';

const CHALLENGES = [
  {
    text: 'جمع أحمد وأخوه ٨ وردات، ثم وضعاها في زهرية. إذا كان نصف الورد أحمر المشكل، وواحدة صفراء، والباقي أبيض. كم عدد الورد الأبيض؟',
    total: 8,
    red: 4,
    yellow: 1,
    correctAnswer: 3,
  },
  {
    text: 'اشترى سعد ٦ قطع بسكويت، إذا أكل ثلثها، ثم أكلت أخته قطعة واحدة، كم قطعة بقيت؟',
    total: 6,
    red: 2, // 1/3 of 6 = 2
    yellow: 1, // sister ate 1
    correctAnswer: 3,
  }
];



export function FractionsProblemSolvingLesson() {
  const [level, setLevel] = useState(0);
  const [numInput, setNumInput] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showDrawHint, setShowDrawHint] = useState(false);

  const challenge = CHALLENGES[level];

  const checkSolution = () => {
    if (parseInt(numInput) === challenge.correctAnswer) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24']
      });
      setShowResult(true);
      setErrorMsg('');
      setTimeout(() => {
        if (level < CHALLENGES.length - 1) {
          setLevel(l => l + 1);
          setNumInput('');
          setShowDrawHint(false);
          setShowResult(false);
        } else {
          // done
        }
      }, 3500);
    } else {
      setErrorMsg('العدد غير صحيح. حاول رسم المسألة أو عرض التلميح!');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl p-8 w-full shadow-sm border-2 border-slate-100 text-center relative overflow-hidden">
        <h2 className="text-3xl font-black text-amber-600 mb-6 relative z-10">خطة حل المسألة: رسم صورة</h2>
        
        {level < CHALLENGES.length ? (
          <>
            <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-100 mb-8 relative z-10">
               <p className="text-xl font-bold text-amber-900 leading-relaxed">
                  {challenge.text}
               </p>
            </div>

            <div className="flex flex-col items-center gap-6 mb-10 relative z-10">
               <div className="flex gap-4 items-center">
                  <div className="text-xl font-bold text-slate-600">الإجابة:</div>
                  <input
                    type="number"
                    value={numInput}
                    onChange={(e) => setNumInput(e.target.value)}
                    className="w-24 h-16 text-center text-3xl font-black bg-amber-50 border-4 border-amber-200 rounded-xl text-amber-700 focus:outline-none focus:border-amber-400"
                    placeholder="؟"
                  />
               </div>

               {!showDrawHint && (
                 <button 
                   onClick={() => setShowDrawHint(true)}
                   className="text-amber-600 font-bold flex items-center gap-2 hover:bg-amber-50 px-4 py-2 rounded-xl border-2 border-transparent hover:border-amber-200 transition-colors"
                 >
                   <PenTool size={20} />
                   أرسم صورة لمساعدتي
                 </button>
               )}

               <AnimatePresence>
                 {showDrawHint && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 w-full"
                    >
                       <p className="text-slate-500 font-medium mb-4">هذا هو العدد الكلي ({challenge.total}). الأجزاء الملونة تمثل ما تم أخذه.</p>
                       <div className="flex flex-wrap justify-center gap-2">
                         {Array.from({ length: challenge.total }).map((_, i) => {
                            const isRed = i < challenge.red;
                            const isYellow = !isRed && i < challenge.red + challenge.yellow;
                            return (
                               <div 
                                 key={i} 
                                 className={`w-12 h-12 rounded-lg border-2 border-slate-300 shadow-sm ${isRed ? 'bg-red-400' : isYellow ? 'bg-yellow-400' : 'bg-white'}`}
                               />
                            );
                         })}
                       </div>
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {errorMsg && (
               <p className="text-red-500 font-bold mb-4 relative z-10">{errorMsg}</p>
            )}

            <AnimatePresence mode="wait">
              <motion.button
                key="check"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={checkSolution}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-lg border-b-4 border-amber-700 transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto relative z-10"
              >
                <Check size={28} />
                <span>تحقق من الإجابة</span>
              </motion.button>
            </AnimatePresence>
            
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 relative z-10">
            <div className="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-6">
              <Star size={48} fill="currentColor" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">مفكر رائع!</h3>
            <p className="text-slate-600 text-lg mb-8">لقد استخدمت رسم صورة لحل مشاكل الكسور.</p>
            <button 
              onClick={() => { setLevel(0); setNumInput(''); setShowDrawHint(false); setShowResult(false); }}
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
