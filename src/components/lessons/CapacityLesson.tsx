import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Check, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const ITEMS = [
  { id: 1, name: 'سطل ماء', icon: '🪣', unit: 'لتر', explanation: 'السطل الكبير الذي نستخدمه لغسيل السيارة أو تنظيف الأرضية يتسع للكثير من الماء، لذلك نحتاج لقياسه بوحدة "اللتر" الكبيرة.' },
  { id: 2, name: 'ملعقة عسل', icon: '🥄', unit: 'مللتر', explanation: 'عسل النحل اللذيذ الذي نأخذه في الملعقة قليل جداً، لذلك نستخدم "المللتر" لقياس الكميات الصغيرة مثل هذه.' },
  { id: 3, name: 'قطارة دواء', icon: '💧', unit: 'مللتر', explanation: 'قطرات العين أو الدواء دقيقة جداً! قطرة واحدة تكاد تساوي مللتراً واحداً فقط.' },
  { id: 4, name: 'بركة أطفال', icon: '🏊', unit: 'لتر', explanation: 'واو! بركة السباحة تحتاج للكثير جداً من الماء لتمتلئ ونستطيع اللعب فيها، بالتأكيد نستخدم اللترات.' },
  { id: 5, name: 'فنجان قهوة', icon: '☕', unit: 'مللتر', explanation: 'فنجان القهوة الساخنة الذي يشربه والدك صغير الحجم، نستخدم المللتر لقياس هذا الكوب الصغير.' },
  { id: 6, name: 'حوض سمك كبير', icon: '🐟', unit: 'لتر', explanation: 'الأسماك تحب السباحة في مساحات مائية واسعة، حوض السمك يتسع للكثير من اللترات لتعيش الأسماك براحة.' },
  { id: 7, name: 'علبة عصير صغيرة', icon: '🧃', unit: 'مللتر', explanation: 'علبة العصير اللذيذة التي نأخذها للمدرسة تحتوي على مئات المللترات المنعشة.' },
  { id: 8, name: 'زجاجة ماء للرياضة', icon: '🍼', unit: 'لتر', explanation: 'عندما نلعب الرياضة نحتاج لزجاجة ماء كبيرة لنرتوي، وهذه الزجاجة غالباً تتسع للتر واحد من الماء.' },
  { id: 9, name: 'برميل مطر', icon: '🛢️', unit: 'لتر', explanation: 'البرميل الضخم الذي يجمع ماء المطر يمكنه تخزين كمية هائلة تساوي عشرات اللترات.' },
  { id: 10, name: 'حقنة طبية', icon: '💉', unit: 'مللتر', explanation: 'الطبيب يحتاج لقياس الدواء بدقة شديدة داخل الحقنة، لذلك يستخدمون المللتر.' },
  { id: 11, name: 'كوب حليب', icon: '🥛', unit: 'مللتر', explanation: 'كوب الحليب الدافئ الصباحي يحتوي على حوالي 250 مللتراً ليمنحك الطاقة الكافية.' },
  { id: 12, name: 'خزان مياه المنزل', icon: '🏢', unit: 'لتر', explanation: 'الخزان الضخم فوق سطح المنزل مليء بآلاف اللترات لنستخدمها في الاستحمام والطبخ كل يوم!' },
];

export function CapacityLesson() {
  const [items, setItems] = useState(ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sorted, setSorted] = useState<{ ml: any[], l: any[] }>({ ml: [], l: [] });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentItem = items[currentIndex];
  const isComplete = currentIndex >= items.length;

  const playSound = (type: 'correct' | 'wrong' | 'pop') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      }
    } catch (e) {}
  };

  const handleSelect = (selectedUnit: 'مللتر' | 'لتر') => {
    if (feedback || isComplete) return;

    playSound('pop');

    if (currentItem.unit === selectedUnit) {
      setTimeout(() => playSound('correct'), 100);
      setFeedback('correct');
      
      setTimeout(() => {
        setSorted(prev => {
           return {
             ml: selectedUnit === 'مللتر' ? [...prev.ml, currentItem] : prev.ml,
             l: selectedUnit === 'لتر' ? [...prev.l, currentItem] : prev.l
           };
        });
        setFeedback(null);
        setCurrentIndex(prev => prev + 1);
        
        if (currentIndex === items.length - 1) {
           confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 }, colors: ['#3b82f6', '#60a5fa'] });
        }
      }, 800);
      
    } else {
      playSound('wrong');
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const restart = () => {
    setSorted({ ml: [], l: [] });
    setCurrentIndex(0);
    setFeedback(null);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-blue-100 flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="bg-blue-100 text-blue-700 p-4 rounded-full mb-6 relative z-10 shadow-inner">
        <Droplet size={40} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center relative z-10">وحدات السعة المترية</h3>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-xl relative z-10">
        السعة هي كمية السائل داخل وعاء. استخدم <b>المللتر (مل)</b> للأوعية الصغيرة جداً، و<b>اللتر (ل)</b> للأوعية الكبيرة. رتب الأشياء في الصندوق الصحيح!
      </p>

      {!isComplete ? (
        <div className="w-full max-w-3xl flex flex-col items-center gap-8 relative z-10">
          
          <div className="flex justify-between items-end w-full px-2 md:px-10">
             {/* ML Basket */}
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               animate={feedback === 'correct' && currentItem?.unit === 'مللتر' ? { y: [0, -20, 0], scale: [1, 1.1, 1] } : {}}
               transition={{ type: "spring", duration: 0.5 }}
               onClick={() => handleSelect('مللتر')}
               className="flex flex-col items-center gap-3 w-32 md:w-48 group"
             >
                <div className="text-xl font-bold text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full mb-2">مللتر (مل)</div>
                <div className="w-full h-32 border-4 border-dashed border-blue-300 rounded-3xl group-hover:bg-blue-50 group-hover:border-blue-400 transition-all flex flex-wrap gap-2 p-3 justify-center items-center shadow-inner overflow-hidden relative origin-bottom">
                   <AnimatePresence>
                     {sorted.ml.map((item, i) => (
                        <motion.div key={item.id} initial={{scale:0}} animate={{scale:1}} className="text-3xl relative z-10 drop-shadow-sm">{item.icon}</motion.div>
                     ))}
                   </AnimatePresence>
                   <div className="absolute bottom-0 w-full h-1/3 bg-blue-100/50 -z-0"></div>
                </div>
             </motion.button>

             {/* Middle interactive area */}
             <div className="flex flex-col items-center h-48 justify-center relative flex-1">
                 <AnimatePresence mode="wait">
                  {currentItem && (
                    <motion.div
                       key={currentItem.id}
                       initial={{ scale: 0.5, y: -50, opacity: 0 }}
                       animate={{ 
                         scale: feedback === 'correct' ? 0.5 : 1, 
                         y: feedback === 'correct' ? (currentItem.unit === 'مللتر' ? 100 : 100) : 0, // Fallback if doing fancy drag, but we are doing buttons
                         opacity: feedback === 'correct' ? 0 : 1,
                         rotate: feedback === 'wrong' ? [-5, 5, -5, 5, 0] : 0,
                         color: feedback === 'wrong' ? '#ef4444' : '#1e293b'
                       }}
                       exit={{ opacity: 0 }}
                       className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg border-2 border-slate-100 absolute z-20 cursor-pointer text-center"
                    >
                       <span className="text-6xl mb-4 drop-shadow-md">{currentItem.icon}</span>
                       <span className="text-2xl font-black text-slate-800">{currentItem.name}</span>
                       
                       <AnimatePresence>
                         {feedback === 'wrong' && (
                           <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="mt-4 text-sm text-slate-500 max-w-[200px]">
                             {currentItem.explanation}
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {feedback === 'wrong' && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute -bottom-10 text-red-500 font-bold bg-red-50 px-4 py-2 rounded-full border border-red-200">
                    أعد التفكير! هل الحجم كبير أم صغير؟
                  </motion.div>
                )}
             </div>

             {/* L Basket */}
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               animate={feedback === 'correct' && currentItem?.unit === 'لتر' ? { y: [0, -20, 0], scale: [1, 1.1, 1] } : {}}
               transition={{ type: "spring", duration: 0.5 }}
               onClick={() => handleSelect('لتر')}
               className="flex flex-col items-center gap-3 w-32 md:w-48 group"
             >
                <div className="text-xl font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-2">لتر (ل)</div>
                <div className="w-full h-32 border-4 border-dashed border-blue-400 bg-blue-50/50 rounded-b-xl rounded-t-[4rem] group-hover:bg-blue-100 group-hover:border-blue-500 transition-all flex flex-wrap gap-2 p-3 justify-center items-center shadow-inner overflow-hidden relative origin-bottom">
                   <AnimatePresence>
                     {sorted.l.map((item, i) => (
                        <motion.div key={item.id} initial={{scale:0}} animate={{scale:1}} className="text-3xl relative z-10 drop-shadow-sm">{item.icon}</motion.div>
                     ))}
                   </AnimatePresence>
                   <div className="absolute bottom-0 w-full h-1/2 bg-blue-200/50 -z-0"></div>
                </div>
             </motion.button>
          </div>

          <div className="flex items-center gap-4 mt-8">
             <button onClick={() => handleSelect('مللتر')} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-full font-bold shadow-sm flex items-center gap-2 transition-colors border-2 border-slate-200">
               👈 وعاء صغير (مل)
             </button>
             <button onClick={() => handleSelect('لتر')} className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-full font-bold shadow-sm flex items-center gap-2 transition-colors border-2 border-blue-200">
               وعاء كبير (ل) 👉
             </button>
          </div>
          <div className="bg-slate-100 text-slate-400 font-bold px-4 py-1 rounded-full text-sm">
             العنصر {currentIndex + 1} من {items.length}
          </div>
        </div>
      ) : (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-6 bg-blue-50 text-blue-800 p-8 rounded-3xl border-2 border-blue-200 relative z-10 w-full max-w-lg text-center">
           <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center relative"><Check size={40} className="relative z-10" /></div>
           <h4 className="text-3xl font-black">عمل رائع!</h4>
           <div className="w-full flex justify-around">
              <div className="flex flex-col items-center gap-2">
                 <span className="font-bold text-slate-500">المللتر (مل)</span>
                 <div className="flex gap-1 text-2xl">{sorted.ml.map(o => <span key={o.id}>{o.icon}</span>)}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                 <span className="font-bold text-blue-600">اللتر (ل)</span>
                 <div className="flex gap-1 text-2xl">{sorted.l.map(o => <span key={o.id}>{o.icon}</span>)}</div>
              </div>
           </div>
           <button onClick={restart} className="bg-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-md font-bold hover:bg-blue-700 transition-colors mt-4 text-lg">
              <RefreshCw size={24} /> تدرب مرة أخرى
           </button>
        </motion.div>
      )}
    </div>
  );
}
