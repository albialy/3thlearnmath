import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Layers, GitCommit, LayoutGrid, Scissors, Sparkles, Table2, Ruler, SquareDashed, Grid3X3, Droplet, Scale, Box, Clock, Smile, BarChart3 } from 'lucide-react';

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

import { Shapes3DLesson } from './lessons/Shapes3DLesson';
import { Shapes2DLesson } from './lessons/Shapes2DLesson';
import { PatternsLesson } from './lessons/PatternsLesson';
import { SymmetryLesson } from './lessons/SymmetryLesson';
import { ProbabilityLesson } from './lessons/ProbabilityLesson';
import { PictographLesson } from './lessons/PictographLesson';
import { BarGraphLesson } from './lessons/BarGraphLesson';
import { ProblemSolvingList } from './lessons/ProblemSolvingList';

type LessonType = 'menu' | 'concept' | 'numberline' | 'arrays' | 'divide10' | 'zero_one' | 'tables' | 'unit_match' | 'perimeter' | 'area' | 'capacity' | 'mass' | 'volume' | 'time' | 'shapes3d' | 'shapes2d' | 'patterns' | 'symmetry' | 'probability' | 'pictograph' | 'bargraph' | 'problem_list';

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
           
           {currentLesson === 'shapes3d' && <motion.div key="s3" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><Shapes3DLesson /></motion.div>}
           {currentLesson === 'shapes2d' && <motion.div key="s2" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><Shapes2DLesson /></motion.div>}
           {currentLesson === 'patterns' && <motion.div key="pt" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><PatternsLesson /></motion.div>}
           {currentLesson === 'symmetry' && <motion.div key="sy" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><SymmetryLesson /></motion.div>}
           {currentLesson === 'pictograph' && <motion.div key="pg" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><PictographLesson /></motion.div>}
           {currentLesson === 'bargraph' && <motion.div key="bg" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><BarGraphLesson /></motion.div>}
           {currentLesson === 'probability' && <motion.div key="pr" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><ProbabilityLesson /></motion.div>}
           {currentLesson === 'problem_list' && <motion.div key="pl" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><ProblemSolvingList /></motion.div>}
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
      {/* Chapter 3 */}
      <div className="mb-8">
         <div className="bg-rose-50 border-r-8 border-rose-500 p-6 rounded-l-3xl mb-6 shadow-sm">
            <h3 className="text-3xl font-black text-rose-800 flex items-center gap-3">
               <span className="bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md">٣</span>
               الأشكال الهندسية
            </h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div onClick={() => setCurrentLesson('shapes3d')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-rose-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Box size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-rose-600">المجسمات</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">الأشكال ثلاثية الأبعاد</p>
            </div>

            <div onClick={() => setCurrentLesson('shapes2d')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-pink-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <SquareDashed size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-pink-600">الأشكال المستوية</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">المضلعات ثنائية الأبعاد</p>
            </div>

            <div onClick={() => setCurrentLesson('symmetry')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-purple-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Scissors size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600">التماثل</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">طية الورق السحرية</p>
            </div>

            <div onClick={() => setCurrentLesson('patterns')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-fuchsia-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-fuchsia-100 text-fuchsia-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-fuchsia-600">الأنماط الهندسية</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">أكمل السلسلة!</p>
            </div>
         </div>
      </div>
      
      {/* Chapter 10 */}
      <div className="mb-8">
         <div className="bg-amber-50 border-r-8 border-amber-500 p-6 rounded-l-3xl mb-6 shadow-sm">
            <h3 className="text-3xl font-black text-amber-800 flex items-center gap-3">
               <span className="bg-amber-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md">١٠</span>
               عرض البيانات وتفسيرها
            </h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div onClick={() => setCurrentLesson('pictograph')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-indigo-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Smile size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600">التمثيل بالرموز</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">قراءة الرموز وفهمها</p>
            </div>

            <div onClick={() => setCurrentLesson('bargraph')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-cyan-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-cyan-600">التمثيل بالأعمدة</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">بناء وقراءة الأعمدة</p>
            </div>

            <div onClick={() => setCurrentLesson('problem_list')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-fuchsia-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-fuchsia-100 text-fuchsia-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-fuchsia-600">إنشاء قائمة</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">خطة حل المسألة</p>
            </div>

            <div onClick={() => setCurrentLesson('probability')} className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles size={28} />
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600">الاحتمالات والخطأ</h4>
               <p className="text-slate-500 text-xs font-medium mt-1">عبدالله أم أسماء؟</p>
            </div>
         </div>
      </div>

    </div>
  );
}
