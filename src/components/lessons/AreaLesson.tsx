import React, { useState } from 'react';
import { DynamicQuiz } from '../DynamicQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { Grid3X3, Check, RotateCcw, Hand, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const LEVELS = [
  {
    id: 1,
    rows: 4,
    cols: 5,
    mask: [
      [false, true, true, true, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false]
    ]
  },
  {
    id: 2,
    rows: 5,
    cols: 5,
    mask: [
      [false, false, true, false, false],
      [false, true, true, true, false],
      [true, true, true, true, true],
      [false, true, true, true, false],
      [false, false, true, false, false]
    ]
  },
  {
    id: 3,
    rows: 4,
    cols: 4,
    mask: [
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true]
    ]
  },
  {
    id: 4,
    rows: 6,
    cols: 5,
    mask: [
      [true, true, false, false, false],
      [true, true, false, false, false],
      [true, true, false, false, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [false, false, false, false, false]
    ] // L Shape
  },
  {
    id: 5,
    rows: 5,
    cols: 6,
    mask: [
      [true, true, false, false, true, true],
      [true, true, false, false, true, true],
      [true, true, true, true, true, true],
      [true, true, true, true, true, true],
      [false, false, false, false, false, false]
    ] // U Shape
  },
  {
    id: 6,
    rows: 6,
    cols: 6,
    mask: [
      [false, false, true, true, false, false],
      [false, false, true, true, false, false],
      [true, true, true, true, true, true],
      [true, true, true, true, true, true],
      [false, false, true, true, false, false],
      [false, false, true, true, false, false]
    ] // Plus Shape
  },
  {
    id: 7,
    rows: 6,
    cols: 5,
    mask: [
      [false, false, true, false, false],
      [false, true, true, true, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true]
    ] // House Shape
  },
  {
    id: 8,
    rows: 6,
    cols: 7,
    mask: [
      [false, false, true, false, true, false, false],
      [false, true, true, true, true, true, false],
      [true, true, false, true, false, true, true],
      [true, true, true, true, true, true, true],
      [true, false, true, true, true, false, true],
      [true, false, false, false, false, false, true]
    ] // Space Invader
  }
];




export function AreaLesson() {
  const [quizDone, setQuizDone] = useState(false);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const level = LEVELS[currentLevelIdx];

  const actualArea = level.mask.flat().filter(Boolean).length;

  const [grid, setGrid] = useState<boolean[][]>(
    Array(level.rows).fill(null).map(() => Array(level.cols).fill(false))
  );
  
  const [userArea, setUserArea] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{r:number, c:number} | null>(null);
  const [flashCell, setFlashCell] = useState<{r:number, c:number} | null>(null);

  const markedCount = grid.flat().filter(Boolean).length;
  const isFullyColored = markedCount === actualArea;

  const handleDrag = (event: any, info: any) => {
    const clientX = event.clientX || event.changedTouches?.[0]?.clientX;
    const clientY = event.clientY || event.changedTouches?.[0]?.clientY;
    
    if (clientX === undefined || clientY === undefined) {
      setHoveredCell(null);
      return;
    }

    const elements = document.elementsFromPoint(clientX, clientY);
    const targetCell = elements.find(el => el.hasAttribute('data-r') && el.hasAttribute('data-c'));
    
    if (targetCell) {
       const r = parseInt(targetCell.getAttribute('data-r') || '-1', 10);
       const c = parseInt(targetCell.getAttribute('data-c') || '-1', 10);
       if (r >= 0 && c >= 0 && level.mask[r][c] && !grid[r][c]) {
          setHoveredCell({ r, c });
       } else {
          setHoveredCell(null);
       }
    } else {
      setHoveredCell(null);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    setHoveredCell(null);
    const clientX = event.clientX || event.changedTouches?.[0]?.clientX;
    const clientY = event.clientY || event.changedTouches?.[0]?.clientY;
    
    if (clientX === undefined || clientY === undefined) return;

    const elements = document.elementsFromPoint(clientX, clientY);
    const targetCell = elements.find(el => el.hasAttribute('data-r') && el.hasAttribute('data-c'));
    
    if (targetCell) {
       const r = parseInt(targetCell.getAttribute('data-r') || '-1', 10);
       const c = parseInt(targetCell.getAttribute('data-c') || '-1', 10);
       
       if (r >= 0 && c >= 0 && level.mask[r][c] && !grid[r][c]) {
          const newGrid = [...grid];
          newGrid[r] = [...grid[r]];
          newGrid[r][c] = true;
          setGrid(newGrid);
          setIsCorrect(null);
          
          setFlashCell({r, c});
          setTimeout(() => setFlashCell(null), 600);

          if (navigator.vibrate) {
            navigator.vibrate(50);
          }
       }
    }
  };

  const handleCheck = () => {
    if (parseInt(userArea, 10) === actualArea && isFullyColored) {
      setIsCorrect(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#0ea5e9', '#38bdf8', '#7dd3fc']
      });
    } else {
      setIsCorrect(false);
    }
  };

  const nextLevel = () => {
    const nextIdx = (currentLevelIdx + 1) % LEVELS.length;
    setCurrentLevelIdx(nextIdx);
    setGrid(Array(LEVELS[nextIdx].rows).fill(null).map(() => Array(LEVELS[nextIdx].cols).fill(false)));
    setUserArea('');
    setIsCorrect(null);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-sky-100 flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="bg-sky-100 text-sky-700 p-4 rounded-full mb-6 relative z-10 shadow-inner">
        <Grid3X3 size={40} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center relative z-10">قياس المساحة</h3>
      <div className="flex items-center gap-2 text-sky-600 font-bold px-4 py-1.5 bg-sky-50 rounded-full mb-6 border border-sky-100 shadow-sm relative z-10">
        المرحلة {currentLevelIdx + 1}
      </div>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-xl relative z-10">
        المساحة هي عدد المربعات التي تغطي الشكل من الداخل. قم <b>بسحب</b> المربعات الزرقاء وأسقطها داخل الشكل الرمادي لتسد الفراغات، ثم احسبها.
      </p>

      <div className="w-full max-w-2xl bg-sky-50/50 p-6 md:p-10 rounded-3xl border-2 border-sky-100 flex flex-col items-center relative z-10">
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-8">
           
           {/* The Drag Supply Box */}
           <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-sm border-2 border-dashed border-sky-300 w-32 relative">
              <span className="text-sky-800 font-bold mb-4 flex items-center justify-center gap-2">
                 <Hand size={18} /> اسحبني
              </span>
              <div className="relative w-16 h-16">
                 {/* Multiple dummy squares for visual depth */}
                 <div className="absolute inset-0 bg-sky-200 rounded-lg transform translate-x-1 translate-y-1"></div>
                 <div className="absolute inset-0 bg-sky-300 rounded-lg transform translate-x-0.5 translate-y-0.5"></div>
                 
                 {/* The actual draggable element */}
                 {!isFullyColored && (
                    <motion.div
                       drag
                       dragSnapToOrigin
                       onDrag={handleDrag}
                       onDragEnd={handleDragEnd}
                       whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                       // While dragging, disable pointer events so elementFromPoint sees the grid beneath it
                       className="absolute inset-0 bg-sky-500 rounded-lg border-2 border-sky-600 shadow-md cursor-grab active:cursor-grabbing z-50 flex flex-col items-center justify-center group"
                    >
                        <span className="text-white opacity-50 group-hover:opacity-100 transition-opacity">1</span>
                    </motion.div>
                 )}
              </div>
              <div className="mt-4 text-slate-400 text-sm font-bold bg-slate-100 px-3 py-1 rounded-full">
                 الباقي: {actualArea - markedCount}
              </div>
           </div>

           {/* The Target Grid Area */}
           <div className="bg-white p-6 rounded-2xl shadow-inner border-4 border-slate-200">
             <div className="flex flex-col gap-1.5" dir="ltr">
                {Array.from({ length: level.rows }).map((_, r) => (
                   <div key={r} className="flex gap-1.5">
                      {Array.from({ length: level.cols }).map((_, c) => {
                         const isTarget = level.mask[r][c];
                         const isFilled = grid[r][c];
                         const isHovered = hoveredCell?.r === r && hoveredCell?.c === c;
                         const isFlashing = flashCell?.r === r && flashCell?.c === c;
                         
                         let cellClass = "w-10 h-10 md:w-14 md:h-14 rounded-lg transition-all duration-200 border-2 relative overflow-hidden flex items-center justify-center ";
                         if (isFilled) {
                            cellClass += "bg-sky-500 border-sky-600 shadow-sm z-10 scale-105";
                         } else if (isHovered && isTarget) {
                            cellClass += "bg-sky-400 border-sky-500 shadow-md scale-110 z-20";
                         } else if (isTarget) {
                            cellClass += "bg-slate-200 border-dashed border-slate-400 opacity-60";
                         } else {
                            cellClass += "bg-transparent border-transparent pointer-events-none";
                         }

                         return (
                           <div 
                              key={c}
                              data-r={isTarget ? r.toString() : undefined}
                              data-c={isTarget ? c.toString() : undefined}
                              className={cellClass}
                           >
                              {isFlashing && (
                                <motion.div 
                                  initial={{ scale: 0, opacity: 1, rotate: -45 }}
                                  animate={{ scale: [1, 2, 0], opacity: [1, 1, 0], rotate: 45 }}
                                  transition={{ duration: 0.8, type: "spring" }}
                                  className="absolute inset-0 z-50 flex items-center justify-center text-yellow-300 drop-shadow-md"
                                >
                                  <Star fill="currentColor" size={32} />
                                </motion.div>
                              )}
                              {isTarget && !isFilled && !isHovered && <div className="w-1 h-1 bg-slate-300 rounded-full"></div>}
                              {isHovered && !isFilled && <span className="text-white opacity-50">+</span>}
                              {isFilled && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute text-white font-bold z-10"><Check size={20}/></motion.div>}
                           </div>
                         )
                      })}
                   </div>
                ))}
             </div>
           </div>
        </div>

        {/* Input Area */}
        <div className="text-center w-full max-w-sm mt-4">
           <AnimatePresence mode="popLayout">
              {isFullyColored ? (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center gap-3 bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm w-full">
                       <span className="font-bold text-slate-700 text-lg">المساحة = </span>
                       <input 
                          type="number" 
                          value={userArea}
                          onChange={(e) => { setUserArea(e.target.value); setIsCorrect(null); }}
                          className="w-24 bg-sky-50 border-b-4 border-slate-300 focus:border-sky-500 outline-none text-center rounded-xl p-3 font-black text-2xl transition-colors"
                          placeholder="؟"
                          dir="ltr"
                       />
                       <span className="font-bold text-slate-500 text-lg">مربع</span>
                    </div>
                    
                    {isCorrect === null && (
                      <button 
                        onClick={handleCheck}
                        disabled={!userArea}
                        className="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold text-lg shadow-md transition-all active:scale-95 w-full"
                      >
                        تحقق من المساحة
                      </button>
                    )}
                 </motion.div>
              ) : (
                 <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-sky-100 text-sky-800 px-6 py-4 rounded-xl font-bold border-2 border-sky-200 inline-block animate-pulse shadow-sm">
                    قم بسحب المربعات وإسقاطها داخل الشكل الرمادي!
                 </motion.div>
              )}
           </AnimatePresence>

           <AnimatePresence>
             {isCorrect === true && (
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6 flex flex-col items-center gap-3 bg-success-50 text-success-800 p-6 rounded-2xl border-2 border-success-200 w-full">
                  <div className="flex items-center gap-2 font-black text-2xl"><Check size={32} /> أحسنت!</div>
                  <p className="text-lg font-medium">مساحة هذا الشكل تساوي {actualArea} وحدات مربعة تماماً.</p>
                  <button onClick={nextLevel} className="mt-4 bg-success-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md font-bold hover:bg-success-700 transition-colors">
                     <RotateCcw size={20} /> المرحلة التالية
                  </button>
               </motion.div>
             )}
             
             {isCorrect === false && (
               <motion.div initial={{ x: [-10, 10, -10, 10, 0] }} className="mt-6 text-red-600 font-bold bg-red-50 px-6 py-4 rounded-xl border-2 border-red-200 text-lg">
                 خطأ! هل جمعت عدد المربعات الملونة بدقة؟
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    
      {!quizDone && (
         <div className="mt-12 w-full flex justify-center z-50 relative pb-12 px-6">
            <DynamicQuiz topic="AreaLesson.tsx" onComplete={() => setQuizDone(true)} />
         </div>
      )}
</div>
  );
}
