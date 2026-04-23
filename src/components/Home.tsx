import React from 'react';
import { Play, Lightbulb, Triangle } from 'lucide-react';
import { motion } from 'motion/react';

export function Home({ onNavigate }: { onNavigate: (tab: any) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 w-full max-w-5xl mx-auto auto-rows-min">
      
      {/* Hero Welcome (Bento Box 1) */}
      <motion.div 
        initial={{ y: 20 }} animate={{ y: 0 }}
        className="col-span-1 md:col-span-8 bg-white rounded-3xl border-4 border-primary-200 shadow-xl flex flex-col md:flex-row items-center justify-between p-8 relative overflow-hidden"
      >
        <div className="absolute top-4 right-6 text-sm font-bold text-primary-400 uppercase tracking-widest">
          مرحباً بك
        </div>
        
        <div className="flex-1 max-w-lg mb-6 md:mb-0 mt-6 md:mt-0 z-10 text-center md:text-right">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 leading-tight">أهلاً بك يا بطل الرياضيات!</h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            تعلم جدول الضرب لم يكن بهذه المتعة من قبل! اكتشف العلاقة بين الضرب والقسمة، وتعلم حيل سحرية لحفظ الأرقام.
          </p>
        </div>
        
        {/* Visual Element inside Hero */}
        <div className="relative z-10 flex shrink-0">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="w-40 h-40 bg-primary-50 rounded-full border-4 border-dashed border-primary-300 flex items-center justify-center text-8xl shadow-inner relative"
          >
            🦉
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl font-bold text-primary-600 shadow-sm border-2 border-primary-200">
              ١٠٠
            </div>
          </motion.div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary-100 rounded-full opacity-30"></div>
      </motion.div>

      {/* Quiz Card (Bento Box 2) */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('quiz')}
        className="col-span-1 md:col-span-4 bg-info-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden text-right flex flex-col justify-between group"
      >
        <div className="relative z-10">
          <div className="text-5xl mb-4 group-hover:-translate-y-2 transition-transform duration-300">🏆</div>
          <h3 className="text-2xl font-black mb-2">تحدي العباقرة</h3>
          <p className="text-info-100 leading-relaxed text-sm font-medium">اختبر سرعتك ومهارتك لجمع النقاط وفتح الأوسمة الذهبية.</p>
        </div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-info-400 rounded-full opacity-30"></div>
      </motion.button>

      {/* Fact Family (Bento Box 3) */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('fact-family')}
        className="col-span-1 md:col-span-6 bg-success-50 rounded-3xl p-6 border-4 border-success-200 flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden group"
      >
         <div className="absolute inset-0 bg-white/40"></div>
         <div className="relative z-10 w-full">
            <div className="text-4xl mb-4 group-hover:rotate-180 transition-transform duration-500">🔄</div>
            <h4 className="text-2xl font-black text-success-700 mb-2">مثلث الحقائق</h4>
            <p className="text-success-600 font-medium mb-6">اكتشف الرابط السحري بين 3 أرقام في الضرب والقسمة</p>
            
            <div className="flex justify-center gap-4 text-xl font-bold font-mono tracking-widest text-slate-700 w-full max-w-sm mx-auto">
               <div className="bg-white p-3 rounded-2xl border-2 border-success-100 shadow-sm flex-1">٣٠ ÷ ٦</div>
               <div className="bg-white p-3 rounded-2xl border-2 border-success-100 shadow-sm flex-1">٥ × ٦</div>
            </div>
         </div>
      </motion.button>

      {/* Smart Tricks (Bento Box 4) */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('tricks')}
        className="col-span-1 md:col-span-6 bg-secondary-50 rounded-3xl p-8 border-4 border-secondary-200 flex flex-col md:flex-row justify-between items-center shadow-md group relative overflow-hidden text-right"
      >
        <div className="flex-1 relative z-10">
          <h4 className="text-2xl font-black text-secondary-700 mb-2 flex items-center gap-2">
            <span>💡</span> الأسرار الذكية
          </h4>
          <p className="text-secondary-600 font-medium mb-4">القليل من الذكاء يسهل الكثير من الحفظ.</p>
          <div className="bg-white/80 p-3 rounded-2xl border border-secondary-100 text-sm font-bold text-secondary-500 inline-block">
            ١١ × ٤ = ٤٤ 👯
          </div>
        </div>
        
        {/* Visual Dots */}
        <div className="grid grid-cols-4 gap-2 opacity-60 mt-6 md:mt-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
           {Array.from({ length: 16 }).map((_, i) => (
             <div key={i} className="w-4 h-4 bg-secondary-400 rounded-full"></div>
           ))}
        </div>
      </motion.button>

      {/* Journey (Bento Box 4) */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('journey')}
        className="col-span-1 md:col-span-12 bg-white rounded-3xl p-8 border-4 border-slate-200 hover:border-slate-300 flex flex-col md:flex-row justify-between items-center shadow-md group relative overflow-hidden text-right"
      >
        <div className="flex-1 relative z-10 w-full md:w-auto text-center md:text-right">
          <h4 className="text-3xl font-black text-slate-800 mb-2 flex items-center justify-center md:justify-start gap-4">
            <span className="bg-slate-100 p-3 rounded-2xl shadow-inner border border-slate-200">📖</span> رحلة التعلم 
            <span className="text-sm bg-success-100 text-success-700 px-3 py-1 rounded-full font-bold ml-2">دروس تفاعلية</span>
          </h4>
          <p className="text-slate-600 font-medium text-lg mt-4 max-w-2xl mx-auto md:mx-0">
          استكشف مفاهيم القسمة والضرب واكتشف العلاقة بينها من خلال دروس تفاعلية وبصرية ممتعة.
          </p>
        </div>
        <div className="hidden md:flex gap-4 relative z-10 mt-6 md:mt-0 opacity-80 group-hover:opacity-100 transition-opacity">
           <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 border-secondary-200 -rotate-6">🍎</div>
           <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 border-primary-200 translate-y-4">〰️</div>
           <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 border-success-200 rotate-6">🔢</div>
        </div>
      </motion.button>
    </div>
  );
}
