import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SquareDashed, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const SHAPES = [
  { id: 'tri', name: 'مثلث', sides: 3, angles: 3, isPolygon: true, path: 'M50 10 L90 90 L10 90 Z' },
  { id: 'quad', name: 'رباعي', sides: 4, angles: 4, isPolygon: true, path: 'M10 10 L90 10 L90 90 L10 90 Z' },
  { id: 'pent', name: 'خماسي', sides: 5, angles: 5, isPolygon: true, path: 'M50 10 L90 40 L75 90 L25 90 L10 40 Z' },
  { id: 'hex', name: 'سداسي', sides: 6, angles: 6, isPolygon: true, path: 'M50 10 L90 25 L90 75 L50 90 L10 75 L10 25 Z' },
  { id: 'hept', name: 'سباعي', sides: 7, angles: 7, isPolygon: true, path: 'M50 10 L85 25 L95 60 L70 90 L30 90 L5 60 L15 25 Z' },
  { id: 'oct', name: 'ثماني', sides: 8, angles: 8, isPolygon: true, path: 'M30 10 L70 10 L90 30 L90 70 L70 90 L30 90 L10 70 L10 30 Z' },
  { id: 'circle', name: 'دائرة', sides: 0, angles: 0, isPolygon: false, type: 'circle' },
  { id: 'open', name: 'شكل مفتوح', sides: 0, angles: 0, isPolygon: false, path: 'M10 10 L90 10 L90 90 L10 90', strokeOnly: true },
  { id: 'curve', name: 'شكل منحني', sides: 0, angles: 0, isPolygon: false, path: 'M10 50 Q 50 10 90 50 Q 50 90 10 50 Z' },
  { id: 'open2', name: 'خط منكسر', sides: 0, angles: 0, isPolygon: false, path: 'M10 50 L30 20 L50 80 L70 20 L90 50', strokeOnly: true },
];




export function Shapes2DLesson() {
  const [mode, setMode] = useState<'learn' | 'sort'>('learn');
  const [selectedShape, setSelectedShape] = useState<typeof SHAPES[0] | null>(null);

  const [sortIndex, setSortIndex] = useState(0);
  const [sortFeedback, setSortFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleStartSort = () => {
    setMode('sort');
    setSortIndex(0);
    setSortFeedback(null);
  };

  const handleSort = (isPolygon: boolean) => {
    const current = SHAPES[sortIndex];
    if (current.isPolygon === isPolygon) {
       setSortFeedback('correct');
       confetti({ particleCount: 30, spread: 40, origin: { y: 0.6 } });
       setTimeout(() => {
          setSortFeedback(null);
          if (sortIndex < SHAPES.length - 1) {
             setSortIndex(s => s + 1);
          } else {
             setMode('learn');
          }
       }, 1500);
    } else {
       setSortFeedback('wrong');
       setTimeout(() => setSortFeedback(null), 1000);
    }
  };

  const renderShapeSvg = (shape: typeof SHAPES[0], size = 100) => {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md">
        {shape.type === 'circle' ? (
           <circle cx="50" cy="50" r="40" fill="#fbcfe8" stroke="#ec4899" strokeWidth="6" />
        ) : (
           <path 
             d={shape.path} 
             fill={shape.strokeOnly ? 'none' : '#fbcfe8'} 
             stroke="#ec4899" 
             strokeWidth="6" 
             strokeLinecap="round"
             strokeLinejoin="round"
           />
        )}
      </svg>
    );
  };

  if (mode === 'sort') {
    const current = SHAPES[sortIndex];
    return (
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-pink-100 flex flex-col items-center min-h-[400px] justify-center">
        <h3 className="text-3xl font-black text-slate-800 mb-8 text-center">هل هذا الشكل مضلع؟</h3>
        <p className="text-slate-500 mb-8 text-center max-w-md">المضلع هو شكل مستوٍ مغلق مكون من قطع مستقيمة (ليس فيه منحنيات ولا فتحات).</p>
        
        <AnimatePresence mode="wait">
           <motion.div
             key={current.id}
             initial={{ scale: 0.5, opacity: 0 }}
             animate={{ 
                scale: sortFeedback === 'correct' ? 1.2 : 1, 
                rotate: sortFeedback === 'wrong' ? [-10, 10, -10, 10, 0] : 0,
                opacity: 1 
             }}
             exit={{ scale: 0.5, opacity: 0, y: -50 }}
             className="mb-12 relative"
           >
              {renderShapeSvg(current, 150)}
              {sortFeedback === 'correct' && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-full p-1"><Check size={32}/></motion.div>}
              {sortFeedback === 'wrong' && <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-1"><AlertCircle size={32}/></motion.div>}
           </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 w-full max-w-md">
           <button onClick={() => handleSort(true)} className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 py-4 rounded-2xl font-black text-xl border-2 border-emerald-300 shadow-sm transition-transform active:scale-95">
              مضلع ✓
           </button>
           <button onClick={() => handleSort(false)} className="flex-1 bg-rose-100 hover:bg-rose-200 text-rose-700 py-4 rounded-2xl font-black text-xl border-2 border-rose-300 shadow-sm transition-transform active:scale-95">
              ليس مضلعاً ✗
           </button>
        </div>
      </div>
    );
  }

  const polygons = SHAPES.filter(s => s.isPolygon);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-pink-100 flex flex-col items-center">
      <div className="bg-pink-100 text-pink-700 p-4 rounded-full mb-6 relative shadow-inner">
        <SquareDashed size={40} />
      </div>
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center">الأشكال المستوية (المضلعات)</h3>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-lg">
         المضلع شكل مغلق مكون من قطع مستقيمة (أضلاع). وتسمى المضلعات بحسب عدد أضلاعها!
      </p>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl mb-8">
         {polygons.map(shape => (
           <motion.button
             key={shape.id}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => setSelectedShape(shape)}
             className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-4 transition-colors min-w-[140px] ${selectedShape?.id === shape.id ? 'bg-pink-50 border-pink-400 shadow-md scale-105 z-10' : 'bg-slate-50 border-slate-200 hover:bg-pink-50'}`}
           >
             {renderShapeSvg(shape, 80)}
             <span className="font-black text-slate-700">{shape.name}</span>
           </motion.button>
         ))}
      </div>

      <AnimatePresence>
        {selectedShape && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="w-full max-w-2xl bg-pink-50 rounded-3xl border-2 border-pink-200 shadow-sm flex flex-col items-center p-6 overflow-hidden mb-8"
           >
              <h4 className="text-2xl font-black text-pink-800 mb-4">هذا {selectedShape.name}</h4>
              <div className="flex gap-8">
                 <div className="flex flex-col items-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-pink-100">
                    <span className="text-slate-400 text-sm font-bold">عدد الأضلاع</span>
                    <span className="text-4xl font-black text-pink-600">{selectedShape.sides}</span>
                 </div>
                 <div className="flex flex-col items-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-pink-100">
                    <span className="text-slate-400 text-sm font-bold">عدد الزوايا</span>
                    <span className="text-4xl font-black text-pink-600">{selectedShape.angles}</span>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={handleStartSort}
        className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-black text-xl shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
      >
         لعبة التصنيف! مضلع أم لا؟
      </button>
</div>
  );
}
