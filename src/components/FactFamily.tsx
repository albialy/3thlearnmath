import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCcw, Grid, ChevronDown } from 'lucide-react';

export function FactFamily() {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(6);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const product = num1 * num2;

  const handleRandomize = () => {
    setNum1(Math.floor(Math.random() * 9) + 2); // 2-10
    setNum2(Math.floor(Math.random() * 9) + 2);
  };

  const handleTableSelect = (tableNum: number) => {
    setNum1(tableNum);
    setNum2(Math.floor(Math.random() * 9) + 2);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col flex-1 pb-8">
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between w-full gap-4">
        <div className="text-center md:text-right">
          <h2 className="text-3xl font-black text-success-700 mb-2">مثلث الحقائق (عائلة الأرقام)</h2>
          <p className="text-success-600/80 font-medium font-bold">اختر رقمين واكتشف الارتباط السحري بالضرب والقسمة!</p>
        </div>
        
        <div className="flex gap-2 relative" ref={menuRef}>
          <button 
            onClick={handleRandomize}
            className="flex items-center gap-2 bg-success-50 hover:bg-success-100 border-2 border-success-200 text-success-700 px-4 md:px-6 py-3 rounded-2xl font-bold transition-colors shadow-sm"
          >
            <RefreshCcw size={18} />
            <span className="hidden md:inline">أرقام عشوائية</span>
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 bg-info-50 hover:bg-info-100 border-2 border-info-200 text-info-700 px-4 md:px-6 py-3 rounded-2xl font-bold transition-colors shadow-sm"
          >
            <Grid size={18} />
            <span>اختر جدول</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Animated Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full left-0 mt-3 w-72 bg-white rounded-3xl shadow-xl border-4 border-info-200 p-4 z-50 origin-top"
              >
                <div className="text-sm font-bold text-info-400 mb-3 text-center uppercase tracking-widest">اختر جدول الضرب</div>
                <div className="grid grid-cols-4 gap-2" dir="ltr">
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                    <button
                      key={n}
                      onClick={() => handleTableSelect(n)}
                      className="bg-info-50 hover:bg-info-500 text-info-700 hover:text-white font-black text-xl py-3 rounded-2xl transition-colors border-2 border-info-100 hover:border-info-500 flex items-center justify-center"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full flex-1">
        
        {/* The Triangle Visualization */}
        <div className="col-span-1 md:col-span-7 bg-white rounded-3xl p-8 shadow-lg border-4 border-primary-200 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-4 right-6 text-sm font-bold text-primary-400 uppercase tracking-widest">التشكيل البصري</div>
          
          <div className="w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-b-[240px] border-b-primary-50 relative mt-12 mb-8 mx-auto">
            {/* Top Node (Product) */}
            <motion.div 
              key={product}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-[40px] -left-[40px] w-20 h-20 bg-primary-500 text-white rounded-full flex justify-center items-center font-black text-3xl shadow-xl border-4 border-white z-10"
            >
              {product}
            </motion.div>
            
            {/* Bottom Left Node */}
            <div className="absolute top-[200px] -left-[160px] z-10">
              <NumberSelector value={num1} onChange={setNum1} color="primary" />
            </div>

            {/* Bottom Right Node */}
            <div className="absolute top-[200px] left-[80px] z-10">
              <NumberStepper value={num2} onChange={setNum2} />
            </div>

            {/* Operators logic visuals inside triangle */}
            <div className="absolute top-[100px] -left-[70px] text-primary-300 font-black text-2xl rotate-[-30deg]">÷</div>
            <div className="absolute top-[100px] left-[55px] text-primary-300 font-black text-2xl rotate-[30deg]">÷</div>
            <div className="absolute top-[210px] -left-[12px] text-primary-300 font-black text-2xl">×</div>
          </div>
        </div>

        {/* Fact List */}
        <div className="col-span-1 md:col-span-5 grid grid-rows-4 gap-4">
          <FactCard text={`${num1} × ${num2} = ${product}`} type="multiply" delay={0} />
          <FactCard text={`${num2} × ${num1} = ${product}`} type="multiply" delay={0.1} />
          <FactCard text={`${product} ÷ ${num1} = ${num2}`} type="divide" delay={0.2} />
          <FactCard text={`${product} ÷ ${num2} = ${num1}`} type="divide" delay={0.3} />
        </div>

      </div>
    </div>
  );
}

function NumberSelector({ value, onChange, color = 'success' }: any) {
  const isPrimary = color === 'primary';
  const bgClass = isPrimary ? 'bg-primary-500' : 'bg-success-500';
  
  return (
    <div className="flex items-center gap-2 relative">
       {/* Small hint label */}
       <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap ${isPrimary ? 'text-primary-600' : 'text-success-600'}`}>
         جدول الـ
       </div>
      <select 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-20 h-20 ${bgClass} text-white rounded-full flex justify-center items-center text-center font-black text-3xl shadow-lg border-4 appearance-none cursor-pointer border-white focus:outline-none hover:scale-105 transition-transform`}
        style={{ paddingRight: '1rem' }}
        dir="ltr"
      >
        {[2,3,4,5,6,7,8,9,10,11,12].map(n => (
           <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </div>
  );
}

function NumberStepper({ value, onChange }: any) {
  const handlePrev = () => {
    if (value > 1) onChange(value - 1);
  };
  const handleNext = () => {
    if (value < 12) onChange(value + 1);
  };

  return (
    <div className="flex items-center gap-1 relative bg-white rounded-full p-1 border-4 border-success-200 shadow-lg">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap text-success-600 bg-success-50 px-2 py-1 rounded-lg border border-success-100">
         غيّر الرقم
       </div>
      <button 
        onClick={handlePrev}
        disabled={value <= 1}
        className="w-8 h-12 bg-success-50 flex items-center justify-center rounded-l-full hover:bg-success-200 disabled:opacity-50 text-success-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m9 18 6-6-6-6"/></svg>
      </button>
      <div className="w-12 h-12 bg-success-500 text-white rounded-full flex items-center justify-center font-black text-2xl shadow-inner">
        {value}
      </div>
      <button 
        onClick={handleNext}
        disabled={value >= 12}
        className="w-8 h-12 bg-success-50 flex items-center justify-center rounded-r-full hover:bg-success-200 disabled:opacity-50 text-success-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  );
}

function FactCard({ text, type, delay }: { text: string, type: string, delay: number }) {
  const isMult = type === 'multiply';
  const colorClass = isMult ? 'bg-primary-50 text-primary-700 border-primary-200' : 'bg-warning-50 text-warning-700 border-warning-200';
  
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
      key={text}
      className={`p-4 rounded-2xl border-2 font-bold text-2xl text-center shadow-sm ${colorClass}`}
      dir="ltr"
    >
      {text}
    </motion.div>
  );
}
