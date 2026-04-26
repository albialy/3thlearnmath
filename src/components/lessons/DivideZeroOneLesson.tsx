import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';




export function DivideZeroOneLesson() {
  const [activeTab, setActiveTab] = useState<'rule1' | 'rule2' | 'rule3'>('rule1');
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    { q: "٦ ÷ ٦ =", options: [0, 1, 6], correct: 1 },
    { q: "٥ ÷ ١ =", options: [0, 1, 5], correct: 5 },
    { q: "٠ ÷ ٧ =", options: [0, 1, 7], correct: 0 },
    { q: "٩ ÷ ١ =", options: [0, 1, 9], correct: 9 },
    { q: "٤ ÷ ٤ =", options: [0, 1, 4], correct: 1 },
  ];

  const handleAnswer = (ans: number) => {
    if (ans === questions[qIndex].correct) {
      setScore(s => s + 1);
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
    }
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1);
    } else {
      setQIndex(-1); // Finished
    }
  };

  const tabs = [
    { id: 'rule1', label: 'القسمة على نفسه', emoji: '🪞' },
    { id: 'rule2', label: 'القسمة على ١', emoji: '🥇' },
    { id: 'rule3', label: 'قسمة الصفر', emoji: '🕳️' }
  ] as const;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-4 border-warning-200">
       <div className="text-warning-600 font-black text-2xl border-b-2 border-warning-100 pb-4 mb-6 relative flex items-center justify-between">
         قواعد الصفر والواحد
         <div className="bg-warning-100 text-warning-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider">الدرس ٥</div>
       </div>

       {!quizStarted ? (
         <>
           <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
             {tabs.map(t => (
               <button 
                 key={t.id}
                 onClick={() => setActiveTab(t.id)}
                 className={`flex-1 min-w-[120px] font-bold py-3 px-4 rounded-xl transition-all border-2 text-sm md:text-base ${activeTab === t.id ? 'bg-warning-500 text-white border-warning-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
               >
                 <span className="text-xl ml-2">{t.emoji}</span>
                 {t.label}
               </button>
             ))}
           </div>

           <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border-2 border-slate-100 min-h-[300px] flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {activeTab === 'rule1' && (
                  <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">عند قسمة أي عدد (عدا الصفر) على نفسه، يكون الناتج ١.</h3>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                       <div className="bg-white p-4 items-center flex flex-col rounded-2xl shadow-sm border border-slate-200">
                          <div className="text-3xl mb-2">🍪🍪🍪</div>
                          <div className="text-sm font-bold text-slate-500 mb-4">٣ قطع بسكويت لخالد ومحمد وعلي</div>
                          <div className="text-xl font-black bg-slate-100 px-4 py-2 rounded-xl" dir="ltr">3 ÷ 3 = 1</div>
                       </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'rule2' && (
                  <motion.div key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">عند قسمة أي عدد على ١، يكون الناتج هو العدد المقسوم نفسه.</h3>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                       <div className="bg-white p-4 items-center flex flex-col rounded-2xl shadow-sm border border-slate-200">
                          <div className="text-3xl mb-2">⚽⚽⚽⚽</div>
                          <div className="text-sm font-bold text-slate-500 mb-4">٤ كرات كلها لصندوق واحد</div>
                          <div className="text-xl font-black bg-slate-100 px-4 py-2 rounded-xl" dir="ltr">4 ÷ 1 = 4</div>
                       </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === 'rule3' && (
                  <motion.div key="3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">عند قسمة الصفر على أي عدد (عدا الصفر)، يكون الناتج صفراً.</h3>
                    <p className="text-red-500 font-bold mb-4 bg-red-50 px-4 py-2 rounded-xl inline-block">تذكر: لا يمكن القسمة على صفر أبداً!</p>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                       <div className="bg-white p-4 items-center flex flex-col rounded-2xl shadow-sm border border-slate-200">
                          <div className="text-3xl mb-2 opacity-50">💨💨</div>
                          <div className="text-sm font-bold text-slate-500 mb-4">لا توجد ألعاب لتوزيعها على صندوقين</div>
                          <div className="text-xl font-black bg-slate-100 px-4 py-2 rounded-xl" dir="ltr">0 ÷ 2 = 0</div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
           
           <div className="mt-8 flex justify-center">
             <button onClick={() => setQuizStarted(true)} className="bg-warning-500 hover:bg-warning-600 text-white font-black py-4 px-12 rounded-xl text-xl shadow-md transition-transform active:scale-95 w-full md:w-auto">
               اختبر فهمك للقواعد!
             </button>
           </div>
         </>
       ) : qIndex >= 0 ? (
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-8">
            <h3 className="text-xl font-bold text-slate-500 mb-2">سؤال {qIndex + 1} من {questions.length}</h3>
            <div className="text-6xl font-black text-slate-800 mb-10 bg-slate-50 p-8 rounded-3xl border-4 border-slate-100" dir="ltr">
              {questions[qIndex].q} 
            </div>
            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
              {questions[qIndex].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(opt)}
                  className="bg-white border-4 border-b-[8px] border-warning-200 text-warning-700 hover:bg-warning-50 hover:border-warning-400 font-black text-4xl py-6 rounded-2xl transition-all active:translate-y-1 active:border-b-4"
                >
                  {opt}
                </button>
              ))}
            </div>
         </motion.div>
       ) : (
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
            <div className="text-8xl mb-4">🏆</div>
            <h3 className="text-3xl font-black text-warning-600 mb-2">لقد أتممت الاختبار!</h3>
            <p className="text-xl font-bold text-slate-600 mb-8">نتيجتك: {score} من {questions.length}</p>
            <button onClick={() => { setQuizStarted(false); setQIndex(0); setScore(0); }} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-8 rounded-xl transition-transform active:scale-95">
              إعادة الدرس
            </button>
         </motion.div>
       )}
</div>
  );
}
