import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, CheckCircle2, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const SEASONS = [
  { id: 'winter', name: 'الشتاء', expected: 8, color: 'bg-blue-400' },
  { id: 'spring', name: 'الربيع', expected: 6, color: 'bg-emerald-400' },
  { id: 'summer', name: 'الصيف', expected: 10, color: 'bg-yellow-400' },
  { id: 'autumn', name: 'الخريف', expected: 4, color: 'bg-orange-400' }
];




export function BarGraphLesson() {
  const [mode, setMode] = useState<'intro' | 'build' | 'interpret'>('intro');
  
  // Build state
  const [barHeights, setBarHeights] = useState<number[]>([0, 0, 0, 0]);
  const [buildSuccess, setBuildSuccess] = useState(false);

  // Interpret state
  const [questionId, setQuestionId] = useState(0);
  const [interFeedback, setInterFeedback] = useState<'yes' | 'no' | null>(null);

  const INTERPRET_QUESTIONS = [
    {
      q: 'أي فصول السنة هو الأكثر تفضيلاً بين الطلاب؟',
      options: ['الربيع', 'الصيف', 'الشتاء', 'الخريف'],
      answer: 'الصيف',
      explain: 'العمود الذي يمثل الصيف هو الأطول (يصل إلى التدريج 10).'
    },
    {
      q: 'كم عدد الطلاب الذين يفضلون فصل الشتاء؟',
      options: [4, 6, 8, 10],
      answer: 8,
      explain: 'ننظر إلى قمة عمود الشتاء ثم نتجه أفقياً لنجد الرقم 8 على محور التدريج.'
    },
    {
      q: 'كم يزيد عدد محبي الصيف عن محبي الربيع؟',
      options: [2, 4, 6, 8],
      answer: 4,
      explain: 'الصيف: 10، الربيع: 6. الفرق = 10 - 6 = 4.'
    }
  ];

  const handleBarAdjust = (index: number, direction: 'up' | 'down') => {
    if (buildSuccess) return;
    const newHeights = [...barHeights];
    if (direction === 'up' && newHeights[index] < 12) newHeights[index] += 2;
    if (direction === 'down' && newHeights[index] > 0) newHeights[index] -= 2;
    
    setBarHeights(newHeights);
  };

  useEffect(() => {
    if (mode === 'build' && !buildSuccess) {
      let isCorrect = true;
      for (let i = 0; i < SEASONS.length; i++) {
         if (barHeights[i] !== SEASONS[i].expected) {
            isCorrect = false;
            break;
         }
      }
      if (isCorrect) {
         setBuildSuccess(true);
         confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
         setTimeout(() => setMode('interpret'), 3000);
      }
    }
  }, [barHeights, mode, buildSuccess]);

  const handleInterpretAnswer = (ans: any) => {
    if (ans === INTERPRET_QUESTIONS[questionId].answer) {
       setInterFeedback('yes');
       confetti({ particleCount: 30, spread: 40 });
       setTimeout(() => {
          setInterFeedback(null);
          if (questionId < INTERPRET_QUESTIONS.length - 1) {
             setQuestionId(q => q + 1);
          } else {
             setMode('intro'); // Loop back completed
          }
       }, 2500);
    } else {
       setInterFeedback('no');
       setTimeout(() => setInterFeedback(null), 1500);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-cyan-100 flex flex-col items-center">
      
      {mode === 'intro' && (
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="bg-cyan-100 text-cyan-700 p-6 rounded-full mb-6 shadow-inner">
             <BarChart3 size={60} strokeWidth={1.5} />
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-6">التمثيل بالأعمدة</h3>
          <p className="text-slate-600 mb-8 max-w-lg text-lg leading-relaxed">
             الطبيب الماهر لا يكتفي بالنظر للأرقام بل يحولها إلى صور رائعة! 
             <span className="font-bold text-cyan-600 mx-1">التمثيل بالأعمدة</span> 
             يساعدنا في عرض البيانات باستخدام أعمدة طولها يتغير بحسب العدد.
             هيا نتعلم كيف نرسمها ونقرأها كالمحترفين!
          </p>
          <button 
             onClick={() => setMode('build')}
             className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-black text-xl shadow-md transition-transform hover:scale-105 active:scale-95"
          >
             ابدأ بناء الأعمدة
          </button>
        </div>
      )}

      {mode === 'build' && (
        <div className="w-full flex flex-col items-center animate-fade-in h-[600px]">
           <h3 className="text-2xl font-black text-slate-800 mb-2">اصنع تمثيلاً بالأعمدة</h3>
           <p className="text-slate-500 mb-6 text-center max-w-md">
              اضبط طول كل عمود ليتطابق مع البيانات في الجدول. التدريج يقفز بمقدار 2!
           </p>

           <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl h-full pb-8">
              {/* Data Table */}
              <div className="w-full md:w-1/3 bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-inner h-fit">
                 <h4 className="font-black text-cyan-800 mb-4 border-b-2 border-cyan-200 pb-2">الفصل المفضل</h4>
                 <div className="flex flex-col gap-3">
                    {SEASONS.map((s) => (
                       <div key={s.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                          <span className="font-bold text-slate-700">{s.name}</span>
                          <span className="font-black text-cyan-600 text-xl bg-cyan-50 w-10 h-10 flex items-center justify-center rounded-lg">{s.expected}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Chart Editor */}
              <div className="flex-1 bg-white border-2 border-slate-200 rounded-3xl p-6 relative flex flex-col shadow-sm">
                 <div className="flex-1 flex relative ml-8 pb-10 border-b-4 border-slate-500 border-l-4">
                    {/* Y Axis Grid/Labels */}
                    <div className="absolute -left-8 top-0 bottom-10 w-6 flex flex-col justify-between font-bold text-slate-400 text-sm">
                       {[12, 10, 8, 6, 4, 2, 0].map(val => (
                          <div key={val} className="relative flex items-center justify-end h-0 w-full">
                             <span className="absolute -left-2 transform -translate-x-full">{val}</span>
                             <div className="absolute left-[24px] w-[calc(100%+32rem)] h-px bg-slate-100 -z-10" />
                          </div>
                       ))}
                    </div>

                    {/* Bars Container */}
                    <div className="flex-1 flex items-end justify-around h-full pt-4">
                       {SEASONS.map((s, i) => (
                          <div key={s.id} className="relative flex flex-col items-center group w-16">
                             {/* Adjust buttons */}
                             <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-20">
                                <button onClick={() => handleBarAdjust(i, 'up')} className="bg-slate-200 hover:bg-cyan-500 hover:text-white p-1 rounded"><Maximize2 size={16}/></button>
                                <button onClick={() => handleBarAdjust(i, 'down')} className="bg-slate-200 hover:bg-cyan-500 hover:text-white p-1 rounded"><Minimize2 size={16}/></button>
                             </div>
                             
                             {/* The Bar */}
                             <motion.div 
                                className={`w-full rounded-t-lg shadow-sm border-2 border-slate-700/20 ${s.color} relative overflow-hidden`}
                                animate={{ height: `${(barHeights[i] / 12) * 100}%` }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                             >
                                <div className="absolute top-2 inset-x-0 mx-auto w-4 h-1 bg-white/40 rounded-full" />
                             </motion.div>
                             
                             {/* X Axis Label */}
                             <div className="absolute -bottom-8 font-bold text-slate-600">{s.name}</div>
                          </div>
                       ))}
                    </div>
                 </div>
                 
                 {buildSuccess && (
                     <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-center rounded-3xl">
                        <div className="bg-emerald-500 text-white font-black px-8 py-4 rounded-full text-2xl shadow-xl flex items-center gap-3">
                           <CheckCircle2 size={32} /> عمل متقن ورائع!
                        </div>
                     </motion.div>
                 )}
              </div>
           </div>
        </div>
      )}

      {mode === 'interpret' && (
        <div className="w-full flex flex-col items-center animate-fade-in">
           <h3 className="text-2xl font-black text-slate-800 mb-6">اقرأ البيانات وفسرها</h3>
           
           {/* Static Chart */}
           <div className="w-full max-w-lg bg-white border-2 border-slate-200 rounded-3xl p-6 relative flex flex-col shadow-sm mb-8 h-64 pointer-events-none">
              <h4 className="text-center font-bold text-slate-500 mb-4 absolute top-2 inset-x-0">الفصول المفضلة للطلاب</h4>
              <div className="flex-1 flex relative ml-8 pb-8 mt-4 border-b-2 border-slate-400 border-l-2">
                 <div className="absolute -left-6 top-0 bottom-8 w-4 flex flex-col justify-between font-bold text-slate-400 text-xs text-right">
                    {[12, 10, 8, 6, 4, 2, 0].map(val => (
                       <div key={val} className="relative flex items-center h-0 w-full justify-end pr-1">
                          <span>{val}</span>
                       </div>
                    ))}
                 </div>
                 <div className="flex-1 flex items-end justify-around h-full pt-2">
                    {SEASONS.map((s) => (
                       <div key={s.id} className="relative flex flex-col items-center w-12">
                          <div 
                             className={`w-full rounded-t-md shadow-sm opacity-80 ${s.color}`}
                             style={{ height: `${(s.expected / 12) * 100}%` }}
                          />
                          <div className="absolute -bottom-6 font-bold text-slate-600 text-xs">{s.name}</div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Question Area */}
           <div className="w-full max-w-xl bg-cyan-50 p-6 rounded-3xl border-2 border-cyan-100 relative">
               <div className="absolute top-4 left-4 bg-white text-cyan-600 font-black px-3 py-1 rounded-full text-sm shadow-sm">
                  {questionId + 1} / {INTERPRET_QUESTIONS.length}
               </div>
               <h4 className="text-xl font-black text-cyan-900 mb-6 pl-16 leading-relaxed">
                  {INTERPRET_QUESTIONS[questionId].q}
               </h4>
               
               <div className="grid grid-cols-2 gap-4">
                  {INTERPRET_QUESTIONS[questionId].options.map((opt, i) => (
                     <button
                        key={i}
                        onClick={() => handleInterpretAnswer(opt)}
                        disabled={interFeedback === 'yes'}
                        className="bg-white hover:bg-cyan-500 hover:text-white hover:border-cyan-500 text-slate-700 font-bold py-3 px-4 rounded-xl border-2 border-slate-200 shadow-sm transition-colors active:scale-95 text-lg"
                     >
                        {opt}
                     </button>
                  ))}
               </div>

               <AnimatePresence>
                  {interFeedback === 'yes' && (
                     <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="mt-6 bg-emerald-100 text-emerald-800 p-4 rounded-xl border-2 border-emerald-200 font-medium overflow-hidden">
                        <div className="flex items-center gap-2 mb-2 font-bold"><CheckCircle2/> استنتاج دقيق!</div>
                        {INTERPRET_QUESTIONS[questionId].explain}
                     </motion.div>
                  )}
                  {interFeedback === 'no' && (
                     <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="absolute inset-0 m-auto w-48 h-12 bg-rose-500 text-white font-bold flex items-center justify-center rounded-full shadow-lg z-10">
                        <AlertCircle className="ml-2"/> الدقة مطلوبة يا طبيب!
                     </motion.div>
                  )}
               </AnimatePresence>
           </div>
        </div>
      )}
</div>
  );
}
