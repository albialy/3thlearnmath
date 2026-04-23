import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Layers, GitCommit, LayoutGrid, Scissors, Sparkles, Table2, Ruler, SquareDashed, Grid3X3, Droplet, Scale, Box, Clock } from 'lucide-react';

import { DivisionConcept } from './lessons/DivisionConcept';
import { NumberLine } from './lessons/NumberLine';
import { ArrayLesson } from './lessons/ArrayLesson';
import { DivideByTenLesson } from './lessons/DivideByTenLesson';
import { DivideZeroOneLesson } from './lessons/DivideZeroOneLesson';
import { TablesLesson } from './lessons/TablesLesson';

import { UnitMatchingLesson } from './lessons/UnitMatchingLesson';
import { PerimeterLesson } from './lessons/PerimeterLesson';
import { AreaLesson } from './lessons/AreaLesson';
import { CapacityLesson } from './lessons/CapacityLesson';
import { MassLesson } from './lessons/MassLesson';
import { VolumeLesson } from './lessons/VolumeLesson';
import { TimeLesson } from './lessons/TimeLesson';

type LessonType = 'menu' | 'concept' | 'numberline' | 'arrays' | 'divide10' | 'zero_one' | 'tables' | 'unit_match' | 'perimeter' | 'area' | 'capacity' | 'mass' | 'volume' | 'time';

export function LearningJourney() {
  const [currentLesson, setCurrentLesson] = useState<LessonType>('menu');

  if (currentLesson !== 'menu') {
    return (
      <div className="flex flex-col w-full h-full max-w-4xl mx-auto pb-8">
        <button 
          onClick={() => setCurrentLesson('menu')} 
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold w-max bg-white px-4 py-2 rounded-xl border-2 border-slate-200 shadow-sm"
        >
           <ArrowRight size={20} />
           العودة لفهرس الفصول
        </button>
        <AnimatePresence mode="wait">
           {currentLesson === 'concept' && <motion.div key="c" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><DivisionConcept /></motion.div>}
           {currentLesson === 'numberline' && <motion.div key="n" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><NumberLine /></motion.div>}
           {currentLesson === 'arrays' && <motion.div key="a" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><ArrayLesson /></motion.div>}
           {currentLesson === 'divide10' && <motion.div key="d10" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><DivideByTenLesson /></motion.div>}
           {currentLesson === 'zero_one' && <motion.div key="z1" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><DivideZeroOneLesson /></motion.div>}
           {currentLesson === 'tables' && <motion.div key="tb" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><TablesLesson /></motion.div>}
           
           {currentLesson === 'unit_match' && <motion.div key="um" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><UnitMatchingLesson /></motion.div>}
           {currentLesson === 'perimeter' && <motion.div key="pr" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><PerimeterLesson /></motion.div>}
           {currentLesson === 'area' && <motion.div key="ar" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><AreaLesson /></motion.div>}
           {currentLesson === 'capacity' && <motion.div key="cp" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><CapacityLesson /></motion.div>}
           {currentLesson === 'mass' && <motion.div key="ms" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><MassLesson /></motion.div>}
           {currentLesson === 'volume' && <motion.div key="vl" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><VolumeLesson /></motion.div>}
           {currentLesson === 'time' && <motion.div key="tm" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><TimeLesson /></motion.div>}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col pb-8">
      <div className="text-center mb-8 bg-white p-8 md:p-10 rounded-3xl shadow-sm border-4 border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="w-20 h-20 bg-slate-100 text-slate-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner rotate-3">
           <BookOpen size={40} />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4 relative z-10">فهرس الفصول</h2>
        <p className="text-slate-600 font-medium text-lg md:text-xl leading-relaxed relative z-10 max-w-2xl mx-auto">
          اختر الفصل وانطلق في رحلة التعلم الاستكشافية.
        </p>
      </div>

      {/* Chapter 1 */}
      <div className="mb-12">
         <div className="bg-secondary-50 border-r-8 border-secondary-500 p-6 rounded-l-3xl mb-6 shadow-sm">
            <h3 className="text-3xl font-black text-secondary-800 flex items-center gap-3">
               <span className="bg-secondary-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md">١</span>
               أسرار الضرب والقسمة
            </h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div onClick={() => setCurrentLesson('concept')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-secondary-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-secondary-600">مفهوم القسمة</h4>
            </div>

            <div onClick={() => setCurrentLesson('numberline')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-info-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-info-100 text-info-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GitCommit size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-info-600">الطرح المتكرر</h4>
            </div>

            <div onClick={() => setCurrentLesson('arrays')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-primary-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary-600">الشبكات السحرية</h4>
            </div>

            <div onClick={() => setCurrentLesson('divide10')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-info-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-info-100 text-info-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Scissors size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-info-600">القسمة على ١٠</h4>
            </div>

            <div onClick={() => setCurrentLesson('zero_one')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-warning-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-warning-100 text-warning-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-warning-600">قواعد ٠ و ١</h4>
            </div>

            <div onClick={() => setCurrentLesson('tables')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-purple-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Table2 size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600">المدخلات والمخرجات</h4>
            </div>
         </div>
      </div>

      {/* Chapter 2 */}
      <div className="mb-8">
         <div className="bg-emerald-50 border-r-8 border-emerald-500 p-6 rounded-l-3xl mb-6 shadow-sm">
            <h3 className="text-3xl font-black text-emerald-800 flex items-center gap-3">
               <span className="bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md">٢</span>
               القياس والمحيط والمساحة والحجم
            </h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div onClick={() => setCurrentLesson('unit_match')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Ruler size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600">وحدات الطول</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">ملم، سم، م، كلم</p>
            </div>
            
            <div onClick={() => setCurrentLesson('capacity')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Droplet size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">وحدات السعة المترية</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">ملعقة أم سطل!</p>
            </div>
            
            <div onClick={() => setCurrentLesson('mass')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Scale size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600">تقدير الكتلة</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">جرام أم كيلوجرام؟</p>
            </div>

            <div onClick={() => setCurrentLesson('time')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-teal-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-600">قراءة الساعة</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">كيف نقرأ الوقت؟</p>
            </div>

            <div onClick={() => setCurrentLesson('perimeter')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-indigo-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <SquareDashed size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600">حساب المحيط</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">المسافة حول الشكل</p>
            </div>

            <div onClick={() => setCurrentLesson('area')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-sky-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Grid3X3 size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-sky-600">قياس المساحة</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">المنطقة الداخلية للشكل</p>
            </div>
            
            <div onClick={() => setCurrentLesson('volume')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-orange-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Box size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600">حساب الحجم</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">الوحدات المكعبة الثلاثية</p>
            </div>
         </div>
      </div>
      
    </div>
  );
}
