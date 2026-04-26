import React, { useState } from 'react';
import { DynamicQuiz } from '../DynamicQuiz';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Check, RotateCcw, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

const PATTERNS = [
  {
    id: 1,
    sequence: ['▲', '■', '▲', '■', '▲', '?'],
    options: ['▲', '■', '●', '★'],
    answer: '■',
    desc: 'نمط متكرر: مثلث، مربع'
  },
  {
    id: 2,
    sequence: ['●', '●', '■', '●', '●', '■', '●', '?'],
    options: ['▲', '■', '●', '★'],
    answer: '●',
    desc: 'نمط متكرر: دائرة دائرة مربع'
  },
  {
    id: 3,
    sequence: ['★', '▲', '■', '★', '▲', '■', '★', '▲', '?'],
    options: ['▲', '■', '●', '★'],
    answer: '■',
    desc: 'نمط متكرر: نجمة مثلث مربع'
  },
  {
    id: 4,
    sequence: ['🔺', '🔻', '🔺', '🔻', '🔺', '?'],
    options: ['🔺', '🔻', '■', '●'],
    answer: '🔻',
    desc: 'مثلث للأعلى، مثلث للأسفل'
  },
  {
    id: 5,
    sequence: ['🚗', '🚕', '🚕', '🚗', '🚕', '🚕', '🚗', '?'],
    options: ['🚗', '🚕', '🚓', '🚌'],
    answer: '🚕',
    desc: 'سيارة حمراء، ثم سيارتي أجرة'
  },
  {
    id: 6,
    sequence: ['🍎', '🍏', '🍌', '🍎', '🍏', '🍌', '🍎', '🍏', '?'],
    options: ['🍎', '🍏', '🍌', '🍉'],
    answer: '🍌',
    desc: 'تفاحة حمراء، تفاحة خضراء، موزة'
  },
  {
    id: 7,
    sequence: ['🐶', '🐱', '🐱', '🐭', '🐶', '🐱', '🐱', '?'],
    options: ['🐶', '🐱', '🐭', '🐰'],
    answer: '🐭',
    desc: 'كلب، قطة، قطة، فأر'
  },
  {
    id: 8,
    sequence: ['❤️', '💙', '💚', '💛', '❤️', '💙', '💚', '?'],
    options: ['❤️', '💙', '💚', '💛'],
    answer: '💛',
    desc: 'قلوب ملونة بالترتيب: أحمر، أزرق، أخضر، أصفر'
  }
];




export function PatternsLesson() {
  const [quizDone, setQuizDone] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const pattern = PATTERNS[currentLevel];

  const handleSelect = (opt: string) => {
    if (opt === pattern.answer) {
       setFeedback('yes');
       confetti({ particleCount: 30, spread: 40, origin: { y: 0.6 } });
       setTimeout(() => {
          setFeedback(null);
          if (currentLevel < PATTERNS.length - 1) {
             setCurrentLevel(c => c + 1);
          } else {
             setShowResult(true);
          }
       }, 1500);
    } else {
       setFeedback('no');
       setTimeout(() => setFeedback(null), 1000);
    }
  };

  const restart = () => {
    setCurrentLevel(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-fuchsia-100 flex flex-col items-center">
        <h3 className="text-3xl font-black text-fuchsia-800 mb-4">أكملت جميع الأنماط!</h3>
        <div className="text-6xl mb-6">🧠</div>
        <p className="text-xl font-bold text-slate-700 mb-8">أنت عبقري في اكتشاف الأنماط الهندسية!</p>
        <button onClick={restart} className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-6 py-3 rounded-full font-bold shadow-sm flex items-center gap-2 transition-transform active:scale-95">
           <RotateCcw size={20} /> العب مرة أخرى
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-fuchsia-100 flex flex-col items-center">
      <div className="bg-fuchsia-100 text-fuchsia-700 p-4 rounded-full mb-6 relative shadow-inner">
        <LayoutGrid size={40} />
      </div>
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center">الأنماط الهندسية</h3>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-lg">
         النمط هو تسلسل من الأشكال يتكرر بترتيب معين. هل يمكنك اكتشاف الشكل المفقود لتكملة النمط؟
      </p>

      <div className="bg-fuchsia-50 px-4 py-1 rounded-full mb-8 text-fuchsia-600 font-bold border border-fuchsia-200">
         النمط {currentLevel + 1} من {PATTERNS.length}
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 w-full max-w-3xl min-h-[140px] items-center">
         <AnimatePresence mode="popLayout">
           {pattern.sequence.map((item, i) => (
              <motion.div
                 key={`${currentLevel}-${i}`}
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: i * 0.1, type: "spring" }}
                 className={`text-4xl md:text-6xl drop-shadow-sm flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl border-2 border-slate-200 shadow-sm
                    ${item === '?' ? 'text-slate-300 border-dashed bg-slate-100/50' : 'text-slate-700'}
                 `}
              >
                 {feedback === 'yes' && item === '?' ? pattern.answer : item}
              </motion.div>
           ))}
         </AnimatePresence>
      </div>

      <div className="text-slate-400 font-medium mb-6 text-sm">اختر الشكل الصحيح لمكان علامة الاستفهام (؟)</div>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-md relative">
         {pattern.options.map((opt, i) => (
            <motion.button
               key={i}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => handleSelect(opt)}
               disabled={feedback !== null}
               className="text-5xl w-24 h-24 bg-white border-4 border-fuchsia-100 rounded-3xl flex items-center justify-center hover:bg-fuchsia-50 hover:border-fuchsia-300 transition-colors drop-shadow-md pb-2"
            >
               {opt}
            </motion.button>
         ))}
         
         <AnimatePresence>
             {feedback === 'no' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute z-20 bg-rose-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 drop-shadow-lg -top-16">
                   حاول مرة أخرى! انظر لتكرار الأشكال بعناية.
                </motion.div>
             )}
         </AnimatePresence>
      </div>
    
      {!quizDone && (
         <div className="mt-12 w-full flex justify-center z-50 relative pb-12 px-6">
            <DynamicQuiz topic="PatternsLesson.tsx" onComplete={() => setQuizDone(true)} />
         </div>
      )}
</div>
  );
}
