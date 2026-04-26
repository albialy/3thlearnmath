import React, { useState } from 'react';
import { DynamicQuiz } from '../DynamicQuiz';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';




export function NumberLine() {
  const [quizDone, setQuizDone] = useState(false);
  const [total, setTotal] = useState(15);
  const [step, setStep] = useState(3);
  const [currentValue, setCurrentValue] = useState(15);
  const [jumps, setJumps] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleJump = () => {
    if (currentValue >= step) {
       setCurrentValue(v => v - step);
       setJumps(j => j + 1);
    }
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === total / step) {
      setIsCorrect(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    const possiblePairs = [[10,2], [12,3], [12,4], [14,2], [15,3], [15,5], [16,4], [18,6], [20,5]];
    const rnd = possiblePairs[Math.floor(Math.random() * possiblePairs.length)];
    setTotal(rnd[0]);
    setStep(rnd[1]);
    setCurrentValue(rnd[0]);
    setJumps(0);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const linePoints = Array.from({ length: total + 1 }, (_, i) => i);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-4 border-info-200 overflow-hidden">
       <div className="text-info-600 font-black text-2xl border-b-2 border-info-100 pb-4 mb-6 relative">
         القسمة بالطرح المتكرر
         <div className="absolute left-0 top-0 bg-info-100 text-info-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">الدرس ٢</div>
       </div>

       <p className="text-lg font-medium text-slate-700 mb-8">
         استعمل الطرح المتكرر على خط الأعداد لإيجاد ناتج: <strong className="text-info-600 text-2xl bg-info-50 px-2 py-1 rounded-lg" dir="ltr">{total} ÷ {step}</strong>
       </p>

       <div className="relative w-full h-40 mb-8 bg-slate-50 border-2 border-slate-100 rounded-2xl flex flex-col justify-end p-4">
         <div className="w-full h-1 bg-slate-400 relative mb-8">
             <svg className="absolute top-0 left-0 w-full h-full overflow-visible" style={{ zIndex: 10 }}>
                {Array.from({ length: jumps }).map((_, i) => {
                  const startNum = total - (i * step);
                  const endNum = startNum - step;
                  const startPct = (startNum / total) * 100;
                  const endPct = (endNum / total) * 100;
                  return (
                    <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <path 
                        d={`M ${startPct}% 0 Q ${(startPct + endPct)/2}% -80 ${endPct}% 0`}
                        fill="none"
                        stroke="#eab308"
                        strokeWidth="4"
                        strokeDasharray="6 4"
                      />
                      <polygon 
                        points={`${endPct}%,0 ${endPct+1}%,-8 ${endPct+1}%,8`}
                        fill="#eab308"
                      />
                      <text x={`${(startPct + endPct)/2}%`} y="-45" fill="#ca8a04" fontSize="16" textAnchor="middle" fontWeight="bold">-{step}</text>
                    </motion.g>
                  );
                })}
             </svg>
            
            <div className="absolute top-0 w-full flex justify-between transform -translate-y-1/2">
              {linePoints.map(p => (
                <div key={p} className="flex flex-col items-center" style={{ width: '0' }}>
                  <div className={`w-1 h-4 ${p % step === 0 ? 'bg-slate-600 h-5' : 'bg-slate-400'}`}></div>
                  <div className={`mt-2 text-xs font-bold whitespace-nowrap ${p === currentValue ? 'text-info-600 text-lg bg-info-100 px-1 rounded' : 'text-slate-400'} ${p % step === 0 ? 'block' : 'hidden md:block'}`}>{p}</div>
                </div>
              ))}
            </div>
         </div>
       </div>

       {currentValue > 0 && (
         <div className="flex flex-col items-center gap-4">
           <button onClick={handleJump} className="bg-warning-400 hover:bg-warning-500 text-white font-black text-xl py-4 px-12 rounded-2xl transition-colors shadow-md border-b-4 border-warning-600 active:border-b-0 active:translate-y-1">
             اطرح {step} ⬅️
           </button>
           <div className="text-slate-500 font-bold bg-slate-100 px-4 py-2 rounded-xl">العدد الذي وصلنا إليه: <span className="text-xl text-slate-800">{currentValue}</span></div>
         </div>
       )}

       {currentValue === 0 && !isCorrect && (
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 bg-info-50 p-6 rounded-2xl border-2 border-info-200">
            <h3 className="text-xl font-bold text-info-800">وصلنا إلى الصفر! كم مرة قمنا بطرح العدد {step}؟</h3>
            <div className="flex gap-4 items-center">
               <input 
                 type="number" 
                 value={userAnswer}
                 onChange={(e) => setUserAnswer(e.target.value)}
                 className="w-24 text-center text-3xl font-black border-4 border-info-300 rounded-xl p-2 text-info-700 focus:outline-none focus:border-info-500"
               />
               <span className="text-xl font-bold text-slate-600">مرات (قفزات)</span>
            </div>
            <button onClick={checkAnswer} className="bg-success-500 hover:bg-success-600 text-white font-bold py-3 px-12 rounded-xl text-lg shadow-sm">
              تحقق من الإجابة
            </button>
            {isCorrect === false && <div className="text-red-500 font-bold">تأكد من عدد القفزات (الأسهم المنحنية) فوق خط الأعداد.</div>}
         </motion.div>
       )}

       {isCorrect && (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-success-50 border-4 border-success-200 p-8 rounded-2xl mt-4 text-center shadow-inner">
            <h3 className="text-3xl font-black text-success-700 mb-4">ممتاز يا بطل!</h3>
            <p className="text-lg font-bold text-slate-700 mb-6">بما أننا طرحنا الرقم {step} <span className="text-warning-600 bg-warning-50 px-2 rounded">{userAnswer} مرات</span> للوصول للصفر، إذن النتيجة هي:</p>
            <div className="text-5xl font-black text-info-600 bg-white inline-block px-8 py-4 rounded-2xl border-4 border-info-200 shadow-sm" dir="ltr">
              {total} ÷ {step} = {userAnswer}
            </div>
            <button onClick={handleNext} className="mt-8 bg-success-600 hover:bg-success-700 text-white font-bold py-4 px-8 rounded-xl text-xl w-full transition-transform active:scale-95 shadow-md">
             تدرب على مسألة أخرى
           </button>
         </motion.div>
       )}
    
      {!quizDone && (
         <div className="mt-12 w-full flex justify-center z-50 relative pb-12 px-6">
            <DynamicQuiz topic="NumberLine.tsx" onComplete={() => setQuizDone(true)} />
         </div>
      )}
</div>
  );
}
