import React, { useState } from 'react';
import { DynamicQuiz } from '../DynamicQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { SquareDashed, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const LEVELS = [
  {
    id: 1,
    name: 'مستطيل',
    sides: [4, 3, 4, 3], // top, right, bottom, left
    points: [[50,50], [350,50], [350,250], [50,250]],
    labelsOffset: [[0,-20], [35,0], [0,25], [-35,0]] // dx, dy applied from midpoint
  },
  {
    id: 2,
    name: 'مربع',
    sides: [5, 5, 5, 5],
    points: [[100,50], [300,50], [300,250], [100,250]],
    labelsOffset: [[0,-20], [35,0], [0,25], [-35,0]]
  },
  {
    id: 3,
    name: 'مثلث',
    sides: [6, 4, 5], // bottom, right(hypotenuse), left
    points: [[50,250], [350,250], [50,50]],
    labelsOffset: [[0,25], [25,-15], [-35,0]]
  }
];




export function PerimeterLesson() {
  const [quizDone, setQuizDone] = useState(false);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [interactiveStep, setInteractiveStep] = useState(0);
  const [userSum, setUserSum] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const level = LEVELS[currentLevelIdx];
  const perimeter = level.sides.reduce((acc, curr) => acc + curr, 0);
  
  const [clickedSides, setClickedSides] = useState<boolean[]>(Array(level.sides.length).fill(false));

  const handleSideClick = (index: number) => {
    if (clickedSides[index]) return;
    const newClicked = [...clickedSides];
    newClicked[index] = true;
    setClickedSides(newClicked);
    
    // Play sound on click
    playSound();

    if (newClicked.filter(Boolean).length === level.sides.length) {
      setTimeout(() => setInteractiveStep(1), 1000);
    }
  };

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch(e) {}
  };

  const handleCheck = () => {
    if (parseInt(userSum, 10) === perimeter) {
      setIsCorrect(true);
      confetti({
         particleCount: 100,
         spread: 70,
         origin: { y: 0.6 }
      });
    } else {
      setIsCorrect(false);
    }
  };

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(currentLevelIdx + 1);
    } else {
      setCurrentLevelIdx(0); // loop or finish
    }
    setInteractiveStep(0);
    setUserSum('');
    setIsCorrect(null);
    setClickedSides(Array(LEVELS[(currentLevelIdx + 1) % LEVELS.length].sides.length).fill(false));
  };

  const renderCurrentSum = () => {
    const parts: string[] = [];
    level.sides.forEach((side, idx) => {
      if (clickedSides[idx]) {
        parts.push(side.toString());
      } else {
        parts.push('؟');
      }
    });

    let currentSum = 0;
    level.sides.forEach((side, idx) => {
      if (clickedSides[idx]) currentSum += side;
    });

    return (
       <div className="flex flex-col items-center gap-2" dir="ltr">
          <div className="flex flex-wrap justify-center items-center gap-2 text-2xl md:text-3xl font-black text-slate-700">
             {parts.map((part, i) => (
                <React.Fragment key={i}>
                   <motion.span 
                      key={currentLevelIdx + '-' + i + part}
                      initial={{ scale: part !== '؟' ? 1.5 : 1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={part === '؟' ? 'text-slate-300' : 'text-indigo-600 drop-shadow-sm'}
                    >
                      {part}
                    </motion.span>
                   {i < parts.length - 1 && <span className="text-slate-400">+</span>}
                </React.Fragment>
             ))}
             {interactiveStep === 0 && (
                <>
                   <span className="text-slate-400">=</span>
                   <motion.span 
                     key={"total-" + currentSum}
                     initial={{ scale: 1.2 }}
                     animate={{ scale: 1 }}
                     className="text-indigo-600 border-b-4 border-indigo-200 px-2 min-w-[3rem] text-center"
                   >
                     {currentSum > 0 ? currentSum : ''}
                   </motion.span>
                </>
             )}
          </div>
       </div>
    );
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-indigo-100 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="bg-indigo-100 text-indigo-700 p-4 rounded-full mb-6 relative z-10 shadow-inner">
        <SquareDashed size={40} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center relative z-10">إيجاد المحيط</h3>
      <div className="flex items-center gap-2 text-indigo-600 font-bold px-4 py-1.5 bg-indigo-50 rounded-full mb-6 border border-indigo-100 shadow-sm relative z-10">
        المرحلة {currentLevelIdx + 1}: {level.name}
      </div>
      
      <p className="text-slate-600 mb-8 text-center text-lg max-w-lg relative z-10">
        المحيط هو المسافة حول الشكل الخارجي، كأنك تمشي على جدار الحديقة! اضغط على كل جدار (ضلع) لجمع طوله.
      </p>

      <div className="w-full max-w-2xl bg-slate-50 p-6 md:p-10 rounded-3xl border-2 border-slate-200 flex flex-col items-center relative z-10">
        
        {interactiveStep === 0 && (
          <div className="text-center mb-6 h-10">
             <motion.span 
               key={currentLevelIdx}
               initial={{ opacity: 0, y:-10 }} animate={{ opacity: 1, y:0 }}
               className="bg-indigo-100 text-indigo-800 px-5 py-2.5 rounded-full font-bold shadow-sm inline-block"
             >
                اضغط على أضلاع ال{level.name} لجمع أطوالها
             </motion.span>
          </div>
        )}

        <div className="relative w-full max-w-sm mb-12 mt-4 select-none" dir="ltr">
           <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-md overflow-visible relative z-0">
              
              {/* Background fill */}
              <polygon 
                 points={level.points.map(p => p.join(',')).join(' ')} 
                 fill="#f8fafc" 
                 stroke="#cbd5e1" strokeWidth="6" strokeDasharray="10 10" 
              />

              {/* The traces (drawn when clicked) */}
              {level.points.map((p, i) => {
                 const nextP = level.points[(i + 1) % level.points.length];
                 return (
                    <g key={'line-group-' + currentLevelIdx + '-' + i}>
                        <motion.line 
                           x1={p[0]} y1={p[1]} x2={nextP[0]} y2={nextP[1]} 
                           stroke="#6366f1" strokeWidth="12" strokeLinecap="round" 
                           initial={{ pathLength: 0, opacity: 0 }} 
                           animate={{ 
                             pathLength: clickedSides[i] ? 1 : 0, 
                             opacity: clickedSides[i] ? 1 : 0 
                           }} 
                           transition={{ duration: 0.6, ease: "easeInOut" }} 
                        />
                        <motion.line 
                           x1={p[0]} y1={p[1]} x2={nextP[0]} y2={nextP[1]} 
                           stroke="#ffffff" strokeWidth="16" strokeLinecap="round" 
                           initial={{ opacity: 0 }} 
                           animate={{ 
                             opacity: clickedSides[i] ? [0, 0.8, 0] : 0,
                             pathLength: clickedSides[i] ? 1 : 0
                           }} 
                           transition={{ duration: 0.8, times: [0, 0.2, 1] }} 
                        />
                     </g>
                 );
              })}
           </svg>
           
           {/* Floating Buttons overlays */}
           {level.points.map((p, i) => {
               const nextP = level.points[(i + 1) % level.points.length];
               const midX = (p[0] + nextP[0]) / 2;
               const midY = (p[1] + nextP[1]) / 2;
               const offset = level.labelsOffset[i];
               
               // convert midX/midY (based on 400x300 viewBox) to percentages
               const leftPercent = (midX / 400) * 100;
               const topPercent = (midY / 300) * 100;
               
               return (
                  <div 
                    key={'btn-' + currentLevelIdx + '-' + i}
                    className="absolute"
                    style={{
                       left: `${leftPercent}%`, 
                       top: `${topPercent}%`,
                       transform: `translate(-50%, -50%) translate(${offset[0]}px, ${offset[1]}px)`
                    }}
                  >
                     <motion.button 
                       whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                       onClick={() => handleSideClick(i)}
                       className={`relative rounded-xl font-black text-xl md:text-2xl px-3 py-1 cursor-pointer transition-colors whitespace-nowrap 
                        ${clickedSides[i] ? 'text-indigo-600 bg-white/80 shadow-sm pointer-events-none drop-shadow-md' : 'text-slate-500 bg-slate-200/80 hover:bg-indigo-300 hover:text-indigo-800'}`
                       }
                     >
                       {level.sides[i]} سم
                     </motion.button>
                  </div>
               );
             })}
        </div>

        {/* Live Summation feedback */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-100 min-h-[5rem] flex items-center justify-center w-full max-w-sm mb-4">
           {renderCurrentSum()}
        </div>

        {/* Calculation Step */}
        <AnimatePresence mode="wait">
           {interactiveStep === 1 && (
             <motion.div 
               key={"calc-" + currentLevelIdx}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="w-full text-center flex flex-col items-center mt-4"
             >
                <div className="bg-indigo-50 p-6 rounded-2xl flex flex-wrap justify-center items-center gap-4 w-full shadow-inner border-2 border-indigo-100 mb-6">
                   <span className="text-xl font-bold text-slate-700">المحيط الكلي =</span>
                   <input 
                     type="number" 
                     value={userSum}
                     onChange={(e) => { setUserSum(e.target.value); setIsCorrect(null); }}
                     className="w-24 bg-white border-b-4 border-slate-300 focus:border-indigo-500 outline-none text-center rounded-xl p-3 font-black text-2xl transition-colors shadow-sm"
                     placeholder="؟"
                     dir="ltr"
                   />
                </div>
                
                {isCorrect === null && (
                  <button 
                    onClick={handleCheck}
                    disabled={!userSum}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-10 py-3.5 rounded-xl font-black text-lg shadow-md transition-all active:scale-95"
                  >
                    تحقق من المجموع
                  </button>
                )}
                
                {isCorrect === true && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-full flex flex-col items-center gap-3 bg-success-50 text-success-800 p-6 rounded-2xl border-2 border-success-200">
                     <div className="flex items-center gap-2 font-black text-2xl"><Check size={32} /> عمل استثنائي!</div>
                     <p className="text-lg font-medium">المحيط يساوي {perimeter} سم، لأنك جمعت الجوانب بشكل صحيح.</p>
                     <button onClick={nextLevel} className="mt-4 bg-success-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md font-bold hover:bg-success-700 transition-colors">
                        <RotateCcw size={20} /> {currentLevelIdx < LEVELS.length - 1 ? 'المرحلة التالية' : 'إعادة التدريب'}
                     </button>
                  </motion.div>
                )}
                
                {isCorrect === false && (
                  <motion.div initial={{ x: [-10, 10, -10, 10, 0] }} className="text-red-600 font-bold bg-red-50 px-6 py-3 rounded-xl border-2 border-red-200 w-full text-lg">
                    حاول جمع الأرقام الموجودة في الصندوق مرة أخرى!
                  </motion.div>
                )}
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    
      {!quizDone && (
         <div className="mt-12 w-full flex justify-center z-50 relative pb-12 px-6">
            <DynamicQuiz topic="PerimeterLesson.tsx" onComplete={() => setQuizDone(true)} />
         </div>
      )}
</div>
  );
}
