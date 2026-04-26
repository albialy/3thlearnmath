import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Check, AlertCircle, RefreshCw, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const CHALLENGES = [
  { id: 1, item: 'ساعة يد', correctValue: '٦٠ جم', wrongValue: '٦٠ كجم', icon: '⌚', ai: 'ساعة اليد تلبسها طوال اليوم، لذلك هي خفيفة جداً، جرامات قليلة لتكون مريحة!' },
  { id: 2, item: 'إطار سيارة', correctValue: '٣٥ كجم', wrongValue: '٣٥ جم', icon: '🛞', ai: 'إطار السيارة ثقيل جداً ومصنوع من المطاط القوي ليتحمل وزن السيارة، لذلك نقيسه بالكيلوجرام.' },
  { id: 3, item: 'أرنب لطيف', correctValue: '٢ كجم', wrongValue: '٢ جم', icon: '🐰', ai: 'الأرنب حيوان بوزن مناسب يمكنك حمله بين يديك، الكيلوجرام هو الوحدة المناسبة. (٢ جرام تعادل وزن ريشة الطائر!)' }
];




export function MassLesson() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const current = CHALLENGES[currentIdx];

  const playSound = (type: 'pop' | 'correct' | 'wrong') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'correct') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch(e) {}
  };

  const handleSelect = (unit: string) => {
    if (showResult) return;
    
    playSound('pop');
    setSelectedUnit(unit);
    setShowResult(true);

    if (unit === current.correctValue) {
      setTimeout(() => playSound('correct'), 100);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 }, colors: ['#f59e0b', '#fbbf24'] });
    } else {
      setTimeout(() => playSound('wrong'), 100);
    }
  };

  const handleNext = () => {
    if (currentIdx < CHALLENGES.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedUnit(null);
      setShowResult(false);
    } else {
      setCurrentIdx(0);
      setSelectedUnit(null);
      setShowResult(false);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 }, zIndex: 1000 });
    }
  };

  const isCorrect = selectedUnit === current.correctValue;

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-amber-100 flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="bg-amber-100 text-amber-700 p-4 rounded-full mb-6 relative z-10 shadow-inner">
        <Scale size={40} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center relative z-10">تقدير الكتلة</h3>
      <div className="flex items-center gap-2 text-amber-600 font-bold px-3 py-1 bg-amber-50 rounded-full mb-6 border border-amber-100 shadow-sm relative z-10">
        المثال {currentIdx + 1} من {CHALLENGES.length}
      </div>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-lg relative z-10">
        اختر التقدير الأنسب لكتلة الأشياء التالية! تذكر أن الكيلوجرام للأشياء الثقيلة (مثل كيس الأرز)، والجرام للأشياء الخفيفة (مثل مشبك الورق).
      </p>

      <div className="w-full max-w-xl bg-slate-50 p-8 rounded-3xl border-2 border-slate-200 text-center relative overflow-hidden mb-8">
         <AnimatePresence mode="wait">
           <motion.div 
             key={current.id}
             initial={{ x: 50, opacity: 0, scale: 0.9 }}
             animate={{ x: 0, opacity: 1, scale: 1 }}
             exit={{ x: -50, opacity: 0, scale: 0.9 }}
             transition={{ type: "spring", stiffness: 300, damping: 25 }}
             className="flex flex-col items-center"
           >
              <div className="text-7xl mb-4 p-4 bg-white rounded-full shadow-sm border-2 border-slate-100">{current.icon}</div>
              <h4 className="text-2xl font-bold text-slate-700 mb-6">{current.item}</h4>
              
              <div className="flex flex-wrap justify-center gap-4 w-full">
                 {[current.correctValue, current.wrongValue].sort((a,b) => a.localeCompare(b)).map((opt) => {
                   let btnClass = "px-6 py-4 rounded-2xl font-black text-xl border-b-4 transition-all shadow-sm flex-1 min-w-[120px] ";
                   
                   if (!showResult) {
                     btnClass += "bg-white border-slate-200 text-slate-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 active:translate-y-1 active:border-b-0";
                   } else {
                     if (opt === current.correctValue) {
                       btnClass += "bg-amber-500 text-white border-amber-700 z-10 shadow-lg border-b-0 translate-y-1";
                     } else if (opt === selectedUnit) {
                       btnClass += "bg-red-500 text-white border-red-700 opacity-90 border-b-0 translate-y-1";
                     } else {
                       btnClass += "bg-slate-100 text-slate-400 border-slate-200 opacity-50";
                     }
                   }

                   return (
                     <motion.button 
                       key={opt} 
                       whileHover={!showResult ? { scale: 1.05 } : {}}
                       whileTap={!showResult ? { scale: 0.95 } : {}}
                       animate={showResult && opt === current.correctValue ? { scale: [1, 1.2, 0.9, 1.1, 1], rotate: [0, -10, 10, -5, 0], y: [0, -15, 0] } : {}}
                       transition={{ type: "spring", duration: 0.6 }}
                       onClick={() => handleSelect(opt)}
                       disabled={showResult}
                       className={btnClass}
                     >
                       {opt}
                     </motion.button>
                   );
                 })}
              </div>
           </motion.div>
         </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {showResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl mx-auto"
          >
            {isCorrect ? (
              <div className="bg-amber-50 text-amber-800 p-6 rounded-2xl border-2 border-amber-200 mb-6 shadow-sm">
                <div className="flex items-center gap-2 font-black text-xl mb-2">
                  <Check size={24} /> أحسنت الاختيار!
                </div>
                <p className="font-medium text-amber-700 leading-relaxed text-sm md:text-base">
                  <span className="font-bold bg-amber-200 px-2 py-0.5 rounded mr-1">ذكاء اصطناعي:</span>
                  {current.ai}
                </p>
              </div>
            ) : (
              <div className="bg-red-50 text-red-800 p-6 rounded-2xl border-2 border-red-200 mb-6 shadow-sm">
                <div className="font-black text-xl mb-2">للأسف، التقدير غير مناسب!</div>
                <p className="font-medium">فكر في وزن {current.item}، هل من المعقول أن نقيسه بالوحدة التي اخترتها؟</p>
              </div>
            )}
            
             <button 
                onClick={handleNext} 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors active:scale-95"
              >
                {currentIdx < CHALLENGES.length - 1 ? 'المثال التالي' : 'إعادة التحدي'} <RotateCcw size={20} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
</div>
  );
}
