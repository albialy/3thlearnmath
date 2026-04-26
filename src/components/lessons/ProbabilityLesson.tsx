import React, { useState } from 'react';
import { DynamicQuiz } from '../DynamicQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, AlertCircle, CheckCircle2, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';




export function ProbabilityLesson() {
  const [quizDone, setQuizDone] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<'abdullah' | 'asmaa' | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleVote = (student: 'abdullah' | 'asmaa') => {
    if (selectedStudent) return; // already voted
    setSelectedStudent(student);

    if (student === 'asmaa') {
      // User voted correctly
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    // Random spin between 3 to 6 full rotations + random angle
    const newRotation = rotation + 360 * 4 + Math.floor(Math.random() * 360);
    setRotation(newRotation);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-amber-100 flex flex-col items-center">
      <div className="bg-amber-100 text-amber-700 p-4 rounded-full mb-6 relative shadow-inner">
         <HelpCircle size={40} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center">أكتشف الخطأ: الاحتمالات</h3>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-xl">
         قام عبدالله وأخته أسماء بتدوير مؤشر القرص. القرص مقسم بالتساوي إلى ٤ ألوان فقط: 
         <span className="font-bold text-red-500 mx-1">الأحمر</span>، 
         <span className="font-bold text-yellow-500 mx-1">الأصفر</span>، 
         <span className="font-bold text-green-500 mx-1">الأخضر</span>، و
         <span className="font-bold text-blue-500 mx-1">الأزرق</span>.
      </p>

      {/* The Spinner Wheel */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
         {/* Simple pointer */}
         <div className="absolute -top-4 z-20 text-slate-700 drop-shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2L20 12H4L12 2Z" />
            </svg>
         </div>

         {/* The wheel */}
         <motion.div 
            className="w-full h-full rounded-full border-4 border-slate-200 shadow-inner overflow-hidden cursor-pointer"
            animate={{ rotate: rotation }}
            transition={{ duration: 3, ease: "easeOut" }}
            onClick={spinWheel}
            style={{
               background: 'conic-gradient(#ef4444 0deg 90deg, #3b82f6 90deg 180deg, #22c55e 180deg 270deg, #eab308 270deg 360deg)'
            }}
         />
         
         <div className="absolute inset-0 m-auto w-6 h-6 bg-white rounded-full shadow-md z-10"></div>
      </div>

      <button 
        onClick={spinWheel} 
        disabled={spinning}
        className="mb-8 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2 rounded-full border-2 border-slate-200 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
      >
        <RotateCw size={18} className={spinning ? "animate-spin" : ""} />
        جرب تدوير القرص
      </button>

      {/* The Dispute */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         {/* Abdullah */}
         <div className={`relative bg-slate-50 p-6 rounded-3xl border-2 transition-all ${selectedStudent === 'abdullah' ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-amber-300'}`}>
            <h4 className="text-xl font-black text-slate-700 mb-2 flex items-center gap-2">
               👨 عبدالله يقول:
            </h4>
            <p className="text-slate-600 font-medium mb-6">
               "إمكانية أن يقف المؤشر عند اللون <span className="font-bold text-orange-500">البرتقالي</span> هي <span className="bg-amber-200 px-1 rounded">الأقل احتمالاً</span>."
            </p>
            
            <button 
               onClick={() => handleVote('abdullah')}
               className={`w-full py-3 rounded-xl font-bold transition-all ${selectedStudent === 'abdullah' ? 'bg-red-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-600 hover:bg-amber-100'}`}
            >
               اتفق مع عبدالله
            </button>

            <AnimatePresence>
               {selectedStudent === 'abdullah' && (
                  <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full shadow-lg">
                     <AlertCircle size={24} />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Asmaa */}
         <div className={`relative bg-slate-50 p-6 rounded-3xl border-2 transition-all ${selectedStudent === 'asmaa' ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:border-amber-300'}`}>
            <h4 className="text-xl font-black text-slate-700 mb-2 flex items-center gap-2">
               👧 أسماء تقول:
            </h4>
            <p className="text-slate-600 font-medium mb-6">
               "<span className="bg-emerald-200 px-1 rounded">مستحيل</span> أن يقف المؤشر عند اللون <span className="font-bold text-orange-500">البرتقالي</span>."
            </p>
            
            <button 
               onClick={() => handleVote('asmaa')}
               className={`w-full py-3 rounded-xl font-bold transition-all ${selectedStudent === 'asmaa' ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-600 hover:bg-amber-100'}`}
            >
               اتفق مع أسماء
            </button>

            <AnimatePresence>
               {selectedStudent === 'asmaa' && (
                  <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                     <CheckCircle2 size={24} />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>

      {/* Explanation */}
      <AnimatePresence>
         {selectedStudent && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className={`p-6 rounded-2xl border-2 flex items-start gap-4 max-w-2xl w-full ${selectedStudent === 'asmaa' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}
            >
               <div className={`p-3 rounded-full ${selectedStudent === 'asmaa' ? 'bg-emerald-200 text-emerald-700' : 'bg-red-200 text-red-700'}`}>
                  {selectedStudent === 'asmaa' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
               </div>
               <div>
                  <h4 className={`text-xl font-black mb-2 ${selectedStudent === 'asmaa' ? 'text-emerald-800' : 'text-red-800'}`}>
                     {selectedStudent === 'asmaa' ? 'تشخيص ممتاز أيها الطبيب الجراح!' : 'المعذرة، عبدالله مخطئ!'}
                  </h4>
                  <p className="text-slate-700 leading-relaxed font-medium">
                     القرص مقسم إلى ٤ ألوان فقط: أحمر، أصفر، أخضر، أزرق. <strong>لا يوجد أي لون برتقالي.</strong> 
                     <br/><br/>
                     لذلك، من <strong className="text-emerald-600">المستحيل</strong> أن يقف المؤشر عند اللون البرتقالي لأنه غير موجود أصلاً. 
                     مصطلح "أقل احتمالاً" يعني أن الشيء موجود ولكن بنسبة ضئيلة جداً، وهذا لا ينطبق هنا! 
                     إذن، إجابة <strong>أسماء</strong> هي الدقيقة والصحيحة رياضياً.
                  </p>
                  
                  {selectedStudent === 'abdullah' && (
                     <button 
                        onClick={() => setSelectedStudent(null)}
                        className="mt-4 text-red-600 font-bold hover:underline"
                     >
                        حاول مرة أخرى والعب دور الحكم
                     </button>
                  )}
               </div>
            </motion.div>
         )}
      </AnimatePresence>

    
      {!quizDone && (
         <div className="mt-12 w-full flex justify-center z-50 relative pb-12 px-6">
            <DynamicQuiz topic="ProbabilityLesson.tsx" onComplete={() => setQuizDone(true)} />
         </div>
      )}
</div>
  );
}
