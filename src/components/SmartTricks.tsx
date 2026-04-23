import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TRICKS = [
  {
    table: 'جدول الـ ٩',
    title: 'سر الأصابع السحرية',
    desc: 'افرد أصابع يديك العشرة. إذا أردت ضرب ٩ × ٤، قم بطي الإصبع الرابع من اليسار. الأصابع المتبقية على يسار الإصبع المطوي تمثل العشرات (٣)، والأصابع على يمينه تمثل الآحاد (٦). النتيجة ٣٦!',
    emoji: '🖐️',
    color: 'warning'
  },
  {
    table: 'جدول الـ ٥',
    title: 'نصف العدد × ١٠',
    desc: 'أي عدد تضربه في ٥ هو نصف العدد مضروباً في ١٠! مثلاً: ٦ × ٥ هي ببساطة ٦ ÷ ٢ = ٣، ثم ٣ × ١٠ = ٣٠.',
    emoji: '💡',
    color: 'info'
  },
  {
    table: 'جدول الـ ١١',
    title: 'تكرار الأرقام',
    desc: 'من ١ إلى ٩، ضرب الرقم في ١١ يعني تكراره مرتين! مثال: ١١ × ٤ = ٤٤ ، ١١ × ٧ = ٧٧. سر بسيط وسهل جداً.',
    emoji: '👯',
    color: 'secondary'
  },
  {
    table: 'جدول الـ ٢',
    title: 'الضعف دائماً',
    desc: 'الضرب في ٢ هو نفس الشيء مثل جمع العدد مع نفسه. مثال: ٢ × ٧ هو ببساطة ٧ + ٧ = ١٤.',
    emoji: '➕',
    color: 'primary'
  }
];

export function SmartTricks() {
  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col pb-8">
      <div className="text-center mb-8 bg-white p-6 rounded-3xl shadow-sm border-4 border-warning-100 max-w-xl mx-auto w-full">
        <h2 className="text-3xl font-black text-warning-600 mb-2">أسرار وحيل ذكية</h2>
        <p className="text-slate-600 font-medium">القليل من الذكاء يسهل الكثير من الحفظ. اكتشف هذه الأسرار!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TRICKS.map((trick, i) => (
          <TrickCard key={i} {...trick} />
        ))}
      </div>
    </div>
  );
}

function TrickCard({ table, title, desc, emoji, color }: any) {
  const [isOpen, setIsOpen] = useState(false);
  
  const colors: Record<string, string> = {
    warning: 'bg-warning-50 border-warning-200 text-warning-800 shadow-warning-100',
    info: 'bg-info-50 border-info-200 text-info-800 shadow-info-100',
    secondary: 'bg-secondary-50 border-secondary-200 text-secondary-800 shadow-secondary-100',
    primary: 'bg-primary-50 border-primary-200 text-primary-800 shadow-primary-100',
  };

  return (
    <motion.div 
      className={`border-4 rounded-3xl overflow-hidden transition-all duration-300 shadow-lg ${colors[color]}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-right flex items-center justify-between"
      >
        <div className="flex items-center gap-4 text-xl font-bold">
          <span className="text-4xl bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm shrink-0 border-2 border-inherit/20">{emoji}</span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">{table}</div>
            <div className="text-2xl font-black">{title}</div>
            {!isOpen && (
               <motion.div 
                 animate={{ opacity: [0.5, 1, 0.5] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="text-xs font-bold opacity-70 mt-1 flex items-center gap-1"
               >
                 <span>اضغط للاكتشاف</span>
               </motion.div>
            )}
          </div>
        </div>
        <div className="bg-white p-2 rounded-full shadow-sm shrink-0 border-2 border-inherit/20">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-lg leading-relaxed border-t-4 border-inherit/20 mt-2 font-medium">
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
