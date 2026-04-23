import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Layers, GitCommit, LayoutGrid, Scissors, Sparkles, Table2 } from 'lucide-react';

import { DivisionConcept } from './lessons/DivisionConcept';
import { NumberLine } from './lessons/NumberLine';
import { ArrayLesson } from './lessons/ArrayLesson';
import { DivideByTenLesson } from './lessons/DivideByTenLesson';
import { DivideZeroOneLesson } from './lessons/DivideZeroOneLesson';
import { TablesLesson } from './lessons/TablesLesson';

type LessonType = 'menu' | 'concept' | 'numberline' | 'arrays' | 'divide10' | 'zero_one' | 'tables';

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
           العودة للدروس
        </button>
        <AnimatePresence mode="wait">
           {currentLesson === 'concept' && <motion.div key="c" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><DivisionConcept /></motion.div>}
           {currentLesson === 'numberline' && <motion.div key="n" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><NumberLine /></motion.div>}
           {currentLesson === 'arrays' && <motion.div key="a" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><ArrayLesson /></motion.div>}
           {currentLesson === 'divide10' && <motion.div key="d10" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><DivideByTenLesson /></motion.div>}
           {currentLesson === 'zero_one' && <motion.div key="z1" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><DivideZeroOneLesson /></motion.div>}
           {currentLesson === 'tables' && <motion.div key="tb" initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}><TablesLesson /></motion.div>}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col pb-8">
      <div className="text-center mb-8 bg-white p-8 md:p-10 rounded-3xl shadow-sm border-4 border-secondary-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="w-20 h-20 bg-secondary-100 text-secondary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner rotate-3">
           <BookOpen size={40} />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-secondary-700 mb-4 relative z-10">رحلة التعلم</h2>
        <p className="text-slate-600 font-medium text-lg md:text-xl leading-relaxed relative z-10 max-w-2xl mx-auto">
          هيا نتعلم الرياضيات خطوة بخطوة من خلال التجربة البصرية والتفاعل الممتع، ونكتشف معاً أسرار الأرقام!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Lesson 1 */}
         <div 
           onClick={() => setCurrentLesson('concept')}
           className="bg-white rounded-3xl p-8 border-4 border-secondary-100 hover:border-secondary-400 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
         >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-secondary-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="w-20 h-20 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-inner">
               <Layers size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10 group-hover:text-secondary-700 transition-colors">مفهوم القسمة</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">توزيع الأشياء في مجموعات متساوية وفهم مفردات القسمة (المقسوم والمقسوم عليه).</p>
            <div className="mt-6 font-bold text-secondary-500 text-sm bg-secondary-50 px-4 py-1.5 rounded-full relative z-10 group-hover:bg-secondary-100 transition-colors">الدرس الأول</div>
         </div>

         {/* Lesson 2 */}
         <div 
           onClick={() => setCurrentLesson('numberline')}
           className="bg-white rounded-3xl p-8 border-4 border-info-100 hover:border-info-400 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
         >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-info-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="w-20 h-20 bg-info-100 text-info-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-inner">
               <GitCommit size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10 group-hover:text-info-700 transition-colors">الطرح المتكرر</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">استخدام الأقواس على خط الأعداد لربط القسمة بعملية الطرح المتكرر حتى نصل للصفر.</p>
            <div className="mt-6 font-bold text-info-500 text-sm bg-info-50 px-4 py-1.5 rounded-full relative z-10 group-hover:bg-info-100 transition-colors">الدرس الثاني</div>
         </div>

         {/* Lesson 3 */}
         <div 
           onClick={() => setCurrentLesson('arrays')}
           className="bg-white rounded-3xl p-8 border-4 border-primary-100 hover:border-primary-400 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
         >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-inner">
               <LayoutGrid size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10 group-hover:text-primary-700 transition-colors">الشبكات السحرية</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">استكشاف الحقائق المترابطة وكتابة جمل الضرب والقسمة باستعمال المصفوفات والشبكات.</p>
            <div className="mt-6 font-bold text-primary-500 text-sm bg-primary-50 px-4 py-1.5 rounded-full relative z-10 group-hover:bg-primary-100 transition-colors">الدرس الثالث</div>
         </div>

         {/* Lesson 4 */}
         <div 
           onClick={() => setCurrentLesson('divide10')}
           className="bg-white rounded-3xl p-8 border-4 border-info-100 hover:border-info-400 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
         >
            <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-info-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="w-20 h-20 bg-info-100 text-info-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-inner">
               <Scissors size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10 group-hover:text-info-700 transition-colors">القسمة على ١٠</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">تعلم حيلة حذف الأصفار السحرية وكيفية إيجاد ناتج قسمة عدد على ١٠ بسرعة كبيرة.</p>
            <div className="mt-6 font-bold text-info-500 text-sm bg-info-50 px-4 py-1.5 rounded-full relative z-10 group-hover:bg-info-100 transition-colors">الدرس الرابع</div>
         </div>

         {/* Lesson 5 */}
         <div 
           onClick={() => setCurrentLesson('zero_one')}
           className="bg-white rounded-3xl p-8 border-4 border-warning-100 hover:border-warning-400 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
         >
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-warning-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="w-20 h-20 bg-warning-100 text-warning-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-inner">
               <Sparkles size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10 group-hover:text-warning-700 transition-colors">قواعد ٠ و ١</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">اكتشف القواعد الأساسية السهلة عند القسمة على الصفر وعلى الواحد.</p>
            <div className="mt-6 font-bold text-warning-500 text-sm bg-warning-50 px-4 py-1.5 rounded-full relative z-10 group-hover:bg-warning-100 transition-colors">الدرس الخامس</div>
         </div>

         {/* Lesson 6 */}
         <div 
           onClick={() => setCurrentLesson('tables')}
           className="bg-white rounded-3xl p-8 border-4 border-purple-100 hover:border-purple-400 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
         >
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-inner">
               <Table2 size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 relative z-10 group-hover:text-purple-700 transition-colors">المدخلات والمخرجات</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">استكمل جداول القاعدة واستنتج القاعدة السحرية التي تربط الجداول وتدرب على المسائل.</p>
            <div className="mt-6 font-bold text-purple-500 text-sm bg-purple-50 px-4 py-1.5 rounded-full relative z-10 group-hover:bg-purple-100 transition-colors">الدرس السادس</div>
         </div>
      </div>
    </div>
  );
}
