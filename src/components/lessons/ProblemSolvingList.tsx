import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListChecks, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const STUDENTS = ['محمد', 'ياسر', 'مهند'];

export function ProblemSolvingList() {
  const [lists, setLists] = useState<string[][]>([]);
  const [currentBuild, setCurrentBuild] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddStudent = (student: string) => {
    if (currentBuild.includes(student)) return;
    if (currentBuild.length >= 3) return;
    setCurrentBuild([...currentBuild, student]);
  };

  const handleRemoveStudent = (index: number) => {
    setCurrentBuild(currentBuild.filter((_, i) => i !== index));
  };

  const saveCurrentList = () => {
    if (currentBuild.length !== 3) {
       setFeedback('يجب أن يحتوي الترتيب على 3 طلاب!');
       setTimeout(() => setFeedback(null), 2000);
       return;
    }

    const newStr = currentBuild.join('-');
    const exists = lists.some(list => list.join('-') === newStr);

    if (exists) {
       setFeedback('هذا الترتيب موجود مسبقاً! ابحث عن ترتيب جديد.');
       setTimeout(() => setFeedback(null), 2000);
       setCurrentBuild([]); // Reset to try again smoothly
       return;
    }

    setLists([...lists, currentBuild]);
    setCurrentBuild([]);
    
    if (lists.length + 1 === 6) {
       confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
       setFeedback('عبقري! لقد وجدت جميع الطرق الـ 6 الممكنة!');
    }
  };

  const handleReset = () => {
    setLists([]);
    setCurrentBuild([]);
    setFeedback(null);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-fuchsia-100 flex flex-col items-center">
      <div className="bg-fuchsia-100 text-fuchsia-700 p-6 rounded-full mb-6 shadow-inner">
         <ListChecks size={60} strokeWidth={1.5} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-2 text-center">خطة حل المسألة: إنشاء قائمة</h3>
      <p className="text-slate-600 mb-8 max-w-lg text-lg leading-relaxed text-center font-medium">
         بكم طريقة يمكن لمحمد، ياسر، ومهند أن يصطفوا لكي يدخلوا الفصل؟ ساعدهم في إنشاء <span className="font-bold text-fuchsia-600">قائمة</span> بكل الترتيبات الممكنة دون تكرار!
      </p>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* Build Area */}
         <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-3xl shadow-sm h-fit">
            <h4 className="font-black text-slate-700 mb-4 text-center">قم ببناء ترتيب جديد</h4>
            
            {/* The Builder */}
            <div className="flex gap-2 justify-center mb-6 min-h-[64px] p-2 bg-white rounded-xl border-2 border-dashed border-slate-300">
               {currentBuild.map((student, i) => (
                  <motion.div 
                     key={i} 
                     initial={{scale:0}} animate={{scale:1}}
                     onClick={() => handleRemoveStudent(i)}
                     className="bg-fuchsia-500 text-white font-bold px-4 py-2 rounded-lg cursor-pointer hover:bg-rose-500 shadow-sm transition-colors flex items-center gap-2"
                  >
                     {student} <span>✕</span>
                  </motion.div>
               ))}
               {currentBuild.length === 0 && <span className="text-slate-400 my-auto text-sm">اختر طالباً للبدء...</span>}
            </div>

            {/* Choices */}
            <div className="flex justify-center gap-4 mb-6">
               {STUDENTS.map(s => {
                  const isUsed = currentBuild.includes(s);
                  return (
                     <button 
                        key={s}
                        onClick={() => handleAddStudent(s)}
                        disabled={isUsed}
                        className={`font-black text-lg px-6 py-3 rounded-2xl shadow-sm transition-transform active:scale-95 ${isUsed ? 'bg-slate-200 text-slate-400 opacity-50 cursor-not-allowed' : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-fuchsia-400 hover:text-fuchsia-600'}`}
                     >
                        {s}
                     </button>
                  );
               })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
               <button 
                  onClick={saveCurrentList}
                  disabled={currentBuild.length !== 3 || lists.length === 6}
                  className="bg-fuchsia-500 hover:bg-fuchsia-600 disabled:opacity-50 text-white font-black text-lg py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
               >
                  <ListChecks size={24} /> حفظ الترتيب في القائمة
               </button>
            </div>

            <AnimatePresence>
               {feedback && (
                  <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className={`mt-4 p-3 rounded-xl font-bold flex items-center justify-center gap-2 text-center text-sm ${lists.length === 6 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                     {lists.length === 6 ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>} {feedback}
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* The List Area */}
         <div className="bg-white border-2 border-fuchsia-200 p-6 rounded-3xl shadow-sm relative">
            <div className="flex justify-between items-center mb-6">
               <h4 className="font-black text-fuchsia-800">قائمة الترتيبات</h4>
               <span className="bg-fuchsia-100 text-fuchsia-800 font-bold px-3 py-1 rounded-full text-sm">
                  {lists.length} / 6
               </span>
            </div>

            <div className="flex flex-col gap-3 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
               <AnimatePresence>
                  {lists.map((list, index) => (
                     <motion.div 
                        key={list.join('-')}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between"
                     >
                        <span className="font-black text-slate-400 w-6">{index + 1}.</span>
                        <div className="flex-1 flex gap-2 justify-center">
                           {list.map((s, i) => (
                              <React.Fragment key={i}>
                                 <span className="font-bold text-slate-700">{s}</span>
                                 {i < 2 && <span className="text-slate-300">-</span>}
                              </React.Fragment>
                           ))}
                        </div>
                        <CheckCircle2 size={18} className="text-emerald-500" />
                     </motion.div>
                  ))}
               </AnimatePresence>
               
               {lists.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 pb-8">
                     <ListChecks size={48} className="mb-4" />
                     <p className="font-bold">القائمة فارغة حالياً</p>
                  </div>
               )}
            </div>

            {lists.length === 6 && (
               <button onClick={handleReset} className="absolute -bottom-4 inset-x-0 mx-auto w-fit bg-slate-800 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:bg-slate-900 transition-colors flex items-center gap-2 text-sm z-10">
                  <RotateCcw size={16} /> إعادة تعيين
               </button>
            )}
         </div>
         
      </div>
    </div>
  );
}
