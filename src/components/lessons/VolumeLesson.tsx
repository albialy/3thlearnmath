import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Check, RotateCcw, Variable } from 'lucide-react';
import confetti from 'canvas-confetti';

const LEVELS = [
  {
    id: 1,
    name: 'تحدي الأساس',
    grid: [
      [2, 2],
      [2, 2]
    ] // 2x2 with height 2 = 8
  },
  {
    id: 2,
    name: 'السُّلم',
    grid: [
      [3, 2, 1],
      [3, 2, 1]
    ] // 2 rows of stairs (3+2+1=6)*2 = 12
  },
  {
    id: 3,
    name: 'حرف L',
    grid: [
      [3, 3, 3],
      [3, 0, 0]
    ] // 3x3x1 + 3x1 = 9 + 3 = 12
  },
  {
    id: 4,
    name: 'الحوض',
    grid: [
      [3, 3, 3],
      [3, 1, 3],
      [3, 3, 3]
    ] // 3x3 grid, edges height 3, middle height 1 = 8*3 + 1 = 25
  },
  {
    id: 5,
    name: 'الهرم الصغير',
    grid: [
      [1, 1, 1],
      [1, 2, 1],
      [1, 1, 1]
    ] // 3x3 base (height 1) + 1 peak = 9 + 1 = 10
  }
];

const DrawCube = ({ x, y, z, offsetY = 0 }: { x: number, y: number, z: number, offsetY?: number }) => {
  const hw = 24; // Half-width
  const hh = 12; // Half-height
  const h = 26;  // Total height
  
  // Isometric projection math
  const sx = (x - y) * hw;
  const sy = (x + y) * hh - z * h - offsetY;

  // Paths
  const top = `0,${-hh} ${hw},0 0,${hh} ${-hw},0`;
  const left = `${-hw},0 0,${hh} 0,${hh + h} ${-hw},${h}`;
  const right = `0,${hh} ${hw},0 ${hw},${h} 0,${hh + h}`;

  return (
    <motion.g 
       initial={{ x: sx, y: sy - 50, opacity: 0 }} 
       animate={{ x: sx, y: sy, opacity: 1 }}
       transition={{ type: "spring", delay: (x+y+z) * 0.05 }}
       className="hover:brightness-110 cursor-pointer"
    >
      {/* Shadows below depending on z (optional, but keep simple) */}
      <polygon points={top} fill="#fb923c" stroke="#ea580c" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={left} fill="#f97316" stroke="#ea580c" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={right} fill="#c2410c" stroke="#ea580c" strokeWidth="1" strokeLinejoin="round" />
      
      {/* Light highlights to give 3D pop */}
      <polyline points={`0,${-hh} ${hw},0`} stroke="#fdba74" strokeWidth="1" fill="none" />
      <polyline points={`0,${-hh} ${-hw},0`} stroke="#fdba74" strokeWidth="1" fill="none" />
      <polyline points={`${-hw},0 0,${hh}`} stroke="#fb923c" strokeWidth="1" fill="none" />
    </motion.g>
  );
}

export function VolumeLesson() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [userVolume, setUserVolume] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showLayers, setShowLayers] = useState(false);

  const level = LEVELS[currentLevelIdx];
  
  // Calculate total cubes and layer breakdown
  let targetVolume = 0;
  const layerCounts: Record<number, number> = {};
  level.grid.forEach(row => {
    row.forEach(h => {
      targetVolume += h;
      for (let z=0; z<h; z++) {
         layerCounts[z] = (layerCounts[z] || 0) + 1;
      }
    });
  });

  // Prepare rendering blocks sorted by depth
  const blocks: {x:number, y:number, z:number}[] = [];
  // For proper isometric depth: x asc, y asc, z asc
  for (let x = 0; x < level.grid.length; x++) {
    for (let y = 0; y < level.grid[x].length; y++) {
      for (let z = 0; z < level.grid[x][y]; z++) {
        blocks.push({ x, y, z });
      }
    }
  }

  blocks.sort((a, b) => {
     if (a.x !== b.x) return a.x - b.x;
     if (a.y !== b.y) return a.y - b.y;
     return a.z - b.z;
  });

  const handleCheck = () => {
    if (parseInt(userVolume, 10) === targetVolume) {
      setIsCorrect(true);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 }, colors: ['#f97316', '#fb923c'] });
    } else {
      setIsCorrect(false);
    }
  };

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(currentLevelIdx + 1);
    } else {
      setCurrentLevelIdx(0); // Restart or finish
    }
    setUserVolume('');
    setIsCorrect(null);
    setShowLayers(false);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-orange-100 flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="bg-orange-100 text-orange-700 p-4 rounded-full mb-6 relative z-10 shadow-inner">
        <Box size={40} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center relative z-10">إيجاد الحجم</h3>
      <div className="flex items-center gap-2 text-orange-600 font-bold px-4 py-1.5 bg-orange-50 rounded-full mb-6 border border-orange-100 shadow-sm relative z-10">
        المرحلة {currentLevelIdx + 1}: {level.name}
      </div>
      
      <p className="text-slate-600 mb-8 text-center text-lg max-w-xl relative z-10">
        الحجم هو عدد الوحدات المكعبة التي تملأ حيزاً يشغله المجسم. <b>كم عدد المكعبات التي يتكون منها هذا الشكل؟</b> تذكر أن تعد المكعبات المخفية في الأسفل!
      </p>

      <div className="w-full max-w-2xl bg-orange-50/50 p-6 md:p-10 rounded-3xl border-2 border-orange-100 flex flex-col items-center relative z-10">
         
         <div className="w-full flex justify-between items-start mb-4 relative z-10">
            <button 
               onClick={() => setShowLayers(!showLayers)}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-sm shadow-sm border-2
                  ${showLayers ? 'bg-orange-600 text-white border-orange-700' : 'bg-white text-orange-600 border-orange-200 hover:bg-orange-100'}`}
            >
               <Variable size={18} />
               {showLayers ? 'إخفاء التفكيك' : 'تفكيك الطبقات لمساعدتي'}
            </button>
            <div className={`transition-all duration-300 ${showLayers ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'} bg-white p-3 rounded-xl border-2 border-orange-200 shadow-sm text-sm font-bold text-slate-700 flex flex-col gap-1`}>
               {Object.entries(layerCounts).sort((a,b) => parseInt(b[0]) - parseInt(a[0])).map(([z, count]) => (
                 <div key={z} className="flex justify-between gap-4">
                   <span>الطبقة رقم {parseInt(z) + 1} (من الأسفل):</span>
                   <span className="text-orange-600">{count} مكعبات</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Isometric Viewer */}
         <div className="w-full max-w-[300px] h-64 md:h-80 flex justify-center items-center relative mb-8">
            <svg viewBox="-150 -100 300 300" className="w-full h-full drop-shadow-xl overflow-visible">
              <g transform="translate(0, 100)">
                 {blocks.map((b, i) => (
                    <g key={`${currentLevelIdx}-${b.x}-${b.y}-${b.z}`}>
                       <DrawCube 
                          x={b.x} y={b.y} z={b.z} 
                          offsetY={showLayers ? b.z * 50 : 0} 
                       />
                    </g>
                 ))}
              </g>
            </svg>
         </div>

         {/* Interactive Input */}
         <div className="text-center w-full max-w-sm mt-4">
           <AnimatePresence mode="wait">
              {isCorrect === null || isCorrect === false ? (
                 <motion.div key="input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{opacity:0, scale:0.9}} className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center gap-3 bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm w-full relative group">
                       <span className="font-bold text-slate-700 text-lg">الحجم = </span>
                       <input 
                          type="number" 
                          value={userVolume}
                          onChange={(e) => { setUserVolume(e.target.value); setIsCorrect(null); }}
                          className="w-24 bg-orange-50 border-b-4 border-slate-300 focus:border-orange-500 outline-none text-center rounded-xl p-3 font-black text-2xl transition-colors z-10"
                          placeholder="؟"
                          dir="ltr"
                       />
                       <span className="font-bold text-slate-500 text-lg leading-tight text-right w-16">وحدة مكعبة</span>
                    </div>
                    
                    <button 
                      onClick={handleCheck}
                      disabled={!userVolume}
                      className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold text-lg shadow-md transition-all active:scale-95 w-full flex justify-center items-center gap-2"
                    >
                      <Variable size={20} /> تحقق من العدد
                    </button>
                    
                    {isCorrect === false && (
                       <motion.div initial={{ x: [-10, 10, -10, 10, 0] }} className="mt-2 text-red-600 font-bold bg-red-50 px-6 py-3 rounded-xl border-2 border-red-200 text-base w-full">
                         إجابة غير صحيحة. حاول أن تتخيل الطبقات السفلية وتعدها!
                       </motion.div>
                    )}
                 </motion.div>
              ) : (
                 <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-3 bg-success-50 text-success-800 p-6 rounded-2xl border-2 border-success-200 w-full">
                    <div className="flex items-center gap-2 font-black text-2xl"><Check size={32} /> ممتاز! عين صقر!</div>
                    <p className="text-lg font-medium">حجم هذا المجسم هو <b>{targetVolume}</b> وحدات مكعبة.</p>
                    <button onClick={nextLevel} className="mt-4 bg-success-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-md font-bold hover:bg-success-700 transition-colors">
                       <RotateCcw size={20} /> {currentLevelIdx < LEVELS.length - 1 ? 'المرحلة التالية' : 'إعادة التحدي'}
                    </button>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
