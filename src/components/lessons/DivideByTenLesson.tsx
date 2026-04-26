import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';




export function DivideByTenLesson() {
  const [step, setStep] = useState(0);
  const [practiceNum, setPracticeNum] = useState(50);
  const [ans, setAns] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showTrick, setShowTrick] = useState(false);

  const checkAnswer = () => {
    if (parseInt(ans) === practiceNum / 10) {
      setIsCorrect(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } else {
      setIsCorrect(false);
    }
  };

  const nextPractice = () => {
    const newNum = (Math.floor(Math.random() * 9) + 1) * 10; // 10 to 90
    setPracticeNum(newNum);
    setAns('');
    setIsCorrect(null);
    setShowTrick(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-4 border-info-200">
       <div className="text-info-600 font-black text-2xl border-b-2 border-info-100 pb-4 mb-6 relative flex items-center justify-between">
         القسمة على ١٠
         <div className="bg-info-100 text-info-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">الدرس ٤</div>
       </div>

       {step === 0 && (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center">
           <div className="text-6xl mb-6">📦🍹</div>
           <h3 className="text-2xl font-bold text-slate-800 mb-4">لنتخيل أن لدينا صناديق عصير!</h3>
           <p className="text-lg text-slate-600 mb-8 max-w-lg">
             كل صندوق يحتوي على <strong>١٠ عُلب</strong> من العصير.
             إذا كان لدينا <strong>٤٠ علبة</strong>، فكم صندوقاً نحتاج؟
           </p>
           
           <div className="flex gap-4 mb-8 flex-wrap justify-center">
             {Array.from({ length: 4 }).map((_, i) => (
               <motion.div 
                 key={i}
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}
                 className="bg-orange-50 border-2 border-orange-200 p-4 rounded-2xl shadow-sm text-center"
               >
                 <div className="text-4xl mb-2">📦</div>
                 <div className="text-sm font-bold text-orange-600">١٠ عُلب</div>
               </motion.div>
             ))}
           </div>
           
           <p className="text-2xl font-black text-info-600 mb-8" dir="ltr">
             40 ÷ 10 = 4
           </p>

           <button onClick={() => setStep(1)} className="bg-info-500 hover:bg-info-600 text-white font-black py-4 px-12 rounded-xl text-xl shadow-md transition-transform active:scale-95">
             اكتشف الحيلة السحرية! 🪄
           </button>
         </motion.div>
       )}

       {step === 1 && (
         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-center text-center">
           <h3 className="text-2xl font-bold text-slate-800 mb-4">حيلة حذف الأصفار ✂️</h3>
           <p className="text-lg text-slate-600 mb-8 max-w-lg">
             عند القسمة على ١٠، هناك سر بسيط جداً! كل ما عليك فعله هو <strong>حذف الصفر</strong> من العدد المقسوم.
           </p>

           <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 mb-8 w-full max-w-md">
             <div className="flex items-center justify-center gap-4 text-7xl font-black" dir="ltr">
               <div className="flex">
                 <span className="text-slate-800">4</span>
                 <span className="relative text-slate-800">
                   0
                   {showTrick && (
                     <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-red-500 text-8xl">
                       /
                     </motion.div>
                   )}
                 </span>
               </div>
               <span className="text-info-500 text-5xl">÷</span>
               <div className="flex">
                 <span className="text-slate-800">1</span>
                 <span className="relative text-slate-800">
                   0
                   {showTrick && (
                     <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-red-500 text-8xl">
                       /
                     </motion.div>
                   )}
                 </span>
               </div>
             </div>

             <div className="h-16 mt-6">
                {showTrick ? (
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl font-black text-success-600" dir="ltr">
                    = 4
                  </motion.div>
                ) : (
                  <button onClick={() => setShowTrick(true)} className="bg-warning-400 hover:bg-warning-500 text-white font-bold py-3 px-8 rounded-xl shadow-sm transition-transform active:scale-95">
                    العب الحيلة!
                  </button>
                )}
             </div>
           </div>

           <button onClick={() => { setStep(2); setShowTrick(false); }} className="bg-primary-500 hover:bg-primary-600 text-white font-black py-4 px-12 rounded-xl text-xl shadow-md transition-transform active:scale-95">
             هيا نتدرب
           </button>
         </motion.div>
       )}

       {step === 2 && (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">استخدم الحيلة لحل القسمة!</h3>
            
            <div className="flex items-center gap-4 text-5xl md:text-7xl font-black mb-8 bg-slate-50 p-8 rounded-3xl border-2 border-slate-100" dir="ltr">
               <div className="flex">
                 <span>{practiceNum / 10}</span>
                 <span className="relative text-slate-800">
                   0
                   {showTrick && (
                     <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-red-500 text-8xl">
                       /
                     </motion.div>
                   )}
                 </span>
               </div>
               <span className="text-info-500">÷</span>
               <div className="flex">
                 <span>1</span>
                 <span className="relative text-slate-800">
                   0
                   {showTrick && (
                     <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-red-500 text-8xl">
                       /
                     </motion.div>
                   )}
                 </span>
               </div>
               <span className="text-slate-400">=</span>
               <input 
                 type="number" 
                 value={ans} 
                 onChange={e => setAns(e.target.value)} 
                 className="w-24 md:w-32 bg-white border-4 border-info-200 rounded-2xl text-center focus:border-info-500 focus:outline-none text-info-700 pb-2 shadow-inner"
               />
            </div>

            <div className="flex gap-4">
              <button onClick={() => setShowTrick(true)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-4 px-6 rounded-xl text-lg transition-transform active:scale-95">
                تلميح (حذف الصفر)
              </button>
              <button onClick={checkAnswer} className="bg-success-500 hover:bg-success-600 text-white font-black py-4 px-12 rounded-xl text-xl shadow-md transition-transform active:scale-95">
                تحقق
              </button>
            </div>

            {isCorrect === false && <p className="text-red-500 font-bold bg-red-50 px-4 py-2 rounded-xl mt-6">حاول مرة أخرى! تذكر حيلة حذف الصفر.</p>}
            
            {isCorrect && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-success-50 border-4 border-success-200 p-6 rounded-2xl mt-6 text-center shadow-inner w-full">
                 <h3 className="text-2xl font-black text-success-700 mb-2">بطل! 🌟</h3>
                 <p className="text-success-700 font-bold text-lg mb-4">القسمة على ١٠ تعني التخلص من الصفر!</p>
                 <button onClick={nextPractice} className="bg-success-600 hover:bg-success-700 text-white font-black py-3 px-8 rounded-xl transition-transform active:scale-95 shadow-md">
                  مسألة أخرى
                </button>
              </motion.div>
            )}
         </motion.div>
       )}
</div>
  );
}
