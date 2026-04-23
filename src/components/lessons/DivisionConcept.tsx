import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

export function DivisionConcept() {
  const [total, setTotal] = useState(12);
  const [groups, setGroups] = useState(3);
  const [isDistributed, setIsDistributed] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const itemsPerGroup = total / groups;

  const handleDistribute = () => {
    setIsDistributed(true);
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === itemsPerGroup) {
      setIsCorrect(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
     const possiblePairs = [[8,2], [10,2], [10,5], [12,3], [12,4], [15,3], [15,5], [16,4], [20,4], [20,5]];
     const rnd = possiblePairs[Math.floor(Math.random() * possiblePairs.length)];
     setTotal(rnd[0]);
     setGroups(rnd[1]);
     setIsDistributed(false);
     setUserAnswer('');
     setIsCorrect(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-4 border-secondary-200">
       <div className="text-secondary-600 font-black text-2xl border-b-2 border-secondary-100 pb-4 mb-6 relative">
         مفهوم القسمة: المجموعات المتساوية
         <div className="absolute left-0 top-0 bg-secondary-100 text-secondary-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">الدرس ١</div>
       </div>

       <p className="text-lg font-medium text-slate-700 mb-6">
         لدينا <strong className="text-secondary-600 text-2xl">{total}</strong> قطعة، ونريد توزيعها بالتساوي على <strong className="text-secondary-600 text-2xl">{groups}</strong> أطباق.
       </p>

       <div className="flex justify-center gap-4 flex-wrap mb-8 min-h-[150px]">
          {Array.from({ length: total }).map((_, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center text-xl bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-yellow-600 ${isDistributed ? 'hidden' : 'block'}`}
             >
               🍪
             </motion.div>
          ))}

          {isDistributed && Array.from({ length: groups }).map((_, i) => (
            <div key={`plate-${i}`} className="bg-slate-50 border-4 border-slate-200 rounded-3xl p-4 w-32 min-h-[120px] flex flex-wrap gap-2 items-center justify-center shadow-inner">
               {Array.from({ length: itemsPerGroup }).map((_, j) => (
                 <motion.div 
                   key={`cookie-${i}-${j}`}
                   initial={{ opacity: 0, scale: 0, y: -20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   transition={{ delay: j * 0.15 }}
                   className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-yellow-600 shadow-sm"
                 >
                   🍪
                 </motion.div>
               ))}
            </div>
          ))}
       </div>

       {!isDistributed && (
         <button onClick={handleDistribute} className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-black text-xl py-4 rounded-2xl transition-colors shadow-md border-b-4 border-secondary-700 active:border-b-0 active:translate-y-1">
           ابدأ التوزيع بالتساوي
         </button>
       )}

       {isDistributed && !isCorrect && (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 bg-secondary-50 p-6 rounded-2xl border-2 border-secondary-200">
            <h3 className="text-xl font-bold text-secondary-800">بعد التوزيع، كم كعكة في كل طبق؟</h3>
            <div className="flex gap-4 items-center" dir="ltr">
               <span className="text-3xl font-black text-slate-700">{total}</span>
               <span className="text-2xl font-black text-secondary-500">÷</span>
               <span className="text-3xl font-black text-slate-700">{groups}</span>
               <span className="text-2xl font-black text-secondary-500">=</span>
               <input 
                 type="number" 
                 dir="rtl"
                 value={userAnswer}
                 onChange={(e) => setUserAnswer(e.target.value)}
                 className="w-20 text-center text-3xl font-black border-4 border-secondary-300 rounded-xl p-2 text-secondary-700 focus:outline-none focus:border-secondary-500"
               />
            </div>
            <button onClick={checkAnswer} className="bg-success-500 hover:bg-success-600 text-white font-bold py-2 px-8 rounded-xl text-lg shadow-sm">
              تحقق
            </button>
            {isCorrect === false && <div className="text-red-500 font-bold">حاول مرة أخرى! عُدّ الكعكات في طبق واحد.</div>}
         </motion.div>
       )}

       {isCorrect && (
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-success-50 border-4 border-success-200 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
           <h3 className="text-2xl font-black text-success-700">أحسنت! الإجابة صحيحة.</h3>
           
           <div className="bg-white p-4 rounded-xl border-2 border-success-100 w-full mb-2">
             <h4 className="font-bold text-slate-500 mb-4 border-b pb-2">مفردات الدرس الأساسية:</h4>
             <div className="flex justify-around items-center flex-wrap gap-2 text-lg">
               <div className="flex flex-col items-center"><span className="text-3xl font-black text-slate-800">{total}</span> <span className="text-sm font-bold text-info-600">المقسوم</span></div>
               <div className="text-3xl font-black text-slate-300">÷</div>
               <div className="flex flex-col items-center"><span className="text-3xl font-black text-slate-800">{groups}</span> <span className="text-sm font-bold text-warning-600">المقسوم عليه</span></div>
               <div className="text-3xl font-black text-slate-300">=</div>
               <div className="flex flex-col items-center"><span className="text-3xl font-black text-success-600">{itemsPerGroup}</span> <span className="text-sm font-bold text-success-600">ناتج القسمة</span></div>
             </div>
           </div>

           <button onClick={handleNext} className="bg-success-600 hover:bg-success-700 text-white font-bold py-3 px-8 rounded-xl text-lg w-full">
             جرب مسألة أخرى
           </button>
         </motion.div>
       )}
    </div>
  );
}
