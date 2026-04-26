import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const SHAPES = [
  { id: 'heart', name: 'قلب', path: 'M50 80 Q 10 50 10 30 A 20 20 0 0 1 50 30 A 20 20 0 0 1 90 30 Q 90 50 50 80 Z', symLines: ['vertical'] },
  { id: 'square', name: 'مربع', path: 'M20 20 L80 20 L80 80 L20 80 Z', symLines: ['vertical', 'horizontal', 'diag1', 'diag2'] },
  { id: 'rectangle', name: 'مستطيل', path: 'M25 35 L75 35 L75 65 L25 65 Z', symLines: ['vertical', 'horizontal'] },
  { id: 'triangle', name: 'مثلث متطابق الضلعين', path: 'M50 20 L20 80 L80 80 Z', symLines: ['vertical'] },
  { id: 'rhombus', name: 'معين', path: 'M50 10 L80 50 L50 90 L20 50 Z', symLines: ['vertical', 'horizontal'] },
  { id: 'L', name: 'حرف L', path: 'M30 20 L50 20 L50 60 L80 60 L80 80 L30 80 Z', symLines: [] },
  { id: 'star', name: 'نجمة', path: 'M50 15 L60 40 L85 45 L65 60 L70 85 L50 70 L30 85 L35 60 L15 45 L40 40 Z', symLines: ['vertical'] },
  { id: 'butterfly', name: 'فراشة (شكل مبسط)', path: 'M50 10 C30 0 10 20 40 40 C10 60 30 100 50 90 C70 100 90 60 60 40 C90 20 70 0 50 10 Z', symLines: ['vertical'] }
];




export function SymmetryLesson() {
  const [selectedShape, setSelectedShape] = useState<typeof SHAPES[0] | null>(SHAPES[0]);
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  const handleTestLine = (lineId: string) => {
    setActiveLine(lineId);
    if (!selectedShape) return;
    
    if (selectedShape.symLines.includes(lineId)) {
       setFeedback('yes');
       confetti({ particleCount: 30, spread: 40, origin: { y: 0.6 } });
    } else {
       setFeedback('no');
    }
    setTimeout(() => {
       setFeedback(null);
       setActiveLine(null);
    }, 1500);
  };

  const renderShape = () => {
    if (!selectedShape) return null;

    return (
       <div className="relative w-64 h-64 mx-auto mb-8 bg-white border-2 border-slate-100 rounded-3xl shadow-sm flex flex-col items-center justify-center overflow-hidden">
          <svg width="200" height="200" viewBox="0 0 100 100" className="relative z-10 drop-shadow-md">
             <path d={selectedShape.path} fill="#c084fc" stroke="#9333ea" strokeWidth="2" strokeLinejoin="round" />
             
             {/* Lines of symmetry overlays */}
             <AnimatePresence>
                {activeLine === 'vertical' && <motion.line initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} x1="50" y1="0" x2="50" y2="100" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />}
                {activeLine === 'horizontal' && <motion.line initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} x1="0" y1="50" x2="100" y2="50" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />}
                {activeLine === 'diag1' && <motion.line initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} x1="10" y1="10" x2="90" y2="90" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />}
                {activeLine === 'diag2' && <motion.line initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} x1="90" y1="10" x2="10" y2="90" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />}
             </AnimatePresence>
          </svg>
          
          <AnimatePresence>
             {feedback === 'yes' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute z-20 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 drop-shadow-lg">
                   <Check size={20} /> نعم! يطابق النصفين.
                </motion.div>
             )}
             {feedback === 'no' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute z-20 bg-rose-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 drop-shadow-lg">
                   <AlertCircle size={20} /> لا! النصفان مختلفان.
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    );
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-purple-100 flex flex-col items-center">
      <div className="bg-purple-100 text-purple-700 p-4 rounded-full mb-6 relative shadow-inner">
        <Scissors size={40} />
      </div>
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center">خطوط التماثل</h3>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-lg">
         خط التماثل يقسم الشكل إلى نصفين متطابقين تماماً، مثل المرآة! جرب رسم خطوط لترى إن كانت تماثلية.
      </p>

      {/* Shape Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
         {SHAPES.map(s => (
            <button key={s.id} onClick={() => setSelectedShape(s)} className={`px-4 py-2 rounded-full font-bold transition-colors ${selectedShape?.id === s.id ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-purple-100'}`}>
               {s.name}
            </button>
         ))}
      </div>

      {renderShape()}

      {/* Test Controls */}
      <h4 className="text-xl font-bold text-slate-700 mb-4">جرب طي الشكل أو رسم خط وهمي:</h4>
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-xl">
         <button onClick={() => handleTestLine('vertical')} disabled={activeLine !== null} className="bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-2xl font-bold hover:shadow-md transition-all active:scale-95 disabled:opacity-50">
            خط رأسي (|)
         </button>
         <button onClick={() => handleTestLine('horizontal')} disabled={activeLine !== null} className="bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-2xl font-bold hover:shadow-md transition-all active:scale-95 disabled:opacity-50">
            خط أفقي (-)
         </button>
         <button onClick={() => handleTestLine('diag1')} disabled={activeLine !== null} className="bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-2xl font-bold hover:shadow-md transition-all active:scale-95 disabled:opacity-50">
            قطري مائل (\)
         </button>
         <button onClick={() => handleTestLine('diag2')} disabled={activeLine !== null} className="bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-2xl font-bold hover:shadow-md transition-all active:scale-95 disabled:opacity-50">
            قطري مائل (/)
         </button>
      </div>
</div>
  );
}
