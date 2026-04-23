import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

export function ArrayLesson() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  
  const [ansMult1, setAnsMult1] = useState('');
  const [ansMult2, setAnsMult2] = useState('');
  const [ansMult3, setAnsMult3] = useState('');
  
  const [ansDiv1, setAnsDiv1] = useState('');
  const [ansDiv2, setAnsDiv2] = useState('');
  const [ansDiv3, setAnsDiv3] = useState('');

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkAnswer = () => {
    const total = rows * cols;
    // Multiplication check: (rows x cols = total) OR (cols x rows = total)
    const multValid = (parseInt(ansMult1) === rows && parseInt(ansMult2) === cols && parseInt(ansMult3) === total) || 
                      (parseInt(ansMult1) === cols && parseInt(ansMult2) === rows && parseInt(ansMult3) === total);
                      
    const divValid = (parseInt(ansDiv1) === total && parseInt(ansDiv2) === rows && parseInt(ansDiv3) === cols) ||
                     (parseInt(ansDiv1) === total && parseInt(ansDiv2) === cols && parseInt(ansDiv3) === rows);

    if (multValid && divValid) {
      setIsCorrect(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    setRows(Math.floor(Math.random() * 4) + 2); // 2 to 5
    setCols(Math.floor(Math.random() * 4) + 2);
    setAnsMult1(''); setAnsMult2(''); setAnsMult3('');
    setAnsDiv1(''); setAnsDiv2(''); setAnsDiv3('');
    setIsCorrect(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-4 border-primary-200">
       <div className="text-primary-600 font-black text-2xl border-b-2 border-primary-100 pb-4 mb-6 relative">
         الشبكات وعلاقة القسمة بالضرب
         <div className="absolute left-0 top-0 bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">الدرس ٣</div>
       </div>

       <p className="text-lg font-medium text-slate-700 mb-6">
         تأمل الشبكة التالية، ثم اكتب جملة ضرب وجملة قسمة مترابطتين (من الحقائق المترابطة) تعبران عنها.
       </p>

       <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 flex flex-col items-center justify-center gap-3 mb-8 shadow-inner">
          {Array.from({ length: rows }).map((_, r) => (
             <div key={r} className="flex gap-3">
               {Array.from({ length: cols }).map((_, c) => (
                 <motion.div 
                   key={`${r}-${c}`}
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: (r * cols + c) * 0.05 }}
                   className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-md border-2 border-emerald-600"
                 />
               ))}
             </div>
          ))}
          <div className="mt-4 text-slate-500 font-bold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
             (شبكة من {rows} صفوف و {cols} أعمدة)
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl mb-6 border-2 border-slate-100 shadow-sm">
          <div className="flex flex-col gap-4 items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h4 className="font-bold text-primary-600 text-xl border-b-2 border-primary-100 pb-2">جملة الضرب</h4>
             <div className="flex items-center gap-3" dir="ltr">
               <input type="number" value={ansMult1} onChange={e => setAnsMult1(e.target.value)} className="w-16 h-16 text-center text-3xl font-black border-4 border-slate-200 rounded-xl focus:border-primary-400 focus:outline-none" />
               <span className="text-3xl font-black text-slate-400">×</span>
               <input type="number" value={ansMult2} onChange={e => setAnsMult2(e.target.value)} className="w-16 h-16 text-center text-3xl font-black border-4 border-slate-200 rounded-xl focus:border-primary-400 focus:outline-none" />
               <span className="text-3xl font-black text-slate-400">=</span>
               <input type="number" value={ansMult3} onChange={e => setAnsMult3(e.target.value)} className="w-20 h-16 text-center text-3xl font-black border-4 border-primary-200 rounded-xl focus:border-primary-500 text-primary-700 bg-primary-50 focus:outline-none" />
             </div>
          </div>

          <div className="flex flex-col gap-4 items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h4 className="font-bold text-info-600 text-xl border-b-2 border-info-100 pb-2">جملة القسمة</h4>
             <div className="flex items-center gap-3" dir="ltr">
               <input type="number" value={ansDiv1} onChange={e => setAnsDiv1(e.target.value)} className="w-20 h-16 text-center text-3xl font-black border-4 border-info-200 rounded-xl focus:border-info-500 text-info-700 bg-info-50 focus:outline-none" />
               <span className="text-3xl font-black text-slate-400">÷</span>
               <input type="number" value={ansDiv2} onChange={e => setAnsDiv2(e.target.value)} className="w-16 h-16 text-center text-3xl font-black border-4 border-slate-200 rounded-xl focus:border-info-400 focus:outline-none" />
               <span className="text-3xl font-black text-slate-400">=</span>
               <input type="number" value={ansDiv3} onChange={e => setAnsDiv3(e.target.value)} className="w-16 h-16 text-center text-3xl font-black border-4 border-slate-200 rounded-xl focus:border-info-400 focus:outline-none" />
             </div>
          </div>
       </div>

       <div className="flex flex-col items-center gap-4">
         <button onClick={checkAnswer} className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white font-black py-4 px-16 rounded-xl text-xl shadow-md transition-transform active:scale-95 active:translate-y-1">
           تحقق من الإجابات
         </button>
         {isCorrect === false && <p className="text-red-500 font-bold bg-red-50 px-4 py-2 rounded-xl">تأكد من كتابة الأرقام الصحيحة. عدد الصفوف × عدد الأعمدة = المجموع.</p>}
       </div>

       {isCorrect && (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-success-50 border-4 border-success-200 p-8 rounded-2xl mt-6 text-center shadow-inner">
            <h3 className="text-2xl font-black text-success-700 mb-3">رائع جداً! 🌟</h3>
            <p className="text-success-700 font-bold text-lg mb-6">لقد فهمت حقائق الضرب والقسمة المترابطة. العمليتان متعاكستان ومرتبطتان.</p>
            <button onClick={handleNext} className="bg-success-600 hover:bg-success-700 text-white font-black py-4 px-12 rounded-xl text-xl transition-transform active:scale-95 shadow-md w-full md:w-auto">
             شبكة جديدة
           </button>
         </motion.div>
       )}
    </div>
  );
}
