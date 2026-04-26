import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Timer, Lightbulb, RotateCcw, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../store';

type QuestionType = 'multiply' | 'divide1' | 'divide2';

interface Mistake {
  num1: number;
  num2: number;
  qType: QuestionType;
  product: number;
  userAnswer: number | null;
  explanation: string;
}

const TOTAL_QUESTIONS = 10;

let audioCtx: AudioContext | null = null;
const playSound = (type: 'correct' | 'wrong' | 'tick' | 'timeout') => {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.1); 
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'wrong' || type === 'timeout') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'tick') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    }
  } catch (e) {
    // Ignore audio errors
  }
};

export function Quiz() {
  const { points, addPoints, addBadge, highScore: storeHighScore, updateHighScore } = useAppStore();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [qType, setQType] = useState<QuestionType>('multiply');
  const [options, setOptions] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  
  const [timeLeft, setTimeLeft] = useState(15);
  const [highScore, setHighScore] = useState(storeHighScore);
  const [showHighScoreAnim, setShowHighScoreAnim] = useState(false);
  const [history, setHistory] = useState<Record<string, number>>({});
  
  const [questionCount, setQuestionCount] = useState(1);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  
  const [hintUsed, setHintUsed] = useState(false);
  // Session score just for the current quiz round
  const [sessionScore, setSessionScore] = useState(0);

  const product = num1 * num2;
  
  // Load local specific records
  useEffect(() => {
    const savedHighScore = localStorage.getItem('mathHighScore');
    const savedHistory = localStorage.getItem('mathHistory');
    
    if (savedHighScore) {
      const parsedHigh = parseInt(savedHighScore, 10);
      setHighScore(Math.max(parsedHigh, storeHighScore));
      updateHighScore(parsedHigh);
    }
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save history to local storage
  useEffect(() => {
    if (Object.keys(history).length > 0) {
      localStorage.setItem('mathHistory', JSON.stringify(history));
    }
  }, [history]);
  
  // High score tracking check
  useEffect(() => {
    if (sessionScore > highScore) {
      setHighScore(sessionScore);
      updateHighScore(sessionScore);
      localStorage.setItem('mathHighScore', sessionScore.toString());
      if (!showHighScoreAnim && sessionScore > 10) {
         setShowHighScoreAnim(true);
         setTimeout(() => setShowHighScoreAnim(false), 3000);
      }
    }
  }, [sessionScore, highScore, showHighScoreAnim, updateHighScore]);

  // Give badges
  useEffect(() => {
    if (points >= 100) {
       addBadge('math_wizard');
    }
    if (sessionCompleted) {
       addBadge('first_quiz');
    }
  }, [points, sessionCompleted, addBadge]);

  // Timer logic
  useEffect(() => {
    if (isEvaluating || num1 === 0 || sessionCompleted || reviewMode) return;
    
    // Instead of interval exactly 1000ms, use smaller steps to allow faster ticking
    const startTime = Date.now();
    const duration = timeLeft * 1000;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingSeconds = Math.max(0, Math.ceil((duration - elapsed) / 1000));
      
      if (remainingSeconds !== timeLeft) {
        setTimeLeft(remainingSeconds);
        
        if (remainingSeconds <= 0) {
          clearInterval(interval);
          handleTimeOut();
        } else if (remainingSeconds <= 5) {
          playSound('tick');
        }
      }

      // If time is 5 or less, maybe we want more frequent ticks?
      // Since interval is fast, we can tick on every 500ms when <= 5s
      const remainingMs = duration - elapsed;
      if (remainingMs > 0 && remainingMs <= 5000) {
         if (Math.floor(remainingMs / 500) !== Math.floor((remainingMs + 50) / 500)) {
             try { playSound('tick') } catch(e) {}
         }
      }
      
    }, 50);
    
    return () => clearInterval(interval);
  }, [isEvaluating, num1, qType, sessionCompleted, reviewMode, timeLeft]);

  const updateHistory = (correct: boolean) => {
    const key = `${Math.min(num1, num2)}x${Math.max(num1, num2)}`;
    setHistory(prev => {
      const currentWeight = prev[key] || 10;
      let newWeight = correct ? Math.max(1, currentWeight / 1.5) : currentWeight + 15;
      return { ...prev, [key]: newWeight };
    });
  };

  const handleTimeOut = () => {
    if (isEvaluating) return;
    setIsEvaluating(true);
    playSound('timeout');
    setMessage('انتهى الوقت! ⏳');
    updateHistory(false);
    
    let correct = 0;
    if (qType === 'multiply') correct = product;
    else if (qType === 'divide1') correct = num1;
    else if (qType === 'divide2') correct = num2;
    
    setSelectedAnswer(-1); // Special value for timeout
    
    let exp = '';
    if (qType === 'multiply') {
      exp = `التوضيح: لأن ${num1} تكررت ${num2} مرات فتساوي ${product}.`;
    } else if (qType === 'divide1') {
      exp = `التوضيح: المربع المفقود هو ${num1} لأن ${num1} × ${num2} = ${product}.`;
    } else if (qType === 'divide2') {
      exp = `التوضيح: المربع المفقود هو ${num2} لأن ${num1} × ${num2} = ${product}.`;
    }
    setExplanation(exp);
    setMistakes(prev => [...prev, { num1, num2, qType, product, userAnswer: -1, explanation: exp }]);
    
    setTimeout(() => advanceStage(), 4500);
  };

  const getWeightedRandomPair = () => {
    let pairs = [];
    for(let i=2; i<=9; i++) {
      for(let j=2; j<=9; j++) {
         const key = `${Math.min(i, j)}x${Math.max(i, j)}`;
         pairs.push({ n1: i, n2: j, weight: history[key] || 10 });
      }
    }
    let totalWeight = pairs.reduce((sum, p) => sum + p.weight, 0);
    let random = Math.random() * totalWeight;
    let current = 0;
    for(let p of pairs) {
      current += p.weight;
      if (random <= current) return [p.n1, p.n2];
    }
    return [5, 5];
  };

  const generateNewFamily = () => {
    const [n1, n2] = getWeightedRandomPair();
    setNum1(n1);
    setNum2(n2);
    setQType('multiply');
    setMessage('');
    setTimeLeft(15);
    generateOptions(n1 * n2, 'multiply', n1);
  };

  useEffect(() => {
    generateNewFamily();
  }, []);

  const generateOptions = (correctAnswer: number, currentType: QuestionType, baseNumber: number) => {
    let opts = new Set<number>();
    opts.add(correctAnswer);
    
    let attempts = 0;
    while(opts.size < 4 && attempts < 50) {
      let diff = Math.floor(Math.random() * 7) - 3;
      if (diff === 0) diff = 4;
      let wrong = correctAnswer + diff * (currentType === 'multiply' ? baseNumber : 1);
      if (wrong !== correctAnswer && wrong > 0) {
        opts.add(wrong);
      }
      attempts++;
    }
    
    // Safety fallback
    let fallback = 1;
    while(opts.size < 4) {
       if (!opts.has(correctAnswer + fallback)) opts.add(correctAnswer + fallback);
       if (opts.size < 4 && correctAnswer - fallback > 0 && !opts.has(correctAnswer - fallback)) opts.add(correctAnswer - fallback);
       fallback++;
    }
    
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (selected: number) => {
    if (isEvaluating || selectedAnswer !== null) return;
  
    try { if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume(); } catch(e){}

    let correct = 0;
    if (qType === 'multiply') correct = product;
    else if (qType === 'divide1') correct = num1;
    else if (qType === 'divide2') correct = num2;

    setSelectedAnswer(selected);
    setIsEvaluating(true);

    if (selected === correct) {
      playSound('correct');
      updateHistory(true);
       // Bonus points for fast answer
      const bonus = timeLeft > 10 ? 5 : 0;
      const totalPoints = 10 + bonus;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#34d399', '#fcd34d']
      });
      
      setMessage(`إجابة صحيحة! أحسنت 👏 ${bonus > 0 ? '(+5 نقاط سرعة)' : ''}`);
      addPoints(totalPoints);
      setSessionScore(s => s + totalPoints);
      
      setTimeout(() => advanceStage(), 2000);
    } else {
      playSound('wrong');
      updateHistory(false);
      setMessage('إجابة خاطئة! 😔');
      
      let exp = '';
      if (qType === 'multiply') {
        exp = `التوضيح: لأن ${num1} تكررت ${num2} مرات فتساوي ${product}.`;
      } else if (qType === 'divide1') {
        exp = `التوضيح: المربع المفقود هو ${num1} لأن ${num1} × ${num2} = ${product}.`;
      } else if (qType === 'divide2') {
        exp = `التوضيح: المربع المفقود هو ${num2} لأن ${num1} × ${num2} = ${product}.`;
      }
      setExplanation(exp);
      setMistakes(prev => [...prev, { num1, num2, qType, product, userAnswer: selected, explanation: exp }]);
      
      setTimeout(() => advanceStage(), 4500);
    }
  };

  const advanceStage = () => {
    if (questionCount >= TOTAL_QUESTIONS) {
       setSessionCompleted(true);
       return;
    }
    setQuestionCount(prev => prev + 1);
    setIsEvaluating(false);
    setSelectedAnswer(null);
    setExplanation('');
    setHintUsed(false);
    setTimeLeft(15);
    
    if (qType === 'multiply') {
      setQType('divide1');
      generateOptions(num1, 'divide1', num1);
      setMessage('الآن، لنجرب القسمة!');
    } else if (qType === 'divide1') {
      if (num1 === num2) {
         generateNewFamily();
      } else {
         setQType('divide2');
         generateOptions(num2, 'divide2', num1);
         setMessage('ممتاز! والقسمة العكسية؟');
      }
    } else {
      generateNewFamily();
    }
  };

  const restartSession = () => {
    setQuestionCount(1);
    setSessionCompleted(false);
    setSessionScore(0);
    setReviewMode(false);
    setReviewIdx(0);
    setMistakes([]);
    setHintUsed(false);
    generateNewFamily();
  };

  const getHint = () => {
    if (hintUsed || isEvaluating || timeLeft <= 0) return;
    try { if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume(); } catch(e){}
    setHintUsed(true);
    // Deduct from both places, max at 0
    if (points >= 2) addPoints(-2);
    setSessionScore(s => Math.max(0, s - 2));
  };

  const getOptionClass = (opt: number) => {
    let base = "border-4 border-b-[8px] text-4xl md:text-5xl font-black rounded-3xl transition-all duration-200 flex items-center justify-center h-full min-h-[120px] ";
    
    if (!isEvaluating) {
      return base + "bg-white border-slate-200 text-slate-700 hover:bg-info-50 hover:border-info-300 hover:text-info-600 active:border-b-4 active:translate-y-1 hover:-translate-y-1 shadow-sm";
    }

    let correct = 0;
    if (qType === 'multiply') correct = product;
    else if (qType === 'divide1') correct = num1;
    else if (qType === 'divide2') correct = num2;

    if (opt === correct) {
      return base + "bg-success-500 text-white border-success-600 border-b-success-700 scale-105 z-10 shadow-xl ring-4 ring-success-200 ring-offset-2";
    }
    
    if (opt === selectedAnswer) {
      return base + "bg-red-500 text-white border-red-600 border-b-4 translate-y-1 opacity-90 scale-95 shadow-inner";
    }

    return base + "bg-slate-100 border-slate-200 border-b-4 text-slate-300 opacity-50 translate-y-1";
  };

  if (num1 === 0) return null;

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.5 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.6 } }
  };

  // Timer color and pulse effect
  const getTimerClasses = () => {
    if (timeLeft > 10) return { text: 'text-success-600', bg: 'bg-success-500', from: 'from-success-400', to: 'to-success-500', pulse: false };
    if (timeLeft > 5) return { text: 'text-warning-600', bg: 'bg-warning-500', from: 'from-warning-400', to: 'to-warning-500', pulse: false };
    return { text: 'text-red-500', bg: 'bg-red-500', from: 'from-red-400', to: 'to-red-600', pulse: true };
  };
  
  const timerStyle = getTimerClasses();

  if (sessionCompleted) {
    if (reviewMode && mistakes.length > 0) {
      const mist = mistakes[reviewIdx];
      
      return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-8">
           <div className="w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border-4 border-warning-200 flex flex-col items-center justify-center text-center relative overflow-hidden">
             <button 
               onClick={() => setReviewMode(false)}
               className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 font-bold flex items-center gap-2"
               aria-label="العودة للنتيجة"
             >
               <ArrowRight size={20} aria-hidden="true" /> العودة للنتيجة
             </button>
             <div className="bg-warning-100 p-4 rounded-full text-warning-600 mb-4 shadow-inner" aria-hidden="true">
                <AlertTriangle size={48} />
             </div>
             <h2 className="text-3xl font-black text-slate-800 mb-2">مراجعة الأخطاء</h2>
             <p className="text-slate-500 font-medium mb-8">خطأ {reviewIdx + 1} من {mistakes.length}</p>
             
             <div className="flex items-center justify-center gap-4 md:gap-8 text-5xl md:text-6xl font-black text-slate-800 tabular-nums bg-slate-50 p-6 md:p-8 rounded-2xl border-2 border-slate-100 mb-8 w-full max-w-xl" dir="ltr" aria-label="السؤال الخاطئ">
                {mist.qType === 'multiply' ? (
                  <>{mist.num1} <span className="text-info-500 text-4xl" aria-hidden="true">×</span> {mist.num2} <span className="text-slate-300 text-4xl" aria-hidden="true">=</span> <span className="text-success-500">{mist.product}</span></>
                ) : mist.qType === 'divide1' ? (
                  <>{mist.product} <span className="text-info-500 text-4xl" aria-hidden="true">÷</span> {mist.num2} <span className="text-slate-300 text-4xl" aria-hidden="true">=</span> <span className="text-success-500">{mist.num1}</span></>
                ) : (
                  <>{mist.product} <span className="text-info-500 text-4xl" aria-hidden="true">÷</span> {mist.num1} <span className="text-slate-300 text-4xl" aria-hidden="true">=</span> <span className="text-success-500">{mist.num2}</span></>
                )}
             </div>
             
             <div className="bg-warning-50 text-warning-800 text-lg md:text-xl font-bold p-6 rounded-2xl mb-8 w-full max-w-xl text-center border-2 border-warning-200 shadow-sm">
               <p className="mb-3 text-sm md:text-base text-warning-600 border-b border-warning-200 pb-3">إجابتك السابقة: <span className="font-black text-red-500 bg-white px-3 py-1 rounded-lg mr-2">{mist.userAnswer === -1 ? 'انتهى الوقت' : mist.userAnswer}</span></p>
               {mist.explanation}
             </div>
             
             <div className="flex gap-4 w-full justify-center">
               <button 
                 onClick={() => {
                    if (reviewIdx < mistakes.length - 1) setReviewIdx(i => i + 1);
                    else setReviewMode(false);
                 }}
                 aria-label={reviewIdx < mistakes.length - 1 ? 'الخطأ التالي' : 'إنهاء المراجعة'}
                 className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-black text-xl transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2 border-b-4 border-primary-700 w-full sm:w-auto"
               >
                 {reviewIdx < mistakes.length - 1 ? 'الخطأ التالي' : 'إنهاء المراجعة'}
                 {reviewIdx < mistakes.length - 1 && <ArrowLeft size={24} aria-hidden="true" />}
               </button>
             </div>
           </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-8">
        <div className="w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border-4 border-success-200 flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-success-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
           <div className="bg-success-100 p-6 rounded-full text-success-600 mb-6 shadow-inner relative z-10" aria-hidden="true">
             <Star size={64} fill="currentColor" />
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 relative z-10">انتهى التحدي!</h2>
           <p className="text-slate-600 text-xl font-medium mb-8 relative z-10">لقد أجبت على {TOTAL_QUESTIONS} أسئلة بنجاح.</p>
           
           <div className="flex flex-col items-center gap-2 mb-10 relative z-10 bg-slate-50 px-12 py-6 rounded-3xl border-2 border-slate-100 shadow-sm">
             <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">مجموع نقاط التحدي</span>
             <span className="text-7xl font-black text-success-600 inline-block scale-110">{sessionScore}</span>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10">
             <button
               onClick={restartSession}
               className="bg-success-500 hover:bg-success-600 text-white px-8 py-4 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3 border-b-4 border-success-700 flex-1 sm:flex-none"
             >
                <RotateCcw size={28} aria-hidden="true" />
                العب مرة أخرى
             </button>
             
             {mistakes.length > 0 && (
               <button
                 onClick={() => setReviewMode(true)}
                 className="bg-warning-500 hover:bg-warning-600 text-white px-8 py-4 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3 border-b-4 border-warning-700 flex-1 sm:flex-none"
               >
                  <AlertTriangle size={28} aria-hidden="true" />
                  مراجعة الأخطاء ({mistakes.length})
               </button>
             )}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-8">
      {/* Top HUD */}
      <div className="w-full flex justify-between items-center mb-6 bg-white p-4 md:p-5 rounded-3xl shadow-sm border-4 border-slate-100">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-info-100 p-2 md:p-3 rounded-2xl text-info-600 shadow-inner" aria-hidden="true">
             <Star fill="currentColor" size={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">تحدي العباقرة</h2>
        </div>
        
        <div className="flex items-center gap-4">
           <AnimatePresence>
             {showHighScoreAnim && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.5, x: 20 }}
                 animate={{ opacity: 1, scale: 1, x: 0, rotate: [-10, 10, -5, 5, 0] }}
                 exit={{ opacity: 0, scale: 0.8, y: -20 }}
                 transition={{ duration: 0.5 }}
                 className="bg-warning-400 text-white px-3 py-1.5 rounded-xl font-black shadow-lg flex items-center gap-1 border-2 border-warning-500 text-sm"
               >
                 <span>رقم قياسي!</span>
                 <span className="text-lg" aria-hidden="true">🏆</span>
               </motion.div>
             )}
           </AnimatePresence>
           
          <div className="bg-slate-50 flex items-center gap-2 px-4 py-2 rounded-2xl text-slate-700 font-black text-xl border-2 border-slate-200 relative overflow-visible" aria-label={`نقاط التحدي الحالي: ${sessionScore}`}>
            <span className="text-sm text-slate-400 uppercase tracking-wider ml-1">النقاط</span>
            <motion.span 
              key={sessionScore}
              initial={{ scale: 1.5, color: '#10b981' }}
              animate={{ scale: 1, color: '#0ea5e9' }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="min-w-[2.5rem] text-center text-info-600 text-2xl"
            >
              {sessionScore}
            </motion.span>
            
            {highScore > 0 && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-warning-100 text-warning-800 text-xs px-3 py-0.5 rounded-full font-black shadow-sm whitespace-nowrap whitespace-pre" aria-label={`أعلى نتيجة للتحدي: ${highScore}`}>
                الأعلى: {highScore}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual Timer Progress Bar */}
      <div className={`w-full max-w-lg mx-auto bg-slate-100 h-4 rounded-full mb-8 overflow-hidden border-2 shadow-inner p-0.5 relative transition-colors duration-300 ${timeLeft <= 5 && !isEvaluating && !sessionCompleted && !reviewMode ? 'ring-4 ring-red-300 animate-pulse border-red-400 bg-red-50' : 'border-slate-200'}`}>
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black tracking-widest text-slate-800/30 font-mono z-10 w-full" dir="ltr" aria-label={`${timeLeft} ثواني متبقية`}>
           {timeLeft}s
        </div>
        <motion.div 
          className={`h-full rounded-full bg-gradient-to-r ${timeLeft <= 5 ? 'from-red-600 to-red-400' : timerStyle.from + ' ' + timerStyle.to}`}
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / 15) * 100}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>

      {/* Session Progress Bar and Header */}
      <div className="w-full flex flex-col gap-3 mb-6 text-center">
         <div className="flex justify-between items-center text-sm font-bold text-slate-500 px-2 bg-white/50 py-2 rounded-xl border border-slate-100">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" aria-hidden="true"></span> سؤال {questionCount} من {TOTAL_QUESTIONS}</span>
         </div>
         <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner flex" dir="ltr" aria-hidden="true">
           <motion.div 
             className="h-full bg-primary-500 rounded-full"
             initial={{ width: 0 }}
             animate={{ width: `${(questionCount / TOTAL_QUESTIONS) * 100}%` }}
             transition={{ duration: 0.5, ease: "easeOut" }}
           />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {/* Main Question Area (Bento Box) */}
        <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-info-200 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 right-6 text-sm font-black text-white bg-info-400 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            {qType === 'multiply' ? '× ضرب' : '÷ قسمة'}
          </div>
          
          <div className={`absolute top-4 left-6 flex items-center gap-2 font-black text-xl bg-slate-50 px-3 py-1 rounded-full border-2 shadow-sm ${timeLeft <= 5 ? 'border-red-400 text-red-600 bg-red-50 animate-pulse' : 'border-slate-100 text-slate-700'}`} aria-hidden="true">
             <Timer size={20} className={timeLeft <= 5 ? 'text-red-500' : timerStyle.text} />
             <span className={`${timeLeft <= 5 ? 'text-red-600' : timerStyle.text} min-w-[2rem] text-center transition-colors`} dir="ltr">{timeLeft}</span>
          </div>

          {!isEvaluating && !hintUsed && (
            <button 
              onClick={getHint}
              className="absolute top-16 right-6 flex items-center gap-1 font-bold text-sm bg-warning-100 text-warning-700 px-3 py-1.5 rounded-full hover:bg-warning-200 transition-colors shadow-sm active:scale-95 border border-warning-200"
            >
               <Lightbulb size={16} aria-hidden="true" /> تلميح
            </button>
          )}

          <AnimatePresence>
            {hintUsed && !isEvaluating && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-16 right-6 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto bg-warning-100 p-4 rounded-2xl border-2 border-warning-300 shadow-xl w-max max-w-[85%] sm:max-w-md z-30 flex flex-col items-center gap-3"
              >
                {qType === 'multiply' && (
                  <>
                     <span className="text-sm sm:text-base font-bold text-warning-800 text-center px-2">تلميح: كم مجموع العناصر في هذه المصفوفة؟ ({num1} صفوف × {num2} أعمدة)</span>
                     <div className="grid gap-1.5 p-3 bg-white rounded-xl border border-warning-200 shadow-inner" style={{ gridTemplateColumns: `repeat(${num2}, minmax(0, 1fr))` }} aria-hidden="true">
                        {Array.from({ length: product }).map((_, i) => (
                           <div key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-warning-500 rounded-full shadow-sm" />
                        ))}
                     </div>
                  </>
                )}
                {qType === 'divide1' && (
                  <>
                     <span className="text-sm sm:text-base font-bold text-warning-800 text-center px-2">تلميح: لدينا {product} عنصر، كم مجموعة من ({num2}) يمكننا تكوينها؟</span>
                     <div className="flex flex-wrap justify-center gap-2 bg-white/50 p-3 rounded-xl border border-warning-200 shadow-inner max-h-48 overflow-y-auto" aria-hidden="true">
                        {Array.from({ length: num1 }).map((_, r) => (
                           <div key={r} className="flex gap-1 p-1.5 border-2 border-warning-400 rounded-lg bg-white shadow-sm hover:scale-105 transition-transform duration-200">
                              {Array.from({ length: num2 }).map((_, c) => (
                                 <div key={c} className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-warning-600 rounded-full" />
                              ))}
                           </div>
                        ))}
                     </div>
                  </>
                )}
                {qType === 'divide2' && (
                  <>
                     <span className="text-sm sm:text-base font-bold text-warning-800 text-center px-2">تلميح: لدينا {product} عنصر، كم مجموعة من ({num1}) يمكننا تكوينها؟</span>
                     <div className="flex flex-wrap justify-center gap-2 bg-white/50 p-3 rounded-xl border border-warning-200 shadow-inner max-h-48 overflow-y-auto" aria-hidden="true">
                        {Array.from({ length: num2 }).map((_, r) => (
                           <div key={r} className="flex gap-1 p-1.5 border-2 border-warning-400 rounded-lg bg-white shadow-sm hover:scale-105 transition-transform duration-200">
                              {Array.from({ length: num1 }).map((_, c) => (
                                 <div key={c} className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-warning-600 rounded-full" />
                              ))}
                           </div>
                        ))}
                     </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-8 text-xl font-bold mb-6 text-center mt-12 md:mt-6">
            {message ? (
               <span className={message.includes('صحيح') ? 'text-success-600' : message.includes('خاطئ') ? 'text-red-500' : 'text-info-600'} aria-live="polite">
                  {message}
               </span>
            ) : (
               <span className="text-slate-400 animate-pulse">ما هي الإجابة الصحيحة؟</span>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={qType + num1 * num2}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex items-center justify-center gap-4 md:gap-8 mb-4 scale-75 md:scale-100 origin-center w-full"
              dir="ltr"
              aria-label={
                qType === 'multiply' ? `${num1} مضروب في ${num2} يساوي كم؟` :
                qType === 'divide1' ? `${product} تقسيم ${num2} يساوي كم؟` :
                `${product} تقسيم ${num1} يساوي كم؟`
              }
            >
               {qType === 'multiply' && (
                 <>
                   <motion.div variants={itemVariants} className="text-7xl md:text-[100px] font-black text-slate-800 tabular-nums" aria-hidden="true">{num1}</motion.div>
                   <motion.div variants={itemVariants} className="text-5xl md:text-6xl font-black text-info-500" aria-hidden="true">×</motion.div>
                   <motion.div variants={itemVariants} className="text-7xl md:text-[100px] font-black text-slate-800 tabular-nums" aria-hidden="true">{num2}</motion.div>
                   <motion.div variants={itemVariants} className="text-5xl md:text-6xl font-black text-slate-300" aria-hidden="true">=</motion.div>
                   <motion.div variants={itemVariants} className="w-32 h-24 md:w-40 md:h-32 bg-info-50 rounded-2xl border-4 border-dashed border-info-300 flex items-center justify-center text-6xl md:text-[80px] font-black text-info-600 relative overflow-hidden" aria-hidden="true">
                     {isEvaluating && selectedAnswer !== null && (
                         <motion.div initial={{scale:0}} animate={{scale:1}} className="text-slate-800">{selectedAnswer === -1 ? '?' : selectedAnswer}</motion.div>
                     )}
                     {(!isEvaluating || selectedAnswer === null) && '?'}
                   </motion.div>
                 </>
               )}
               {qType === 'divide1' && (
                 <>
                   <motion.div variants={itemVariants} className="text-7xl md:text-[100px] font-black text-slate-800 tabular-nums" aria-hidden="true">{product}</motion.div>
                   <motion.div variants={itemVariants} className="text-5xl md:text-6xl font-black text-info-500" aria-hidden="true">÷</motion.div>
                   <motion.div variants={itemVariants} className="text-7xl md:text-[100px] font-black text-slate-800 tabular-nums" aria-hidden="true">{num2}</motion.div>
                   <motion.div variants={itemVariants} className="text-5xl md:text-6xl font-black text-slate-300" aria-hidden="true">=</motion.div>
                   <motion.div variants={itemVariants} className="w-32 h-24 md:w-40 md:h-32 bg-info-50 rounded-2xl border-4 border-dashed border-info-300 flex items-center justify-center text-6xl md:text-[80px] font-black text-info-600 relative overflow-hidden" aria-hidden="true">
                     {isEvaluating && selectedAnswer !== null && (
                         <motion.div initial={{scale:0}} animate={{scale:1}} className="text-slate-800">{selectedAnswer === -1 ? '?' : selectedAnswer}</motion.div>
                     )}
                     {(!isEvaluating || selectedAnswer === null) && '?'}
                   </motion.div>
                 </>
               )}
               {qType === 'divide2' && (
                 <>
                   <motion.div variants={itemVariants} className="text-7xl md:text-[100px] font-black text-slate-800 tabular-nums" aria-hidden="true">{product}</motion.div>
                   <motion.div variants={itemVariants} className="text-5xl md:text-6xl font-black text-info-500" aria-hidden="true">÷</motion.div>
                   <motion.div variants={itemVariants} className="text-7xl md:text-[100px] font-black text-slate-800 tabular-nums" aria-hidden="true">{num1}</motion.div>
                   <motion.div variants={itemVariants} className="text-5xl md:text-6xl font-black text-slate-300" aria-hidden="true">=</motion.div>
                   <motion.div variants={itemVariants} className="w-32 h-24 md:w-40 md:h-32 bg-info-50 rounded-2xl border-4 border-dashed border-info-300 flex items-center justify-center text-6xl md:text-[80px] font-black text-info-600 relative overflow-hidden" aria-hidden="true">
                     {isEvaluating && selectedAnswer !== null && (
                         <motion.div initial={{scale:0}} animate={{scale:1}} className="text-slate-800">{selectedAnswer === -1 ? '?' : selectedAnswer}</motion.div>
                     )}
                     {(!isEvaluating || selectedAnswer === null) && '?'}
                   </motion.div>
                 </>
               )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {explanation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, height: 0 }}
                animate={{ opacity: 1, scale: 1, height: 'auto' }}
                exit={{ opacity: 0, scale: 0.9, height: 0 }}
                className="w-full mt-6 text-center"
              >
                <div className="bg-warning-50 border-4 border-warning-200 text-warning-800 text-lg font-black px-6 py-4 rounded-2xl mx-auto inline-block shadow-sm">
                  {explanation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Options Grid (Bento Boxes) */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 grid-rows-2 lg:grid-rows-4 gap-4">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={isEvaluating}
              aria-label={`الخيار: ${opt}`}
              className={getOptionClass(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
