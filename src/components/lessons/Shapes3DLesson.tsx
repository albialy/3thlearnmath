import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Cylinder, Circle, Triangle, Check, ArrowLeft, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const SHAPES = [
  { id: 'cube', name: 'مكعب', faces: 6, edges: 12, vertices: 8, icon: '🧊', desc: 'كل أوجهه مربعات متطابقة.' },
  { id: 'prism', name: 'متوازي مستطيلات', faces: 6, edges: 12, vertices: 8, icon: '🧃', desc: 'أوجهه على شكل مستطيلات.' },
  { id: 'cone', name: 'مخروط', faces: 1, edges: 0, vertices: 1, icon: '🥳', desc: 'له قاعدة دائرية ورأس واحد.' },
  { id: 'pyramid', name: 'هرم رباعي', faces: 5, edges: 8, vertices: 5, icon: '⛺', desc: 'له قاعدة رباعية وأوجه مثلثة.' },
  { id: 'cylinder', name: 'أسطوانة', faces: 2, edges: 0, vertices: 0, icon: '🥫', desc: 'لها قاعدتان دائريتان وليس لها أحرف.' },
  { id: 'sphere', name: 'كرة', faces: 0, edges: 0, vertices: 0, icon: '⚽', desc: 'ليس لها أوجه ولا أحرف ولا رؤوس.' },
];




export function Shapes3DLesson() {
  const [mode, setMode] = useState<'learn' | 'challenge'>('learn');
  const [selectedShape, setSelectedShape] = useState<typeof SHAPES[0] | null>(null);
  
  // Challenge State
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleStartChallenge = () => {
    setMode('challenge');
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(s => s + 1);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.1); 
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    }
    
    setTimeout(() => {
      if (currentQ < SHAPES.length - 1) {
        setCurrentQ(q => q + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (mode === 'challenge') {
    if (showResult) {
      return (
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-indigo-100 flex flex-col items-center">
          <h3 className="text-3xl font-black text-indigo-800 mb-4">انتهى التحدي!</h3>
          <div className="text-6xl mb-6">🏆</div>
          <p className="text-xl font-bold text-slate-700 mb-8">لقد أجبت بشكل صحيح على {score} من {SHAPES.length}</p>
          <div className="flex gap-4">
             <button onClick={handleStartChallenge} className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-sm flex items-center gap-2">
               <RotateCcw size={20} /> العودة للتحدي
             </button>
             <button onClick={() => setMode('learn')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-bold shadow-sm flex items-center gap-2">
               <ArrowLeft size={20} /> صفحة التعلم
             </button>
          </div>
        </div>
      );
    }

    const targetShape = SHAPES[currentQ];
    // Generate options
    const options = [...SHAPES].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!options.includes(targetShape)) {
       options[0] = targetShape;
    }
    options.sort(() => Math.random() - 0.5);

    return (
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-indigo-100 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8">
           <button onClick={() => setMode('learn')} className="text-slate-400 hover:text-slate-600"><ArrowLeft size={24} /></button>
           <div className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full font-bold text-sm">سؤال {currentQ + 1} من {SHAPES.length}</div>
           <div className="w-6"></div> {/* Spacer */}
        </div>

        <h3 className="text-3xl font-black text-slate-800 mb-8 text-center">أين هو الـ <span className="text-indigo-600 border-b-4 border-indigo-300">{targetShape.name}</span>؟</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
           {options.map((opt, i) => (
              <motion.button 
                 key={i}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => handleAnswer(opt.id === targetShape.id)}
                 className="bg-slate-50 border-2 border-slate-200 p-8 rounded-3xl flex flex-col items-center gap-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-center"
              >
                 <span className="text-7xl drop-shadow-md">{opt.icon}</span>
              </motion.button>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-indigo-100 flex flex-col items-center">
      <div className="bg-indigo-100 text-indigo-700 p-4 rounded-full mb-6 relative shadow-inner">
        <Box size={40} />
      </div>
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center">المجسمات الهندسية</h3>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-lg">
         المجسم الهندسي هو شكل ثلاثي الأبعاد (له طول وعرض وارتفاع). اكتشف خصائص كل مجسم!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
         {SHAPES.map(shape => (
           <motion.button
             key={shape.id}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => setSelectedShape(shape)}
             className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-colors ${selectedShape?.id === shape.id ? 'bg-indigo-500 border-indigo-700 text-white shadow-lg scale-105 z-10' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50'}`}
           >
             <span className="text-5xl drop-shadow-sm">{shape.icon}</span>
             <span className="font-black text-lg">{shape.name}</span>
           </motion.button>
         ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedShape && (
           <motion.div 
             key={selectedShape.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="w-full max-w-3xl bg-indigo-50 p-6 md:p-8 rounded-3xl border-2 border-indigo-200 shadow-sm flex flex-col md:flex-row items-center gap-8"
           >
              <div className="text-9xl drop-shadow-xl animate-bounce-slow">
                 {selectedShape.icon}
              </div>
              <div className="flex-1 flex flex-col gap-4">
                 <h4 className="text-3xl font-black text-indigo-800">{selectedShape.name}</h4>
                 <p className="text-slate-600 font-medium">{selectedShape.desc}</p>
                 
                 <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 flex flex-col items-center shadow-sm">
                       <span className="text-slate-400 text-sm font-bold">الأوجه</span>
                       <span className="text-2xl font-black text-indigo-600">{selectedShape.faces}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 flex flex-col items-center shadow-sm">
                       <span className="text-slate-400 text-sm font-bold">الأحرف</span>
                       <span className="text-2xl font-black text-indigo-600">{selectedShape.edges}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-indigo-100 flex flex-col items-center shadow-sm">
                       <span className="text-slate-400 text-sm font-bold">الرؤوس</span>
                       <span className="text-2xl font-black text-indigo-600">{selectedShape.vertices}</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={handleStartChallenge}
        className="mt-10 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full font-black text-xl shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
      >
         <Check size={24} />
         اختبر معلوماتك!
      </button>
</div>
  );
}
