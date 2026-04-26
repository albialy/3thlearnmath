import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, CheckCircle2, RotateCcw, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const DATA = [
  { name: 'القطط', value: 8, color: 'text-orange-500' },
  { name: 'الأسماك', value: 4, color: 'text-blue-500' },
  { name: 'الطيور', value: 6, color: 'text-emerald-500' },
  { name: 'الأرانب', value: 2, color: 'text-pink-500' }
];

const KEY_VALUE = 2; // Each symbol = 2 animals




export function PictographLesson() {
  const [mode, setMode] = useState<'intro' | 'build' | 'interpret'>('intro');
  
  // Build state
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [buildFeedback, setBuildFeedback] = useState<string | null>(null);
  const [buildSuccess, setBuildSuccess] = useState(false);

  // Interpret state
  const [questionId, setQuestionId] = useState(0);
  const [interFeedback, setInterFeedback] = useState<'yes' | 'no' | null>(null);

  const INTERPRET_QUESTIONS = [
    {
      q: 'كم عدد الأشخاص الذين يفضلون الطيور؟',
      options: [3, 6, 8, 4],
      answer: 6,
      explain: 'كل وجه يمثل حيوانين. يوجد 3 أوجه للطيور. إذن 3 × 2 = 6.'
    },
    {
      q: 'أي الحيوانات هو الأقل تفضيلاً؟',
      options: ['القطط', 'الأسماك', 'الطيور', 'الأرانب'],
      answer: 'الأرانب',
      explain: 'لأنه يحتوي على أقل عدد من الأوجه (وجه واحد = حيوانين).'
    },
    {
      q: 'كم يزيد عدد من يفضل القطط على من يفضل الأسماك؟',
      options: [2, 4, 6, 8],
      answer: 4,
      explain: 'القطط: 8، الأسماك: 4. الفرق = 8 - 4 = 4.'
    }
  ];

  const handleAddSymbol = (index: number) => {
    if (buildSuccess) return;
    const newCounts = [...counts];
    if (newCounts[index] < 10) newCounts[index]++;
    setCounts(newCounts);
  };

  const handleRemoveSymbol = (index: number) => {
    if (buildSuccess) return;
    const newCounts = [...counts];
    if (newCounts[index] > 0) newCounts[index]--;
    setCounts(newCounts);
  };

  const checkBuild = () => {
    let isCorrect = true;
    for (let i = 0; i < DATA.length; i++) {
       if (counts[i] * KEY_VALUE !== DATA[i].value) {
          isCorrect = false;
          break;
       }
    }

    if (isCorrect) {
       setBuildFeedback(null);
       setBuildSuccess(true);
       confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
       setTimeout(() => setMode('interpret'), 2500);
    } else {
       setBuildFeedback('بعض الصفوف غير صحيحة. تذكر أن كل وجه يمثل 2!');
       setTimeout(() => setBuildFeedback(null), 3000);
    }
  };

  const handleInterpretAnswer = (ans: any) => {
    if (ans === INTERPRET_QUESTIONS[questionId].answer) {
       setInterFeedback('yes');
       confetti({ particleCount: 30, spread: 40 });
       setTimeout(() => {
          setInterFeedback(null);
          if (questionId < INTERPRET_QUESTIONS.length - 1) {
             setQuestionId(q => q + 1);
          } else {
             // Done
             setMode('intro'); // Or a completion screen
          }
       }, 2500);
    } else {
       setInterFeedback('no');
       setTimeout(() => setInterFeedback(null), 1500);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-indigo-100 flex flex-col items-center">
      
      {mode === 'intro' && (
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="bg-indigo-100 text-indigo-700 p-6 rounded-full mb-6 shadow-inner">
             <Smile size={60} strokeWidth={1.5} />
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-6">التمثيل بالرموز</h3>
          <p className="text-slate-600 mb-8 max-w-lg text-lg leading-relaxed">
             هل تعلم يا بطل أنه يمكننا رسم بيانات ومعلومات باستخدام <span className="font-bold text-indigo-600">الرموز</span> (مثل الصور التعبيرية) بدلاً من كتابة الأرقام؟ 
             السر كله يكمن في <span className="font-black text-rose-500 bg-rose-50 px-2 rounded">المفتاح</span> الذي يخبرنا بقيمة كل رمز!
          </p>
          <button 
             onClick={() => setMode('build')}
             className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full font-black text-xl shadow-md transition-transform hover:scale-105 active:scale-95"
          >
             هيا نبني لوحة رموز!
          </button>
        </div>
      )}

      {mode === 'build' && (
        <div className="w-full flex flex-col items-center animate-fade-in">
           <h3 className="text-2xl font-black text-slate-800 mb-2">أكمل التمثيل بالرموز</h3>
           <p className="text-slate-500 mb-6 text-center max-w-md">
              أضف عدد الأوجه المناسب ليمثل عدد الحيوانات. انتبه للمفتاح في الأسفل!
           </p>

           <div className="w-full max-w-2xl bg-white border-4 border-slate-100 rounded-3xl overflow-hidden shadow-sm mb-6">
              {/* Data Table (Target) */}
              <div className="flex justify-between bg-slate-50 p-4 border-b-2 border-slate-100 mb-4">
                 <span className="font-bold text-slate-600">البيانات المطلوب تمثيلها:</span>
                 <div className="flex gap-4">
                    {DATA.map((d, i) => (
                       <span key={i} className="text-sm font-bold text-slate-500">
                         {d.name}: <span className="text-indigo-600">{d.value}</span>
                       </span>
                    ))}
                 </div>
              </div>

              {/* Pictograph Area */}
              <div className="p-4 grid gap-4">
                 {DATA.map((d, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border-2 border-transparent hover:border-slate-200 transition-colors">
                       <div className="w-24 font-black text-slate-700">{d.name}</div>
                       <div className="flex-1 flex gap-2 flex-wrap min-h-[40px] items-center border-r-4 border-slate-200 pr-4">
                          <AnimatePresence>
                             {Array.from({length: counts[i]}).map((_, j) => (
                                <motion.div 
                                   key={j}
                                   initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}
                                   onClick={() => handleRemoveSymbol(i)}
                                   className={`cursor-pointer hover:scale-110 hover:-rotate-12 transition-transform ${d.color}`}
                                >
                                   <Smile size={32} />
                                </motion.div>
                             ))}
                          </AnimatePresence>
                          <button 
                             onClick={() => handleAddSymbol(i)}
                             className="w-10 h-10 border-2 border-dashed border-slate-300 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-200 hover:text-slate-600 transition-colors"
                          >
                             +
                          </button>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Key */}
              <div className="bg-amber-50 p-4 border-t-2 border-amber-100 flex items-center justify-center gap-3">
                 <span className="text-xl">🔑</span>
                 <span className="font-black text-amber-800">المفتاح:</span>
                 <div className="flex items-center gap-2 font-bold text-amber-700 bg-white px-3 py-1 rounded-full shadow-sm">
                    <Smile size={20} className="text-amber-500" /> = {KEY_VALUE} حيوانات
                 </div>
              </div>
           </div>

           {buildFeedback && (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-red-500 font-bold mb-4 bg-red-50 px-4 py-2 rounded-xl flex items-center gap-2 border border-red-100">
                 <AlertCircle size={20} /> {buildFeedback}
              </motion.div>
           )}

           <button 
              onClick={checkBuild}
              disabled={buildSuccess}
              className={`px-8 py-3 rounded-xl font-bold text-lg shadow-sm flex items-center gap-2 transition-transform active:scale-95 ${buildSuccess ? 'bg-emerald-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}
           >
              {buildSuccess ? <><CheckCircle2 size={24} /> أحسنت صنعاً!</> : 'تحقق من إجاباتي'}
           </button>
        </div>
      )}

      {mode === 'interpret' && (
        <div className="w-full flex flex-col items-center animate-fade-in">
           <h3 className="text-2xl font-black text-slate-800 mb-6">اقرأ البيانات وفسرها</h3>
           
           {/* Static Pictograph */}
           <div className="w-full max-w-xl bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm mb-8 pointer-events-none">
              <div className="p-4 grid gap-3">
                 {DATA.map((d, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                       <div className="w-20 font-bold text-slate-700">{d.name}</div>
                       <div className="flex-1 flex gap-2 border-r-2 border-slate-200 pr-4">
                             {Array.from({length: d.value / KEY_VALUE}).map((_, j) => (
                                <Smile key={j} size={28} className={d.color} />
                             ))}
                       </div>
                    </div>
                 ))}
              </div>
              <div className="bg-amber-50 p-3 border-t-2 border-amber-100 flex justify-center gap-2 text-sm">
                 <span className="font-bold text-amber-800">المفتاح: </span>
                 <Smile size={18} className="text-amber-500" /> = {KEY_VALUE}
              </div>
           </div>

           {/* Question Area */}
           <div className="w-full max-w-xl bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 relative">
               <div className="absolute top-4 left-4 bg-white text-indigo-500 font-black px-3 py-1 rounded-full text-sm shadow-sm">
                  {questionId + 1} / {INTERPRET_QUESTIONS.length}
               </div>
               <h4 className="text-xl font-black text-indigo-900 mb-6 pl-16 leading-relaxed">
                  {INTERPRET_QUESTIONS[questionId].q}
               </h4>
               
               <div className="grid grid-cols-2 gap-4">
                  {INTERPRET_QUESTIONS[questionId].options.map((opt, i) => (
                     <button
                        key={i}
                        onClick={() => handleInterpretAnswer(opt)}
                        disabled={interFeedback === 'yes'}
                        className="bg-white hover:bg-indigo-500 hover:text-white hover:border-indigo-500 text-slate-700 font-bold py-3 px-4 rounded-xl border-2 border-slate-200 shadow-sm transition-colors active:scale-95 text-lg"
                     >
                        {opt}
                     </button>
                  ))}
               </div>

               <AnimatePresence>
                  {interFeedback === 'yes' && (
                     <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="mt-6 bg-emerald-100 text-emerald-800 p-4 rounded-xl border-2 border-emerald-200 font-medium overflow-hidden">
                        <div className="flex items-center gap-2 mb-2 font-bold"><CheckCircle2/> إجابة صحيحة!</div>
                        {INTERPRET_QUESTIONS[questionId].explain}
                     </motion.div>
                  )}
                  {interFeedback === 'no' && (
                     <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="absolute inset-0 m-auto w-48 h-12 bg-rose-500 text-white font-bold flex items-center justify-center rounded-full shadow-lg z-10">
                        <AlertCircle className="ml-2"/> حاول مرة أخرى!
                     </motion.div>
                  )}
               </AnimatePresence>
           </div>
        </div>
      )}
</div>
  );
}
