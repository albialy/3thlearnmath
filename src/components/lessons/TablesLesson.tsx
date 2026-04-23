import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export function TablesLesson() {
  const [rule] = useState(4); // Divide by 4
  const [inputs] = useState([32, 28, 24, 20]);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [results, setResults] = useState<(boolean | null)[]>([null, null, null, null]);

  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const handleInputChange = (index: number, val: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = val;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const newResults = answers.map((ans, i) => parseInt(ans) === inputs[i] / rule);
    setResults(newResults);
    
    if (newResults.every(r => r === true)) {
      setIsAllCorrect(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ['#a855f7', '#d946ef', '#fcd34d'] });
    }
  };

  const reset = () => {
    setAnswers(['', '', '', '']);
    setResults([null, null, null, null]);
    setIsAllCorrect(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-4 border-purple-200">
       <div className="text-purple-600 font-black text-2xl border-b-2 border-purple-100 pb-4 mb-6 relative flex items-center justify-between">
         جداول المدخلات والمخرجات
         <div className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">الدرس ٦</div>
       </div>

       <p className="text-lg font-medium text-slate-700 mb-8 max-w-2xl">
         في هذه الجداول السحرية، يدخل الرقم الكبير (المدخلات)، وتُطبق عليه <strong>القاعدة السحرية</strong> ليخرج رقماً جديداً (المخرجات). حاول إكمال الجدول!
       </p>

       <div className="w-full max-w-lg mx-auto bg-slate-50 p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-inner mb-8">
          <div className="bg-purple-500 text-white font-black text-xl py-3 px-6 rounded-t-xl text-center shadow-sm">
            القاعدة: أقسم على {rule} (÷ {rule})
          </div>
          
          <div className="grid grid-cols-5 gap-[1px] bg-slate-300 border-2 border-slate-300">
             {/* Headers */}
             <div className="col-span-1 bg-slate-200 p-3 font-bold text-slate-700 text-center flex items-center justify-center">المدخلات</div>
             {inputs.map((inp, i) => (
                <div key={`in-${i}`} className="col-span-1 bg-white p-3 font-black text-2xl text-slate-800 text-center flex items-center justify-center tabular-nums" dir="ltr">
                  {inp}
                </div>
             ))}

             <div className="col-span-1 bg-slate-200 p-3 font-bold text-slate-700 text-center flex items-center justify-center">المخرجات</div>
             {inputs.map((inp, i) => (
                <div key={`out-${i}`} className={`col-span-1 bg-white p-3 font-black text-xl text-center flex items-center justify-center transition-colors ${results[i] === true ? 'bg-success-50' : results[i] === false ? 'bg-red-50' : ''}`}>
                  <input 
                    type="number" 
                    value={answers[i]} 
                    onChange={e => handleInputChange(i, e.target.value)}
                    disabled={isAllCorrect}
                    className="w-full h-12 bg-slate-50 border-2 border-slate-200 rounded-lg text-center focus:border-purple-400 focus:outline-none text-purple-700 tabular-nums font-black"
                    dir="ltr"
                  />
                </div>
             ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center text-sm font-bold text-slate-400 px-2">
             <span>تذكر: ما هو العدد الذي نضربه في {rule} ليعطينا المُدخل؟</span>
          </div>
       </div>

       <div className="flex justify-center gap-4">
         {!isAllCorrect ? (
           <button onClick={checkAnswers} className="bg-purple-500 hover:bg-purple-600 text-white font-black py-4 px-16 rounded-xl text-xl shadow-md transition-transform active:scale-95">
             تحقق من الجدول
           </button>
         ) : (
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center w-full">
             <div className="bg-success-50 border-4 border-success-200 text-success-700 font-black text-2xl py-6 px-10 rounded-2xl w-full text-center mb-4">
               عمل رائع! أكملت الجدول بنجاح 🎉
             </div>
             <button onClick={reset} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-8 rounded-xl transition-transform active:scale-95">
              إعادة تعيين المحاولة
            </button>
           </motion.div>
         )}
       </div>

    </div>
  );
}
