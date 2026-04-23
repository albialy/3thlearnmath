import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ruler, CheckCircle2, AlertCircle, Bot, SlidersHorizontal } from 'lucide-react';
import confetti from 'canvas-confetti';

let audioCtx: AudioContext | null = null;
const playSound = (type: 'correct' | 'wrong' | 'pop') => {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'correct') {
      // Cheerful sound (major arpeggio-like quick sweep)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
      osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1); // C#5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2); // E5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } else if (type === 'wrong') {
      // Subtle thud/buzz sound
      osc.type = 'square';
      osc.frequency.setValueAtTime(100, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    }
  } catch (e) { }
};

const CHALLENGES = [
  { id: 1, item: 'سمك قطعة نقدية معدنية', correctUnit: 'ملم', icon: '🪙', 
    aiContext: 'تخيل أنك تقيس سُمك شعرة من رأسك أو ورقة الدفتر! هذه الأشياء الدقيقة جداً تقاس بالمليمتر لأنها أصغر بكثير من السنتيمتر.' },
  { id: 2, item: 'عرض إصبع يدك', correctUnit: 'سم', icon: '👆', 
    aiContext: 'كقلم التلوين، أو ممحاة، أو كتابك المفضل! كل هذه الأشياء الصغيرة التي تمسكها بيدك نقيسها بالسنتيمتر المألوف.' },
  { id: 3, item: 'طول سرير نومك', correctUnit: 'م', icon: '🛏️', 
    aiContext: 'سريرك الدافئ يتسع لك لتنام براحة! الأشياء بهذا الحجم التي تعادل عدة خطوات نقيسها بالمتر الواسع.' },
  { id: 4, item: 'رحلة بالقطار بين مدينتين', correctUnit: 'كلم', icon: '🚆', 
    aiContext: 'هل سافرت يوماً في رحلة طويلة؟ المسافات الشاسعة بين المدن التي يقطعها القطار السريع نقيسها دائماً بالكيلومتر.' },
  { id: 5, item: 'سُمك هاتف ذكي', correctUnit: 'ملم', icon: '📱', 
    aiContext: 'الهواتف الحديثة نحيفة جداً لدرجة أنها توضع في الجيب بسهولة. سُمكها الرقيق هذا يقاس بدقة بالمليمتر!' },
  { id: 6, item: 'طول حذاء رياضي', correctUnit: 'سم', icon: '👟', 
    aiContext: 'حذاؤك الذي تركض به أطول من مسطرتك الصغيرة بقليل أو يعادلها، لذلك نستخدم السنتيمتر لقياسه بشكل صحيح.' },
  { id: 7, item: 'ارتفاع شجرة النخيل', correctUnit: 'م', icon: '🌴', 
    aiContext: 'تخيل أنك تنظر عالياً لترى قمة النخلة! الأشجار والمباني العالية لا يمكن قياسها بالمسطرة، لذا نستخدم الأمتار.' },
  { id: 8, item: 'بُعد الغيوم في السماء', correctUnit: 'كلم', icon: '☁️', 
    aiContext: 'الغيوم بعيدة جداً وعالية في السماء لدرجة أن الطائرات فقط تصل إليها مسافرتها آلاف الأمتار، فنختصرها بالكيلومتر.' },
  { id: 9, item: 'طول فرشاة أسنان', correctUnit: 'سم', icon: '🪥', 
    aiContext: 'فرشاة أسنانك أطول قليلاً من كف اليد، والسنتيمتر هو الوحدة الأروع لقياس هذه الأدوات المنزلية الصغيرة.' },
  { id: 10, item: 'طول حبة أرز', correctUnit: 'ملم', icon: '🍚', 
    aiContext: 'حبة الأرز صغيرة جداً جداً! السنتيمتر سيكون مقاساً كبيراً جداً عليها، لهذا نستخدم المليمتر الدقيق.' },
  { id: 11, item: 'طول ملعب كرة قدم', correctUnit: 'م', icon: '⚽', 
    aiContext: 'هل حاولت الركض من أول الملعب لآخره؟ إنه طويل جداً! لذلك يستخدم المهندسون المتر لقياس الملاعب الرياضية الكبيرة.' }
];

const UNITS = ['ملم', 'سم', 'م', 'كلم'];

const getDynamicExample = (unit: string, value: number) => {
  if (unit === 'ملم') {
    if (value <= 2) return 'يعادل سُمك شعرة الرأس أو سُمك ورقة الدفتر!';
    if (value <= 5) return 'يعادل عرض حبة السمسم اللذيذة أو سُمك شاشة حاسوبك.';
    return 'يعادل طول نملة مقدام أو سُمك قطعة بسكويت رقيقة.';
  }
  if (unit === 'سم') {
    if (value <= 3) return 'كأنها عرض إصبعك الصغير أو سُمك قصة قصيرة.';
    if (value <= 7) return 'مثل طول مشبك الورق الملون أو محاية القلم القابلة للقفز.';
    return 'تشبه طول علبة العصير اللذيذة أو مسطرة المدرسة الحبيبة.';
  }
  if (unit === 'م') {
    if (value === 1) return 'كخطوة واسعة منك أو ارتفاع مقبض باب المنزل.';
    if (value === 2) return 'مثل طول سرير نومك الدافئ والمريح.';
    if (value <= 5) return 'مثل ارتفاع غرفة المعيشة المنعشة إلى السقف.';
    return 'أشبه بطول حافلتك المدرسية الصفراء والمبهجة!';
  }
  if (unit === 'كلم') {
    if (value === 1) return 'مسافة تستغرق منك جرياً ممتعاً في حصة التربية البدنية.';
    if (value <= 5) return 'تشبه رحلة سيارة سريعة إلى المخبز لشراء الكعك.';
    return 'أشبه بالسفر من مدينة لأخرى في رحلة عائلية بالطائرة!';
  }
  return '';
};

export function UnitMatchingLesson() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);
  const [themeColor, setThemeColor] = useState<'emerald' | 'blue' | 'purple' | 'orange'>('emerald');
  
  const current = CHALLENGES[currentIdx];

  const themes = {
    emerald: { bg: 'bg-emerald-50', hoverBg: 'hover:bg-emerald-50', border: 'border-emerald-300', hoverBorder: 'hover:border-emerald-300', text: 'text-emerald-700', hoverText: 'hover:text-emerald-700', active: 'bg-emerald-500 border-emerald-700' },
    blue: { bg: 'bg-blue-50', hoverBg: 'hover:bg-blue-50', border: 'border-blue-300', hoverBorder: 'hover:border-blue-300', text: 'text-blue-700', hoverText: 'hover:text-blue-700', active: 'bg-blue-500 border-blue-700' },
    purple: { bg: 'bg-purple-50', hoverBg: 'hover:bg-purple-50', border: 'border-purple-300', hoverBorder: 'hover:border-purple-300', text: 'text-purple-700', hoverText: 'hover:text-purple-700', active: 'bg-purple-500 border-purple-700' },
    orange: { bg: 'bg-orange-50', hoverBg: 'hover:bg-orange-50', border: 'border-orange-300', hoverBorder: 'hover:border-orange-300', text: 'text-orange-700', hoverText: 'hover:text-orange-700', active: 'bg-orange-500 border-orange-700' },
  };
  const activeTheme = themes[themeColor];

  // Reset slider when unit changes
  useEffect(() => {
    setSliderValue(1);
  }, [currentIdx, selectedUnit]);

  const handleSelect = (unit: string) => {
    if (showResult) return;
    
    playSound('pop');
    setSelectedUnit(unit);
    setShowResult(true);

    if (unit === current.correctUnit) {
      setTimeout(() => playSound('correct'), 100);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 }, colors: ['#10b981', '#34d399'] });
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

  const isCorrect = selectedUnit === current.correctUnit;

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border-4 border-emerald-100 flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="bg-emerald-100 text-emerald-700 p-4 rounded-full mb-6 relative z-10 shadow-inner">
        <Ruler size={40} />
      </div>
      
      <h3 className="text-3xl font-black text-slate-800 mb-4 text-center relative z-10">أدوات القياس المناسبة</h3>
      
      <div className="flex gap-2 mb-4 relative z-10 p-2 bg-slate-50 border-2 border-slate-100 rounded-full items-center shadow-sm">
         <span className="text-xs font-bold text-slate-400 px-2">لون الأزرار:</span>
         <button onClick={() => setThemeColor('emerald')} className={`w-6 h-6 rounded-full bg-emerald-500 ${themeColor === 'emerald' ? 'ring-2 ring-offset-2 ring-emerald-500' : ''}`}></button>
         <button onClick={() => setThemeColor('blue')} className={`w-6 h-6 rounded-full bg-blue-500 ${themeColor === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}></button>
         <button onClick={() => setThemeColor('purple')} className={`w-6 h-6 rounded-full bg-purple-500 ${themeColor === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}></button>
         <button onClick={() => setThemeColor('orange')} className={`w-6 h-6 rounded-full bg-orange-500 ${themeColor === 'orange' ? 'ring-2 ring-offset-2 ring-orange-500' : ''}`}></button>
      </div>

      <div className="flex items-center gap-2 text-slate-500 font-bold px-3 py-1 bg-slate-50 rounded-full mb-6 border border-slate-100 shadow-sm relative z-10">
        المثال {currentIdx + 1} من {CHALLENGES.length}
      </div>
      <p className="text-slate-600 mb-8 text-center text-lg max-w-lg relative z-10">
        اختر الوحدة الصحيحة لمعرفة القياس! تذكر: "ملم" للأشياء الدقيقة جداً، "سم" للأشياء الصغيرة، و"م" للأشياء الكبيرة.
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
                 {UNITS.map(unit => {
                   let btnClass = "px-6 py-4 rounded-2xl font-black text-xl border-b-4 transition-all shadow-sm flex-1 min-w-[100px] overflow-hidden relative ";
                   
                   if (!showResult) {
                     btnClass += `bg-white border-slate-200 text-slate-600 ${activeTheme.hoverBg} ${activeTheme.hoverBorder} ${activeTheme.hoverText} active:translate-y-1 active:border-b-0`;
                   } else {
                     if (unit === current.correctUnit) {
                       btnClass += `${activeTheme.active} text-white z-10 shadow-lg border-b-0 translate-y-1`;
                     } else if (unit === selectedUnit) {
                       btnClass += "bg-red-500 text-white border-red-700 opacity-90 border-b-0 translate-y-1";
                     } else {
                       btnClass += "bg-slate-100 text-slate-400 border-slate-200 opacity-50";
                     }
                   }

                   return (
                     <motion.button 
                       key={unit} 
                       whileHover={!showResult ? { scale: 1.05 } : {}}
                       whileTap={!showResult ? { scale: 0.95 } : {}}
                       animate={showResult && unit === current.correctUnit ? { scale: [1, 1.2, 0.9, 1.1, 1], rotate: [0, -10, 10, -5, 0], y: [0, -15, 0] } : {}}
                       transition={{ type: "spring", duration: 0.6 }}
                       onClick={() => handleSelect(unit)}
                       disabled={showResult}
                       className={btnClass}
                     >
                       <span className="relative z-10">{unit}</span>
                       {showResult && unit === current.correctUnit && (
                          <div className={`absolute inset-0 bg-white/20 opacity-20`} style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 20px)' }}></div>
                       )}
                     </motion.button>
                   );
                 })}
              </div>
           </motion.div>
         </AnimatePresence>

         <AnimatePresence>
            {showResult && (
               <motion.div
                 initial={{ opacity: 0, y: 20, height: 0 }}
                 animate={{ opacity: 1, y: 0, height: 'auto' }}
                 transition={{ type: "spring", bounce: 0.4 }}
                 className={`mt-8 overflow-hidden rounded-2xl flex flex-col items-center ${isCorrect ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-red-50 border-2 border-red-200'}`}
               >
                  <div className="p-6 w-full flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl"></div>
                    
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} delay={0.2}
                      className={`flex items-center gap-2 font-black text-2xl mb-4 ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}
                    >
                      {isCorrect ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                      {isCorrect ? 'إجابة عبقرية!' : 'أقتربت كثيراً!'}
                    </motion.div>
                    
                    {/* Dynamic AI-like Explanation Context */}
                    <div className="w-full bg-white/80 p-5 rounded-2xl shadow-sm text-right flex flex-col gap-4 relative z-10">
                       <div className="flex gap-3">
                         <div className={`p-2 rounded-full h-max ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                           <Bot size={24} />
                         </div>
                         <div className="font-medium text-lg leading-relaxed text-slate-700">{current.aiContext}</div>
                       </div>
                       
                       {/* Interactive Context Slider */}
                       {isCorrect && (
                         <div className="mt-4 pt-4 border-t-2 border-emerald-100/50 flex flex-col gap-3">
                            <label className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                               <SlidersHorizontal size={16} /> لنجرب أرقاماً مختلفة بوحدة ({current.correctUnit}):
                            </label>
                            <div className="flex items-center gap-4 dir-ltr">
                               <span className="font-black text-slate-400 text-sm">1</span>
                               <input 
                                 type="range" 
                                 min="1" 
                                 max="10" 
                                 value={sliderValue} 
                                 onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                 className="flex-1 accent-emerald-500 h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                               />
                               <span className="font-black text-slate-400 text-sm">10</span>
                            </div>
                            <div className="bg-emerald-100/50 p-3 rounded-xl border border-emerald-200 mt-2 text-center">
                               <span className="font-black text-emerald-800 text-xl ml-2">{sliderValue} {current.correctUnit}</span>
                               <span className="text-emerald-700 text-sm font-bold">
                                 {getDynamicExample(current.correctUnit, sliderValue)}
                               </span>
                            </div>
                         </div>
                       )}
                    </div>
                    
                    <button 
                      onClick={handleNext}
                      className={`mt-6 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-transform active:scale-95 text-lg w-full sm:w-auto ${isCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                      {currentIdx < CHALLENGES.length - 1 ? 'المرحلة التالية' : 'إنهاء وتتويج'}
                    </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
