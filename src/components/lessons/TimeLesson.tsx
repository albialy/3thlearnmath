import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const LEVELS = [
  { id: 1, originalH: 5, h: 5, m: 15, expectedStr: '5:15', label: 'الخامسة والربع' },
  { id: 2, originalH: 10, h: 10, m: 28, expectedStr: '10:28', label: 'العاشرة وثمان وعشرون دقيقة' },
  { id: 3, originalH: 2, h: 2, m: 42, expectedStr: '2:42', label: 'الثانية واثنان وأربعون دقيقة' },
  { id: 4, originalH: 1, h: 1, m: 50, expectedStr: '1:50', label: 'الواحدة وخمسون دقيقة' },
  { id: 5, originalH: 3, h: 3, m: 44, expectedStr: '3:44', label: 'الثالثة وأربعة وأربعون دقيقة' },
  { id: 6, originalH: 8, h: 8, m: 5, expectedStr: '8:05', label: 'الثامنة وخمس دقائق' }
];

const ClockFace = ({ h, m }: { h: number, m: number }) => {
  const minuteAngle = m * 6;
  const hourAngle = (h % 12) * 30 + (m / 2);
  
  return (
    <svg viewBox="0 0 100 100" className="w-48 h-48 sm:w-64 sm:h-64 drop-shadow-xl rounded-full bg-white border-4 border-teal-100">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#14b8a6" strokeWidth="3" />
      {/* Ticks */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = i * 6;
        const isHour = i % 5 === 0;
        return (
          <line 
            key={i}
            x1="50" y1={isHour ? "4" : "7"} 
            x2="50" y2="10" 
            transform={`rotate(${angle} 50 50)`}
            stroke={isHour ? "#0f766e" : "#99f6e4"}
            strokeWidth={isHour ? "2" : "1"}
            strokeLinecap="round"
          />
        );
      })}
      {/* Numbers */}
      {Array.from({ length: 12 }).map((_, i) => {
         const num = i === 0 ? 12 : i;
         const angle = (num * 30) - 90;
         const rad = angle * (Math.PI / 180);
         const x = 50 + 32 * Math.cos(rad);
         const y = 50 + 32 * Math.sin(rad);
         return (
           <text key={num} x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="900" fill="#0f766e" className="select-none">
             {num}
           </text>
         )
      })}
      
      {/* Minute Hand */}
      <line x1="50" y1="50" x2="50" y2="16" transform={`rotate(${minuteAngle} 50 50)`} stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      {/* Hour Hand */}
      <line x1="50" y1="50" x2="50" y2="28" transform={`rotate(${hourAngle} 50 50)`} stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" style={{ transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      
      {/* Center dot */}
      <circle cx="50" cy="50" r="3.5" fill="#334155" />
      <circle cx="50" cy="50" r="1.5" fill="#cbd5e1" />
    </svg>
  );
};




export function TimeLesson() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [userH, setUserH] = useState('');
  const [userM, setUserM] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const level = LEVELS[currentLevelIdx];
  
  // Audio context for sound effects
  const playSound = (type: 'correct' | 'wrong' | 'tick') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'correct') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else {
        // Subtle tick
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      }
    } catch(e) {}
  };

  const handleCheck = () => {
    // Standardize user input for minutes (e.g. "5" -> "05")
    const formattedM = parseInt(userM, 10) < 10 ? `0${parseInt(userM, 10)}` : userM;
    const userStr = `${parseInt(userH, 10)}:${formattedM}`;
    
    if (userStr === level.expectedStr) {
      setIsCorrect(true);
      playSound('correct');
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 }, colors: ['#14b8a6', '#5eead4'] });
    } else {
      setIsCorrect(false);
      playSound('wrong');
    }
  };

  const handleInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setIsCorrect(null);
    playSound('tick');
  };

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(currentLevelIdx + 1);
    } else {
      setCurrentLevelIdx(0);
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 } });
    }
    setUserH('');
    setUserM('');
    setIsCorrect(null);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-teal-100 flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="bg-teal-100 text-teal-700 p-4 rounded-full mb-6 relative z-10 shadow-inner">
        <Clock size={40} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center relative z-10">قراءة الساعة</h3>
      <div className="flex items-center gap-2 text-teal-600 font-bold px-4 py-1.5 bg-teal-50 rounded-full mb-6 border border-teal-100 shadow-sm relative z-10">
        المرحلة {currentLevelIdx + 1} من {LEVELS.length}
      </div>
      
      <p className="text-slate-600 mb-8 text-center text-lg max-w-xl relative z-10">
        اقرأ الوقت من ساعة العقارب واكتبه بالأرقام في الساعة الرقمية. <b>تذكر:</b> العقرب القصير للساعات والعقرب الطويل للدقائق!
      </p>

      <div className="w-full max-w-2xl bg-teal-50/50 p-6 md:p-10 rounded-3xl border-2 border-teal-100 flex flex-col items-center relative z-10">
         
         <div className="flex flex-col items-center mb-8 relative">
            <AnimatePresence mode="popLayout">
               <motion.div
                  key={level.id}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', damping: 15 }}
               >
                  <ClockFace h={level.h} m={level.m} />
               </motion.div>
            </AnimatePresence>
            
            <div className="mt-6 flex flex-col items-center">
               <h4 className="text-teal-800 font-bold mb-2">الساعة الرقمية:</h4>
               <div className="flex items-center gap-4 bg-slate-800 px-6 pb-4 pt-8 rounded-2xl border-4 border-slate-700 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                  
                  {/* Hours */}
                  <div className="flex flex-col items-center relative z-10 font-sans">
                    <span className="text-teal-300 text-xs font-black absolute -top-6 bg-slate-800/80 px-2 rounded-full border border-slate-600 shadow-sm">الساعات</span>
                    <input 
                       type="number" 
                       value={userH}
                       onChange={handleInput(setUserH)}
                       min="1" max="12"
                       className="w-16 h-16 bg-slate-900 text-teal-400 font-mono text-3xl font-bold text-center rounded-xl border-2 border-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 outline-none transition-colors shadow-inner"
                       placeholder="٠٠"
                       dir="ltr"
                    />
                  </div>
                  <span className="text-teal-500 font-black text-3xl animate-pulse relative z-10 -mt-2">:</span>
                  {/* Minutes */}
                  <div className="flex flex-col items-center relative z-10 font-sans">
                    <span className="text-teal-300 text-xs font-black absolute -top-6 bg-slate-800/80 px-2 rounded-full border border-slate-600 shadow-sm">الدقائق</span>
                    <input 
                       type="number" 
                       value={userM}
                       onChange={handleInput(setUserM)}
                       min="0" max="59"
                       className="w-16 h-16 bg-slate-900 text-teal-400 font-mono text-3xl font-bold text-center rounded-xl border-2 border-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 outline-none transition-colors shadow-inner"
                       placeholder="٠٠"
                       dir="ltr"
                    />
                  </div>
               </div>
            </div>
         </div>

         {/* Calculation Step */}
         <AnimatePresence mode="wait">
            <motion.div 
              key={"calc-" + currentLevelIdx + (isCorrect !== null ? isCorrect.toString() : '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full text-center flex flex-col items-center"
            >
               {isCorrect === null && (
                 <button 
                   onClick={handleCheck}
                   disabled={!userH || !userM}
                   className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-10 py-3.5 rounded-xl font-black text-lg shadow-md transition-all active:scale-95"
                 >
                   تأكيد الوقت
                 </button>
               )}
               
               {isCorrect === true && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-full flex flex-col items-center gap-3 bg-teal-50 text-teal-800 p-6 rounded-2xl border-2 border-teal-200">
                    <div className="flex items-center gap-2 font-black text-2xl"><Check size={32} /> إجابة رائعة!</div>
                    <p className="text-lg font-medium">{level.label}</p>
                    <button onClick={nextLevel} className="mt-4 bg-teal-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md font-bold hover:bg-teal-700 transition-colors">
                       <RotateCcw size={20} /> {currentLevelIdx < LEVELS.length - 1 ? 'الوقت التالي' : 'إعادة التدريب'}
                    </button>
                 </motion.div>
               )}
               
               {isCorrect === false && (
                 <motion.div initial={{ x: [-10, 10, -10, 10, 0] }} className="text-red-600 font-bold bg-red-50 px-6 py-3 rounded-xl border-2 border-red-200 w-full text-lg">
                   حاول مرة أخرى! تأكد من عقرب الساعات (الأحمر) وعقرب الدقائق (الأزرق).
                 </motion.div>
               )}
            </motion.div>
         </AnimatePresence>

      </div>
</div>
  );
}
